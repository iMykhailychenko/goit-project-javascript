const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
const pageNumber = document.querySelector('.page-number');

const changePageNumber = {
  page: 1,

  increment(calback) {
    prevBtn.disabled = false;
    prevBtn.classList.remove('disabled');
    this.page += 1;
    pageNumber.textContent = this.page;
    calback(this.page);
  },

  decrement(calback) {
    if (pageNumber.textContent !== '2') {
      this.page -= 1;
      pageNumber.textContent = this.page;
      calback(this.page);
    } else {
      this.page -= 1;
      pageNumber.textContent = this.page;
      prevBtn.disabled = true;
      prevBtn.classList.add('disabled');
      calback(this.page);
    }
  },
};

export { changePageNumber };
