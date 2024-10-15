<script setup>
import { ref, computed, onMounted, defineProps } from "vue";

defineProps({
  user: Object,
});
</script>

<template>
  <tr class="user-row border-gray-100">
    <td>
      <img :src="user.avatar" alt="Profile_Picture" class="circular-img mr-5" />
    </td>
    <td class="full-name">
      <span>{{ user.first_name }} {{ user.last_name }}</span>
    </td>
    <td class="action-buttons">
      <!-- bg-blue-500 text-white -->
      <button @click="editUser(user.id)" class="text-gray px-3 py-3">
        <i class="pi pi-pen-to-square"></i>
      </button>
      <!-- bg-red-500 text-white -->
      <button @click="deleteUser(user.id)" class="text-gray px-3 py-3">
        <i class="pi pi-trash"></i>
      </button>
    </td>
  </tr>
</template>

<style scoped>
.circular-img {
  width: 60px; /* Ustalona szerokość */
  height: 60px; /* Ustalona wysokość */
  object-fit: cover; /* Zapewnienie, że obrazek wypełnia obszar */
  border-radius: 50%; /* Określenie kształtu okrągłego */
}

.action-buttons {
  display: flex;
}

.full-name {
  flex-grow: 1;
}
</style>
