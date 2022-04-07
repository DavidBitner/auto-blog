import create_ripple from "./rippleEffect.js";

const btns = document.getElementsByClassName("btn");

for (const btn of btns) {
  btn.addEventListener("click", create_ripple);
}
