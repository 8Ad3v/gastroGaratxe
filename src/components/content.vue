<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useMenuStore } from "@/stores/menuStore"; // Asegúrate de que la ruta del store sea correcta
import { useBgStore } from "@/stores/BgStore"; // Asegúrate de que la ruta del store sea correcta
import Carousel from "@/components/Carousel.vue";
import vinelist from "/src/assets/document/winelist.pdf";
import openEXT from "/src/assets/icons/openEXT.svg";

const homeRef = ref(null);
const aboutUsRef = ref(null);
const historyRef = ref(null);
const foodMenuRef = ref(null);
const reservationRef = ref(null);
const contactRef = ref(null);

const titleGastroRef = ref(null);
const titleAboutUsRef = ref(null);
const titleHistoryRef = ref(null);
const titleMenuRef = ref(null);
const titleReservationRef = ref(null);

const reserveButtonRef = ref(null);

const menuStore = useMenuStore();
const BgStore = useBgStore();

const scrollToAboutUs = () => {
  if (aboutUsRef.value) {
    aboutUsRef.value.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToHistory = () => {
  if (historyRef.value) {
    historyRef.value.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToMenu = () => {
  if (foodMenuRef.value) {
    foodMenuRef.value.scrollIntoView({ behavior: "smooth" });
  }
};

const scrollToReservation = () => {
  if (reservationRef.value) {
    reservationRef.value.scrollIntoView({ behavior: "smooth" });
  }
};

let titleObserver = null;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.target.id === "reserve-button-home") {
        const isVisible = entry.isIntersecting;
        menuStore.isInHomePage = isVisible;
        console.log("isInHomePage:", isVisible);
      }
    });
  },
  { threshold: 0.5 } // El porcentaje de visibilidad necesario para que se dispare el callback
);
const observeElements = () => {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Evita observarlo después de la primera animación
      }
    });
  });

  elements.forEach((el) => observer.observe(el));
};
const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Imprimir en consola el texto del <p> que está en pantalla
      console.log(`Visible: ${entry.target.textContent}`);
      BgStore.changeSection(entry.target.textContent);
    }
  });
};

const createObserver = () => {
  if (
    titleGastroRef.value &&
    titleAboutUsRef.value &&
    titleHistoryRef.value &&
    titleMenuRef.value &&
    titleReservationRef.value
  ) {
    titleObserver = new IntersectionObserver(handleIntersection, {
      root: null, // Usar el viewport como raíz
      threshold: 0.5, // Definir el porcentaje del elemento que debe ser visible
    });

    // Observar cada uno de los elementos <p>
    console.log("Observing elements:");
    [
      titleGastroRef,
      titleAboutUsRef,
      titleHistoryRef,
      titleMenuRef,
      titleReservationRef,
    ].forEach((ref) => {
      if (ref.value) {
        console.log("Observing:", ref.value.textContent);
        titleObserver.observe(ref.value);
      } else {
        console.log("Ref is null");
      }
    });
  } else {
    console.error("One or more refs are null");
  }
};

function animateNumber(finalValue, currentNumber, duration = 2000) {
  const startTime = performance.now();

  function updateAnimation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    currentNumber.value = Math.floor(finalValue * progress);

    if (progress < 1) {
      requestAnimationFrame(updateAnimation);
    }
  }

  requestAnimationFrame(updateAnimation);
}
const targetNumber1 = 11; // Número final del primer <p>

// Números animados
const animatedNumber1 = ref(0);

// Referencias para los elementos
const number1 = ref(null);
const number2 = ref(null);

const openWineList = () => {
  window.open(vinelist, "_blank");
};

const scrollToContact = () => {
  if (contactRef.value) {
    contactRef.value.scrollIntoView({ behavior: "smooth" });
  }
};

const contactName = ref("");
const contactEmail = ref("");
const contactMessage = ref("");

