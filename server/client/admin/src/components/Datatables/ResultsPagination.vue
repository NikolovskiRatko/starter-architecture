<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "ResultsPagination",
    props: {
      pagination: {
        type: Object,
        default: null,
      },
      length: {
        type: Number,
        default: 1,
      },
      page: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        selectedLength: this.$props.length,
        selectedPage: this.$props.page,
      };
    },
    computed: {
      pages() {
        const lastPage = Number(this.pagination.lastPage);
        const allPages = Array.from(Array(lastPage).keys());
        return allPages.filter((page) => {
          return (
            page > this.pagination.currentPage - 5 &&
            page < this.pagination.currentPage + 5
          );
        });
      },
    },
    watch: {
      page(newVal) {
        this.selectedPage = newVal;
      },
    },
  });
</script>

<template>
  <div v-if="pagination.lastPage !== 1" class="resulthead">
    <h4>
      {{ pagination.from }} - {{ pagination.to }} von
      {{ pagination.total }} Resultaten
    </h4>
    <a
      v-if="pagination.prevPageUrl"
      class="prev"
      title="vorige"
      @click="$emit('prev')"
    >
      vorige
    </a>
    <a
      v-for="pageNumber in pages"
      :key="pageNumber"
      :class="pageNumber === pagination.currentPage ? 'active' : ''"
      :title="pageNumber"
      style="cursor: pointer"
      @click="$emit('page', pageNumber)"
    >
      {{ pageNumber }}
    </a>
    <a
      v-if="pagination.nextPageUrl"
      class="next"
      title="nächste"
      @click="$emit('next')"
    >
      nächste
    </a>
  </div>
</template>
