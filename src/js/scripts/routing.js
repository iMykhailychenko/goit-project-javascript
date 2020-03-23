import MainLauncher from './main-launcher/mainLauncher';
import FilmLauncher from './film-launcher/filmLauncher';
import LibraryLauncher from './library-launcher/libraryLauncher';
import SearchLauncher from './search-launcher/searchLauncher';

class Routing {
  constructor(routes) {
    this.currentPageName = window.location.hash.replace('#', '') || 'main-page';
    this.routes = routes;

    this.initActiveRoute();
  }

  getActiveRoute() {
    return this.routes.find(route => route.name === this.currentPageName);
  }

  initActiveRoute() {
    this.getActiveRoute().script();
  }
}

const routes = [
  {
    name: 'main-page',
    script: MainLauncher,
  },
  {
    name: 'film-page',
    script: FilmLauncher,
  },
  {
    name: 'library',
    script: LibraryLauncher,
  },
  {
    name: 'search',
    script: SearchLauncher,
  },
];

const routing = new Routing(routes);