const sendContact = async (e) => {
  e && e.preventDefault();

  // Si existe un endpoint configurado en Vite (por ejemplo Formspree o tu API), enviamos por POST
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
  if (endpoint) {
    try {
      const payload = {
        name: contactName.value,
        email: contactEmail.value,
        message: contactMessage.value,
        to: "info@gastrogaratxe.com",
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // limpiar formulario y notificar
        contactName.value = "";
        contactEmail.value = "";
        contactMessage.value = "";
        alert("Mensaje enviado. Gracias por contactar con GastroGaratxe.");
        return;
      } else {
        const text = await res.text();
        console.error("Error enviando formulario:", res.status, text);
        alert(
          "No se pudo enviar el formulario automáticamente. Se abrirá tu cliente de correo como alternativa."
        );
        // proceed to fallback mailto below
      }
    } catch (err) {
      console.error("Error en fetch:", err);
      alert(
        "Error al enviar el formulario. Se abrirá tu cliente de correo como alternativa."
      );
      // fallback to mailto
    }
  }

  // Fallback: abrir cliente de correo con mailto
  const subject = encodeURIComponent("Contacto - GastroGaratxe");
  const bodyLines = [
    `Nombre: ${contactName.value}`,
    `Email: ${contactEmail.value}`,
    "",
    contactMessage.value,
  ];
  const body = encodeURIComponent(bodyLines.join("\n"));
  const mailto = `mailto:info@gastrogaratxe.com?subject=${subject}&body=${body}`;
  window.location.href = mailto;
};

onMounted(() => {
  nextTick(() => {
    observeElements();
    createObserver();
    const observer2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === number1.value) {
              animateNumber(targetNumber1, animatedNumber1);
            } else if (entry.target === number2.value) {
              animateNumber(targetNumber2, animatedNumber2);
            }
          }
        });
      },
      { threshold: 0.5 } // Se activa cuando el 50% del elemento es visible
    );
    if (number1.value) observer2.observe(number1.value);
    if (number2.value) observer2.observe(number2.value);

    const observer3 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // La sección entra en la vista
            entry.target.classList.add("visible");
          } else {
            // La sección sale de la vista
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1 } // Ajusta el umbral según necesites
    );

    if (aboutUsRef.value) observer3.observe(aboutUsRef.value);
    if (historyRef.value) observer3.observe(historyRef.value);
  });

  window.addEventListener("headerreservation", scrollToReservation);
  window.addEventListener("headercontact", scrollToContact);

  if (reserveButtonRef.value) {
    observer.observe(reserveButtonRef.value);
  }
});

onUnmounted(() => {
  if (reserveButtonRef.value) {
    observer.unobserve(reserveButtonRef.value);
  }
  if (titleObserver) {
    titleObserver.disconnect();
  }
  window.removeEventListener("headercontact", scrollToContact);
});
///new carrousel
import image1 from "../assets/food/food7.jpg";
import image2 from "../assets/food/food8.jpg";
import image3 from "../assets/food/food9.jpg";
import image4 from "../assets/food/food10.jpg";
import image5 from "../assets/food/food11.jpg";
import image6 from "../assets/food/food12.jpg";
import carou from "../components/carou/Carou.vue";
const slides = ref([image1, image2, image3, image4, image5, image6]);
</script>

