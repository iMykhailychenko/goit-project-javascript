import Unhide from '../helpers/unhideLauncher';
import Search from './searchFilm';
import { moviesFetch } from '../fetch/fetchFilms';
import { defaultValue } from './defaultValue';
import paggination from './paggination';
import defaultImg from '../../../img/film.jpg';

const queryString = require('query-string');
const mainPageTemplate = require('../../../templates/film-card.pug');
const KEY = '9d6e1ea09b630bd9f25250a95c28140d';

class MainPage extends Unhide {
  constructor() {
    super();

    this.renderMainPage = this.renderMainPage.bind(this);

    this.unhideLauncher('main');
    this.preloader();
    this.fetchData();
  }

  preloader() {
    const filmsList = document.querySelector('.launcher__main .film__list');
    const items = mainPageTemplate(defaultValue);
    filmsList.insertAdjacentHTML('beforeend', items);
  }

  fetchData() {
    const search = queryString.parse(window.location.search);
    const page = search.page ? `page=${search.page}` : 'page=1';

    window.addEventListener('load', () => {
      moviesFetch(KEY, page).then(data => {
        const { results } = data;
        const respons = results.map(
          ({ backdrop_path, title, release_date, vote_average, id }) => ({
            backdroPathBool: !!backdrop_path,
            backdropPath: 'http://image.tmdb.org/t/p/w400' + backdrop_path,
            title,
            id,
            releaseDate: ` (${release_date.slice(0, 4)})`,
            voteAverage: vote_average,
          }),
        );

        this.renderMainPage(respons);
        paggination(data.total_pages);
      });
    });
  }

  renderMainPage(films) {
    const images = document.querySelectorAll('.film__img');
    images.forEach(
      (img, index) =>
        (img.src = films[index].backdroPathBool
          ? films[index].backdropPath
          : defaultImg),
    );

    const names = document.querySelectorAll('.film__name');
    names.forEach(
      (name, index) =>
        (name.textContent = films[index].title + films[index].releaseDate),
    );

    const links = document.querySelectorAll('.film__link');
    links.forEach(
      (link, index) => (link.href = `?id=${films[index].id}#film-page`),
    );
  }
}

const MainLauncher = () => {
  new MainPage();
  new Search({
    selector: '.search__input',
  });
};

export default MainLauncher;
