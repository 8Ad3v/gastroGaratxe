<script setup>
import { ref, onMounted } from "vue";
import { useColorStore } from "@/stores/hColorsStore.js";

const colorStore = useColorStore();
const hInfoRef = ref(null); // Referencia al elemento .h-info

// Cambiar colores dinámicamente desde el store
const changeColors = () => {
  colorStore.changeColors("#f0f0f0", "#000000");
};

// Función para observar el elemento
const observer = new IntersectionObserver(
  (entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Cuando el elemento entra en el viewport, ejecuta changeColors
        changeColors();
        // Deja de observar el elemento si solo quieres ejecutarlo una vez
      }
    });
  },
  { threshold: 0.5 }
); // Se dispara cuando el 50% del elemento es visible

// Al montar el componente, comenzamos a observar el elemento
onMounted(() => {
  if (hInfoRef.value) {
    observer.observe(hInfoRef.value);
  }
});
</script>

<template>
  <div class="h-info" ref="hInfoRef">
    <p class="h-info-title">Conocenos</p>
    <div class="h-info-p">
      <p>
        Nuestros orígenes se remontan a un humilde garaje, el único local
        disponible, donde Carlos y Eric comenzaron su sueño de crear algo único
        en la cocina.
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
  }
  &-p {
    font-size: 2vw;
    p {
      text-align: left;
    }
  }
}
</style>
