<!-- <template>
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
</style> -->
<template>
  <section class="slide-option" style="overflow: hidden">
    <div id="infinite" class="highway-slider">
      <div class="container highway-barrier">
        <ul class="highway-lane">
          <li class="highway-car">
            <img src="/src/assets/food/food1.jpeg" class="slider-img" />
          </li>
          <li class="highway-car">
            <img src="/src/assets/food/food2.jpeg" class="slider-img" />
          </li>
          <li class="highway-car">
            <img src="/src/assets/food/food3.jpeg" class="slider-img" />
          </li>
          <li class="highway-car">
            <img src="/src/assets/food/food4.jpeg" class="slider-img" />
          </li>
          <li class="highway-car">
            <img src="/src/assets/food/food1.jpeg" class="slider-img" />
          </li>
          <li class="highway-car">
            <img src="/src/assets/food/food2.jpeg" class="slider-img" />
          </li>
          <li class="highway-car">
            <img src="/src/assets/food/food3.jpeg" class="slider-img" />
          </li>
          <li class="highway-car">
            <img src="/src/assets/food/food4.jpeg" class="slider-img" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<style>
section.slide-option {
  overflow: hidden;
  margin: 0 0 50px 0;
  .no-marg {
    margin: 0 0 0 0;
  }
  height: 100%;
}

div.highway-slider {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  div.highway-barrier {
    overflow: hidden;
    position: relative;
  }
  ul.highway-lane {
    display: flex;
    height: 100%;
    li.highway-car {
      flex: 1;
      display: flex;
      position: relative;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      color: #343434;
    }
  }
}
.slider-img {
  margin-left: 70px;
  position: absolute; /* Asegura que la imagen sea manejable dentro del contenedor */
  top: 50%; /* Centra verticalmente la imagen */
  left: 50%; /* Centra horizontalmente la imagen */
  width: 50%; /* Asegura que la imagen ocupe todo el ancho */
  height: 100%; /* Asegura que la imagen ocupe todo el alto */
  object-fit: cover; /* Ajusta la imagen con zoom, recortando las partes necesarias */
  transform: translate(
    -50%,
    -50%
  ); /* Centra la imagen desde su punto central */
}
@keyframes translatestf {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-500%);
  }
}
#stffull div.highway-barrier {
  ul.highway-lane {
    width: 500%;
    li.highway-car {
      animation: translatestf 30s linear infinite;
      width: 50%;
      h4 {
        font-size: 28px;
      }
    }
  }
}

@keyframes translateinfinite {
  100% {
    transform: translateX(calc(-180px * 12));
  }
}
#infinite div.highway-barrier {
  &::before,
  &::after {
    content: " ";
    position: absolute;
    z-index: 9;
    width: 180px;
    height: 100%;
  }
  &::before {
    top: 0;
    left: 0;
  }
  &::after {
    top: 0;
    right: 0;
  }
  ul.highway-lane {
    width: calc(180px * 24);
    li.highway-car {
      width: 180px;
      animation: translateinfinite 25s linear infinite;
      span.fab {
        font-size: 65px;
      }
    }
  }
}

#red {
  background: #cb5454;
}
#orange {
  background: #cb8054;
}
#yellow {
  background: #cbba54;
}
#green {
  background: #69b46e;
}
#blue {
  background: #6091b0;
}
</style>
