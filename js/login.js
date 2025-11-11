import { createClient } from "https://esm.sh/@supabase/supabase-js";

// 🔑 Substitua pela sua chave pública do Supabase (Project Settings → API → Project API keys → anon public)
const SUPABASE_URL = "https://qzsmrnbpawbydqeezqua.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6c21ybmJwYXdieWRxZWV6cXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDM0NTAsImV4cCI6MjA3ODM3OTQ1MH0.HwOSk4_qtfRKLjYeO1o0e4qyXULxDRM7NSwzy2xvSoQ";
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

  // 👤 Acesso visitante
  btnVisitante.addEventListener("click", () => {
    alert("Acesso como visitante. Algumas funções podem estar limitadas.");
    localStorage.setItem("tipoUsuario", "visitante");
    localStorage.removeItem("usuario");
    localStorage.setItem("adm", "false");
    window.location.href = "../paginas/catalogo.html";
  });

  // 🔑 LOGIN
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = document.getElementById("loginUser").value.trim();
    const senha = document.getElementById("loginPass").value.trim();

    if (!tipoUsuario) {
      alert("Selecione Aluno ou Professor antes de fazer login.");
      return;
    }

    // 🔍 Consulta no Supabase
    const { data, error } = await supabase
      .from("usuarios")
      .select("nome, senha, adm")
      .eq("nome", user)
      .eq("senha", senha)
      .single();

    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error || !data) {
      alert("Usuário ou senha incorretos.");
      return;
    }

    // 💾 Armazena dados no navegador
    localStorage.setItem("tipoUsuario", tipoUsuario);
    localStorage.setItem("usuario", data.nome);
    localStorage.setItem("adm", data.adm ? "true" : "false");

    alert(`Login como ${tipoUsuario}: ${data.nome}`);
    window.location.href = "../paginas/catalogo.html";
  });
});