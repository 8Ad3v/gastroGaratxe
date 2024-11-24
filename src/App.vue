<script setup>
import { ref, onMounted } from "vue";
import background from "./components/background.vue";
import Animation from "./components/Animation.vue";
import headerOptions from "./components/HeaderOptions.vue";
import content from "./components/content.vue";

const preloaderActive = ref(true);

onMounted(() => {
  setTimeout(() => {
    preloaderActive.value = false;
  }, 1000); // Espera 2 segundos antes de iniciar la animación
});
</script>

<template>
  <!-- <Animation></Animation> -->
  <headerOptions></headerOptions>
  <background></background>
  <content></content>

  <div :class="['preloader-test', { 'preloader-exit': !preloaderActive }]">
    <img src="/src/assets/gd.png" />
  </div>
</template>

<style scoped>
.white-space {
  background-color: white;
  height: 110vh;
  width: 100%;
}

.preloader-test {
  max-width: 100%;
  height: 100dvh;
  position: absolute;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 2s ease, opacity 2s ease;
}

.preloader-test img {
  height: 100%;
  width: 100%;
}

.preloader-exit {
  transform: translateY(-100%); /* Mueve hacia arriba */
}
</style>
