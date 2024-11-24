<template>
  <div class="aboutUsContainer">
    <div class="eric">
      <h1>Eric Ochoa</h1>
      <p>
        ¡Hola! Soy Eric Ochoa, apasionado de la cocina desde pequeño y
        dedicándome a ella desde los 16. He trabajado con chefs como Santi
        Santamaria, Martín Berasategui y Albert Adrià. Después de casi 4 años
        como copropietario y chef en el Berguedà, he decidido volver a casa.
        Ahora inicio un nuevo camino junto a mi amigo y cocinero, Carlos Novo,
        con quien compartí fogones en el restaurant Lluerna. ¡Abrochaos los
        cinturones, que vienen curvas! 🔥
      </p>
    </div>
    <img src="/src/assets/Eric.jpg" />
  </div>
</template>

<script setup></script>

<style lang="scss">
.aboutUsContainer {
  margin-top: 100px;
  height: 110vh;
  width: 100vw;

  .eric {
    display: flex;
    flex-direction: column;
    padding: 5%;
    position: relative;
    h1 {
      font-family: Orbitron;
      color: black;
      text-align: center;
      overflow-y: hidden;
    }

    p {
      text-align: justify;
    }
    img {
      position: absolute;
    }
  }
}
</style>
