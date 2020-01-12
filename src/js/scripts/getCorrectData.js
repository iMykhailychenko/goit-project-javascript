import fetch from './fetchPopularFilms';
import { render } from './renderMainPage';
import { changePageNumber } from './getPageNumber';
const filmsList = document.querySelector('.film-list');
const nextBtn = document.querySelector('.btn-next');
const pageNumber = document.querySelector('.page-number');

const way = 'discover';

fetch.getFilmsList(way).then(data => {
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

function fetchParams(number) {
  const filmsList = document.querySelector('.film-list');
  filmsList.innerHTML = '';
  fetch.getFilmsList(way, `&page=${number}`).then(data => {
    console.log(data)
    // if (data.results.length < 20) {
    //   nextBtn.disabled = true;
    //   nextBtn.classList.add('disabled');
    // }
    if (pageNumber.textContent === (data.total_pages - 1)) {
      nextBtn.disabled = true;
      nextBtn.classList.add('disabled');
    }
    const correctData = data.results.map(item => {
      return {
        id: item.id,
        backdrop_path: item.backdrop_path,
        title: item.title,
        release_date: ` (${item.release_date.slice(0, 4)})`,
      };
    });
    const obj = { popularFilm: correctData };
    render(obj);
  });
}

export { fetchParams };
