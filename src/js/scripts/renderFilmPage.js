import { copyName } from './copyName';
import fetch from './fetchID';
const templateOfFilmPage = require('../../templates/film-page-templ.pug');
import { AddToLibrary } from './renderWatched';

export default function() {
  const search = document.querySelector('.search');
  const paggination = document.querySelector('.paggination');
  search.style.display = 'none';
  paggination.style.display = 'none';

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const filmPage = document.querySelector('.details');
  fetch.getFilmsList(id).then(data => {
    const correctData = { film: [data] };
    const genres = data.genres.map(item => item.name).join(' ');
    const items = templateOfFilmPage(correctData);
    filmPage.insertAdjacentHTML('beforeend', items);
    const genresElem = document.querySelector('.genres-js');
    genresElem.textContent = genres;

    new AddToLibrary({
      addBtn: document.querySelector('.watched-js'),
    });

    new AddToLibrary({
      addBtn: document.querySelector('.queue-js'),
    });

    copyName();
  });
}
