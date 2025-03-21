<script setup>
import { ref, onMounted } from "vue";
import { useBgStore } from "@/stores/BgStore";
import background from "./components/background.vue";
import headerOptions from "./components/HeaderOptions.vue";
import horizontal from "./components/horizontalContent.vue";
import content from "./components/content.vue";

const preloaderActive = ref(true);
const showHorizontalWarning = ref(false);
const bgStore = useBgStore();
const allElementsLoaded = ref(false); // Nuevo ref para indicar si todos los elementos están cargados

// Función para esperar a que los videos se carguen
const waitForVideosToLoad = async (videos) => {
  const loadVideo = (videoUrl) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.onloadedmetadata = () => resolve();
      video.onerror = () => resolve();
    });
  };

  const loadPromises = videos.map(loadVideo);
  await Promise.all(loadPromises);
};

// Detectar relación de aspecto
const checkAspectRatio = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  showHorizontalWarning.value = width >= height;
};

// Función para esperar a que otros elementos se carguen (puedes ajustarla según tus necesidades)
const waitForOtherElements = () => {
  return new Promise((resolve) => {
    // Aquí puedes agregar lógica para verificar si otros elementos están cargados
    // Por ejemplo, puedes verificar si ciertas imágenes están cargadas o si ciertos componentes están montados
    // Para simplificar, asumiremos que todos los elementos están cargados después de un pequeño retraso
    setTimeout(() => {
      resolve();
    }, 1000); // Ajusta el tiempo según sea necesario
  });
};

onMounted(async () => {
  checkAspectRatio();
  window.addEventListener("resize", checkAspectRatio);

  // Esperar a que los videos se carguen
  await Promise.race([
    waitForVideosToLoad([bgStore.vidHome, bgStore.vidAboutUs, bgStore.actVid]),
    new Promise((resolve) => setTimeout(resolve, 5000)), // Timeout de 5 segundos
  ]);

  // Esperar a que otros elementos se carguen
  await waitForOtherElements();

  allElementsLoaded.value = true; // Indicar que todos los elementos están cargados

  // Retraso de 2 segundos antes de ocultar el preloader
  setTimeout(() => {
    preloaderActive.value = false;
    requestAnimationFrame(() => {
      document.querySelector(".preloader-test").style.transform =
        "translateY(-100%)";
    });
  }, 2000); // Retraso de 2 segundos
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
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 2.1s ease-out 0.1s, opacity 2s ease;

  will-change: transform;
  backface-visibility: hidden;
}

.preloader-test img {
  height: 100%;
  width: 100%;
}

.preloader-exit {
  -webkit-transform: translateY(-100%);
  transform: translateY(-100%);
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
