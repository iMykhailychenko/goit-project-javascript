import { searchFetch } from '../fetch/fetchFilms';
const debounce = require('lodash.debounce');

const KEY = '9d6e1ea09b630bd9f25250a95c28140d';

export default class Search {
  constructor() {
    this.onInput();
    this.onSubmit();
  }

  onInput() {
    const input = document.querySelector('.search__input');
    const handler = this.handleInput.bind(this);

    input.addEventListener('input', debounce(handler, 300));
  }

  handleInput(e) {
    const refs = {
      title: document.querySelector('.results__title'),
      list: document.querySelector('.results__list'),
      resultsEl: document.querySelector('.search__results'),
    };
    const value = e.target.value.replace(/\s+/g, ' ').trim();
    const query = value.split(' ').join('-');
    refs.resultsEl.classList.remove('hidden');

    if (e.target.value === '') {
      refs.list.innerHTML = '';
      refs.resultsEl.classList.add('hidden');
      return;
    }

    searchFetch(KEY, query).then(data => {
      const { results, total_results } = data;
      const markup = results
        .map(
          ({ id, title }) =>
            `<li class="results__item">
              <a href="?id=${id}#film-page" class="results__text"> ${title} </a>
            </li>`,
        )
        .join('');

      refs.title.textContent = `найдено ${total_results} фильмов`;
      refs.list.innerHTML = '';
      refs.list.insertAdjacentHTML('beforeend', markup);
    });
  }

  onSubmit() {
    const form = document.querySelector('.search__wrp');
    const handler = this.handleSubmit.bind(this);

    form.addEventListener('submit', handler);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { origin } = window.location;
    const { value } = e.target.elements.search;

    value === ''
      ? (location.href = origin)
      : (location.href = origin + `?page=1&query=${value}/#search`);
  }
}
