// =====================
// CONFIG SUPABASE
// =====================
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://qzsmrnbpawbydqeezqua.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6c21ybmJwYXdieWRxZWV6cXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDM0NTAsImV4cCI6MjA3ODM3OTQ1MH0.HwOSk4_qtfRKLjYeO1o0e4qyXULxDRM7NSwzy2xvSoQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const wrapper = document.querySelector(".carrossel-wrapper");
const livrosPorTela = 4;
let livros = [];
let indiceAtual = 0;
const tempoTroca = 7000;

// =====================
// 🔹 CARREGAR LIVROS DO SUPABASE
// =====================
async function carregarLivros() {
  const { data, error } = await supabase
    .from("livros")
    .select("titulo, descricao, capa_url")
    .limit(20);

  if (error) {
    console.error("❌ Erro ao buscar livros:", error);
    wrapper.innerHTML = "<p>Erro ao carregar livros.</p>";
    return;
  }

  livros = data || [];

  if (livros.length > 0) {
    mostrarLivros();
    iniciarTroca();
  } else {
    wrapper.innerHTML = "<p>Nenhum livro encontrado.</p>";
  }
}

// =====================
// 🔹 MOSTRAR LIVROS
// =====================
function mostrarLivros() {
  wrapper.innerHTML = "";

  const grupo = livros.slice(indiceAtual, indiceAtual + livrosPorTela);

  // Reinicia se chegar ao fim
  if (grupo.length < livrosPorTela && indiceAtual !== 0) {
    indiceAtual = 0;
    return mostrarLivros();
  }

  grupo.forEach((livro) => {
    const card = document.createElement("div");
    card.classList.add("slide", "ativo");

    card.innerHTML = `
      <img src="${livro.capa_url}" alt="${livro.titulo}">
      <div class="descricao">
        <h3>${livro.titulo}</h3>
        <p>${livro.descricao}</p>
      </div>
    `;

    wrapper.appendChild(card);
  });
}

// =====================
// 🔹 TROCA AUTOMÁTICA
// =====================
function iniciarTroca() {
  setInterval(() => {
    indiceAtual += livrosPorTela;
    mostrarLivros();
  }, tempoTroca);
}

// =====================
// 🔹 INICIALIZA
// =====================
document.addEventListener("DOMContentLoaded", carregarLivros);