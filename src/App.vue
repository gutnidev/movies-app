<template>
  <div id="app" class="srroll-modify">
    <Notification />
    <Loader />
    <PosterBG :poster="poster"/>
    <Header
      v-on:pageChanged="onPageChanged"
    />
    <MoviesList
      :list="moviesList"
      v-on:changePoster="onChangePoster"
      :list-type="'IMDB Top 250'"
    />
    <Pagination
      :current-page="moviesCurrentPage"
      :per-page="moviesPerPage"
      :total="moviesTotal"
      v-on:pageChanged="onPageChanged"
    />
  </div>
</template>

<script>

// store
import { mapGetters, mapActions } from 'vuex';

// components
import MoviesList from '@/components/MoviesList.vue';
import PosterBG from '@/components/PosterBG.vue';
import Pagination from '@/components/Pagination.vue';
import Loader from '@/components/Loader.vue';
import Header from '@/components/Header.vue';
import Notification from '@/components/Notification.vue';

export default {
  name: 'App',
  components: {
    MoviesList,
    PosterBG,
    Pagination,
    Loader,
    Header,
    Notification,
  },
  created() {
  },
  mounted() {
    document.body.classList.add('srroll-modify');
  },
  data: () => ({
    poster: '',
  }),
  methods: {
    ...mapActions('movies', ['changeCurrentPage']),
    onChangePoster(poster) {
      this.poster = poster;
    },
    onPageChanged(page) {
      this.$router.push(`?page=${page}`);
    },
  },
  computed: {
    ...mapGetters('movies', ['moviesList', 'moviesCurrentPage', 'moviesPerPage', 'moviesTotal', 'getFavouriteMovies']),
  },
  watch: {
    '$route.query': {
      handler({ page = 1 }) {
        this.changeCurrentPage(Number.parseInt(page, 10));
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss">
html {
  position: relative;
}
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.srroll-modify::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.6);
  background-color: #CCCCCC;
}

.srroll-modify::-webkit-scrollbar
{
  width: 10px;
  background-color: #F5F5F5;
}

.srroll-modify::-webkit-scrollbar-thumb
{
  background-color: #FFF;
  background-image: -webkit-linear-gradient(90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 25%,
    transparent 100%,
    rgba(0, 0, 0, 1) 75%,
    transparent)
}

</style>
