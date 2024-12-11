<script setup>
import { ref, onMounted } from "vue";
import { useColorStore } from "@/stores/hColorsStore.js";
import { useBgStore } from "@/stores/BgStore"; // Asegúrate de que la ruta del store sea correcta

const colorStore = useColorStore();
const hInfo2Ref = ref(null); // Referencia al contenedor .h-info
const hInfo2TitleVisible = ref(false); // Estado para la visibilidad del título
const hInfo2PVisible = ref(false); // Estado para la visibilidad del párrafo

const BgStore = useBgStore();

// Cambiar colores dinámicamente desde el store
const changeColors = () => {
  colorStore.changeColors("#000000", "#f0f0f0");
};

// Observador de intersección
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        hInfo2TitleVisible.value = true;
        hInfo2PVisible.value = true;
        changeColors();
        BgStore.changeSection("Origenes");
      } else {
        hInfo2TitleVisible.value = false;
        hInfo2PVisible.value = false;
      }
    });
  },
  { threshold: 0.5 }
);

// Al montar el componente, comenzar a observar el elemento
onMounted(() => {
  if (hInfo2Ref.value) {
    observer.observe(hInfo2Ref.value);
  }
});
</script>

<template>
  <div class="h-info" ref="hInfo2Ref">
    <p
      class="h-info-title"
      :class="{
        'fade-in': hInfo2TitleVisible,
        'fade-out': !hInfo2TitleVisible,
      }"
    >
      Origenes
    </p>
    <div
      class="h-info-p"
      :class="{ 'fade-in': hInfo2PVisible, 'fade-out': !hInfo2PVisible }"
    >
      <p>
        Nuestros orígenes se remontan a un humilde garaje, el único local
        disponible, donde Carlos y Eric comenzaron su sueño de crear algo único
        en la cocina.
      </p>
    </div>
  </div>
</template>

<style lang="scss"></style>
