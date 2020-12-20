<template>
  <header class="header">
    <b-navbar type="dark" class="navbar" variant="dark">
      <b-container>
        <b-navbar-brand
          @click="onLogoClick"
          class="logo"
        >
          MovieDB
        </b-navbar-brand>
        <b-navbar-nav class="mr-auto">
          <b-nav-item
            href="#"
            @click="onCollapseClick"
          >
            Favourites
          </b-nav-item>
        </b-navbar-nav>
        <b-nav-form>
          <b-form-input
            class="mr-sm-2 searchInput"
            placeholder="Search"
            v-model.trim="searchValue"
            debounce="1000"
          >
          </b-form-input>
        </b-nav-form>
      </b-container>
    </b-navbar>
    <b-collapse
      id="collapse-3"
      :visible="isVisibleCollapse"
    >
      <FavouritesList
        :list="getFavouriteMovies"
        class="mt-1"
      />
    </b-collapse>
  </header>
</template>

<script>

// store
import { mapActions, mapGetters } from 'vuex';
// components
import FavouritesList from '@/components/listComponents/FavouritesList.vue';

export default {
  name: 'Header',
  components: {
    FavouritesList,
  },
  data: () => ({
    searchValue: '',
    isVisibleCollapse: false,
  }),
  methods: {
    // movies actions
    ...mapActions('movies', ['searchMovies', 'fetchMovies', 'setSearchState']),
    onLogoClick() {
      this.$emit('pageChanged', 1);
      this.searchValue = '';
    },
    // search
    onSearchValueChanged(value) {
      if (!value) {
        this.fetchMovies();
      } else {
        this.searchMovies(value);
      }
    },
    // header event handlers
    onCollapseClick() {
      if (Object.keys(this.getFavouriteMovies).length) {
        this.isVisibleCollapse = !this.isVisibleCollapse;
      }
    },
  },
  computed: {
    ...mapGetters('movies', ['getFavouriteMovies']),
  },
  watch: {
    searchValue: 'onSearchValueChanged',
    getFavouriteMovies(value) {
      if (!Object.keys(value).length) this.isVisibleCollapse = false;
    },
  },
};
</script>

<style scoped>

.logo {
  cursor: pointer;
}

.header{
  margin-bottom: 30px;
}

.navbar{
  background-color: rgba(0, 0, 0, 0.7) !important;
}

.searchInput{
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 0, 0, 0.6);
}

.searchInput:focus {
  box-shadow: none;background: rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.6);
  color: rgba(255, 255, 255, 0.7);
}

</style>
