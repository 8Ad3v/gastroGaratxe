<script setup>
import food8 from "/src/assets/food/food8.jpg";
import food7 from "/src/assets/food/food7.jpg";
import food9 from "/src/assets/food/food9.jpg";
import food10 from "/src/assets/food/food10.jpg";
import food11 from "/src/assets/food/food11.jpg";
import food12 from "/src/assets/food/food12.jpg";
</script>

<template>
  <section class="slide-option" style="overflow: hidden">
    <div id="infinite" class="highway-slider">
      <div class="container highway-barrier">
        <ul class="highway-lane">
          <li class="highway-car">
            <img :src="food8" class="slider-img" />
          </li>
          <li class="highway-car">
            <img :src="food7" class="slider-img" />
          </li>
          <li class="highway-car">
            <img :src="food9" class="slider-img" />
          </li>
          <li class="highway-car">
            <img :src="food10" class="slider-img" />
          </li>
          <li class="highway-car">
            <img :src="food11" class="slider-img" />
          </li>
          <li class="highway-car">
            <img :src="food12" class="slider-img" />
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
