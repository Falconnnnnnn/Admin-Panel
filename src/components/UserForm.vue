<script setup>
import { RouterLink } from "vue-router";
import { toRefs } from "vue";
import { useToast } from "vue-toastification";

import "../assets/add_user.css";
import "../assets/cancel.css";
import { ref, computed, onMounted, watch } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: false,
  },
});
const toast = useToast();

const { user } = toRefs(props);

const imageUrl = ref(
  user.value?.avatar || "https://avatar.iran.liara.run/public"
);
const newImageUrl = ref("");
const isInputVisible = ref(false);
const urlError = ref("");

const firstName = computed({
  get: () => user.value?.first_name || "",
  set: (value) => {
    if (!user.value) {
      user.value = {};
    }
    user.value.first_name = value;
  },
});

const lastName = computed({
  get: () => user.value?.last_name || "",
  set: (value) => {
    if (!user.value) {
      user.value = {};
    }
    user.value.last_name = value;
  },
});

watch(
  () => user.value?.avatar,
  (newAvatar) => {
    imageUrl.value = newAvatar || "https://avatar.iran.liara.run/public";
  }
);

const toggleInputVisibility = () => {
  isInputVisible.value = !isInputVisible.value;
};

const updateImage = () => {
  if (newImageUrl.value && validateUrl(newImageUrl.value)) {
    imageUrl.value = newImageUrl.value;
    isInputVisible.value = false; //
    urlError.value = "";
  } else {
    urlError.value = "Please enter a valid URL.";
  }
};

const validateUrl = (url) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)" + //
      "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" +
      "localhost|" +
      "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" +
      "\\[?[a-fA-F0-9]*:[a-fA-F0-9:%.\\/]*)" +
      "(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?$"
  );
  // regex with extension
  // const urlPattern = new RegExp(
  //   "^(https?:\\/\\/)" +
  //     "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" +
  //     "localhost|" +
  //     "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" +
  //     "\\[?[a-fA-F0-9]*:[a-fA-F0-9:%.\\/]*)" +
  //     "(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?\\.(jpg|jpeg|png|gif|bmp|webp)$"
  // );
  return urlPattern.test(url);
};
const sendRequest = async (userData) => {
  const userId = user.value?.id || null;
  const methodName = !!userId ? "PUT" : "POST";
  const url = !!userId
    ? `https://reqres.in/api/users/${userId}`
    : "https://reqres.in/api/users";
  try {
    const response = await fetch(url, {
      method: methodName,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      !!userId
        ? toast.error("Failed to create user")
        : toast.error("Failed to update user");
    }

    const data = await response.json();
    !!userId
      ? toast.success("User updated successfully")
      : toast.success("User created successfully");
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const submitForm = async (event) => {
  event.preventDefault();
  const userData = {
    first_name: event.target.name.value,
    last_name: event.target.lastname.value,
    avatar: imageUrl.value,
  };
  const response = await sendRequest(userData);
  console.log(response);
};
</script>

<template>
  <section>
    <div class="container m-auto max-w-5xl py-12 bg-gray-200 mt-5">
      <h2 class="text-3xl text-left font-semibold mb-6 pl-20">
        {{ user ? "Edit User" : "Add User" }}
      </h2>
      <div class="flex space-x-8 max-w-4xl mx-auto">
        <div class="max-w-2xl w-full bg-white shadow-md rounded-md p-6">
          <form @submit="submitForm">
            <div class="flex mb-4 space-x-4">
              <div class="flex-1">
                <label class="block text-gray-700 font-bold mb-2"
                  >First Name</label
                >
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="border rounded w-full py-2 px-3 mb-2"
                  v-model="firstName"
                  required
                />
              </div>
              <div class="flex-1">
                <label class="block text-gray-700 font-bold mb-2"
                  >Last Name</label
                >
                <input
                  type="text"
                  id="last_name"
                  name="lastname"
                  class="border rounded w-full py-2 px-3 mb-2"
                  v-model="lastName"
                  required
                />
              </div>
            </div>

            <div class="flex justify-between mb-4">
              <button
                class="btn-add-user focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {{ user ? "Update User" : "Add User" }}
              </button>
              <RouterLink :to="{ name: 'adminpanel' }">
                <button
                  class="btn-cancel focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Cancel
                </button>
              </RouterLink>
            </div>
          </form>
        </div>
        <div
          class="max-w-xs w-full bg-white shadow-md rounded-md flex flex-col items-center p-6"
        >
          <img :src="imageUrl" alt="User Photo" class="w-24 h-24 mb-4" />
          <div v-if="isInputVisible">
            <input
              type="text"
              v-model="newImageUrl"
              placeholder="Paste your image URL here"
              class="border border-gray-300 rounded px-2 py-1 mb-4 w-full"
            />
            <span v-if="urlError" class="text-red-500 text-sm">{{
              urlError
            }}</span>
          </div>
          <button
            @click="toggleInputVisibility"
            class="bg-white hover:bg-gray-200 py-2 px-4 border-2 flex items-center rounded-lg focus:outline-none focus:shadow-outline"
          >
            <i class="pi pi-camera icon"></i>
            Change Photo
          </button>
          <button
            v-if="isInputVisible && newImageUrl"
            @click="updateImage"
            class="btn-add-user focus:outline-none focus:shadow-outline mt-2"
          >
            Confirm Photo
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script></script>

<style></style>
