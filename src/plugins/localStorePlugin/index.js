function setFavouriteToLocal(id) {
  let gutniFavourites = window.localStorage.getItem('gutniFavourites') || null;
  gutniFavourites = gutniFavourites ? JSON.parse(gutniFavourites) : [];
  gutniFavourites.push(id);
  window.localStorage.setItem('gutniFavourites', JSON.stringify(gutniFavourites));
}

function getFavouritesFromLocal() {
  const favourites = window.localStorage.getItem('gutniFavourites') || null;
  return favourites ? JSON.parse(favourites) : [];
}

function removeFromFavouritesLocal(id) {
  let gutniFavourites = window.localStorage.getItem('gutniFavourites') || null;
  gutniFavourites = gutniFavourites ? JSON.parse(gutniFavourites) : [];
  if (!gutniFavourites.length) return gutniFavourites;
  gutniFavourites = gutniFavourites.reduce((acc, movieID) => {
    if (movieID !== id) {
      acc.push(movieID);
    }
    return acc;
  }, []);
  window.localStorage.setItem('gutniFavourites', JSON.stringify(gutniFavourites));
  return gutniFavourites;
}
export { setFavouriteToLocal, getFavouritesFromLocal, removeFromFavouritesLocal };
