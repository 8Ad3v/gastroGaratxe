<script setup>
import { ref, onMounted } from "vue";
import { useColorStore } from "@/stores/hColorsStore.js";

const colorStore = useColorStore();
const hHeader = ref(null); // Referencia al elemento .h-info

// Cambiar colores dinámicamente desde el store
const changeColors = () => {
  colorStore.changeColors("#000000", "#f0f0f0");
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
  if (hHeader.value) {
    observer.observe(hHeader.value);
  }
});
</script>

<template>
  <div class="h-header" ref="hHeader">
    <p class="h-header-title">GastroGaratxe</p>
    <div class="h-header-navigation">
      <button>Conocenos</button>
      <button>Origenes</button>
      <button>Menu</button>
      <button>Reservar</button>
    </div>
  </div>
</template>

<style lang="scss">
.h-header {
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

  &-navigation {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    flex-wrap: wrap;
    align-items: flex-start;

    button {
      font-size: 3vw !important;
      padding: 0;
      margin: 0;
      background-color: transparent;
      position: relative; /* Necesario para ::after */
      border: none;
      cursor: pointer;

      /* Estilos del texto */
      color: var(--text-color);

      text-align: left;

      /* Quitar subrayado de texto */
      text-decoration: none;
      outline: none;

      /* Animación de hover */
      &::after {
        content: "";
        position: absolute;
        bottom: 0; /* Aparece justo debajo del texto */
        left: 0;
        width: 0; /* Comienza sin ancho */
        height: 2px; /* Grosor de la línea */
        background-color: var(--text-color);
        transition: width 0.3s ease-in-out; /* Animación de crecimiento */
      }

      &:hover::after {
        width: 100%; /* Ancho completo al hacer hover */
      }
    }
  }
}
</style>
