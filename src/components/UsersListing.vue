<script setup>
import { ref, computed, onMounted } from "vue";
import UserListing from "./UserListing.vue";
import SearchBar from "./SearchBar.vue";

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
  <div
    class="user-list-container container-xl lg:container m-auto w-full md:w-2/3 lg:w-3/4 min-h-[300px] overflow-auto mt-5"
  >
    <table class="user-list">
      <SearchBar />
      <thead>
        <tr class="header font-bold">
          <th class="avatar-column"></th>
          <th class="text-left">Full Name</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <UserListing
          v-for="(user, index) in paginatedUsers"
          :key="user.id"
          :user="user"
          :class="[index % 2 === 0 ? 'bg-gray-100' : 'bg-white']"
        />
      </tbody>
    </table>
  </div>
  <!-- <div class="user-list">
    <div v-for="user in paginatedUsers" :key="user.id" class="user-card">
      <h3>{{ user.first_name }} {{ user.last_name }}</h3>
      <p>Email: {{ user.email }}</p>
      <img :src="user.avatar" alt="Avatar" />
    </div>
  </div> -->
</template>

<style scoped>
.user-list-container {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-list {
  width: 100%;
  padding: 0; /* Upewnij się, że tabela nie ma paddingów */

  border-collapse: collapse;
  height: auto; /* Upewnij się, że wysokość tabeli jest automatyczna */
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.header {
  display: grid;
  grid-template-columns: 70px 1fr 82px;

  align-items: center;
  gap: 5px;
  padding: 10px;
}

.user-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}
</style>
