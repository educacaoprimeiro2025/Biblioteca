import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://qzsmrnbpawbydqeezqua.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6c21ybmJwYXdieWRxZWV6cXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDM0NTAsImV4cCI6MjA3ODM3OTQ1MH0.HwOSk4_qtfRKLjYeO1o0e4qyXULxDRM7NSwzy2xvSoQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const wrapper = document.querySelector(".carrossel-wrapper");
const indicadoresContainer = document.createElement("div");
indicadoresContainer.classList.add("carrossel-indicadores");
wrapper.insertAdjacentElement("afterend", indicadoresContainer);

let livros = [];
let indiceAtual = 0;
const tempoTroca = 5000; // 5s por slide

// =====================
// 🔹 CARREGAR LIVROS
// =====================
async function carregarLivros() {
  const { data, error } = await supabase
    .from("livros")
    .select("titulo, descricao, capa_url")
    .limit(10);

  if (error) {
    console.error("❌ Erro ao buscar livros:", error);
    wrapper.innerHTML = "<p>Erro ao carregar livros.</p>";
    return;
  }

  livros = data || [];
  if (livros.length === 0) {
    wrapper.innerHTML = "<p>Nenhum livro encontrado.</p>";
    return;
  }

  criarSlides();
  criarIndicadores();
  mostrarSlide(0);
  iniciarTrocaAutomatica();
}

// =====================
// 🔹 CRIAR SLIDES
// =====================
function criarSlides() {
  wrapper.innerHTML = "";
  livros.forEach((livro, i) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    slide.innerHTML = `
      <img src="${livro.capa_url}" alt="${livro.titulo}">
      <div class="descricao">
        <h3>${livro.titulo}</h3>
        <p>${livro.descricao}</p>
      </div>
    `;
    wrapper.appendChild(slide);
  });
}

// =====================
// 🔹 CRIAR INDICADORES
// =====================
function criarIndicadores() {
  indicadoresContainer.innerHTML = "";
  livros.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.addEventListener("click", () => mostrarSlide(i));
    indicadoresContainer.appendChild(btn);
  });
}

// =====================
// 🔹 MOSTRAR SLIDE ATUAL
// =====================
function mostrarSlide(indice) {
  const slides = document.querySelectorAll(".slide");
  const indicadores = document.querySelectorAll(".carrossel-indicadores button");

  slides.forEach((s, i) => {
    s.classList.remove("ativo");
    s.style.opacity = "0.4";
    s.style.transform = "scale(0.9)";
    s.style.filter = "blur(2px)";
    indicadores[i].classList.remove("ativo");
  });

  slides[indice].classList.add("ativo");
  slides[indice].style.opacity = "1";
  slides[indice].style.transform = "scale(1.05)";
  slides[indice].style.filter = "none";
  indicadores[indice].classList.add("ativo");

  indiceAtual = indice;
}

// =====================
// 🔹 TROCA AUTOMÁTICA
// =====================
function iniciarTrocaAutomatica() {
  setInterval(() => {
    indiceAtual = (indiceAtual + 1) % livros.length;
    mostrarSlide(indiceAtual);
  }, tempoTroca);
}

document.addEventListener("DOMContentLoaded", carregarLivros);
