<script setup>
import { ref, watch } from "vue";
import hheader from "@/components/h-components/h-header.vue";
import hinfo from "@/components/h-components/h-info.vue";
import hinfo2 from "@/components/h-components/h-info2.vue";
import hmenu from "@/components/h-components/h-menu.vue";
import { useColorStore } from "@/stores/hColorsStore.js";
import { useBgStore } from "@/stores/BgStore.js";
import { useHorizontalStore } from "@/stores/horizontalStore.js";

const colorStore = useColorStore();
const bgStore = useBgStore();
const horizontalStore = useHorizontalStore();

// Estado reactivo para manejar la transición del video
const isTransitioning = ref(false); // Estado para la clase de transición
const currentVideo = ref(bgStore.actVid); // Video actual

// Verificar cambios en el video
watch(
  () => bgStore.actVid,
  (newVideo) => {
    isTransitioning.value = true; // Activa la transición
    setTimeout(() => {
      currentVideo.value = newVideo; // Cambia el video después de la transición
      setTimeout(() => {
        isTransitioning.value = false; // Desactiva la transición
      }, 100); // Tiempo de la transición (1s)
    }, 200); // Tiempo para fundir a negro
  }
);
</script>

<template>
  <div class="horizontalContainer">
    <!-- Parte derecha: Contenedor del video -->
    <!-- Parte derecha: Contenedor del video o imagen -->
    <div
      class="video-container"
      :class="{ 'menu-active': !horizontalStore.isTextPart }"
    >
      <template v-if="!horizontalStore.isTextPart">
        <div></div>
      </template>
      <template v-else>
        <video class="video" :src="bgStore.actVid" autoplay muted loop></video>
      </template>
    </div>

    <div class="content">
      <hheader></hheader>
      <hinfo></hinfo>
      <hinfo2></hinfo2>
      <hmenu></hmenu>
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
    transition: width 0.5s ease-in-out, max-width 0.5s ease-in-out;

    &.menu-active {
      width: 0%; // Cambia el ancho al 50% cuando hMenuRef es visible
    }

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

    /* Asegura que el contenido no se desborde horizontalmente */
    box-sizing: border-box;

    /* Scroll snap configuration */
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth; /* Para que el scroll sea suave */

    p {
      color: var(--text-color);
      transition: color 0s ease-in-out;
    }
    .content-body {
      display: flex;
      flex-direction: column; /* Asegura que los elementos se apilen verticalmente */
      gap: 10px; /* Espaciado entre los elementos */
    }
  }

  // Clases dinámicas para fade-in y fade-out
  .fade-in {
    opacity: 1; // Visible
    transform: translateY(0); // Posición normal
  }

  .fade-out {
    opacity: 0; // Invisible
    transform: translateY(20px); // Desplazado hacia abajo
  }
}
</style>
