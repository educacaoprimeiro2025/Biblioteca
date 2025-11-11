import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://qzsmrnbpawbydqeezqua.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6c21ybmJwYXdieWRxZWV6cXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDM0NTAsImV4cCI6MjA3ODM3OTQ1MH0.HwOSk4_qtfRKLjYeO1o0e4qyXULxDRM7NSwzy2xvSoQ";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const wrapper = document.getElementById("carrosselLivros");

let livros = [];
let indiceAtual = 0;
let intervalo;

// =====================
// 🔹 BUSCA LIVROS NO SUPABASE
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

  if (livros.length === 0) {
    wrapper.innerHTML = "<p>Nenhum livro encontrado.</p>";
    return;
  }

  criarSlides();
  iniciarTroca();
}

// =====================
// 🔹 CRIA SLIDES
// =====================
function criarSlides() {
  wrapper.innerHTML = "";
  const container = wrapper.parentElement;

  // Apaga indicadores antigos
  const antigos = container.querySelector(".carrossel-indicadores");
  if (antigos) antigos.remove();

  livros.forEach((livro, i) => {
    const card = document.createElement("div");
    card.classList.add("slide");
    if (i === 0) card.classList.add("ativo");

    card.innerHTML = `
      <img src="${livro.capa_url}" alt="${livro.titulo}">
      <div class="descricao">
        <h3>${livro.titulo}</h3>
        <p>${livro.descricao}</p>
      </div>
    `;
    wrapper.appendChild(card);
  });

  // 🔹 Criar indicadores
  const indicadores = document.createElement("div");
  indicadores.classList.add("carrossel-indicadores");

  livros.forEach((_, i) => {
    const btn = document.createElement("button");
    if (i === 0) btn.classList.add("ativo");
    btn.addEventListener("click", () => irParaSlide(i));
    indicadores.appendChild(btn);
  });

  container.appendChild(indicadores);
}

// =====================
// 🔹 MOSTRAR SLIDE
// =====================
function mostrarSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const botoes = document.querySelectorAll(".carrossel-indicadores button");

  slides.forEach((slide, i) => {
    slide.classList.remove("ativo");
    botoes[i].classList.remove("ativo");
  });

  slides[index].classList.add("ativo");
  botoes[index].classList.add("ativo");
}

// =====================
// 🔹 TROCA AUTOMÁTICA
// =====================
function iniciarTroca() {
  intervalo = setInterval(() => {
    indiceAtual = (indiceAtual + 1) % livros.length;
    mostrarSlide(indiceAtual);
  }, 6000);
}

// =====================
// 🔹 SLIDE MANUAL
// =====================
function irParaSlide(index) {
  clearInterval(intervalo);
  indiceAtual = index;
  mostrarSlide(index);
  iniciarTroca();
}

// =====================
// 🔹 INICIALIZA
// =====================
document.addEventListener("DOMContentLoaded", () => {
  carregarLivros();
});