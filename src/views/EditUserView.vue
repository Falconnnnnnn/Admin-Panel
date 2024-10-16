<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import UserForm from "@/components/UserForm.vue";

const route = useRoute();
const userId = route.params.userId;

const user = ref({
  id: null,
  first_name: "",
  last_name: "",
  avatar: "",
});

const fetchUserData = async (id) => {
  try {
    const response = await fetch(`https://reqres.in/api/users/${id}`);
    const data = await response.json();
    user.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  const fetchedUser = await fetchUserData(Number(userId));
  if (fetchedUser) {
    user.value = fetchedUser;
  }
});
</script>

<template>
  <UserForm :user="user" />
</template>
