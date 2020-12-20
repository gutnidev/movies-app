<template>
  <b-container fluid="">
    <b-row class="favourite-item position-relative srroll-modify">
      <b-icon
        :icon="favouriteIcon"
        class="favourites-icon"
        font-scale="1.5"
        @click="onFavourites"
      />
      <b-col
        class="favourite-item-poster d-none d-sm-block"
        cols="2"
        lg="1"
        :style="posterBG"
      ></b-col>
      <b-col
        cols="10"
        lg="11"
      >
        <div class="d-flex flex-column h-100">
          <h5 class="favourite-item-title p-2">
            {{ movie.Title }}
          </h5>
          <p class="favourite-item-plot mt-auto ">
            {{ movie.Plot }}
          </p>
        </div>
      </b-col>
    </b-row>
  </b-container>
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
  methods: {
    // movies store actions
    ...mapActions('movies', ['setFavouriteMovie', 'removeFavouriteMovie']),
    // lists
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
.favourite-item {
  height: 200px;
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(148, 145, 145, 0.7);
  overflow-y: auto;
  margin-bottom: 0.3rem;
}

.favourite-item-poster {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.favourite-item-title{
  text-align: center;
  color: white;
}

.favourite-item-plot {
  font-size: 1.2rem;
  color: #a5a0a0;
}

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
