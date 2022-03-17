import NotFoundView from "./views/NotFoundView.js";
import HomeView from "./views/HomeView.js";
import ProductView from "./views/ProductView.js";
import CartView from "./views/CartView.js";
import SignInView from "./views/SignInView";
import SignUpView from "./views/SignUpView";
import HeaderView from "./views/HeaderView";
import ProfileView from "./views/ProfileView";
import ShippingView from "./views/ShippingView";
import PaymentView from "./views/PaymentView";
import PlaceOrderView from "./views/PlaceOrderView";

import { parseRequestUrl, showLoading, hideLoading } from "./utils";

// ROUTE PATHS
const routes = {
  "/": HomeView,
  "/product/:id": ProductView,
  "/cart/:id": CartView,
  "/cart": CartView,
  "/signin": SignInView,
  "/signup": SignUpView,
  "/profile": ProfileView,
  "/shipping": ShippingView,
  "/payment": PaymentView,
  "/placeorder": PlaceOrderView,
};

//  RENDER HOME SCREEN METHOD
const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parsedUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");

  // renderização da página não encontrada
  const screen = routes[parsedUrl] ? routes[parsedUrl] : NotFoundView;

  // renderização do header
  const header = document.getElementById("nav__container");
  header.innerHTML = await HeaderView.render();
  await HeaderView.switch_render();

  // renderização do main
  const main = document.getElementById("main-container");
  main.innerHTML = await screen.render();
  if (screen.switch_render) await screen.switch_render();
  hideLoading();

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
