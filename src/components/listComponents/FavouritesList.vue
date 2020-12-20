<template>
  <b-container fluid="" >
    <b-row>
      <b-col
        cols="12"
        v-for="(movie, mkey) in list"
        :key="mkey"
      >
        <FavoriteItem
          :movie="movie"
          @mouseover.native="changePoster(movie.Poster)"
        ></FavoriteItem>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

// store
import { mapActions } from 'vuex';
// components
import FavoriteItem from './FavoriteItem.vue';

export default {
  name: 'FavouritesList',
  components: {
    FavoriteItem,
  },
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    ...mapActions('movies', ['changePoster']),
  },
};
</script>

<style scoped>

</style>
