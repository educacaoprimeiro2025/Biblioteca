import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://qzsmrnbpawbydqeezqua.supabase.co";
const SUPABASE_KEY = "SUA_CHAVE_ANON_AQUI";   // ANON KEY
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Elemento onde os cards serão exibidos
const container = document.querySelector(".livros-container");

// Variáveis de controle
let livros = [];
let indiceAtual = 0;
const QUANTIDADE_POR_TELA = 4;
const INTERVALO_TROCA = 8000; // milissegundos (8 segundos)

// Função para buscar os livros do Supabase
async function carregarLivros() {
  const { data, error } = await supabase.from("livros").select("*");

  if (error) {
    console.error("Erro ao carregar livros:", error);
    return;
  }

  livros = data || [];
  mostrarLivros();
}

// Função para exibir os 4 livros atuais
function mostrarLivros() {
  if (livros.length === 0) {
    container.innerHTML = "<p>Nenhum livro disponível no momento.</p>";
    return;
  }

  // Seleciona os 4 próximos livros
  const exibidos = livros.slice(indiceAtual, indiceAtual + QUANTIDADE_POR_TELA);

  // Se chegar ao final da lista, volta pro início
  if (exibidos.length < QUANTIDADE_POR_TELA) {
    exibidos.push(
      ...livros.slice(0, QUANTIDADE_POR_TELA - exibidos.length)
    );
  }

  // Renderiza os cards
  container.innerHTML = exibidos
    .map(
      (livro) => `
      <div class="livro-card">
        <img src="${livro.capa_url}" alt="${livro.titulo}">
        <div class="descricao">
          <h3>${livro.titulo}</h3>
          <p>${livro.descricao}</p>
        </div>
      </div>
    `
    )
    .join("");

  // Atualiza o índice para o próximo conjunto
  indiceAtual = (indiceAtual + QUANTIDADE_POR_TELA) % livros.length;
}

// Atualiza automaticamente a cada intervalo
setInterval(mostrarLivros, INTERVALO_TROCA);

// Carrega os livros na inicialização
carregarLivros();