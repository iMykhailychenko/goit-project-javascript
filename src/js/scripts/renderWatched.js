import fetch from './fetchPopularFilms';
import { getDataFromLocalStorage, setDataToLocalStorage } from './localStorage';

class RenderLibrary {
  constructor({ openBtn, addBtn }) {
    this.openBtn = openBtn;
    this.addBtn = addBtn;
  }
  addFilm(key) {
    this.addBtn.addEventListener('click', () => {
      const data = fetch.getFilmsList();
      setDataToLocalStorage(key, data);
    });
  }
  getFilm() {
    this.openBtn.addEventListener('click', () => {
      setDataToLocalStorage(data);
    });
  }
}
