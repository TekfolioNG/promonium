<template>
  <button @click="toggleDark()" aria-label="Toggle color scheme" class="grid h-full place-items-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-colors duration-200"
      :class="{ 'dark-mode-icon': isDark }" viewBox="0 0 24 24">
      <path fill="currentColor"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Zm0-1.5v-17a8.5 8.5 0 0 1 0 17Z" />
    </svg>
  </button>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const isDark = ref(false)

const updateIsDark = () => {
  isDark.value = localStorage.getItem("color-scheme") === "dark"
}

const toggleDark = () => {
  const theme = isDark.value ? "light" : "dark"
  localStorage.setItem("color-scheme", theme)
  document.querySelector("html").dataset.theme = theme
  updateIsDark()
};

onMounted(() => {
  updateIsDark()
})
</script>

<style scoped>
.dark-mode-icon {
  color: #FF0000;
}

/* Optional: Add a smooth transition effect */
svg {
  transition: color 0.3s ease;
}
</style>