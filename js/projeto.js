document.addEventListener("DOMContentLoaded", () => {
  const projetos = document.querySelectorAll(".projeto");
  let atual = 0;

  function mostrarProximo() {
    projetos[atual].classList.remove("ativo");
    atual = (atual + 1) % projetos.length;
    projetos[atual].classList.add("ativo");
  }

  // Exibe o primeiro projeto ao carregar
  projetos[0].classList.add("ativo");

  // Troca automaticamente a cada 5 segundos
  setInterval(mostrarProximo, 5000);
});