<script setup></script>

<template>
  <div class="search-bar">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search for users..."
      class="search-input border p-2 w-full bg-gray-100"
    />
    <button @click="search" class="search-icon-btn">
      <i class="pi pi-search search-icon"></i>
    </button>
  </div>
</template>

<style scoped>
.search-bar {
  position: relative;
  width: 250px;
}

.search-input {
  width: 100%;
  padding: 8px 40px 8px 10px;
  font-size: 14px;
  border-radius: 20px;
  outline: none;
}
.search-input::placeholder {
  color: #374151; /* text-gray-700 */
  opacity: 1;
}

.search-icon-btn {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.search-icon {
  font-size: 16px;
  color: #888;
}

.search-icon-btn:hover .search-icon {
  color: #000;
}
</style>
