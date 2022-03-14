import NotFoundView from "./views/NotFoundView.js";
import HomeView from "./views/HomeView.js";
import ProductView from "./views/ProductView.js";
import CartView from "./views/CartView.js";

import { parseRequestUrl } from "./utils";

// ROUTE PATHS
const routes = {
  "/": HomeView,
  "/product/:id": ProductView,
  "/cart/:id": CartView,
  "/cart": CartView,
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
  await screen.switch_render();

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

  //  GET CURRENT YEAR
  const currentDate = new Date().getFullYear();
  document.getElementById("copy").innerText = currentDate;
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
