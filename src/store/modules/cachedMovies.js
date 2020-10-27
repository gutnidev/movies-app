const cachedMovies = {
  movies: {},
  hasMovies: () => Object.keys(this.movies).length,
  getCachedMovies(arrayOfIds) {
    const toReturn = {
      cached: {},
      toFetch: [],
    };
    arrayOfIds.forEach((id) => {
      if (this.movies[id]) {
        toReturn.cached[id] = this.movies[id];
      } else {
        toReturn.toFetch.push(id);
      }
    });
    return toReturn;
  },
  putToCache(moviesToPut) {
    this.movies = ({ ...this.movies, ...moviesToPut });
  },
};

export default cachedMovies;
