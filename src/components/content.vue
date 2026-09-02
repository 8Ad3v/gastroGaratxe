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
const giftRef = ref(null);
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

const scrollToGift = () => {
  if (giftRef.value) {
    giftRef.value.scrollIntoView({ behavior: "smooth" });
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
  { threshold: 0.5 }, // El porcentaje de visibilidad necesario para que se dispare el callback
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
          "No se pudo enviar el formulario automáticamente. Se abrirá tu cliente de correo como alternativa.",
        );
        // proceed to fallback mailto below
      }
    } catch (err) {
      console.error("Error en fetch:", err);
      alert(
        "Error al enviar el formulario. Se abrirá tu cliente de correo como alternativa.",
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
      { threshold: 0.5 }, // Se activa cuando el 50% del elemento es visible
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
      { threshold: 0.1 }, // Ajusta el umbral según necesites
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
      <div class="title-and-logos">
        <p class="title-test" ref="titleGastroRef">GastroGaratxe</p>
        <div class="logos">
          <img src="/macarfilogo.png" alt="Macarfi Logo" />
          <img src="/slowfoodlogo.png" alt="Slow Food Logo" class="slowfood" />
        </div>
      </div>
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
        <button
          @click="scrollToMenu"
          class="home-menu-container-lightButton half"
        >
          Menús
        </button>
        <button
          @click="scrollToGift"
          class="home-menu-container-lightButton half"
        >
          Regala gastrogaratxe
        </button>
        <button @click="openWineList()" class="home-menu-container-lightButton">
          Bodega<span><img :src="openEXT" /></span>
        </button>
        <button
          @click="scrollToContact"
          class="contact-button"
          id="contact-button-home"
        >
          CONTACTO
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
        <p class="menu-big-title">Menús</p>
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
          <h3>Gran menú Gastrogaratxe</h3>
          <div class="menu-price">75€ <span>11 pasos</span></div>
          <div class="menu-note">Mié-Sáb · mediodía y noche</div>
        </div>

        <div class="menu-divider" aria-hidden="true"></div>

        <div class="menu-column">
          <h3>Petit menú Gastrogaratxe</h3>
          <div class="menu-price">40€ <span>6 pasos</span></div>
          <div class="menu-note">
            Mié-Jue · mediodía y noche · Vie mediodía (13:30-15:15)
          </div>
        </div>
      </div>
    </section>

    <section class="gift-section full-page" ref="giftRef">
      <p class="title-test">Regala Gastrogaratxe</p>
      <div class="gift-grid">
        <div class="gift-card">
          <h3>Petit menú Gastrogaratxe</h3>
          <p class="gift-schedule">
            Mié-Jue · mediodía y noche · Vie mediodía (13:30-15:15)
          </p>
          <div class="gift-item">
            <span>Solo Menú</span>
            <span class="price">40€</span>
          </div>
          <div class="gift-item">
            <span>Menú + Bodega*</span>
            <span class="price">60€/pers</span>
          </div>
        </div>

        <div class="gift-card">
          <h3>Gran menú Gastrogaratxe</h3>
          <p class="gift-schedule">Mié-Sáb · mediodía y noche</p>
          <div class="gift-item">
            <span>Solo Menú</span>
            <span class="price">75€</span>
          </div>
          <div class="gift-item">
            <span>Menú + Bodega*</span>
            <span class="price">95€/pers</span>
          </div>
          <div class="gift-item">
            <span>Menú + Maridaje</span>
            <span class="price">120€</span>
          </div>
        </div>
      </div>

      <div class="gift-footer">
        <p class="small">
          *Bodega (min 2 pers): Botella vino/espumoso + agua + cafés
        </p>
        <p class="highlight">Validez 6 meses. Reserva vía web.</p>
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
      <div class="contact-content">
        <p class="contact-text">
          Para más información no dudes en ponerte en contacto a través de
          nuestro WhatsApp o envíanos un mail
        </p>
        <div class="contact-links">
          <a
            href="mailto:info@gastrogaratxe.com"
            class="contact-link email-link"
          >
            info@gastrogaratxe.com
          </a>
          <a
            href="https://wa.me/34622368262"
            target="_blank"
            rel="noopener"
            class="contact-link whatsapp-link"
          >
            WhatsApp
          </a>
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

    .logos {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 0;
      img {
        height: 8.5vw;
        width: auto;
      }
      .slowfood {
        height: 12.75vw;
      }
    }

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
      .half {
        grid-column: span 1;
      }
      .contact-button {
        grid-column: span 2;
        background-color: transparent;
        color: white;
        font-family: "Orbitron", sans-serif;
        font-size: 5vw;
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
      padding-top: 1vh;
      border-radius: 0.5vw;
      position: relative;

      /* Allow columns to shrink and content to wrap instead of overflowing */
      .menu-column {
        flex: 1 1 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 0.6rem;

        /* Make all text wrap and break long words if needed */
        h3,
        .menu-price,
        .menu-steps,
        .menu-note {
          white-space: normal;
          overflow: visible;
          word-break: break-word;
          hyphens: auto;
          margin: 0;
        }

        h3 {
          font-family: "Orbitron", sans-serif;
          /* responsive size, will shrink on short screens */
          font-size: clamp(1.4rem, 5.5vw, 3.8rem);
          text-align: center;
          color: #fff;
        }

        .menu-price {
          font-family: "Orbitron", sans-serif;
          font-size: clamp(1.6rem, 5vw, 3.2rem);
          font-weight: 700;

          span {
            font-size: 0.8em;
            font-weight: 400;
            font-style: italic;
          }
        }

        .menu-steps {
          font-family: "Orbitron", sans-serif;
          font-size: clamp(1.4rem, 4.5vw, 2.8rem);
        }

        .menu-note {
          font-family: "Orbitron", sans-serif;
          font-size: clamp(1rem, 3.5vw, 1.6rem);
          text-align: center;
          opacity: 0.95;
        }
      }

      .menu-divider {
        width: 2px;
        background: #fff;
        margin: 0 1vw;
        align-self: stretch;
      }

      /* If viewport height is low, reduce spacing and font sizes further */
      @media (max-height: 700px) {
        gap: 1vw;
        .menu-column {
          padding: 0.5vh 1vw;
          h3 {
            font-size: clamp(1.2rem, 4.2vw, 3rem);
          }
          .menu-price {
            font-size: clamp(1.2rem, 3.8vw, 2.6rem);
          }
          .menu-steps {
            font-size: clamp(1rem, 3.5vw, 2.2rem);
          }
          .menu-note {
            font-size: clamp(0.9rem, 3vw, 1.2rem);
          }
        }
        .menu-divider {
          margin: 0 0.6vw;
        }
      }

      @media (max-height: 600px) {
        flex-direction: column;
        align-items: center;
        .menu-divider {
          display: none;
        }
        .menu-column {
          width: 100%;
        }
      }
    }
  }

  .gift-section {
    background: #0b0b0b;
    color: white;
    padding-top: 7vh;
    padding-left: 5%;
    padding-right: 5%;
    padding-bottom: 5%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    .title-test {
      font-size: 7vw;
      margin-bottom: 1rem;
    }

    .gift-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      width: 100%;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }

    .gift-card {
      background: rgba(255, 255, 255, 0.05);
      padding: 1.5rem;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      h3 {
        font-family: "Orbitron", sans-serif;
        font-size: clamp(1.2rem, 2.5vw, 1.8rem);
        color: #fff;
        margin: 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        padding-bottom: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .gift-schedule {
        font-family: "Orbitron", sans-serif;
        font-size: clamp(0.8rem, 1.5vw, 1rem);
        color: #aaa;
        margin: 0;
        margin-bottom: 1rem;
      }

      .gift-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: "Orbitron", sans-serif;
        font-size: clamp(0.9rem, 2vw, 1.2rem);
        margin-bottom: 0.5rem;
        overflow: hidden;
        .price {
          font-weight: bold;
          color: #ddd;
          margin-left: 1rem;
        }
      }
    }

    .gift-footer {
      margin-top: 1rem;
      text-align: center;
      font-family: "Orbitron", sans-serif;

      p {
        margin: 0.3rem 0;
        font-size: clamp(0.8rem, 1.5vw, 1rem);
        color: #ccc;
      }
      .highlight {
        color: #fff;
        font-weight: bold;
        margin-top: 0.5rem;
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

    .contact-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      gap: 3rem;
      text-align: center;
      padding: 2rem;
    }

    .contact-text {
      font-family: "Orbitron", sans-serif;
      font-size: clamp(1.2rem, 4vw, 2rem);
      color: #fff;
      max-width: 800px;
      line-height: 1.6;
      margin: 0;
    }

    .contact-links {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
    }

    .contact-link {
      font-family: "Orbitron", sans-serif;
      color: #fff;
      text-decoration: none;
      font-size: clamp(1.4rem, 4.5vw, 2.2rem);
      padding: 1rem 2rem;
      border: 2px solid #fff;
      border-radius: 8px;
      transition: all 0.3s ease;
      min-width: 280px;
      text-align: center;

      &:hover {
        background-color: #fff;
        color: #0f0f0f;
      }
    }

    .email-link {
      background-color: transparent;
    }

    .whatsapp-link {
      background-color: transparent;
    }

    @media (max-width: 768px) {
      .contact-content {
        gap: 2rem;
        padding: 1rem;
      }

      .contact-text {
        font-size: clamp(1rem, 5vw, 1.6rem);
      }

      .contact-link {
        font-size: clamp(1.2rem, 5vw, 1.8rem);
        min-width: 240px;
        padding: 0.8rem 1.5rem;
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
