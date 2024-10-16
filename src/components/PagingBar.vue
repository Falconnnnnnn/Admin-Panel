<template>
  <div class="paging-bar">
    <button
      class="page-button first-page"
      @click="goToPreviousPage"
      :disabled="currentPage === 1"
    >
      <i class="pi pi-angle-double-left"></i>
    </button>
    <div class="page-numbers">
      <button
        v-for="page in totalPages"
        :key="page"
        class="page-button"
        :class="{ active: currentPage === page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>
    <button
      class="page-button last-page"
      @click="goToNextPage"
      :disabled="totalPages < 2 || currentPage === totalPages"
    >
      <i class="pi pi-angle-double-right"></i>
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const goToPage = (page) => {
      emit("page-changed", page);
    };

    const goToPreviousPage = () => {
      if (props.currentPage > 1) {
        emit("page-changed", props.currentPage - 1);
      }
    };

    const goToNextPage = () => {
      if (props.currentPage < props.totalPages) {
        emit("page-changed", props.currentPage + 1);
      }
    };

    return {
      goToPage,
      goToPreviousPage,
      goToNextPage,
    };
  },
});
</script>

<style scoped>
.paging-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.page-button {
  box-sizing: border-box;
  color: #38a169;
  width: 30px;
  height: 30px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 0;
  cursor: pointer;
  font-size: 14px;
  margin: 0;
}

.page-button.active {
  background-color: #28a745;
  color: white;
  border-color: #28a745;
}

.page-button.first-page {
  border-radius: 5px 0 0 5px;
}

.page-button.last-page {
  border-radius: 0 5px 5px 0;
}

.page-button:disabled {
  background-color: rgba(240, 240, 240, 0.6);
  cursor: not-allowed;
  color: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(200, 200, 200, 0.6);
}
</style>
