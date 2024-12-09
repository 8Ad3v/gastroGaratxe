<script setup>
import { ref, onMounted } from "vue";
import { useBgStore } from "@/stores/BgStore";
import background from "./components/background.vue";
import headerOptions from "./components/HeaderOptions.vue";
import horizontal from "./components/horizontalContent.vue";
import content from "./components/content.vue";

const preloaderActive = ref(true);
const showHorizontalWarning = ref(false); // Mostrar el mensaje de advertencia
const bgStore = useBgStore();

// Función para esperar a que los videos se carguen
const waitForVideosToLoad = async (videos) => {
  const loadVideo = (videoUrl) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.onloadeddata = () => resolve();
      video.onerror = () => resolve(); // Resolver incluso si ocurre un error
    });
  };

  const loadPromises = videos.map(loadVideo);
  await Promise.all(loadPromises);
};

// Detectar relación de aspecto
const checkAspectRatio = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  showHorizontalWarning.value = width >= height; // Mostrar mensaje si la pantalla es más ancha que alta
};

onMounted(async () => {
  checkAspectRatio();
  window.addEventListener("resize", checkAspectRatio); // Escuchar cambios de tamaño

  // Esperar a que se carguen los videos del store
  await waitForVideosToLoad([
    bgStore.vidHome,
    bgStore.vidAboutUs,
    bgStore.actVid,
  ]);

  // Desactivar el preloader
  preloaderActive.value = false;
});
</script>

<template>
  <div v-if="showHorizontalWarning">
    <horizontal></horizontal>
  </div>
  <div v-else>
    <headerOptions v-show="!preloaderActive"></headerOptions>
    <background v-show="!preloaderActive"></background>
    <content v-show="!preloaderActive"></content>

    <div :class="['preloader-test', { 'preloader-exit': !preloaderActive }]">
      <img src="/src/assets/gd.png" />
    </div>
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

.horizontal-warning {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: black;
  color: white;
  font-size: 1.5rem;
  text-align: center;
  padding: 20px;
}
</style>
