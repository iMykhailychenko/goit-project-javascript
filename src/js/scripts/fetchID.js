export default {
  getFilmsList(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=171aaca622cd75e6df5a814c1d33ccb1`;
    return fetch(url)
      .then(response => response.json())
      .catch(error => {
        console.warn('Fetch Error:' + error);
      });
  },
};
