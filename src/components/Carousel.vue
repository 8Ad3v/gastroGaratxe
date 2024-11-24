<!-- <template>
  <div class="carousel-container">
    <div class="carousel-track" :style="trackStyle">
      <div v-for="(image, index) in images" :key="index" class="carousel-slide">
        <img :src="image.url" :alt="'Image ' + (index + 1)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const images = ref([
  { id: 1, url: "/src/assets/food/food1.jpeg" },
  { id: 2, url: "/src/assets/food/food2.jpeg" },
  { id: 3, url: "/src/assets/food/food3.jpeg" },
  { id: 4, url: "/src/assets/food/food4.jpeg" },
  { id: 5, url: "/src/assets/food/food5.jpeg" },
]);

const slideWidth = 100 / images.value.length; // Ajustar el ancho de cada slide según el número de imágenes
const gap = 16; // Tamaño del margen entre imágenes en píxeles

// Estilo dinámico del track para la animación infinita
const trackStyle = computed(() => ({
  width: `${images.value.length * 2 * (slideWidth + gap / window.innerWidth)}%`,
}));
</script>

<style scoped lang="scss">
.carousel-container {
  overflow: hidden;
  width: 100%;
  position: relative;
  height: 100%; /* Hace que el contenedor tenga el tamaño completo de su contenedor padre */
}

.carousel-track {
  display: flex;
  align-items: center;
  height: 100%;
  animation: slide 20s linear infinite;
}

.carousel-slide {
  flex: 0 0 calc(100% / 5 - 16px); /* Ajustar el ancho según la cantidad de imágenes */
  margin-right: 16px; /* Margen entre las imágenes */
  height: 100%; /* Asegura que cada slide ocupe toda la altura del contenedor */
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajustar las imágenes al tamaño del contenedor sin deformarlas */
  display: block;
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%); /* Mueve el track un 50% para hacer bucle */
  }
}
</style> -->

<template>
  <section style="height: 100%">
    <article :class="{ paused: isPaused }" style="height: 100%">
      <div style="height: 100%">
        <ul style="height: 100%">
          <li><img src="/src/assets/food/food1.jpeg" /></li>
          <li><img src="/src/assets/food/food2.jpeg" /></li>
          <li><img src="/src/assets/food/food3.jpeg" /></li>
          <li><img src="/src/assets/food/food4.jpeg" /></li>
        </ul>
      </div>
      <div style="height: 100%">
        <ul style="height: 100%">
          <li><img src="/src/assets/food/food1.jpeg" /></li>
          <li><img src="/src/assets/food/food2.jpeg" /></li>
          <li><img src="/src/assets/food/food3.jpeg" /></li>
          <li><img src="/src/assets/food/food4.jpeg" /></li>
        </ul>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref } from "vue";

// Definimos el estado pausado
const isPaused = ref(false);

// Función para alternar el estado de pausa
const togglePause = () => {
  isPaused.value = !isPaused.value;
};
</script>

<style scoped lang="scss">
img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajustar las imágenes al tamaño del contenedor sin deformarlas */
  display: block;
}

section {
  width: 100%;
  overflow: hidden;
}

article {
  display: flex;
  width: 200%;
  animation: bannermove 20s linear infinite;
}

div {
  width: 100%;
}

ul {
  display: flex;
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

li {
  width: 100%;
  margin-left: 20px;
}

@keyframes bannermove {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
