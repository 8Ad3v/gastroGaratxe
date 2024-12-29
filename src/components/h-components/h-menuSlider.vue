<template>
  <div class="slider-component">
    <!-- Header -->
    <header>
      <div class="logo">Lundev</div>
      <ul class="menu">
        <li>Home</li>
        <li>Blog</li>
        <li>Info</li>
      </ul>
      <div class="search">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
    </header>

    <!-- Slider -->
    <div class="slider">
      <!-- Slider Items -->
      <div class="list">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="item"
          :class="{ active: index === itemActive }"
        >
          <img :src="item.image" alt="Slider Image" />
          <div class="content">
            <p>{{ item.category }}</p>
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <div class="arrows">
        <button id="prev" @click="prevSlide">&lt;</button>
        <button id="next" @click="nextSlide">&gt;</button>
      </div>

      <!-- Thumbnails -->
      <div class="thumbnail">
        <div
          v-for="(thumbnail, index) in items"
          :key="index"
          class="item"
          :class="{ active: index === itemActive }"
          @click="setActive(index)"
        >
          <img :src="thumbnail.image" alt="Thumbnail Image" />
          <div class="content">Name Slider</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SliderComponent",
  data() {
    return {
      items: [
        {
          image: "/src/assets/food/fullFood1.png",
          category: "design",
          title: "Slider 01",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque?",
        },
        {
          image: "/src/assets/food/fullFood1.png",
          category: "design",
          title: "Slider 02",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
        },
        {
          image: "/src/assets/food/fullFood1.png",
          category: "design",
          title: "Slider 03",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
        },
        {
          image: "/src/assets/food/fullFood1.png",
          category: "design",
          title: "Slider 04",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
        },
        {
          image: "/src/assets/food/fullFood1.png",
          category: "design",
          title: "Slider 05",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
        },
      ],
      itemActive: 0,
      refreshInterval: null,
    };
  },
  methods: {
    nextSlide() {
      this.itemActive = (this.itemActive + 1) % this.items.length;
      this.resetInterval();
    },
    prevSlide() {
      this.itemActive =
        (this.itemActive - 1 + this.items.length) % this.items.length;
      this.resetInterval();
    },
    setActive(index) {
      this.itemActive = index;
      this.resetInterval();
    },
    resetInterval() {
      clearInterval(this.refreshInterval);
      this.startAutoSlide();
    },
    startAutoSlide() {
      this.refreshInterval = setInterval(this.nextSlide, 5000);
    },
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeUnmount() {
    clearInterval(this.refreshInterval);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
body {
  font-family: Poppins, sans-serif;
  margin: 0;
  background-color: #010101;
  color: #eee;
}
svg {
  width: 25px;
}
header {
  width: 1200px;
  max-width: 90%;
  margin: auto;
  display: grid;
  grid-template-columns: 50px 1fr 50px;
  grid-template-rows: 50px;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 100;
}
header .logo {
  font-weight: bold;
}
header .menu {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 20px;
  font-weight: 500;
}
.slider {
  height: 100vh;
  margin-top: -50px;
  position: relative;
}
.slider .list .item {
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: 0;
  transition: 0.5s;
}
.slider .list .item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.slider .list .item.active {
  opacity: 1;
  z-index: 10;
}
.arrows {
  position: absolute;
  top: 30%;
  right: 50px;
  z-index: 100;
}
.arrows button {
  background-color: #eee5;
  border: none;
  font-family: monospace;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  font-size: x-large;
  color: #eee;
  transition: 0.5s;
}
.arrows button:hover {
  background-color: #eee;
  color: black;
}
.thumbnail {
  position: absolute;
  bottom: 50px;
  z-index: 11;
  display: flex;
  gap: 10px;
  width: 100%;
  height: 250px;
  padding: 0 50px;
  box-sizing: border-box;
  overflow: auto;
  justify-content: center;
}
.thumbnail::-webkit-scrollbar {
  width: 0;
}
.thumbnail .item {
  width: 150px;
  height: 220px;
  filter: brightness(0.5);
  transition: 0.5s;
  flex-shrink: 0;
}
.thumbnail .item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.thumbnail .item.active {
  filter: brightness(1.5);
}
@media screen and (max-width: 678px) {
  .thumbnail {
    justify-content: start;
  }
  .slider .list .item .content h2 {
    font-size: 60px;
  }
  .arrows {
    top: 10%;
  }
}
</style>
