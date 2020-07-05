var pomodoro = {
  init: function() {
    this.domVariables();
    this.timerVariables();
    this.bindEvents();
    this.updateAllDisplays();
    this.requestNotification();
  },

  // deklaracja powiadomien 
  breakNotification: undefined,
  workNotification: undefined,
  domVariables: function() {

    // przyciski kontroli czasu / blokady przyciskow
    this.toggleTimerBtns = document.getElementsByClassName("time-toggle-btn");
    this.increaseSession = document.getElementById("add-min-work");
    this.decreaseSession = document.getElementById("minus-min-work");
    this.increaseBreak  = document.getElementById("add-min-break");
    this.decreaseBreak  = document.getElementById("minus-min-break");

    // panel wyswietlania kontroli czasu
    this.sessionLengthDisplay = document.getElementById("work-session-value");
    this.breakLengthDisplay   = document.getElementById("break-session-value");

    // glowny wyswietlacz
    this.countdownDisplay   = document.getElementById("pomodoro-timer");
    this.resetCountdownBtn  = document.getElementById("reset-btn");    
    this.stopCountdownBtn   = document.getElementById("stop-btn"); 
    this.startCountdownBtn  = document.getElementById("start-btn");

    // powiadomienia o sesji
    this.sessionText = document.getElementById("session-text");
  },

  // dlugosc sesji
  timerVariables: function() {
    // domyslne wartosci
    this.sessionLength =  1;
    this.breakLength   =  5; 

    this.timeInterval = false;
    this.workSession = true;
    this.pausedTime = 0;
    this.timePaused = false;
    this.timeStopped = false;
  },

  // podbijanie domyslnwych wartosci sesji / przerwa
  bindEvents: function() {
    // Bind increase/ decrease session length to buttons
    this.increaseSession.onclick = pomodoro.incrSession;
    this.decreaseSession.onclick = pomodoro.decrSession;
    this.increaseBreak.onclick = pomodoro.incrBreak;
    this.decreaseBreak.onclick = pomodoro.decrBreak;

    // Bind start date to #countdown and countdown buttons
    this.countdownDisplay.onclick  = pomodoro.startCountdown;
    this.resetCountdownBtn.onclick = pomodoro.resetCountdown;
    this.stopCountdownBtn.onclick  = pomodoro.stopCountdown;
    this.startCountdownBtn.onclick = pomodoro.startCountdown;
  },

  // wyswietlanie informacji na ekranie
  updateAllDisplays: function() {
    // zmiana html zgodnie z obecnymi wartosciami
    pomodoro.sessionLengthDisplay.innerHTML = this.sessionLength;
    pomodoro.breakLengthDisplay.innerHTML   = this.breakLength;
    pomodoro.countdownDisplay.innerHTML     = this.sessionLength + ":00";

    pomodoro.resetVariables();
  },

  // wyswietlanie powiadomien
  requestNotification: function() {
    if (!("Notification" in window)) {
      return console.log("This browser does not support desktop notification");
    }
  },

  // podbijanie czasu pracy
  incrSession: function() {
    if ( pomodoro.sessionLength < 59 ) {
      pomodoro.sessionLength += 1;
      pomodoro.updateAllDisplays();    
    }   
  },
   // obnizanie czasu pracy
  decrSession: function() {
    if (  pomodoro.sessionLength > 1 ) {
      pomodoro.sessionLength -= 1;
      pomodoro.updateAllDisplays();      
    }
  },
  // podbijanie dlugosci przerwy
  incrBreak: function() {
    if (  pomodoro.breakLength < 30 ) {
      pomodoro.breakLength += 1;
      pomodoro.updateAllDisplays();    
    }
  },
  // obnizanie dlugosci przerwy
  decrBreak: function() {
    if ( pomodoro.breakLength > 1 ) {
      pomodoro.breakLength -= 1;
      pomodoro.updateAllDisplays();     
    }    
  },

  // reset wartosci do tych domyslnych
  resetVariables: function() {
    pomodoro.timeInterval = false;
    pomodoro.workSession = true;
    pomodoro.pausedTime = 0;
    pomodoro.timeStopped = false;
    pomodoro.timePaused = false;
  },

  // logika pracy zegara
  startCountdown: function() {
    pomodoro.disableButtons();
    pomodoro.displayType();

    // zatrzymaj jesli obecnie dziala w innym razie start
    if (pomodoro.timeInterval !== false) {
      pomodoro.pauseCountdown();
    } else {
      pomodoro.startTime = new Date().getTime();

      //sprawdz czy nie jest spauzowane
      if(pomodoro.timePaused === false) {
        pomodoro.unPauseCountdown();
      } else {
        pomodoro.endTime = pomodoro.startTime + pomodoro.pausedTime;
        pomodoro.timePaused = false;
      }
      //odliczaj 990ms by uniknac laga z 1000
      //update zegara
      pomodoro.timeInterval = setInterval(pomodoro.updateCountdown, 990);
    }
  },

  // przeliczanie i wyswietlanie czasu
  updateCountdown: function() {
    var currTime = new Date().getTime();
    var difference = pomodoro.endTime - currTime;

    // konwersja do sekund
    var seconds = Math.floor((difference / 1000) % 60);
    var minutes = Math.floor((difference / 1000) / 60 % 60);

    // dodaj 0 gdy <10
    if (seconds < 10) { seconds = "0" + seconds ;}

    // wyswietlaj zanim osiagnie 0, potem przelacz sesje
    if(difference > 1000) {
      pomodoro.countdownDisplay.innerHTML = minutes + ":" + seconds;
    } else {
      pomodoro.changeSession();
    }

  },

  // zmiana sesji
  changeSession: function() {
    clearInterval(pomodoro.timeInterval);
    pomodoro.playSound();
    
    // przelaczanie pomiedzy sekcjami
    if(pomodoro.workSession === true ) {
      pomodoro.workSession = false;
    } else {
      pomodoro.workSession = true;
    }

    // zatrzymaj odliczanie
    pomodoro.timeInterval = false;
    // restart ze zmieniona sesja
    pomodoro.startCountdown();
    
  },

  // zatrzymaj odliczanie
  pauseCountdown: function() {
    // zapisz date do restartu we wlasciwym czasie
    var currTime = new Date().getTime();
    pomodoro.pausedTime = pomodoro.endTime - currTime;
    pomodoro.timePaused = true;

    // zatrzymaj odliczanie na 2klik
    clearInterval(pomodoro.timeInterval);
    
    // resetuj zmienne by zegar mogl dzialac ponownie na klik
    pomodoro.timeInterval = false;
  },

  unPauseCountdown: function() {
    if(pomodoro.workSession === true ) {
      pomodoro.endTime = pomodoro.startTime + (pomodoro.sessionLength * 60000);
    } else {
      pomodoro.endTime = pomodoro.startTime + (pomodoro.breakLength * 60000);
    }
  },

  // reset zegara
  resetCountdown: function() {
    // zatrzymaj i zresetuj
    clearInterval(pomodoro.timeInterval);

    // wylacz klawisze
    pomodoro.unDisableButtons();

    // zmien html
    pomodoro.updateAllDisplays();

    // resetuj zmienne
    pomodoro.resetVariables();
    pomodoro.sessionText.innerHTML = ('Zegar został zresetowany.');
  },

  // zatrzymanie STOP
  stopCountdown: function() {
    // stop
    clearInterval(pomodoro.timeInterval);
    pomodoro.sessionText.innerHTML = ('Zatrzymano');
  },

  playSound: function() {
    var mp3 = "http://soundbible.com/grab.php?id=1746&type=mp3";
    var audio = new Audio(mp3);
    audio.play();    
  },

  displayType: function() {
    // Check what session is running and change appearance and text above
    // countdown depending on session (break or work)
    if ( pomodoro.workSession === true ) {
      pomodoro.sessionText.innerHTML = ('Jesteś w pracy, pozostań skoncentrowany.');
    } else {
      pomodoro.sessionText.innerHTML = ('Trwa przerwa, postaraj się zrelaksować.');
    }   

  },

  // wylaczenie przyciskow gdy sesja dziala
  disableButtons: function() {
    const controllsBtns = document.querySelector('.break-job-time-panel-holder');
    controllsBtns.classList.add("time-toggle-btn-special");
  },

  // wlaczenie buttonow z powrotem
  unDisableButtons: function() {
    const controllsBtns = document.querySelector('.break-job-time-panel-holder');
    controllsBtns.classList.remove("time-toggle-btn-special");
  }
  
};

pomodoro.init();