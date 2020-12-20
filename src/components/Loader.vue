<template>
  <div
    v-if="isShowLoader"
    class="loader-wrap"
  >
    <b-spinner
      class="loader"
      type="grow"
      variant="light"
      label="loading..."
    />
  </div>
</template>

<script>
// components
import { mapGetters } from 'vuex';

export default {
  name: 'Loader',
  computed: {
    ...mapGetters(['isShowLoader']),
  },
};
</script>

<style scoped>
.loader-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
</style>
