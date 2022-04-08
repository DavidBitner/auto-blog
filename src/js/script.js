import create_ripple from "./rippleEffect.js";

const btns = document.getElementsByClassName("btn");
const btnAdd = document.querySelector(`.btn`);
const blogContainer = document.querySelector(`.blog`);

for (const btn of btns) {
  btn.addEventListener("click", create_ripple);
}
