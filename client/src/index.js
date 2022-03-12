import HomeView from "./views/HomeView.js";
import ProductView from "./views/ProductView.js";
import NotFoundView from "./views/NotFoundView.js";

import { parseRequestUrl } from "./utils/index.js";

// ROUTE PATHS
const routes = {
  "/": HomeView,
  "/product/:id": ProductView,
};

//  RENDER HOME SCREEN METHOD
const router = async () => {
  const request = parseRequestUrl();
  const parsedUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");

  const screen = routes[parsedUrl] ? routes[parsedUrl] : NotFoundView;

  const main = document.getElementById("main-container");
  main.innerHTML = await screen.render();

  //  NAVBAR ANIMATION
  const nav = document.querySelector(".nav__container");
  const navHeight = 40;
  let lastScrollY = 0;
  const delta = 10;

  function scrolled() {
    let sy = window.scrollY;
    if (Math.abs(lastScrollY - sy) > delta) {
      if (sy > lastScrollY && sy > navHeight) {
        nav.classList.add("nav-up");
      } else if (sy < lastScrollY) {
        nav.classList.remove("nav-up");
      }
      lastScrollY = sy;
    }
  }

  let didScroll = false;
  window.addEventListener("scroll", function (e) {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      scrolled();
      didScroll = false;
    }
  }, 250);

  //  USER COMMENTS CAROUSEL
  const carousel = () => {
    const slides = document.querySelector(".customers__slides");
    const nextSlide = document.querySelector(".next-slide");
    const prevSlide = document.querySelector(".prev-slide");

    const slidesCount = slides.childElementCount;
    const maxLeft = (slidesCount - 1) * 100 * -1;
    const delay = 4000;
    let current = 0;

    const changeSlide = (next = true) => {
      next
        ? (current += current > maxLeft ? -100 : current * -1)
        : (current = current < 0 ? current + 100 : maxLeft);

      slides.style.left = current + "%";
    };

    let autoChange = setInterval(changeSlide, delay);
    const restart = () => {
      clearInterval(autoChange);
      autoChange = setInterval(changeSlide, delay);
    };

    // Controls
    nextSlide.addEventListener("click", () => {
      changeSlide();
      restart();
    });
    prevSlide.addEventListener("click", () => {
      changeSlide(false);
      restart();
    });
  };

  // PRODUCT MODAL
  const looks = document.querySelectorAll(".look");
  const getIds = document.querySelectorAll(".addToCart");

  const modal = document.querySelector("#modal");
  const removeModal = document.querySelector(".remove-modal");
  const body = document.querySelector("body");

  getIds.forEach((getId) => {
    getId.addEventListener("click", () => {
      console.log(getId.id);
    });
  });

  looks.forEach((look) => {
    look.addEventListener("click", () => {
      console.log(look.image);
      modal.style.display = "flex";
      body.style.overflow = "hidden";
    });
  });

  removeModal.onclick = (e) => {
    modal.style.display = "none";
    body.style.overflow = "initial";
  };
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
