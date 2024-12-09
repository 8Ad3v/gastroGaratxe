<script setup>
import { ref, onMounted } from "vue";
import { useBgStore } from "@/stores/BgStore";
import background from "./components/background.vue";
import Animation from "./components/Animation.vue";
import headerOptions from "./components/HeaderOptions.vue";
import content from "./components/content.vue";

const preloaderActive = ref(true);
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

onMounted(async () => {
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
  <!-- <Animation></Animation> -->
  <headerOptions v-show="!preloaderActive"></headerOptions>
  <background v-show="!preloaderActive"></background>
  <content v-show="!preloaderActive"></content>

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
