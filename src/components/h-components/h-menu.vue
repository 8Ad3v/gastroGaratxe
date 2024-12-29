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

// const changeColors = () => {
//   colorStore.changeColors("#f0f0f0", "#f0f0f0");
// };

// const observer = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         hImenuTitleVisible.value = true;
//         hInfoMenuVisible.value = true;
//         horizontalStore.isTextPart = false;
//         changeColors();
//       } else {
//         hImenuTitleVisible.value = false;
//         hInfoMenuVisible.value = false;
//         horizontalStore.isTextPart = true;
//       }
//     });
//   },
//   { threshold: 0.8 }
// );

// Al montar el componente, comenzar a observar el elemento
// onMounted(() => {
//   if (hMenuRef.value) {
//     observer.observe(hMenuRef.value);
//   }
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const selectedItem = ref(0);

const nextSlide = () => {
  selectedItem.value += 1;
};

const prevSlide = () => {
  selectedItem.value -= 1;
};

const items = ref([
  {
    image: "/src/assets/food/fullFood1.png",
    category: "design",
    title: "Slider 01",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque?",
  },
  {
    image: "/src/assets/food/fullFood2.png",
    category: "design",
    title: "Slider 02",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
  },
  {
    image: "/src/assets/food/fullFood3.jpg",
    category: "design",
    title: "Slider 03",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
  },
  {
    image: "/src/assets/food/fullFood4.jpg",
    category: "design",
    title: "Slider 04",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
  },
  {
    image: "/src/assets/food/fullFood5.jpg",
    category: "design",
    title: "Slider 05",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
  },
]);
</script>

<template>
  <div class="h-info h-menu" ref="hMenuRef">
    <div class="bg-image">
      <div></div>

      <img :src="items[selectedItem].image" alt="" />
    </div>
    <div class="h-menu-infoContainer">
      <p class="h-menu-infoContainer-title">Menu Degustación</p>
      <div class="h-menu-infoContainer-name">
        <p>{{ items[selectedItem].title }}</p>
      </div>
      <div class="h-menu-infoContainer-p">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, dolorum.
          Ipsam facere, in hic rem quae inventore, culpa ipsum omnis tempore id
          excepturi beatae quas voluptatem dicta aperiam, consectetur expedita?
        </p>
      </div>
      <div class="h-menu-arrows">
        <button id="prev" @click="prevSlide">&lt;</button>
        <button id="next" @click="nextSlide">&gt;</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.h-menu {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  color: #e8e8e8;

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
  &-infoContainer {
    position: absolute;
    z-index: 1;
    width: fit-content;
    left: 10%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    &-title {
      color: #e8e8e8;
      font-size: 2em;
      width: fit-content;
    }
    &-name {
      font-size: 3em;
      font-weight: 600;
      width: fit-content;
    }
    &-p {
      max-width: 30%;
      text-align: left;
      font-size: 1em;
    }
  }
  &-arrows {
    height: fit-content;
    width: fit-content;
    display: flex;
    gap: 15px;
    button {
      background-color: #eee5;
      border: none;
      font-family: monospace;
      width: fit-content;
      height: fit-content;
      border-radius: 5px;
      font-size: x-large;
      color: #eee;
      transition: 0.5s;
      display: flex;
      align-items: center;

      &:hover {
        background-color: #eee;
        color: black;
      }
    }
  }
}
</style>
