<template>
  <div class="movies-pagination">
    <b-pagination
      v-model="currentPageModel"
      :per-page="perPage"
      :total-rows="total"
      align="center"
      first-number
      last-number
      prev-text="prev"
      next-text="next"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    perPage: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    currentPageModel: {
      get() {
        return this.currentPage;
      },
      set(value) {
        this.$emit('pageChanged', value);
      },
    },
  },
};
</script>

<style scoped>
.movies-pagination {
  margin-top: auto;
}

.movies-pagination >>> .pagination .page-item .page-link {
  background-color: transparent;
  font-size: 12px;
  color: #fff;
  box-shadow: none;
}

.movies-pagination >>> .pagination .page-item.active .page-link {
  border-color: #ffffff;
  background-color: #ffffff;
  color: black;
}

.movies-pagination >>> .pagination .page-item.disabled .page-link {
  color: darkgray;
}
</style>
