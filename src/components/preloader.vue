<template>
  <div class="preloader" v-if="isLoading">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isLoading = ref(true);

// Simula una carga de datos, puedes reemplazar esto con la lógica real.
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false; // Oculta el preloader cuando la página ha cargado.
  }, 2000); // Ajusta el tiempo según sea necesario.
});
</script>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff; // Fondo del preloader
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .spinner {
    border: 5px solid #f3f3f3; /* Color del borde externo */
    border-top: 5px solid #3498db; /* Color del borde animado */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
