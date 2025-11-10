const body = document.body;
const btn = document.getElementById("toggle-dark");

btn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});