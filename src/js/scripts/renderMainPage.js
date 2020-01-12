const templateOfMainPage = require('../../templates/film-card.pug');

function render(content) {
  const filmsList = document.querySelector('.film-list');
  const items = templateOfMainPage(content);
  filmsList.insertAdjacentHTML('beforeend', items);
}

export { render };
