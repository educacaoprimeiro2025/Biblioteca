// ==============================
// 🔗 CONEXÃO COM O SUPABASE
// ==============================
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://qzsmrnbpawbydqeezqua.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6c21ybmJwYXdieWRxZWV6cXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDM0NTAsImV4cCI6MjA3ODM3OTQ1MH0.HwOSk4_qtfRKLjYeO1o0e4qyXULxDRM7NSwzy2xvSoQ";
const supabase = createClient(supabaseUrl, supabaseKey);


// ==============================
// 📚 CÓDIGO PRINCIPAL
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const tipoUsuario = localStorage.getItem("tipoUsuario");
  const usuario = localStorage.getItem("usuario");
  const linkPerfil = document.querySelector('a[href="perfil.html"]');
  const header = document.querySelector("header");

  // 🔒 Verificação de login
  if (!tipoUsuario) {
    alert("Você precisa fazer login para acessar o catálogo.");
    window.location.href = "login.html";
    return;
  }

  // 👋 Mensagem de boas-vindas
  const msg = document.createElement("p");
  msg.style.textAlign = "right";
  msg.style.marginRight = "20px";
  msg.style.fontWeight = "bold";

  if (tipoUsuario === "visitante") {
    msg.textContent = "Acesso como Visitante";
  } else {
    msg.textContent = `Bem-vindo, ${usuario} (${tipoUsuario})`;
  }
  header.appendChild(msg);

  // 🚫 Restringe acesso do visitante e remove o botão de perfil
  if (tipoUsuario === "visitante") {
    if (linkPerfil) {
      const liPerfil = linkPerfil.closest("li");
      if (liPerfil) liPerfil.remove();
    }
    const botoesRestritos = document.querySelectorAll(".btn-editar, .btn-excluir");
    botoesRestritos.forEach((btn) => (btn.style.display = "none"));
  }

  // =====================================================================
  // 📚 CATÁLOGO DE LIVROS
  // =====================================================================
  const letrasContainer = document.getElementById("filtro-letras");
  const lista = document.getElementById("lista-livros");

  const alfabeto = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  let livros = [];

  // 🅰️ Gerar botões A–Z
  alfabeto.forEach((letra) => {
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.addEventListener("click", () => filtrarPorLetra(letra));
    letrasContainer.appendChild(btn);
  });

  // 🔠 Função de filtro
  function filtrarPorLetra(letra) {
    document.querySelectorAll("#filtro-letras button").forEach((btn) => btn.classList.remove("active"));

    const ativo = [...document.querySelectorAll("#filtro-letras button")].find(
      (btn) => btn.textContent === letra
    );
    if (ativo) ativo.classList.add("active");

    const filtrados = livros.filter((l) => l.titulo.toUpperCase().startsWith(letra));
    mostrarLivros(filtrados);
  }

  // 📘 Mostrar livros na tela
  function mostrarLivros(listaLivros) {
    lista.innerHTML = "";

    if (!listaLivros || listaLivros.length === 0) {
      lista.innerHTML = "<p>Nenhum livro encontrado.</p>";
      return;
    }

    listaLivros.forEach((livro) => {
      const li = document.createElement("li");
      li.className = "livro-card";

      li.innerHTML = `
        <img src="${
          livro.capa_url || "https://via.placeholder.com/200x260?text=Sem+Capa"
        }" alt="${livro.titulo}">
        <h3>${livro.titulo}</h3>
        <p>${livro.descricao || ""}</p>
      `;

      lista.appendChild(li);
    });
  }

  // 🔄 Buscar livros do Supabase
  async function carregarLivros() {
    lista.innerHTML = "<p>Carregando livros...</p>";

    const { data, error } = await supabase
      .from("livros")
      .select("id, titulo, descricao, capa_url")
      .order("titulo", { ascending: true });

    if (error) {
      console.error("❌ Erro ao carregar livros:", error.message);
      lista.innerHTML = `<p>Erro ao carregar livros: ${error.message}</p>`;
      return;
    }

    livros = data || [];
    mostrarLivros(livros);
  }

  // 👀 Carrega todos os livros do Supabase ao abrir a página
  carregarLivros();
});

// 🚪 Botão de sair
const btnLogout = document.querySelector(".botao-sair");
if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "../login/login.html";
  });

}
