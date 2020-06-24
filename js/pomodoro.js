const pomodoroTimer = document.querySelector('#pomodoro-timer');

const startButton = document.querySelector('#pomodoro-start');
const pauseButton = document.querySelector('#pomodoro-pause');
const stopButton = document.querySelector('#pomodoro-stop');

let isClockRunning = false;

let type = 'Work';

// in seconds = 25 mins
let workSessionDuration = 50;
let currentTimeLeftInSession = 50;
// in seconds = 5 mins;
let breakSessionDuration = 300;

let updatedWorkSessionDuration;
let updatedBreakSessionDuration;

let workDurationInput = document.querySelector('#input-work-duration');
let breakDurationInput = document.querySelector('#input-break-duration');

workDurationInput.value = '25';
breakDurationInput.value = '5';

// funnckja przelaczajaca zegar
const toggleClock = (reset) => {
    if (reset) {
        // stop(reset)
        stopClock();
    } else {
        if (isClockRunning  === true) {
            //pauza
            isClockRunning = false;
            clearInterval(clockTimer);
        } else {
            //start 
            isClockRunning = true;

            clockTimer = setInterval(() => {
                // decrease time left / increase time spent
                currentTimeLeftInSession--;
                displayCurrentTimeLeftInSession();
            }, 1000)
        }
    }
}



//funckja stopujaca zegar
const stopClock = () => {
    clearInterval(clockTimer);
    isClockRunning = false;
    currentTimeLeftInSession = workSessionDuration;
    displayCurrentTimeLeftInSession();
}

// funckja zamieniajaca czas na sekundy
const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeftInSession;
    let result = '';
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft / 60) % 60;
    let hours = parseInt(secondsLeft / 3600);

    // dodanie zer jesli jest mniejsze niz 10
    function addLeadingZeroes(time) {
        return time < 10 ? `0${time}` : time
    }

    if (hours > 0) result += `${hours}:`
    result += `${addLeadingZeroes(minutes)} : ${addLeadingZeroes(seconds)}`
    pomodoroTimer.innerText = result.toString();
}

console.log(stopButton)

// start
startButton.addEventListener('click', () => {
    toggleClock();
})
//pauza
pauseButton.addEventListener('click', () => {
    toggleClock();
})
//stop
stopButton.addEventListener('click', () => {
    toggleClock(true);
})

// aktualizacja czasu pracy
workDurationInput.addEventListener('input', () => {
    updatedWorkSessionDuration = minuteToSeconds(workDurationInput.value)
})
  
// aktualizacja czasu przerwy
breakDurationInput.addEventListener('input', () => {
    updatedBreakSessionDuration = minuteToSeconds(breakDurationInput.value)
})

const minuteToSeconds = mins => {
    return mins * 60
}
