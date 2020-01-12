import { fetchParams } from './getCorrectData';

const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
const pageNumber = document.querySelector('.page-number');

let currentPageNumber = 1;

const changePageNumber = {
  increment: function() {
    prevBtn.disabled = false;
    prevBtn.classList.remove('disabled');
    currentPageNumber += 1;
    pageNumber.textContent = currentPageNumber;
    fetchParams(currentPageNumber);
  },
  decrement: function() {
    if (pageNumber.textContent !== '2') {
      currentPageNumber -= 1;
      pageNumber.textContent = currentPageNumber;
      fetchParams(currentPageNumber);
    } else {
      currentPageNumber -= 1;
      pageNumber.textContent = currentPageNumber;
      prevBtn.disabled = true;
      prevBtn.classList.add('disabled');
      fetchParams(currentPageNumber);
    }
  },
};

nextBtn.addEventListener(
  'click',
  changePageNumber.increment.bind(changePageNumber),
);
prevBtn.addEventListener(
  'click',
  changePageNumber.decrement.bind(changePageNumber),
);

export { changePageNumber };