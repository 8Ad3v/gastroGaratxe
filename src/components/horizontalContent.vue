<script setup>
import { ref, watch } from "vue";

import { useColorStore } from "@/stores/hColorsStore.js";
import { useBgStore } from "@/stores/BgStore.js";

const colorStore = useColorStore();
const bgStore = useBgStore();

// Estado reactivo para manejar la transición del video
const isTransitioning = ref(false); // Estado para la clase de transición
const currentVideo = ref(bgStore.actVid); // Video actual
const videoSourceNEW = ref(
  new URL("@/assets/vid/vidbg.mp4", import.meta.url).href
);
</script>

<template>
  <div class="horizontalContainer">
    <div class="video-container">
      <div class="overlay" :class="{ active: isTransitioning }"></div>
      <video class="video" :src="videoSourceNEW" autoplay muted loop></video>
    </div>

    <div class="content">
      <div class="h-menu">
        <h1>GastroGaratxe</h1>
        <div><a>Conócenos</a></div>
        <div><a>Orígenes</a></div>
        <div><a>Menú</a></div>
        <div><a>Bodega</a></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --text-color: #000000; /* Valor predeterminado */
  --background-color: #f0f0f0; /* Valor predeterminado */
}
.horizontalContainer {
  display: flex;
  flex-direction: row-reverse;
  height: 100vh;
  overflow: hidden;

  .video-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-width: 45%;
    background-color: black;

    .video {
      height: 100%;
      width: auto;
      object-fit: cover;
    }

    // Overlay para la transición
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0; // Invisible por defecto
      transition: opacity 0.5s ease-in-out;

      &.active {
        opacity: 1; // Visible durante la transición
      }
    }
  }

  .content {
    flex: 1; /* Ocupa el resto del espacio */
    background-color: var(
      --background-color
    ); /* Usar 
    overflow-y: auto; /* Activa scroll vertical */
    transition: background-color 1s ease-in-out;
    padding: 20px; /* Espaciado interno */

    /* Asegura que el contenido no se desborde horizontalmente */
    box-sizing: border-box;

    /* Scroll snap configuration */
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth; /* Para que el scroll sea suave */

    display: flex;
    align-items: center;
    .content-body {
      display: flex;
      flex-direction: column; /* Asegura que los elementos se apilen verticalmente */
      gap: 10px; /* Espaciado entre los elementos */
    }

    /* Estilo opcional para el scroll */
    &::-webkit-scrollbar {
      width: 0px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: darkgray;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: gray;
    }

    .h-menu {
      font-family: "Orbitron", sans-serif;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h1 {
        overflow-y: hidden;
        font-size: 6vw;
      }
      a {
        text-decoration: underline;
        font-size: 2.5vw;

        color: black;
      }
    }
  }
}
</style>
