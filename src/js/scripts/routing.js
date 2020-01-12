import mainPageLauncher from './getCorrectData';
import filmPageLauncher from './renderFilmPage';
import libraryLauncher from './renderLibrary';

class Routing {
  constructor(routes) {
    this.currentPageName = window.location.hash.replace('#', '') || 'main-page';
    this.routes = routes;

    this.initActiveRoute();
  }

  getActiveRoute() {
    return this.routes.find(route => route.name === this.currentPageName);
  }

  goToPage(name) {
    const activeRoute = his.routes.find(route => route.name === name);
    if (activeRoute) activeRoute.script();
  }

  initActiveRoute() {
    this.getActiveRoute().script();
  }
}

const routes = [
  {
    name: 'main-page',
    script: mainPageLauncher,
  },
  {
    name: 'inner-page',
    script: filmPageLauncher,
  },
  {
    name: 'library',
    script: libraryLauncher,
  },
];

const routing = new Routing(routes);
