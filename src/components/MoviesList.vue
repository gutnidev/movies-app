<template>
  <div>
    <BContainer>
      <h3 class="list-title">{{ listTitle }}</h3>
      <BRow>
        <template v-if="isExist">
          <BCol
            cols="6"
            lg="4"
            xl="3"
            v-for="(movie, mkey) in list"
            :key="mkey"
          >
            <MovieItem
              :movie="movie"
              @mouseover.native="onMouseOver(movie.Poster)"
              v-on:removeItem="onRemoveItem"
              v-on:showInfo="onShowMovieInfo"
            ></MovieItem>
          </BCol>
        </template>
        <template v-else>
          <div>Empty</div>
        </template>
      </BRow>
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
    </BContainer>
  </div>
</template>

<script>

// components
import MovieItem from '@/components/MovieItem.vue';
import MovieInfoModalContent from '@/components/MovieInfoModalContent.vue';

// store
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MoviesList',
  components: {
    MovieItem,
    MovieInfoModalContent,
  },
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
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
    ...mapActions('movies', ['removeMovie']),
    // eslint-disable-next-line consistent-return
    onMouseOver(poster) {
      this.$emit('changePoster', poster);
    },
    async onRemoveItem({ id, title } = {}) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(`Delete ${title}?`);
      if (isConfirmed) this.removeMovie(id);
    },
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
    ...mapGetters('movies', ['isSearch', 'getFavouriteMovies']),
    listTitle() {
      if (this.listType === 'Favourites') return 'Favourites';
      return this.isSearch ? 'Search result' : 'IMDB Top 250';
    },
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
    selectedMovie() {
      return this.selectedMovieId ? this.list[this.selectedMovieId] : null;
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
</style>
