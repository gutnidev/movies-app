<template>
  <div
    class="poster-page-bg"
    :style="posterStyle"
  ></div>
</template>

<script>

// store
import { mapGetters } from 'vuex';

export default {
  name: 'PosterBG',
  data: () => ({
    defaultPosterBG: 'linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%)',
  }),
  computed: {
    ...mapGetters('movies', ['getPoster']),
    posterStyle() {
      return {
        'background-image': this.posterBG,
      };
    },
    posterBG() {
      return this.getPoster ? `url(${this.getPoster})` : this.defaultPosterBG;
    },
  },
};
</script>

<style scoped>
.poster-page-bg {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: -1;
  background-size: cover;
  background-position: center;
  transition: all 0.3s ease;
}

.poster-page-bg::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0.6;
  background-image: linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%);
}
</style>
