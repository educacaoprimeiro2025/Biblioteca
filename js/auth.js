// =====================
// CONFIG SUPABASE
// =====================
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://qzsmrnbpawbydqeezqua.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6c21ybmJwYXdieWRxZWV6cXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDM0NTAsImV4cCI6MjA3ODM3OTQ1MH0.HwOSk4_qtfRKLjYeO1o0e4qyXULxDRM7NSwzy2xvSoQ";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// =====================
// CHECAR SESSÃO EXISTENTE
// =====================
async function verificarSessao() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Erro ao obter sessão:", error);
    return;
  }

  const sessao = data.session;

  const menu = document.querySelector(".menu ul");

  if (sessao && sessao.user) {
    // Usuário logado — mostra Perfil e Sair
    menu.innerHTML = `
      <li><a href="home.html">Home</a></li>
      <li><a href="sobre.html">Sobre</a></li>
      <li><a href="projetos.html">Projetos</a></li>
      <li><a href="perfil.html">Perfil</a></li>
      <li><a href="#" onclick="logout()">Sair</a></li>
    `;
  } else {
    // Visitante — mostra Login
    menu.innerHTML = `
      <li><a href="home.html">Home</a></li>
      <li><a href="sobre.html">Sobre</a></li>
      <li><a href="projetos.html">Projetos</a></li>
      <li><a href="login.html" class="botao-login">Login</a></li>
    `;
  }
}

// =====================
// LOGOUT
// =====================
async function logout() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}

// =====================
// EXECUTAR AO CARREGAR
// =====================
document.addEventListener("DOMContentLoaded", verificarSessao);