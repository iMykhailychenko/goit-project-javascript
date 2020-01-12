import fetch from './fetchPopularFilms';
const debounce = require('lodash.debounce');

class Search {
  constructor({ selector }) {
    this.input = document.querySelector(selector);
    this.enter();
    this.getResoultsList();
  }

  getSearchParam() {
    const text = this.input.value;
    let query = text.split(' ').join('+');

    while (query.includes('++')) {
      query = query.split('++').join('+');
    }

    return query === '' ? undefined : `&query=${query}`;
  }

  enter() {
    this.input.addEventListener('keypress', e => {
      if (e.code === 'Enter' && e.target === e.currentTarget) {
        this.fetchResoult(this.renderFilms.bind(this));
      }
    });
  }

  getResoultsList() {
    this.input.addEventListener(
      'input',
      debounce(this.fetchResoult.bind(this, this.renderList.bind(this)), 500),
    );
  }

  fetchResoult(calback) {
    const way = 'search';
    const param = this.getSearchParam.bind(this);
    fetch.getFilmsList(way, param).then(data => {
      calback(data);
    });
  }

  renderList(data) {
    console.log('найдено ' + data.total_results + ' фильмов');
    console.log(data.results);
  }

  renderFilms(data) {
    console.log('найдено ' + data.total_results + ' фильмов');
    console.log(data.results);
  }
}

new Search({
  selector: '.search__input',
});
