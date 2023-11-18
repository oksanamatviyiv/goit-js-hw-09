import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const delay = Number(form.delay.value);
  const step = Number(form.step.value);
  const amount = Number(form.amount.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + step * (i - 1))
      .then(message => Notiflix.Notify.success(message))
      .catch(error => Notiflix.Notify.failure(error));
  }
});
