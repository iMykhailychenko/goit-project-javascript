import fetch from './fetchFilms';
import { render } from './renderMainPage';
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
    if (param() === undefined) {
      calback(undefined);
      return;
    }
    fetch.getFilmsList(way, param).then(data => {
      calback(data);
    });
  }

  renderList(data) {
    const searchBlock = document.querySelector('.results');
    const searchTitle = document.querySelector('.results__title');
    const searchList = document.querySelector('.results__list');

    if (data === undefined) {
      searchTitle.textContent = '';
      searchList.innerHTML = '';
      searchBlock.hidden = true;
      return;
    }

    const firstFilms = data.results;
    firstFilms.length = 8;
    searchBlock.hidden = false;
    searchTitle.textContent = `найдено  ${data.total_results} фильмов`;

    const markup = firstFilms
      .map(item => {
        return `<li class="results__item">
                <a href=?id=${item.id}#inner-page class="results__text">${item.title}</p>
              </li>`;
      })
      .join('');
    searchList.innerHTML = '';
    searchList.insertAdjacentHTML('beforeend', markup);
  }

  renderFilms(data) {
    const searchBlock = document.querySelector('.results');
    searchBlock.hidden = true;
    const filmsList = document.querySelector('.film-list');
    filmsList.innerHTML = '';

    const correctData = data.results.map(item => {
      return {
        id: item.id,
        backdrop_path: item.backdrop_path,
        title: item.title,
        release_date: `(${item.release_date.slice(0, 4)})`,
        vote_average: item.vote_average,
      };
    });
    const obj = { popularFilm: correctData };
    render(obj);
  }
}

new Search({
  selector: '.search__input',
});
