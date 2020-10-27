<template>
  <BContainer fluid="" >
    <PosterBG :poster="poster"/>
    <BRow>
      <BCol
        cols="12"
        v-for="(movie, mkey) in list"
        :key="mkey"
      >
        <FavoriteItem
          :movie="movie"
          @mouseover.native="onChangePoster(movie.Poster)"
        ></FavoriteItem>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script>
import FavoriteItem from '@/components/FavoriteItem.vue';
import PosterBG from '@/components/PosterBG.vue';

export default {
  name: 'FavouritesList',
  components: {
    FavoriteItem,
    PosterBG,
  },
  data: () => ({
    poster: '',
  }),
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onChangePoster(poster) {
      // todo Сделать computed, чтобы не перерисовывало каждый раз, вдруг одни и та же картинка удет
      this.poster = poster;
    },
  },
};
</script>

<style scoped>

</style>
