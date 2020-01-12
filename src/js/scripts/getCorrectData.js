import fetch from './fetchFilms';
import { render } from './renderMainPage';
import { changePageNumber } from './getPageNumber';

export default function() {
  const way = 'discover';

  fetch.getFilmsList(way, fetchParams).then(data => {
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
  });

  function fetchParams() {
    return `&page=1`;
  }

  const prevBtn = document.querySelector('.btn-prev');
  const nextBtn = document.querySelector('.btn-next');

  nextBtn.addEventListener(
    'click',
    changePageNumber.increment.bind(
      changePageNumber,
      filmPageLauncher.bind(changePageNumber),
    ),
  );

  prevBtn.addEventListener(
    'click',
    changePageNumber.decrement.bind(
      changePageNumber,
      filmPageLauncher.bind(changePageNumber),
    ),
  );

  function filmPageLauncher(page) {
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
}