<template>
  <div class="content">
    <section class="home" ref="homeRef">
      <p class="title-test" ref="titleGastroRef">GastroGaratxe</p>
      <section class="home-menu-container">
        <button
          @click="scrollToAboutUs"
          class="home-menu-container-lightButton"
        >
          Conócenos
        </button>
        <button
          @click="scrollToHistory"
          class="home-menu-container-lightButton"
        >
          Orígenes
        </button>
        <button @click="scrollToMenu" class="home-menu-container-lightButton">
          Menú
        </button>
        <button @click="openWineList()" class="home-menu-container-lightButton">
          Bodega<span><img :src="openEXT" /></span>
        </button>
        <button
          @click="scrollToReservation"
          class="reserve-button"
          id="reserve-button-home"
          ref="reserveButtonRef"
        >
          RESERVAR
        </button>
      </section>
    </section>

    <section class="about-us full-page fade-in-content" ref="aboutUsRef">
      <p class="title-test" ref="titleAboutUsRef">Conócenos</p>
      <p class="bottom-text">
        Carlos y Eric, con experiencia en restaurantes de renombre como Martín
        Berasategui, Jordi Vilà y Albert Adrià, consolidaron su amistad en
        LLuerna, trabajando juntos durante un largo período. Tras seguir caminos
        separados, decidieron unir sus talentos para crear
        <strong>Gastrogartxe</strong>, un concepto único.
      </p>
    </section>

    <section class="history full-page fade-in-content" ref="historyRef">
      <p class="title-test" ref="titleHistoryRef">Orígenes</p>
      <p class="bottom-text">
        Gastrogartxe comenzó en un garaje en L'Hospitalet de Llobregat, nuestro
        único espacio accesible: una barra de 8 comensales y 11 pases, creados
        por dos chefs. Ahora, nos hemos trasladado al Prat de Llobregat,
        conservando el concepto y la esencia original.
      </p>
    </section>

    <section
      class="food-menu menu-container full-page"
      style="background-color: black"
      ref="foodMenuRef"
    >
      <!-- top narrow title band that matches header spacing -->
      <div class="menu-title-band">
        <p class="menu-big-title">Menú</p>
        <button @click="openWineList()">
          Bodega<span><img :src="openEXT" /></span>
        </button>
      </div>

      <!-- large image / carousel beneath the title -->
      <div class="menu-hero">
        <carou :slides="slides" :interval="4000"></carou>
      </div>

      <!-- bottom panel with two equal columns and central divider -->
      <div class="menu-panel">
        <div class="menu-column">
          <h3>Menú degustación</h3>
          <div class="menu-price">75€</div>
          <div class="menu-steps">11 pasos</div>
          <div class="menu-note">martes-sabado<br />noche</div>
        </div>

        <div class="menu-divider" aria-hidden="true"></div>

        <div class="menu-column">
          <h3>Menú mediodía</h3>
          <div class="menu-price">40€</div>
          <div class="menu-steps">7 pasos</div>
          <div class="menu-note">martes-sabado<br />mediodía</div>
        </div>
      </div>
    </section>

    <section class="make-reservation full-page" ref="reservationRef">
      <p class="title-test" ref="titleReservationRef">Reservar</p>
      <div class="iframe-wrapper">
        <iframe
          src="https://widget.thefork.com/ea84edc5-731d-4fa2-bfa1-0861d546538b"
          allow="payment *"
        ></iframe>
      </div>
    </section>

    <section class="contact-section" ref="contactRef">
      <p class="title-test">Contacto</p>
      <div class="contact-grid">
        <form class="contact-form" @submit.prevent="sendContact">
          <label>
            Nombre
            <input type="text" v-model="contactName" required />
          </label>
          <label>
            Email
            <input type="email" v-model="contactEmail" required />
          </label>
          <label>
            Mensaje
            <textarea v-model="contactMessage" rows="6" required></textarea>
          </label>
          <div class="contact-actions">
            <button type="submit">Enviar</button>
          </div>
        </form>
        <div class="contact-info">
          <h4>Síguenos</h4>
          <p
            ><a
              href="https://www.instagram.com/gastro.garatxe/"
              target="_blank"
              rel="noopener"
              >@gastrogaratxe</a
            ></p
          >
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.content {
  position: relative;
  height: 100dvh;
  overflow-y: auto;
  overflow-x: hidden;

  /* Scroll snap configuration */
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth; /* Para que el scroll sea suave */

  .title-test {
    z-index: 20;
    color: white;
    font-family: "Orbitron", sans-serif;
    font-size: 9vw;
    overflow: hidden;
  }
  .full-page {
    height: 100dvh;
    width: 100vw;
    padding-top: 7vh;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 5%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    scroll-snap-align: start;

    .bottom-text {
      font-size: 4.5vw;
      bottom: 0;
      width: 100%; /* Ajusta el ancho al del contenedor padre */
      text-align: justify;
      color: white; /* Cambia el color del texto a blanco */
      font-family: "Orbitron", sans-serif; /* Aplicar el estilo de fuente */
    }
  }

  .home {
    display: flex;
    flex-direction: column;
    height: 100dvh;
    width: 100vw;
    justify-content: space-between;
    padding: 20px;
    scroll-snap-align: start;

    .home-menu-container {
      display: grid;
      width: 100%;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr auto auto;
      gap: 20px;
      align-self: flex-end;
      &-lightButton {
        font-family: "Orbitron", sans-serif;
        color: white;
        font-size: 5vw;
        text-decoration: none;
        grid-column: span 2;
        cursor: pointer;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          width: 1em;
          height: 1em;
          filter: invert(1);
        }
      }
      .reserve-button {
        grid-column: span 2;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-color: #ffffff00;
        color: white;
        border: 1px solid white;
        font-size: 6.5vw;
        cursor: pointer;
      }
    }
  }
  /* MENU SECTION - designed to match the provided mockup */
  .food-menu {
    padding-top: 7vh; /* same as other sections */
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 5%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0;

    .menu-title-band {
      height: 8vh;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top-left-radius: 0.5vw;
      border-top-right-radius: 0.5vw;
      margin-bottom: 1vh;

      button {
        font-family: "Orbitron", sans-serif;
        color: white;
        font-size: 5vw;
        text-decoration: none;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        span {
          width: 1em;
          height: 1em;
          filter: invert(1);
          margin-left: 0.5em; /* Espacio entre el texto y el icono */
        }
      }
    }
    .menu-big-title {
      font-family: "Orbitron", sans-serif;
      color: white;
      font-size: 6vw;
      letter-spacing: 0.06em;
      margin: 0;
    }

    .menu-hero {
      /* expand horizontally to 120% and keep it centered using negative margin */
      width: 120%;
      margin-left: -10%;
      /* keep aspect ratio so height adjusts automatically without distortion */
      aspect-ratio: 16/9;
      height: auto;
      min-height: 36vh; /* ensure it takes more vertical space */
      overflow: hidden;
      background: #e9e9e9;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2vh;

      /* make the carousel fill the hero container */
      & > * {
        width: 100%;
        height: 100%;
      }
    }

    /* responsive: on small screens don't overflow horizontally */
    @media (max-width: 768px) {
      .menu-hero {
        width: 100%;
        margin-left: 0;
        aspect-ratio: auto;
        min-height: 40vh;
      }
    }

    .menu-panel {
      color: white;
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: center;
      width: 100%;
      gap: 2vw;
      /* padding: 4vh 4vw; */
      padding-bottom: 4vh;
      padding-top: 4vh;
      border-radius: 0.5vw;
      position: relative;

      .menu-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 1vh 2vw;

        h3 {
          font-family: "Orbitron", sans-serif;
          font-size: 6vw;
          margin: 0 0 1vh 0;
          color: #fff;
        }

        .menu-price {
          font-family: "Orbitron", sans-serif;
          font-size: 5vw;
          font-weight: 700;
          margin: 1vh 0;
        }

        .menu-steps {
          font-family: "Orbitron", sans-serif;
          font-size: 5vw;
          margin: 1vh 0;
        }

        .menu-note {
          font-family: "Orbitron", sans-serif;
          font-size: 4vw;
          text-align: center;
          opacity: 0.95;
          margin-top: 1vh;
        }
      }

      .menu-divider {
        width: 2px;
        background: #fff;
        margin: 0 1vw;
      }
    }
  }

  .make-reservation {
    background-color: black;
  }

  .contact-section {
    background: #0f0f0f;
    color: white;
    padding-top: 7vh;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 5%;
    box-sizing: border-box;
    height: 100dvh;
    width: 100vw;
    position: relative;
    display: flex;
    flex-direction: column;
    scroll-snap-align: start;
    justify-content: flex-start;

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3vw;
      align-items: start;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      label {
        display: flex;
        flex-direction: column;
        font-family: "Orbitron", sans-serif;
        color: #fff;

        input,
        textarea {
          margin-top: 0.5rem;
          padding: 0.8rem;
          border-radius: 6px;
          border: none;
          background: #222;
          color: #fff;
        }
      }

      .contact-actions {
        display: flex;
        gap: 1rem;
        align-items: center;

        button {
          background: transparent;
          border: 2px solid #fff;
          color: #fff;
          padding: 0.6rem 1rem;
          cursor: pointer;
          font-family: "Orbitron", sans-serif;
        }

        .phone-link,
        .insta-link {
          color: #fff;
          text-decoration: none;
          border-left: 1px solid #fff;
          padding-left: 1rem;
        }
      }
    }

    .contact-info {
      font-family: "Orbitron", sans-serif;
      h4 {
        margin: 0.4rem 0;
        font-size: 1.2rem;
      }
      p {
        margin: 0.2rem 0 1rem 0;
      }
    }

    @media (max-width: 768px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
  }
}
.iframe-wrapper {
  position: relative;
  width: 100%;
  height: 80%;
  padding-top: 56.25%; /* Proporción 16:9 */
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(1); /* Ajusta el tamaño global */
    transform-origin: 0 0; /* Ajusta el punto de origen del escalado */
  }
}

.fade-in-content {
  opacity: 0;
  transition: opacity 1s ease-in-out;
  &.visible {
    opacity: 1;
  }
}
</style>
