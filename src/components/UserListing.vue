<script setup>
import { ref, computed, onMounted, defineProps } from "vue";

defineProps({
  user: Object,
});
</script>

<template>
  <div>
    <img :src="user.avatar" alt="Profile_Picture" class="circular-img" />
    <h3>{{ user.first_name }} {{ user.last_name }}</h3>
    <div class="action-buttons">
      <button @click="editUser(user.id)">Edit</button>
      <button @click="deleteUser(user.id)">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.circular-img {
  width: 50px; /* Set a fixed width */
  height: 50px; /* Set a fixed height */
  border-radius: 50%; /* Make the image circular */
  object-fit: cover; /* Ensures the image covers the area without stretching */
}

.action-buttons {
  margin-left: auto;
  display: flex;
  justify-content: space-between;
}
</style>
