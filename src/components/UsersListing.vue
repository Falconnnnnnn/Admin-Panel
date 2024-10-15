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
<!-- bg-gray-200 px-4 py-10 flex justify-center -->
<template>
  <h2 class="text-3xl font-bold mb-6 text-center">Users list</h2>
  <table
    class="user-list container-xl lg:container m-auto w-full md:w-2/3 lg:w-3/4 bg-white p-6 rounded shadow-md"
  >
    <thead class="">
      <!-- Nagłówki dla Full Name i Actions -->
      <tr class="header grid grid-cols-3 mb-4 font-bold">
        <th class="avatar-column">&nbsp;</th>
        <!-- Niewidoczny div dla Avatara -->
        <th class="text-left">Full Name</th>
        <!-- Nagłówek dla imienia i nazwiska -->
        <th class="text-center">Action</th>
        <!-- Nagłówek dla akcji -->
      </tr>
    </thead>
    <tbody>
      <UserListing
        v-for="(user, index) in paginatedUsers"
        :key="user.id"
        :user="user"
        :class="[index % 2 === 0 ? 'bg-gray-200' : 'bg-white']"
      />
    </tbody>
  </table>
  <!-- <div class="user-list">
    <div v-for="user in paginatedUsers" :key="user.id" class="user-card">
      <h3>{{ user.first_name }} {{ user.last_name }}</h3>
      <p>Email: {{ user.email }}</p>
      <img :src="user.avatar" alt="Avatar" />
    </div>
  </div> -->
</template>

<style scoped>
.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.header,
.user-row {
  display: grid;
  grid-template-columns: 82px 1fr 82px; /* Stała szerokość avatara, elastyczne nazwisko, stała szerokość przycisków */
  align-items: center;
  gap: 5px;
  padding: 10px;
}

.user-list {
  display: grid;
  grid-template-columns: 1fr; /* Umożliwia tylko jedną kolumnę */
  gap: 15px; /* Przestrzeń między elementami */
}
</style>
