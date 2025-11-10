// =====================
// CONFIG SUPABASE
// =====================
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://qzsmrnbpawbydqeezqua.supabase.co";
const SUPABASE_KEY = "SUA_CHAVE_ANON_AQUI";   // ANON KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const wrapper = document.querySelector(".carrossel-wrapper");
const livrosPorTela = 4; // Exibir 4 livros por vez
let livros = [];
let indiceAtual = 0;
const tempoTroca = 7000; // Trocar a cada 7 segundos

// =====================
// CARREGAR LIVROS DO BANCO
// =====================
async function carregarLivros() {
  const { data, error } = await supabase
    .from("livros")
    .select("titulo, descricao, capa_url")
    .limit(20);

  if (error) {
    console.error("Erro ao buscar livros:", error);
    return;
  }

  livros = data || [];
  if (livros.length > 0) {
    mostrarLivros();
    iniciarTroca();
  }
}

// =====================
// MOSTRAR LIVROS NA TELA
// =====================
function mostrarLivros() {
  wrapper.innerHTML = "";

  // Seleciona os próximos 4 livros (ou menos, se acabar)
  const grupo = livros.slice(indiceAtual, indiceAtual + livrosPorTela);
  if (grupo.length < livrosPorTela && indiceAtual !== 0) {
    // Se chegar ao fim, reinicia do começo
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
// TROCA AUTOMÁTICA
// =====================
function iniciarTroca() {
  setInterval(() => {
    indiceAtual += livrosPorTela;
    mostrarLivros();
  }, tempoTroca);
}

// =====================
// INICIALIZA
// =====================
carregarLivros();