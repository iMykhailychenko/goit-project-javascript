const templateOfMainPage = require('../../templates/film-card.pug');

function render(content) {
    const items = templateOfMainPage(content);
    const filmsList = document.querySelector('.film-list');
    filmsList.insertAdjacentHTML('beforeend', items);
}

export {render}