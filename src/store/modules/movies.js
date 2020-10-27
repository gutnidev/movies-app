import axios from '@/plugins/axios';
import IDs from '@/store/mock/imdb_top250';
import mutations from '@/store/mutations';
import { setFavouriteToLocal, removeFromFavouritesLocal, getFavouritesFromLocal } from '@/plugins/localStorePlugin';
import defaultPoster from '@/assets/defaultMovieImage.png';

async function fetchByIDs(arrayOfIDs) {
  const responses = arrayOfIDs.map((id) => axios.get('', {
    params: {
      i: id,
    },
  }));
  return Promise.allSettled(responses);
}
function serializeResponce(movies) {
  return movies.reduce((acc, item) => {
    if (item.status !== 'fulfilled' || item.value.Error) {
      console.log(new Error(item.reason || item.value.Error));
      return acc;
    }
    const movie = item.value;
    movie.isFavourite = false;
    if (movie.Poster === 'N/A' || !movie.Poster) {
      movie.Poster = defaultPoster;
    }
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}
function getIDsFromSearch(movies) {
  return movies.reduce((acc, item) => {
    acc.push(item.imdbID);
    return acc;
  }, []);
}
function markFavouriteMovies(arrayOfIDs, objOfMovies) {
  const res = objOfMovies;
  arrayOfIDs.forEach((id) => {
    if (res[id]) res[id].isFavourite = true;
  });
  return res;
}

const {
  SET_ALL_MOVIES,
  SET_CURRENT_PAGE,
  REMOVE_MOVIE,
  SET_SEARCH_VALUE,
  SET_FAVOURITE_MOVIE,
  REMOVE_FAVOURITE_MOVIE,
  SET_APP_START,
} = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    allMovies: {},
    search: [],
    favouriteMovies: [],
    isSearch: false,
    isAppStart: true,
  },
  mutations: {
    [SET_ALL_MOVIES](state, value) {
      const markedMovies = markFavouriteMovies(state.favouriteMovies, value);
      state.allMovies = { ...state.allMovies, ...markedMovies };
      if (state.isSearch) state.search = Object.keys(markedMovies) || [];
    },
    [SET_CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
    [REMOVE_MOVIE](state, index) {
      state.top250IDs.splice(index, 1);
    },
    [SET_SEARCH_VALUE](state, bul) {
      state.isSearch = bul;
    },
    // eslint-disable-next-line consistent-return
    [SET_FAVOURITE_MOVIE](state, id) {
      if (Array.isArray(id)) {
        state.favouriteMovies = id;
        return true;
      }
      state.favouriteMovies.push(id);
      state.allMovies[id].isFavourite = true;
    },
    [REMOVE_FAVOURITE_MOVIE](state, id) {
      state.favouriteMovies = state.favouriteMovies.filter((favID) => favID !== id);
      state.allMovies[id].isFavourite = false;
    },
    [SET_APP_START](state, bool) {
      state.isAppStart = bool;
    },
  },
  getters: {
    moviesList({ search, isSearch, allMovies }, { moviesToFetch }) {
      const arrOfIDs = isSearch ? search : moviesToFetch;
      return arrOfIDs.reduce((acc, id) => {
        const item = allMovies[id];
        if (item) acc[id] = item;
        return acc;
      }, {});
    },
    getFavouriteMovies({ favouriteMovies, allMovies }) {
      return favouriteMovies.reduce((acc, id) => {
        const item = allMovies[id];
        if (item) acc[id] = item;
        return acc;
      }, {});
    },
    moviesCurrentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    moviesTotal: ({ top250IDs, search, isSearch }) => (isSearch ? search.length : top250IDs.length),
    isSearch: ({ isSearch }) => isSearch,
    moviesToFetch({ currentPage, moviesPerPage, top250IDs }) {
      const from = (currentPage * moviesPerPage) - moviesPerPage;
      const to = currentPage * moviesPerPage;
      return top250IDs.slice(from, to);
    },
    getCachedMovies({ allMovies }, { moviesToFetch }) {
      const toReturn = {
        cached: {},
        toFetch: [],
      };
      moviesToFetch.forEach((id) => {
        if (allMovies[id]) {
          toReturn.cached[id] = allMovies[id];
        } else {
          toReturn.toFetch.push(id);
        }
      });
      return toReturn;
    },
  },
  actions: {
    setSearchState({ commit }, bul) {
      commit(SET_SEARCH_VALUE, bul);
    },
    // eslint-disable-next-line consistent-return
    async fetchMovies({ getters, commit, dispatch, state }) {
      const { getCachedMovies } = getters;
      try {
        dispatch('setLoaderValue', true, { root: true });

        // check for movies in cache
        const cachedAndNot = getCachedMovies;
        // check if we are on the start of app. Fetch for favourites
        if (state.isAppStart) {
          commit(SET_FAVOURITE_MOVIE, getFavouritesFromLocal());
          cachedAndNot.toFetch = [...cachedAndNot.toFetch, ...state.favouriteMovies];
          commit(SET_APP_START, false);
        }
        // set movies from cache and break function if there is nothing to fetch
        if (!cachedAndNot.toFetch.length) {
          commit(SET_ALL_MOVIES, cachedAndNot.cached);
          return true;
        }

        // fetch for not cached movies
        const response = await fetchByIDs(cachedAndNot.toFetch);
        const result = serializeResponce(response);

        // put fetched movies to cache, assign cached movies and fetched
        const toSet = { ...result, ...cachedAndNot.cached };

        // set movies to render
        commit(SET_ALL_MOVIES, toSet);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch('setLoaderValue', false, { root: true });
        commit(SET_SEARCH_VALUE, false);
      }
    },
    async searchMovies({ commit, dispatch }, query) {
      try {
        dispatch('setLoaderValue', true, { root: true });
        const response = await axios.get('', {
          params: {
            s: query,
          },
        });
        if (response.Error) throw Error(response.Error);
        const result = getIDsFromSearch(response.Search);
        const fullInfoMoviesResponse = await fetchByIDs(result);
        const fullResult = serializeResponce(fullInfoMoviesResponse);
        dispatch('setSearchState', true);
        commit(SET_ALL_MOVIES, fullResult);
      } catch (e) {
        console.log(e.message);
        dispatch('showNotify', { msg: e.message, title: 'Error', variant: 'danger' }, { root: true });
      } finally {
        dispatch('setLoaderValue', false, { root: true });
      }
    },
    changeCurrentPage({ commit, dispatch, state }, page) {
      commit(SET_CURRENT_PAGE, page);
      if (!state.isSearch) dispatch('fetchMovies');
    },
    removeMovie({ commit, dispatch, state }, id) {
      const index = state.top250IDs.findIndex((item) => item === id);
      if (index !== -1) {
        commit(REMOVE_MOVIE, index);
        dispatch('showNotify', {
          variant: 'success',
          title: 'Success',
          msg: 'You successfully deleted the item',
        }, { root: true });
        dispatch('fetchMovies');
      }
    },

    // favourites
    setFavouriteMovie({ commit }, id) {
      commit(SET_FAVOURITE_MOVIE, id);
      setFavouriteToLocal(id);
    },
    removeFavouriteMovie({ commit }, id) {
      commit(REMOVE_FAVOURITE_MOVIE, id);
      removeFromFavouritesLocal(id);
    },
  },
};

export default moviesStore;
