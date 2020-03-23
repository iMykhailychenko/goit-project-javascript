import Unhide from '../helpers/unhideLauncher';
import { defaultValue } from './defaultValue';
import addToLibrary from './addToLibrary';
import { copyName } from '../helpers/copyName';
import { filmFetchById } from '../fetch/fetchFilms';
import posterPathImg from '../../../img/posterPathImg.png';
import { getDataFromLocalStorage } from '../helpers/localStorage';

const filmPageTemplate = require('../../../templates/film-page.pug');
const KEY = '9d6e1ea09b630bd9f25250a95c28140d';

class FilmPage extends Unhide {
  constructor() {
    super();
    this.unhideLauncher('film');
    this.preloader();
    this.fetchData();
  }

  preloader() {
    const filmsList = document.querySelector('.details');
    const items = filmPageTemplate(defaultValue);
    filmsList.insertAdjacentHTML('beforeend', items);
  }

  fetchData() {
    const { search } = window.location;
    const id = search.slice(4);

    window.addEventListener('load', () => {
      filmFetchById(KEY, id).then(data => {
        const {
          id,
          poster_path,
          backdrop_path,
          title,
          vote_average,
          vote_count,
          popularity,
          original_title,
          overview,
          genres,
        } = data;

        const genresName = genres.map(item => item.name);

        const respons = {
          id,
          posterPathBool: !!poster_path,
          posterPath: 'http://image.tmdb.org/t/p/w400' + poster_path,
          backdropPathBool: !!backdrop_path,
          backdropPath: 'http://image.tmdb.org/t/p/w400' + backdrop_path,
          title,
          popularity,
          voteAverage: vote_average,
          voteCount: vote_count,
          originalTitle: original_title,
          overview,
          genres: genresName.join(' '),
        };

        this.renderFilmPage(respons);
        addToLibrary(respons);
      });
    });
  }

  renderFilmPage(respons) {
    const {
      posterPathBool,
      posterPath,
      title,
      voteAverage,
      voteCount,
      popularity,
      originalTitle,
      overview,
      genres,
    } = respons;

    const refs = {
      poster: document.querySelector('.details__img'),
      title: document.querySelector('.popup__name'),
      titleToCopy: document.querySelector('.popup__hidde'),
      vote: document.querySelector('.vote-js'),
      popularity: document.querySelector('.popularity-js'),
      originalTitle: document.querySelector('.original-title-js'),
      overview: document.querySelector('.details__text'),
      genre: document.querySelector('.genre-js'),
    };

    refs.poster.src = posterPathBool ? posterPath : posterPathImg;
    refs.title.textContent = title;
    refs.titleToCopy.textContent = title + ' скачать без смс и регистрации';
    refs.vote.textContent = voteAverage + ' / ' + voteCount;
    refs.popularity.textContent = popularity;
    refs.originalTitle.textContent = originalTitle;
    refs.overview.textContent = overview;
    refs.genre.textContent = genres;
  }
}

const FilmLauncher = () => {
  new FilmPage();
  copyName();
};

export default FilmLauncher;
