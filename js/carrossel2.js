import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔹 Substitua com suas credenciais do Supabase
const SUPABASE_URL = "https://SEU-PROJETO.supabase.co";
const SUPABASE_ANON_KEY = "SUA-CHAVE-ANON";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const carrossel = document.getElementById("carrosselLivros");

// Função para buscar livros
async function carregarLivros() {
  const { data: livros, error } = await supabase
    .from("livros")
    .select("titulo, autor, imagem_url")
    .limit(4);

  if (error) {
    console.error("Erro ao buscar livros:", error);
    return;
  }

  // Limpa o conteúdo atual
  carrossel.innerHTML = "";

  if (!livros || livros.length === 0) {
    // Mostra 4 placeholders vazios
    for (let i = 0; i < 4; i++) {
      const vazio = document.createElement("div");
      vazio.classList.add("card-livro", "vazio");
      carrossel.appendChild(vazio);
    }
    return;
  }

  // Adiciona os livros do banco
  livros.forEach(livro => {
    const card = document.createElement("div");
    card.classList.add("card-livro");
    card.innerHTML = `
      <img src="${livro.imagem_url || '../assets/imagens/placeholder.png'}" alt="${livro.titulo}">
      <h3>${livro.titulo}</h3>
      <p>${livro.autor || ""}</p>
    `;
    carrossel.appendChild(card);
  });

  // Completa com placeholders se tiver menos de 4
  for (let i = livros.length; i < 4; i++) {
    const vazio = document.createElement("div");
    vazio.classList.add("card-livro", "vazio");
    carrossel.appendChild(vazio);
  }
}

carregarLivros();


