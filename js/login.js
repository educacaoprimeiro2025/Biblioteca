document.addEventListener("DOMContentLoaded", () => {
  const btnAluno = document.getElementById("btnAluno");
  const btnProfessor = document.getElementById("btnProfessor");
  const btnVisitante = document.getElementById("btnVisitante");
  const loginForm = document.getElementById("loginForm");
  const botoes = document.querySelector(".user-type-buttons");

  let tipoUsuario = "";

  function mostrarLogin(tipo) {
    tipoUsuario = tipo;
    botoes.style.display = "none";
    loginForm.style.display = "block";
  }


  btnAluno.addEventListener("click", () => mostrarLogin("aluno"));


  btnProfessor.addEventListener("click", () => mostrarLogin("professor"));


  btnVisitante.addEventListener("click", () => {
    alert("Acesso como visitante. Algumas funções podem estar limitadas.");
    localStorage.setItem("tipoUsuario", "visitante"); 
    localStorage.removeItem("usuario"); 
    window.location.href = "../paginas/catalogo.html"; 
  });


  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("loginUser").value;

    if (!tipoUsuario) {
      alert("Selecione Aluno ou Professor antes de fazer login.");
      return;
    }


    localStorage.setItem("tipoUsuario", tipoUsuario);
    localStorage.setItem("usuario", user);

    alert(`Login como ${tipoUsuario}: ${user}`);
    window.location.href = "../paginas/catalogo.html";
  });
});