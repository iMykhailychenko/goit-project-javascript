import { RenderLibrary } from './renderWatched';
import { getDataFromLocalStorage, setDataToLocalStorage } from './localStorage';
import { render } from './renderMainPage';

export default function() {
  const filmList = document.querySelector('.film-list');
  filmList.innerHTML = '';

  const info = getDataFromLocalStorage('watched');
  renderFirstPage(info);

  function renderFirstPage(data) {
    if (data === undefined) return;
    const correctData = data.map(item => {
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

  const search = document.querySelector('.search__wrp');
  const paggination = document.querySelector('.paggination');
  const searchButtons = document.querySelector('.buttons');
  search.style.display = 'none';
  searchButtons.style.display = 'flex';
  paggination.style.display = 'none';

  new RenderLibrary({
    openBtn: document.querySelector('.open-watched-js'),
  });

  new RenderLibrary({
    openBtn: document.querySelector('.open-queue-js'),
  });
}
