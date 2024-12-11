<script setup>
import { ref, onMounted } from "vue";
import { useColorStore } from "@/stores/hColorsStore.js";
import { useBgStore } from "@/stores/BgStore"; // Asegúrate de que la ruta del store sea correcta

const colorStore = useColorStore();
const hInfoRef = ref(null); // Referencia al contenedor .h-info
const hInfoTitleVisible = ref(false); // Estado para la visibilidad del título
const hInfoPVisible = ref(false); // Estado para la visibilidad del párrafo

const BgStore = useBgStore();

// Cambiar colores dinámicamente desde el store
const changeColors = () => {
  colorStore.changeColors("#f0f0f0", "#000000");
};

// Observador de intersección
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        hInfoTitleVisible.value = true;
        hInfoPVisible.value = true;
        changeColors();
        BgStore.changeSection("Conocenos");
      } else {
        hInfoTitleVisible.value = false;
        hInfoPVisible.value = false;
      }
    });
  },
  { threshold: 0.5 }
);

// Al montar el componente, comenzar a observar el elemento
onMounted(() => {
  if (hInfoRef.value) {
    observer.observe(hInfoRef.value);
  }
});
</script>

<template>
  <div class="h-info" ref="hInfoRef">
    <p
      class="h-info-title"
      :class="{ 'fade-in': hInfoTitleVisible, 'fade-out': !hInfoTitleVisible }"
    >
      Conocenos
    </p>
    <div
      class="h-info-p"
      :class="{ 'fade-in': hInfoPVisible, 'fade-out': !hInfoPVisible }"
    >
      <p>
        Carlos y Eric, amigos y chefs apasionados, te invitamos a disfrutar de
        una experiencia única a cocina vista donde cada plato refleja
        creatividad y amor por la cocina.
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.h-info {
  scroll-snap-align: start;
  font-family: "Orbitron", sans-serif;
  height: 100dvh;
  display: flex;
  align-content: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: transparent;

  &-title {
    font-size: 6vw;
    opacity: 0; // Inicialmente invisible
    transition: opacity 1s ease, transform 1s ease; // Animaciones suaves
    transform: translateY(20px); // Comienza desplazado hacia abajo
  }
  &-p {
    font-size: 2vw;
    opacity: 0; // Inicialmente invisible
    transition: opacity 1s ease, transform 1s ease;
    transform: translateY(20px); // Comienza desplazado hacia abajo
    p {
      text-align: left;
    }
  }
}
</style>
