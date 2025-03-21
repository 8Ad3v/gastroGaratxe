<script setup>
import { onMounted, ref, watch } from "vue";
import { useBgStore } from "@/stores/BgStore";

const BgStore = useBgStore();
const videoSourceNEW = ref(
  new URL("@/assets/vid/vidbg.mp4", import.meta.url).href
);
const videoElement = ref(null);
const fadeOverlay = ref(null);
</script>

<template>
  <header>
    <div class="difusor"></div>
    <div class="fade-overlay" ref="fadeOverlay"></div>
    <video
      class="parallax"
      ref="videoElement"
      muted
      loop
      playsinline
      preload="auto"
    >
      <source :src="videoSourceNEW" type="video/mp4" />
      Tu navegador no soporta la reproducción de videos.
    </video>
  </header>
</template>

<style scoped lang="scss">
header {
  position: fixed;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
  .difusor {
    background-color: rgb(0 0 0 / 60%);
    z-index: 10;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .fade-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    transition: opacity 0.5s ease;
    z-index: 20;
    opacity: 0;
  }

  .fade-overlay.fade-out {
    opacity: 1;
  }

  .parallax {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.1s ease-out;
  }
}
</style>
