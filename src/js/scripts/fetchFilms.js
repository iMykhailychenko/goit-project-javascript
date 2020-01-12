export default {
  getFilmsList(way, param) {
    const url = `https://api.themoviedb.org/3/${way}/movie?api_key=171aaca622cd75e6df5a814c1d33ccb1&sort_by=popularity.desc&language=en-US`;
    return fetch(url + param())
      .then(response => response.json())
      .catch(error => {
        console.warn('Fetch Error:' + error);
      });
  },
};
