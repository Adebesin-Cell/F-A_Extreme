const openBtn = document.querySelector(".menu__bar");
const closeBtn = document.querySelector(".menu__icon");
const menu = document.querySelector(".menu");
const body = document.querySelector("body");

const openMenu = function () {
  menu.classList.remove("menu--hidden");
  body.classList.add("no-scroll");
};

const closeMenu = function () {
  menu.classList.add("menu--hidden");
  body.classList.remove("no-scroll");
};

openBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
