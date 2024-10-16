<template>
  <div
    class="user-list-container container-x lg:container m-auto w-full md:w-2/3 lg:w-3/4 min-h-[300px] overflow-auto mt-5"
  >
    <div class="header-container">
      <SearchBar />
      <RouterLink :to="{ name: 'adduser' }" class="btn-add-user">
        <i class="pi pi-plus icon"></i>
        Add User
      </RouterLink>
    </div>

    <table class="user-list">
      <thead>
        <tr class="header font-bold">
          <th class="avatar-column"></th>
          <th class="text-left">Full Name</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading" class="spinner-cell">
          <td colspan="3" class="spinner-column">
            <PulseLoader />
            <span>Loading users...</span>
          </td>
        </tr>
        <tr v-else-if="!users.length">
          <td colspan="3" class="no-data-cell">No users found.</td>
        </tr>
        <UserListing
          v-else
          v-for="(user, index) in paginatedUsers"
          :key="user.id"
          :user="user"
          :class="[index % 2 === 0 ? 'bg-gray-100' : 'bg-white']"
        />
      </tbody>
    </table>
    <PagingBar
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-changed="changePage"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { RouterLink } from "vue-router";
import UserListing from "./UserListing.vue";
import SearchBar from "./SearchBar.vue";
import PagingBar from "./PagingBar.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

import "../assets/user_table.css";
import "../assets/add_user.css";

// State variables
const users = ref([]);
const currentPage = ref(1);
const perPage = ref(9);
const totalPages = ref(0);
const loading = ref(false);

// Function to fetch users from API
const fetchUsers = async (page) => {
  loading.value = true;
  try {
    const response = await fetch(
      `https://reqres.in/api/users?page=${page}&per_page=${perPage.value}`
    );
    const data = await response.json();
    users.value = data.data;
    totalPages.value = data.total_pages;
  } catch (error) {
    toast.error("Error fetching users:", error);
  } finally {
    loading.value = false;
  }
};

// Computed property for paginated users
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return users.value.slice(start, start + perPage.value);
});

// Change page function
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

// Lifecycle hooks
onMounted(() => {
  fetchUsers(currentPage.value);
});

// Watch for changes in current page
watch(currentPage, (newPage) => {
  fetchUsers(newPage);
});
</script>

<style scoped></style>
