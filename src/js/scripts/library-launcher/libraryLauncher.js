import Unhide from '../helpers/unhideLauncher';
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from '../helpers/localStorage';
import { defaultValue } from './defaultValue';

const queryString = require('query-string');
const filmsListTemplate = require('../../../templates/film-card.pug');
const KEY = '9d6e1ea09b630bd9f25250a95c28140d';

class LibraryPage extends Unhide {
  constructor() {
    super();

    this.unhideLauncher('library');
    this.preloader();
    this.renderFilmList();
  }

  preloader() {
    const filmsList = document.querySelector('.launcher__library .film__list');
    const items = filmsListTemplate(defaultValue);
    filmsList.insertAdjacentHTML('beforeend', items);
  }

  renderFilmList() {
    const search = queryString.parse(window.location.search);
    const page = search.page ? search.page.slice(0, -1) : 'watched';
    const movies = getDataFromLocalStorage(page);

    const btns = document.querySelectorAll('.nav__btn');
    btns.forEach(btn => btn.classList.remove('active'));
    const active = document.querySelector('.nav__btn--' + page);
    active.classList.add('active');

    const filmsList = document.querySelector('.launcher__library .film__list');
    filmsList.innerHTML = '';
    const items = filmsListTemplate({ popularFilm: [...movies] });
    filmsList.insertAdjacentHTML('beforeend', items);
  }
}

const LibraryLauncher = () => {
  new LibraryPage();
};

export default LibraryLauncher;
