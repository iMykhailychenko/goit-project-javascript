import fetch from './fetchID';
import { getDataFromLocalStorage, setDataToLocalStorage } from './localStorage';
import { render } from './renderMainPage';

class RenderLibrary {
  constructor({ openBtn }) {
    this.openBtn = openBtn;
    this.openWatched();
    this.openQueue();
  }

  openWatched() {
    this.openBtn.addEventListener('click', () => {
      const filmList = document.querySelector('.film-list');
      filmList.innerHTML = '';
      const data = getDataFromLocalStorage('watched');
      this.openBtn.addEventListener('click', () => {
        this.render(data);
      });
    });
  }

  openQueue() {
    this.openBtn.addEventListener('click', () => {
      const filmList = document.querySelector('.film-list');
      filmList.innerHTML = '';
      const data = getDataFromLocalStorage('queue');
      this.openBtn.addEventListener('click', () => {
        this.render(data);
      });
    });
  }

  render(data) {
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
}

class AddToLibrary {
  constructor({ addBtn }) {
    this.addBtn = addBtn;
    this.addFilm();
  }

  addFilm() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const key = this.addBtn.dataset.key;

    this.addBtn.addEventListener('click', () => {
      const localData = getDataFromLocalStorage(key);

      fetch.getFilmsList(id).then(data => {
        if (localData === undefined) {
          setDataToLocalStorage(key, [data]);
          return;
        }

        const duplicate = localData.some(item => item.id === data.id);
        if (duplicate) {
          alert('Upss. Такой фильм уже добавлен в ' + key);
          return;
        }
        const newData = [data, ...localData];
        setDataToLocalStorage(key, newData);
      });
    });
  }
}

export { RenderLibrary };
export { AddToLibrary };
