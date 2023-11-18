import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

class Timer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = new Date(targetDate);
    this.refs = {
      days: document.querySelector(`${selector} [data-days]`),
      hours: document.querySelector(`${selector} [data-hours]`),
      minutes: document.querySelector(`${selector} [data-minutes]`),
      seconds: document.querySelector(`${selector} [data-seconds]`),
    };
    this.start();
  }

  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const timeLeft = this.targetDate - currentTime;
      const timeComponents = convertMs(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(this.intervalId);
        return;
      }
      this.updateDisplay(timeComponents);
    }, 1000);
  }

  updateDisplay({ days, hours, minutes, seconds }) {
    this.refs.days.textContent = String(days).padStart(2, '0');
    this.refs.hours.textContent = String(hours).padStart(2, '0');
    this.refs.minutes.textContent = String(minutes).padStart(2, '0');
    this.refs.seconds.textContent = String(seconds).padStart(2, '0');
  }
}

const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;

const fp = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate > new Date()) {
      startButton.disabled = false;
    } else {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    }
  },
});

startButton.addEventListener('click', () => {
  const selectedDate = fp.selectedDates[0];
  if (selectedDate && selectedDate > new Date()) {
    new Timer({
      selector: '.timer',
      targetDate: selectedDate,
    });
    startButton.disabled = true; 
  } else {
    alert('Please select a future date.');
  }
});
