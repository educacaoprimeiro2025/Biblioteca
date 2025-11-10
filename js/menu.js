document.addEventListener("DOMContentLoaded", () => {
  const btnAluno = document.getElementById("btnAluno");
  const btnProfessor = document.getElementById("btnProfessor");
  const userTypeButtons = document.querySelector(".user-type-buttons");
  const loginForm = document.getElementById("loginForm");

  let tipoUsuario = "";

  btnAluno.addEventListener("click", () => {
    tipoUsuario = "Aluno";
    mostrarFormulario();
  });

  btnProfessor.addEventListener("click", () => {
    tipoUsuario = "Professor";
    mostrarFormulario();
  });

  function mostrarFormulario() {
    // Esconde os botões e mostra o formulário
    userTypeButtons.style.display = "none";
    loginForm.style.display = "block";

    // Adiciona uma transição suave
    loginForm.style.opacity = "0";
    setTimeout(() => {
      loginForm.style.transition = "opacity 0.4s";
      loginForm.style.opacity = "1";
    }, 10);
  }

  // Exemplo de ação ao enviar login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const usuario = document.getElementById("loginUser").value;
    const senha = document.getElementById("loginPass").value;
    alert(`Login de ${tipoUsuario} realizado: ${usuario}`);
  });
});