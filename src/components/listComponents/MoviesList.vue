<template>
  <div>
    <b-container class="custom-padding">
      <h3 class="list-title">{{ listTitle }}</h3>
      <b-row class="">
        <template v-if="isExist">
          <b-col
            cols="12"
            sm="6"
            md="4"
            lg="4"
            xl="3"
            v-for="(movie, mkey) in moviesList"
            :key="mkey"
          >
            <MovieItem
              :movie="movie"
              @mouseover.native="changePoster(movie.Poster)"
              v-on:removeItem="onRemoveItem"
              v-on:showInfo="onShowMovieInfo"
            ></MovieItem>
          </b-col>
        </template>
        <template v-else>
          <div>Empty</div>
        </template>
      </b-row>
      <b-modal
        :id="movieInfoModalId"
        body-class="movie-modal-body"
        content-class="movie-modal-content"
        size="xl"
        hide-footer
        hide-header
      >
        <MovieInfoModalContent
          @closeModal="onCloseModal"
          :movie="selectedMovie || {}"
        />
      </b-modal>
    </b-container>
  </div>
</template>

<script>

// store
import { mapActions, mapGetters } from 'vuex';
// components
import MovieInfoModalContent from '@/components/MovieInfoModalContent.vue';
import MovieItem from './MovieItem.vue';

export default {
  name: 'MoviesList',
  components: {
    MovieItem,
    MovieInfoModalContent,
  },
  props: {
    listType: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    movieInfoModalId: 'movie-info',
    selectedMovieId: '',
  }),
  methods: {
    // movies actions
    ...mapActions('movies', ['removeMovie', 'changePoster']),
    // poster
    onMouseOver(poster) {
      this.$emit('changePoster', poster);
    },
    // list
    async onRemoveItem({ id, title } = {}) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(`Delete ${title}?`);
      if (isConfirmed) this.removeMovie(id);
    },
    // modal
    onShowMovieInfo(id) {
      this.selectedMovieId = id;
      console.log(id);
      this.$bvModal.show(this.movieInfoModalId);
    },
    onCloseModal() {
      this.$bvModal.hide(this.movieInfoModalId);
      this.selectedMovieId = null;
    },
  },
  computed: {
    // movies getters
    ...mapGetters('movies', ['isSearch', 'getFavouriteMovies', 'moviesList']),
    // list
    listTitle() {
      if (this.listType === 'Favourites') return 'Favourites';
      return this.isSearch ? 'Search result' : 'IMDB Top 250';
    },
    isExist() {
      return Boolean(Object.keys(this.moviesList).length);
    },
    selectedMovie() {
      return this.selectedMovieId ? this.moviesList[this.selectedMovieId] : null;
    },
  },
};
</script>

<style scoped>
.list-title{
  font-size: 50px;
  margin-bottom: 30px;
  color: #ffffff;
}

</style>
<style>
.movie-modal-body {
  padding: 0 !important;
}
.movie-modal-content {
  background-color: transparent !important;
}

@media all and (min-width: 500px ) and (max-width: 576px) {
  .custom-padding{
    padding: 0 6rem !important;
  }
}
@media all and (min-width: 360px ) and (max-width: 500px) {
  .custom-padding{
    padding: 0 3rem !important;
  }
}
@media all and (max-width: 412px ) {
  .list-title{
    font-size: 2.5rem !important;
  }
}
@media all and (max-width: 360px ) {
  .custom-padding{
    padding: 0 1.5rem !important;
  }
}
</style>
