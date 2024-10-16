<script setup>
import UsersListing from "./components/UsersListing.vue";
</script>

<template>
  <!-- <h1 class="text-2xl">User list</h1> -->
  <!-- <h2 class="text-3xl font-bold mb-6 text-center">Users list</h2> -->

  <UsersListing />
</template>

<style>
html,
body {
  height: 100%;
  margin: 0;
  background-color: #f4f4f9; /* Dowolny kolor tła */
}

#app {
  min-height: 100vh; /* Zapewnia, że aplikacja zajmuje całe okno przeglądarki */
  background-color: #f4f4f9; /* Możesz ustawić tło także tutaj */
}
</style>
