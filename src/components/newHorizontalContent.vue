<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import hheader from "@/components/h-components/h-header.vue";
import hinfo from "@/components/h-components/h-info.vue";
import hinfo2 from "@/components/h-components/h-info2.vue";
import hmenu from "@/components/h-components/h-menu.vue";
import hmenuS from "@/components/h-components/h-menuSlider.vue";

import { useColorStore } from "@/stores/hColorsStore.js";
import { useBgStore } from "@/stores/BgStore.js";
import { useHorizontalStore } from "@/stores/horizontalStore.js";

import "animate.css";

const bgStore = useBgStore();
const horizontalStore = useHorizontalStore();

// Estado reactivo para manejar la transición del video
const isTransitioning = ref(false); // Estado para la clase de transición
const currentVideo = ref(bgStore.actVid); // Video actual

// Método para manejar la transición cuando el src del video cambie
watch(
  () => bgStore.actVid,
  async (newVideoSrc, oldVideoSrc) => {
    if (newVideoSrc !== oldVideoSrc) {
      isTransitioning.value = true; // Activar el fundido a negro
      await nextTick(); // Esperar que Vue actualice el DOM
      const videoElement = document.getElementById("videoElement");
      videoElement.load(); // Forzar recarga del video
    }
  }
);

// Método para manejar la finalización de la carga del video
const onVideoLoaded = () => {
  isTransitioning.value = false; // Desactivar la transición cuando el video esté cargado
};

// Estado para manejar la visibilidad de hheader
// Reactive variables
const isHeaderVisible = ref(true);
const isinfoVisible = ref(true);
const section = ref(0);
const showElse = ref(false);
const listenersEnabled = ref(true); // Control de listeners

// Variables para rastrear posición inicial del toque
let touchStartY = 0;

// Métodos
const handleWheel = (event) => {
  console.log("listenersEnabled.value", listenersEnabled.value);
  if (!listenersEnabled.value) return;
  if (event.deltaY > 0) {
    console.log("Scrolling down");
    clickNext();
  } else {
    console.log("Scrolling up");
    clickPrev();
  }
};

const handleTouchStart = (event) => {
  if (!listenersEnabled.value) return;
  touchStartY = event.touches[0].clientY;
};

const handleTouchEnd = (event) => {
  if (!listenersEnabled.value) return;
  const touchEndY = event.changedTouches[0].clientY;
  if (touchStartY > touchEndY) {
    console.log("Scrolling down");
    clickNext();
  } else {
    console.log("Scrolling up");
    clickPrev();
  }
};

const clickPrev = () => {
  if (section.value === 0) return;
  const previousValue = section.value;
  section.value = 1000;
  listenersEnabled.value = false; // Desactiva los listeners
  setTimeout(() => {
    section.value = previousValue - 1;
    listenersEnabled.value = true; // Reactiva los listeners
    console.log("section.value ", section.value);
  }, 1000);
};

const clickNext = () => {
  const previousValue = section.value;
  section.value = 1000;
  listenersEnabled.value = false; // Desactiva los listeners
  setTimeout(() => {
    section.value = previousValue + 1;
    listenersEnabled.value = true; // Reactiva los listeners
    console.log("section.value ", section.value);
  }, 1000);
};

watch(section, (newVal) => {
  if (newVal > 0) {
    showElse.value = false; // Asegúrate de que inicialmente esté oculto.
    setTimeout(() => {
      showElse.value = true; // Mostrar después de 1 segundo.
    }, 1000);
  } else {
    showElse.value = false; // Oculta cuando `section` no cumple la condición.
  }
});
</script>

<template>
  <div
    class="horizontalContainer2"
    @wheel="handleWheel"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- Contenedor de video -->
    <div
      class="video-container"
      :class="{ 'menu-active': !horizontalStore.isTextPart }"
    >
      <!-- Capa de fundido a negro -->
      <div v-if="isTransitioning" class="fade-overlay"></div>

      <!-- Video -->
      <video
        id="videoElement"
        class="video"
        :src="bgStore.actVid"
        autoplay
        muted
        loop
        @loadeddata="onVideoLoaded"
      ></video>
    </div>

    <!-- Contenedor principal -->
    <div
      class="content"
      v-if="section != 3"
      :style="{
        backgroundColor: section === 4 ? 'black' : 'white',
      }"
    >
      <div
        :style="{
          width: '100%',
          height: 'max-content',
          overflowY: 'hidden',
        }"
        @click="clickPrev()"
        :disabled="section > 0"
      >
        <div class="nextPrevButton">
          <button
            :style="{
              color: section > 0 && section < 4 ? 'black' : 'white',
              pointerEvents: section > 0 ? 'all' : 'none',
            }"
          >
            prev
          </button>
        </div>
      </div>

      <Transition>
        <hheader v-if="section === 0"></hheader>
      </Transition>
      <Transition>
        <hinfo v-if="section === 1"></hinfo>
      </Transition>
      <Transition>
        <hinfo2 v-if="section === 2"></hinfo2>
      </Transition>
      <Transition>
        <iframe
          v-if="section === 4"
          style="flex-grow: 1"
          src="https://widget.thefork.com/ea84edc5-731d-4fa2-bfa1-0861d546538b"
          allow="payment *"
        ></iframe>
      </Transition>

      <div
        class="nextPrevButton"
        style="width: 100%; height: max-content; overflow-y: hidden"
        @click="clickNext()"
      >
        <button>next</button>
      </div>
    </div>

    <Transition>
      <hmenu v-if="section === 3"></hmenu>
    </Transition>
  </div>
</template>

<style lang="scss">
:root {
  --text-color: #000000;
  --background-color: #f0f0f0;
}
.horizontalContainer2 {
  display: flex;
  flex-direction: row-reverse;
  height: 100vh;
  overflow: hidden;
  .content {
    flex: 1;
    overflow-y: auto;
    scroll-behavior: smooth;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .nextPrevButton {
      color: black;
      padding: 0;
      width: 100%;

      button {
        background-color: transparent;
        font-size: 1em;
      }
    }
  }
  /* Estilos generales del contenedor de video */
  .video-container {
    position: relative;
    width: 35%;
    height: 100%;
  }

  /* Video principal */
  .video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Capa de fundido a negro */
  .fade-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    opacity: 1;
    transition: opacity 1s ease-out; // Animación de opacidad

    /* Cuando se active la clase fade-out, la opacidad se reduce a 0 */
    &.fade-out {
      opacity: 0;
    }
  }

  /* Opcional: Añadir un efecto al video cuando esté en transición (puedes personalizarlo según desees) */
  .video-container.transitioning .video {
    opacity: 0.5; // Reduce la opacidad del video durante la transición para dar más énfasis al fundido
  }
}
</style>
