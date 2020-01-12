import fetch from './fetchFilms';
import { render } from './renderMainPage';

const way = 'discover';

fetch.getFilmsList(way, fetchParams).then(data => {
  const correctData = data.results.map(item => {
    return {
      id: item.id,
      backdrop_path: item.backdrop_path,
      title: item.title,
      release_date: ` (${item.release_date.slice(0, 4)})`,
      vote_average: item.vote_average,
    };
  });
  const obj = { popularFilm: correctData };
  render(obj);
});

function fetchParams() {
  return `&page=1`;
}

function renderFilmPerPages(page) {
  function pagination() {
    return `&page=${page}`;
  }

  fetch.getFilmsList(way, pagination).then(data => {
    const filmList = document.querySelectorAll('.film-list__item');
    filmList.forEach((element, index) => {
      const item = data.results[index];
      element.dataset.id = item.id;
      element.querySelector(
        '.film-img',
      ).src = `https://image.tmdb.org/t/p/w400/${item.backdrop_path}`;
      element.querySelector('.film-name').textContent = `${
        item.title
      }  (${item.release_date.slice(0, 4)})`;
    });
  });
}

export { renderFilmPerPages };
