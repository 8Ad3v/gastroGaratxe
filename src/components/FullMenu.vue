<script setup>
import { computed } from "vue";
import { useMenuStore } from "@/stores/menuStore";

// Obtener el store
const menuStore = useMenuStore();

// Variable reactiva para controlar la visualización del menú
const isFullMenuDisplayed = computed(() => menuStore.isFullMenuDisplayed);
</script>

<template>
  <div v-if="isFullMenuDisplayed" class="full-menu">
    <!-- Contenido del menú -->
  </div>
</template>

<style scoped></style>
