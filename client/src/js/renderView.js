import HomeView from "../views/HomeView.js";
import ProductView from "../views/ProductView.js";
import NotFoundView from "../views/NotFoundView.js";

import { carousel } from "../js/animations.js";
import { parseRequestUrl } from "../utils/index.js";

// ROUTE PATHS
const routes = {
  "/": HomeView,
  "/product/:id": ProductView,
};

//  RENDER HOME SCREEN METHOD
const router = () => {
  const request = parseRequestUrl();
  const parsedUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");

  const screen = routes[parsedUrl] ? routes[parsedUrl] : NotFoundView;

  // const header = document.getElementById("nav-banner");
  // header.innerHTML = screen.render();
  const main = document.getElementById("main-container");
  main.innerHTML = screen.render();

  // USER COMMENTS CAROUSEL
  carousel();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
