import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from '../helpers/localStorage';

const addToLibrary = respons => {
  const toggleLibrary = (selector, bool) => {
    const btn = document.querySelector('.' + selector + '-js');
    const text = btn.querySelector('span');

    if (bool) {
      text.textContent = ' Remove from ' + selector;
    } else {
      text.textContent = ' Add to ' + selector;
    }
  };

  const checkInLibrary = () => {
    const watched = getDataFromLocalStorage('watched');
    const queue = getDataFromLocalStorage('queue');
    const inWatched = watched.some(item => item.id === respons.id);
    const inQueue = queue.some(item => item.id === respons.id);

    toggleLibrary('watched', inWatched);
    toggleLibrary('queue', inQueue);
  };

  const watchedEl = document.querySelector('.watched-js');
  const queueEl = document.querySelector('.queue-js');

  const handleClick = e => {
    const btn = e.currentTarget;
    const context = btn.dataset.key;

    const prevData = getDataFromLocalStorage(context);
    const inLocalStorage = prevData.some(item => item.id === respons.id);
    toggleLibrary(context, !inLocalStorage);

    if (inLocalStorage) {
      const nextData = prevData.filter(item => item.id !== respons.id);
      setDataToLocalStorage(context, nextData);
      return;
    }

    const nextData = [...prevData, respons];
    setDataToLocalStorage(context, nextData);
  };

  checkInLibrary();
  watchedEl.addEventListener('click', handleClick);
  queueEl.addEventListener('click', handleClick);
};

export default addToLibrary;
