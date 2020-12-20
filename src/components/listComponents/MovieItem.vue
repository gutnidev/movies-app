<template>
  <div class="movie-item mb-3">
    <b-icon
      :icon="favouriteIcon"
      class="favourites-icon"
      font-scale="1.5"
      @click="onFavourites"
    />
    <div
      class="movie-item-poster"
      :style="posterBG"
    >
    </div>
    <div class="movie-info-wrap">
      <div class="movie-item-info">
        <h3 class="movie-title">{{ movie.Title }}</h3>
        <span class="movie-year">{{ movie.Year }}</span>
      </div>
      <div class="movie-item-controls row no-gutters">
        <div class="col-12 col-sm-6 pl-0 pr-sm-2 pb-1 pb-sm-1">
          <BButton
            size="md"
            block
            variant="outline-light"
            @click="showInfoModalEvent"
          >
            Info
          </BButton>
        </div>
        <div class="col-12 col-sm-6 pl-0 pl-sm-2 pt-1 pt-sm-0">
          <BButton
            size="md"
            block
            variant="outline-light"
            @click="removeItem"
          >
            Remove
          </BButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// store
import { mapActions } from 'vuex';

export default {
  name: 'MovieItem',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    // eslint-disable-next-line global-require
    defaultBackImage: require('@/assets/defaultMovieImage.png'),
  }),
  methods: {
    // movies actions
    ...mapActions('movies', ['setFavouriteMovie', 'removeFavouriteMovie']),
    // list
    removeItem() {
      this.$emit('removeItem', {
        id: this.movie.imdbID,
        title: this.movie.Title,
      });
    },
    onFavourites() {
      const id = this.movie.imdbID;
      // eslint-disable-next-line no-unused-expressions
      this.movie.isFavourite ? this.removeFavouriteMovie(id) : this.setFavouriteMovie(id);
    },
    // modal
    showInfoModalEvent() {
      this.$emit('showInfo', this.movie.imdbID);
    },
  },
  computed: {
    posterBG() {
      return {
        'background-image': `url(${this.movie.Poster})`,
      };
    },
    favouriteIcon() {
      return this.movie.isFavourite ? 'star-fill' : 'star';
    },
  },
  watch: {
    'movie.IsFavourite': (value) => console.log(value),
  },
};
</script>

<style lang="scss" scoped>
.movie-item {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  transition: all .3s ease;
  height: 400px;
  &:hover {
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.7);
    transform: scale(1.02);
  }
  &:hover .movie-info-wrap{
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.7);
  }
}
.movie-item-poster {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
}
.movie-info-wrap {
  padding: 20px 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  transition: 0.3s;
}
.movie-title {
  font-size: 20px;
  color: #fff;
}
.movie-year {
  font-size: 14px;
  color: #fff;
}
.favourites-icon {
  color: #a57d07;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  z-index: 2;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover{
    color: #ecc553;
  }
}
</style>
