<script setup>
import hheader from "@/components/h-components/h-header.vue";
import hinfo from "@/components/h-components/h-info.vue";
import { useColorStore } from "@/stores/hColorsStore.js";
const colorStore = useColorStore();

// Cambiar colores dinámicamente desde el store
const changeColors = () => {
  colorStore.changeColors("#ff6347", "#000000"); // Rojo tomate para el texto y negro para el fondo
};
</script>

<template>
  <div class="horizontalContainer">
    <!-- Parte derecha: Contenedor del video -->
    <div class="video-container">
      <video
        class="video"
        src="@/assets/vid/general.mp4"
        autoplay
        muted
        loop
      ></video>
    </div>

    <div class="content">
      <hheader></hheader>
      <hinfo></hinfo>
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-width: 45%;
    background-color: black; /* Opcional: color de fondo */
  }

  .video {
    height: 100%; /* Video ocupa toda la altura del contenedor */
    width: auto; /* Mantiene proporciones del video */
    object-fit: cover;
  }

  .content {
    flex: 1; /* Ocupa el resto del espacio */
    background-color: var(
      --background-color
    ); /* Usar 
    overflow-y: auto; /* Activa scroll vertical */
    transition: background-color 0.2s ease-in-out;
    padding: 20px; /* Espaciado interno */

    /* Asegura que el contenido no se desborde horizontalmente */
    box-sizing: border-box;

    /* Scroll snap configuration */
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth; /* Para que el scroll sea suave */

    p {
      color: var(--text-color);
      transition: color 0.2s ease-in-out;
    }
    .content-body {
      display: flex;
      flex-direction: column; /* Asegura que los elementos se apilen verticalmente */
      gap: 10px; /* Espaciado entre los elementos */
    }

    /* Estilo opcional para el scroll */
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: darkgray;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: gray;
    }
  }
}
</style>
