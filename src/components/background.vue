<script setup>
import { onMounted, ref, watch } from "vue";
import { useBgStore } from "@/stores/BgStore";

const BgStore = useBgStore();
const videoSource = ref(BgStore.actVid);
const videoSourceNEW = ref(
  new URL("@/assets/vid/vidbg.mp4", import.meta.url).href
);
const videoElement = ref(null);
const fadeOverlay = ref(null);

const fadeOut = () => {
  if (fadeOverlay.value) {
    fadeOverlay.value.classList.add("fade-out");
  }
};

const fadeIn = () => {
  if (fadeOverlay.value) {
    fadeOverlay.value.classList.remove("fade-out");
  }
};

const playVideoWithDelay = () => {
  if (videoElement.value) {
    const video = videoElement.value;

    // Espera 1 segundo antes de reproducir el video
    setTimeout(() => {
      video.play().catch((error) => {
        console.error("Error al reproducir el video:", error);
      });
    }, 1000); // 1 segundo de retraso
  }
};

// Observa el cambio en la fuente de video en el store
watch(
  () => BgStore.actVid,
  (newSrc) => {
    fadeOut();

    // Esperar a que la transición de fundido se complete
    setTimeout(() => {
      videoSource.value = newSrc;
      console.log("Video source changed to:", newSrc);

      if (videoElement.value) {
        const video = videoElement.value;
        const source = video.querySelector("source");

        if (source) {
          source.src = newSrc;
          video.load(); // Forzar la carga del nuevo src

          // Reproducir el video después de 1 segundo
          playVideoWithDelay();
        }
      }

      fadeIn();
    }, 500); // Ajusta el tiempo según la duración de tu fundido
  }
);

// En el montaje, establece la fuente de video y retrasa el inicio
onMounted(() => {
  videoSource.value = BgStore.actVid;
  playVideoWithDelay(); // Llama a la función para iniciar el video con retraso
});
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
    transition: opacity 0.5s ease; // Ajusta la duración según tu preferencia
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

  // Mantén el resto de tus estilos...
}
</style>
