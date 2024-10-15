<script setup>
import { ref, computed, onMounted } from "vue";
import UserListing from "./UserListing.vue";

// async fetchUsers() {
//   const response = await fetch('https://reqres.in/api/users?page=1'); // Zmień na odpowiedni URL
//   const data = await response.json();
//   this.users = data.data;
//   this.totalPages = data.total_pages; // Ustaw liczbę stron dynamicznie
// },

onMounted(async () => {
  try {
    const response = await fetch(
      "https://reqres.in/api/users?page=1&per_page=9"
    );
    const data = await response.json();
    console.log(data);
    users.value = data.data;
    totalPages.value = data.total_pages;
  } catch (error) {
    console.log(error);
  }
});

const users = ref([]);
const currentPage = ref(1);
const perPage = ref(9);

const totalPages = computed(() => {
  return Math.ceil(users.value.length / perPage.value);
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return users.value.slice(start, start + perPage.value);
});

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};
</script>

<template>
  <section class="bg-gray-200 px-4 py-10">
    <div class="user-list container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold mb-6 text-center">Users list</h2>
      <!-- <div class="grid grid-cols-1 gap-6"> -->
      <UserListing
        class="user-card"
        v-for="user in paginatedUsers"
        :key="user.id"
        :user="user"
      />
    </div>
  </section>
  <!-- <div class="user-list">
    <div v-for="user in paginatedUsers" :key="user.id" class="user-card">
      <h3>{{ user.first_name }} {{ user.last_name }}</h3>
      <p>Email: {{ user.email }}</p>
      <img :src="user.avatar" alt="Avatar" />
    </div>
  </div> -->
</template>

<style scoped>
.circular-img {
  width: 50px; /* Set a fixed width */
  height: 50px; /* Set a fixed height */
  border-radius: 50%; /* Make the image circular */
  object-fit: cover; /* Ensures the image covers the area without stretching */
}
.user-list {
  display: grid;
  grid-template-columns: 1fr; /* Umożliwia tylko jedną kolumnę */
  gap: 20px; /* Przestrzeń między elementami */
}

.user-card {
  display: flex;
  align-items: center; /* Wyśrodkowuje elementy w pionie */
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 5px;
  width: 100%; /* Umożliwia zajmowanie 100% szerokości */
  box-sizing: border-box; /* Umożliwia obliczanie szerokości włącznie z paddingiem i borderem */
}
.action-buttons {
  margin-left: auto;
  display: flex;
  justify-content: space-between;
}
</style>
