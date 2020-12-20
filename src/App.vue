<template>
  <div id="app" class="srroll-modify">
    <Notification />
    <Loader />
    <PosterBG />
    <Header v-on:pageChanged="onPageChanged" />
    <MoviesList
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
import MoviesList from '@/components/listComponents/MoviesList.vue';
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
  mounted() {
    document.body.classList.add('srroll-modify');
  },
  data: () => ({
    poster: '',
  }),
  methods: {
    ...mapActions('movies', ['changeCurrentPage']),

    onPageChanged(page) {
      this.$router.push(`?page=${page}`);
    },
  },
  computed: {
    ...mapGetters('movies', [
      'moviesCurrentPage',
      'moviesPerPage',
      'moviesTotal',
    ]),
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

.srroll-modify::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.6);
  background-color: #cccccc;
}

.srroll-modify::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

.srroll-modify::-webkit-scrollbar-thumb {
  background-color: #fff;
  background-image: -webkit-linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 25%,
    transparent 100%,
    rgba(0, 0, 0, 1) 75%,
    transparent
  );
}
</style>
