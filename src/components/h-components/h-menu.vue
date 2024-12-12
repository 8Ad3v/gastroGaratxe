<script setup>
import { ref, onMounted } from "vue";
import { useColorStore } from "@/stores/hColorsStore.js";
import { useHorizontalStore } from "@/stores/horizontalStore"; // Asegúrate de que la ruta del store sea correcta

const colorStore = useColorStore();
const horizontalStore = useHorizontalStore();

const hMenuRef = ref(null); // Referencia al contenedor .h-info
const isMenuVisible = ref(false); // Indica si hMenuRef está visible
const hImenuTitleVisible = ref(false); // Estado para la visibilidad del título
const hInfoMenuVisible = ref(false);

const changeColors = () => {
  colorStore.changeColors("#f0f0f0", "#f0f0f0");
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        hImenuTitleVisible.value = true;
        hInfoMenuVisible.value = true;
        horizontalStore.isTextPart = false;
        changeColors();
      } else {
        hImenuTitleVisible.value = false;
        hInfoMenuVisible.value = false;
        horizontalStore.isTextPart = true;
      }
    });
  },
  { threshold: 0.8 }
);

// Al montar el componente, comenzar a observar el elemento
onMounted(() => {
  if (hMenuRef.value) {
    observer.observe(hMenuRef.value);
  }
});
</script>

<template>
  <div class="h-info h-menu" ref="hMenuRef">
    <div class="bg-image">
      <div></div>

      <img src="/src/assets/food/fullFood1.png" alt="" />
    </div>
    <p
      class="h-info-title"
      :class="{
        'fade-in': !horizontalStore.isTextPart,
        'fade-out': horizontalStore.isTextPart,
      }"
    >
      Menu Degustación
    </p>
    <div
      class="h-info-p"
      :class="{ 'fade-in': hInfoMenuVisible, 'fade-out': !hInfoMenuVisible }"
    >
      <p>11platos noseque</p>
    </div>
  </div>
</template>

<style lang="scss">
.h-menu {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;

  .bg-image {
    position: absolute;
    width: 100%;
    height: 100%;

    div {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.363);
    }
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
