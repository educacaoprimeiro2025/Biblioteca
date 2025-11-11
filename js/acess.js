document.addEventListener("DOMContentLoaded", () => {
  const btnAumentar = document.getElementById("aumentar-fonte");
  const btnDiminuir = document.getElementById("diminuir-fonte");
  const btnModoEscuro = document.getElementById("toggle-dark");
  const corpo = document.body;


  let tamanhoBase = 100;


  const modoEscuroAtivo = localStorage.getItem("modoEscuro") === "true";
  const tamanhoFonte = parseFloat(localStorage.getItem("tamanhoFonte"));

  if (modoEscuroAtivo) corpo.classList.add("dark-mode");

  if (!isNaN(tamanhoFonte)) {
    tamanhoBase = tamanhoFonte;
    document.documentElement.style.fontSize = tamanhoFonte + "%";
  } else {
    document.documentElement.style.fontSize = "100%";
  }


  btnModoEscuro?.addEventListener("click", () => {
    corpo.classList.toggle("dark-mode");
    localStorage.setItem("modoEscuro", corpo.classList.contains("dark-mode"));


    btnModoEscuro.textContent = corpo.classList.contains("dark-mode") ? "☀️" : "🌙";
  });


  btnAumentar?.addEventListener("click", () => {
    tamanhoBase += 10;
    document.documentElement.style.fontSize = tamanhoBase + "%";
    localStorage.setItem("tamanhoFonte", tamanhoBase);
  });


  btnDiminuir?.addEventListener("click", () => {
    tamanhoBase = Math.max(60, tamanhoBase - 10);
    document.documentElement.style.fontSize = tamanhoBase + "%";
    localStorage.setItem("tamanhoFonte", tamanhoBase);
  });


  const menu = document.querySelector(".menu-acessibilidade");
  const botaoPrincipal = document.querySelector(".botao-acessibilidade");

  botaoPrincipal?.addEventListener("click", () => {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  });
});