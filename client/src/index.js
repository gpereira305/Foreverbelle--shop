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
import OrderView from "./views/OrderView.js";

import { parseRequestUrl, showLoading, hideLoading } from "./utils";

// ROUTE PATHS
const routes = {
  "/": HomeView,
  "/product/:id": ProductView,
  "/order/:id": OrderView,
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
  let didScroll = false;

  const scrolled = () => {
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
  window.onscroll = (e) =>  didScroll = true; 
  setInterval(function () {
    if (didScroll) {
      scrolled();
      didScroll = false;
    }
  }, 250);

// NAVBAR MOBILE
const mobileMenu = document.querySelector('#mobile-menu');
const navMenu = document.querySelector('#nav__menu');

mobileMenu.onclick = () => {
  navMenu.classList.toggle('visible')  
}
  

// GOT TO HTE TOP OF THE PAGE BUTTON
 const scrollToTopBtn = document.querySelector(".scrollToTopBtn");
 const  rootElement = document.documentElement; 

const handleScroll = () => { 
  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0.1) { 
    scrollToTopBtn.classList.add("showBtn");
  } else { 
    scrollToTopBtn.classList.remove("showBtn");
  }
}

const scrollToTop = () => { 
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
scrollToTopBtn.onclick = () => scrollToTop() 
document.onscroll = () => handleScroll() 


  //  GET CURRENT YEAR
  const currentDate = new Date().getFullYear();
  document.getElementById("copy").innerText = currentDate;
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
