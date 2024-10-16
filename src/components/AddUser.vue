<script setup>
import { RouterLink } from "vue-router";
import "../assets/add_user.css";
import "../assets/cancel.css";
import { ref, computed, onMounted, watch } from "vue";

const imageUrl = ref("https://avatar.iran.liara.run/public");
const newImageUrl = ref("");
const isInputVisible = ref(false);
const urlError = ref("");
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
</script>

<template>
  <section>
    <div class="container m-auto max-w-5xl py-12 bg-gray-200 mt-5">
      <h2 class="text-3xl text-left font-semibold mb-6 pl-20">Add User</h2>
      <div class="flex space-x-8 max-w-4xl mx-auto">
        <div class="max-w-2xl w-full bg-white shadow-md rounded-md p-6">
          <form>
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
                  required
                />
              </div>
            </div>

            <div class="flex justify-between mb-4">
              <button
                class="btn-add-user focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add User
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
