 class Timer {
   constructor({ selector, targetDate }) {
     this.selector = selector;
     this.targetDate = targetDate;

     this.refs = {
            timerBox: document.querySelector('#timer-1'),
            daysTimer: document.querySelector(`${selector} span[data-value="days"]`),
            hoursTimer: document.querySelector(`${selector} span[data-value="hours"]`),
            minutesTimer: document.querySelector(`${selector} span[data-value="mins"]`),
            secondsTimer: document.querySelector(`${selector} span[data-value="secs"]`),
      };
        this.start();
    }

    start() {
        setInterval(() => {
            const deltaTime = this.targetDate - Date.now();
            this.updateClockface(this.getTimeComponents(deltaTime));
        }, 1000);
    }

    
    updateClockface({ days, hours, mins, secs }) {
    this.refs.daysTimer.innerHTML = days;
    this.refs.hoursTimer.innerHTML = hours;
    this.refs.minutesTimer.innerHTML = mins;
    this.refs.secondsTimer.innerHTML = secs;
}

  getTimeComponents(time) {
        const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

        return { days, hours, mins, secs };
    }
}
    function pad(value) {
        return String(value).padStart(2, '0');
}
const CountDownTimer = new Timer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2021'),
});