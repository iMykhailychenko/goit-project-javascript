const queryString = require('query-string');
const prev = document.querySelector('.paggination__prev');
const next = document.querySelector('.paggination__next');
const number = document.querySelector('.paggination__number');
const search = queryString.parse(window.location.search);

let counter = search.page ? +search.page : 1;

number.textContent = counter;

const setHref = (page, tag) => tag.href = `?page=${page}`;

const paggination = max => {

  if (counter === 1) {

    prev.classList.add('disabled');
    next.classList.remove('disabled');

  } else if (counter === max) {

    prev.classList.remove('disabled');
    next.classList.add('disabled');

  }

  const increase = () => {

    if (counter < max - 1) {

      counter += 1;
      number.textContent = counter;
      setHref(counter, next);

    } else {

      counter = max;
      number.textContent = counter;
      setHref(counter, next);

    }

  };

  const decrease = () => {

    if (counter <= 2) {

      counter = 1;
      number.textContent = 1;
      setHref(counter, prev);

    } else {

      counter -= 1;
      number.textContent = counter;
      setHref(counter, prev);

    }

  };

  prev.addEventListener('click', decrease);
  next.addEventListener('click', increase);
  
};

export default paggination;
