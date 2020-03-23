import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

const btnToScroll = document.querySelector('.up-button-js');

btnToScroll.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
