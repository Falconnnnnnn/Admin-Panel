<template>
  <tr class="user-row border-gray-100">
    <td>
      <img :src="user.avatar" alt="Profile_Picture" class="circular-img" />
    </td>
    <td class="full-name text-gray-700">
      <span>{{ user.first_name }} {{ user.last_name }}</span>
    </td>
    <td class="action-buttons">
      <RouterLink
        :to="{ name: 'edituser', params: { userId: user.id } }"
        class="px-3 py-2 text-gray-500 bg-transparent hover:text-black hover:bg-gray-300 rounded transition-shadow duration-300"
      >
        <i class="pi pi-pen-to-square"></i>
      </RouterLink>

      <button
        @click="() => deleteUser(user.first_name, user.last_name, user.id)"
        class="px-3 py-2 text-gray-500 bg-transparent hover:text-black hover:bg-gray-300 rounded transition-shadow duration-300"
      >
        <i class="pi pi-trash"></i>
      </button>
    </td>
  </tr>
</template>

<script setup>
import { defineProps } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

// Function to delete a user
const deleteUser = async (firstName, lastName, id) => {
  try {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    toast.success(
      `User ${firstName} ${lastName} with id ${id} deleted successfully.`
    );
  } catch (error) {
    toast.error(`Error deleting user: ${error.message}`);
  }
};
</script>

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
