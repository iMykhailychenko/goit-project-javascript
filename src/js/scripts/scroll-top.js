const btnToScroll = document.querySelector('.goods');
const setion = document.querySelector('.up-button-js');

btnToScroll.addEventListener('click', () => {
  setion.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
