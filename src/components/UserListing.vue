<script setup>
import { ref, computed, onMounted, defineProps } from "vue";

defineProps({
  user: Object,
});
</script>

<template>
  <tr class="user-row border-gray-100">
    <td>
      <img :src="user.avatar" alt="Profile_Picture" class="circular-img" />
    </td>
    <td class="full-name text-gray-700">
      <span>{{ user.first_name }} {{ user.last_name }}</span>
    </td>
    <td class="action-buttons">
      <!-- bg-blue-500 text-white -->
      <button
        @click="editUser(user.id)"
        class="px-3 py-2 text-gray-500 bg-transparent hover:text-black hover:bg-gray-300 rounded transition-shadow duration-300"
      >
        <!-- class="px-3 py-2 text-gray-500 bg-transparent hover:text-black hover:bg-gray-200 rounded transition-shadow duration-300" -->
        <!-- class="p-2 text-gray-500 hover:text-black hover:shadow-md rounded transition-shadow duration-300" -->
        <i class="pi pi-pen-to-square"></i>
      </button>
      <!-- bg-red-500 text-white -->
      <button
        @click="deleteUser(user.id)"
        class="px-3 py-2 text-gray-500 bg-transparent hover:text-black hover:bg-gray-300 rounded transition-shadow duration-300"
      >
        <!-- p-2 text-gray-500 hover:text-black hover:shadow-md rounded transition-shadow duration-300 -->
        <i class="pi pi-trash"></i>
      </button>
    </td>
  </tr>
</template>

<style scoped>
.user-row {
  display: grid;
  grid-template-columns: 70px 1fr 82px;
  align-items: center;
  gap: 5px;
  padding: 10px;
  border-radius: 7px;
}

.circular-img {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 50%;
}

.action-buttons {
  display: flex;
  transition: background-color 0.3s ease;
}

.full-name {
  flex-grow: 1;
}
</style>
