import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://qzsmrnbpawbydqeezqua.supabase.co";
const SUPABASE_KEY = "SUA_CHAVE_PUBLIC_ANON_AQUI";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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

  // ✅ visitante
  btnVisitante.addEventListener("click", () => {
    alert("Acesso como visitante. Algumas funções podem estar limitadas.");
    localStorage.setItem("tipoUsuario", "visitante");
    localStorage.removeItem("usuario");
    localStorage.setItem("adm", "false");
    window.location.href = "../paginas/catalogo.html";
  });

  // ✅ LOGIN
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = document.getElementById("loginUser").value;

    if (!tipoUsuario) {
      alert("Selecione Aluno ou Professor antes de fazer login.");
      return;
    }

    const { data, error } = await supabase
      .from("usuarios")
      .select("nome, adm")
      .eq("nome", user)
      .single();

    if (error || !data) {
      alert("Usuário não encontrado.");
      return;
    }

    localStorage.setItem("tipoUsuario", tipoUsuario);
    localStorage.setItem("usuario", data.nome);
    localStorage.setItem("adm", data.adm ? "true" : "false");

    alert(`Login como ${tipoUsuario}: ${data.nome}`);
    window.location.href = "../paginas/catalogo.html";
  });
});