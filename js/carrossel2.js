import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://qzsmrnbpawbydqeezqua.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6c21ybmJwYXdieWRxZWV6cXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDM0NTAsImV4cCI6MjA3ODM3OTQ1MH0.HwOSk4_qtfRKLjYeO1o0e4qyXULxDRM7NSwzy2xvSoQ";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const wrapper = document.getElementById("carrosselLivros");
const indicadoresContainer = document.getElementById("indicadores");

let indiceAtual = 0;
let totalLivros = 0;
let intervaloCarrossel = null;

async function carregarLivros() {
  const { data: livros, error } = await supabase
    .from("livros")
    .select("titulo, descricao, capa_url")
    .limit(4);

  if (error) {
    console.error("Erro ao buscar livros:", error);
    return;
  }

  wrapper.innerHTML = "";
  totalLivros = 4;

  for (let i = 0; i < totalLivros; i++) {
    const livro = livros[i];
    const card = document.createElement("div");
    card.classList.add("card-livro");

    if (livro) {
      const capaUrl = livro.capa_url?.startsWith("http")
        ? livro.capa_url
        : `${SUPABASE_URL}/storage/v1/object/public/capas/${livro.capa_url}`;

      card.innerHTML = `
        <img src="${capaUrl}" alt="${livro.titulo}">
        <h3>${livro.titulo}</h3>
        <p>${livro.descricao || ""}</p>
      `;
    } else {
      card.classList.add("vazio");
    }

    wrapper.appendChild(card);
  }

  criarIndicadores(livros.length);
  destacarLivro(0);
  iniciarAnimacao();
}

function criarIndicadores(qtd) {
  indicadoresContainer.innerHTML = "";
  for (let i = 0; i < qtd; i++) {
    const bolinha = document.createElement("div");
    bolinha.classList.add("indicador");
    if (i === 0) bolinha.classList.add("ativo");
    bolinha.addEventListener("click", () => destacarLivro(i, true));
    indicadoresContainer.appendChild(bolinha);
  }
}

function destacarLivro(indice, manual = false) {
  const cards = document.querySelectorAll(".card-livro");
  const bolinhas = document.querySelectorAll(".indicador");

  cards.forEach((card, i) => {
    card.style.opacity = i === indice ? "1" : "0.5";
    card.style.transform = i === indice ? "scale(1.07)" : "scale(1)";
    card.style.transition = "all 0.8s ease";
  });

  bolinhas.forEach((b, i) =>
    b.classList.toggle("ativo", i === indice)
  );

  indiceAtual = indice;

  // se o usuário clicar manualmente, reinicia o timer
  if (manual) {
    clearInterval(intervaloCarrossel);
    iniciarAnimacao();
  }
}

function iniciarAnimacao() {
  clearInterval(intervaloCarrossel);
  intervaloCarrossel = setInterval(() => {
    const bolinhas = document.querySelectorAll(".indicador");
    if (bolinhas.length === 0) return;
    indiceAtual = (indiceAtual + 1) % bolinhas.length;
    destacarLivro(indiceAtual);
  }, 4000); // muda a cada 4 segundos
}

carregarLivros();
