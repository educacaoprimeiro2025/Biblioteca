document.addEventListener("DOMContentLoaded", () => {
  const btnAumentar = document.getElementById("aumentar-fonte");
  const btnDiminuir = document.getElementById("diminuir-fonte");
  const btnModoEscuro = document.getElementById("toggle-dark");
  const corpo = document.body;

  // 🔹 Define tamanho base inicial
  let tamanhoBase = 100;

  // 🔹 Recuperar preferências salvas
  const modoEscuroAtivo = localStorage.getItem("modoEscuro") === "true";
  const tamanhoFonte = parseFloat(localStorage.getItem("tamanhoFonte"));

  if (modoEscuroAtivo) corpo.classList.add("dark-mode");

  if (!isNaN(tamanhoFonte)) {
    tamanhoBase = tamanhoFonte;
    document.documentElement.style.fontSize = tamanhoFonte + "%";
  } else {
    document.documentElement.style.fontSize = "100%";
  }

  // 🔹 Alternar modo escuro
  btnModoEscuro?.addEventListener("click", () => {
    corpo.classList.toggle("dark-mode");
    localStorage.setItem("modoEscuro", corpo.classList.contains("dark-mode"));

    // Altera o emoji do botão (lua ↔ sol)
    btnModoEscuro.textContent = corpo.classList.contains("dark-mode") ? "☀️" : "🌙";
  });

  // 🔹 Aumentar fonte
  btnAumentar?.addEventListener("click", () => {
    tamanhoBase += 10;
    document.documentElement.style.fontSize = tamanhoBase + "%";
    localStorage.setItem("tamanhoFonte", tamanhoBase);
  });

  // 🔹 Diminuir fonte
  btnDiminuir?.addEventListener("click", () => {
    tamanhoBase = Math.max(60, tamanhoBase - 10);
    document.documentElement.style.fontSize = tamanhoBase + "%";
    localStorage.setItem("tamanhoFonte", tamanhoBase);
  });

  // 🔹 Exibir/ocultar menu
  const menu = document.querySelector(".menu-acessibilidade");
  const botaoPrincipal = document.querySelector(".botao-acessibilidade");

  botaoPrincipal?.addEventListener("click", () => {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  });
});