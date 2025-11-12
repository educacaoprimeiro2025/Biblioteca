import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// 🔗 Substitua pelos dados do seu projeto
const SUPABASE_URL = "https://qzsmrnbpawbydqeexzqua.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6c21ybmJwYXdieWRxZWV6cXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDM0NTAsImV4cCI6MjA3ODM3OTQ1MH0.HwOSk4_qtfRKLjYeO1o0e4qyXULxDRM7NSwzy2xvSoQ"; // anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const carrossel = document.getElementById("carrosselLivros");
const indicadores = document.getElementById("indicadores");

async function carregarLivros() {
  const { data: livros, error } = await supabase
    .from("livros")
    .select("titulo, descricao, capa_url")
    .limit(4);

  if (error) {
    console.error("Erro ao carregar livros:", error);
    return;
  }

  carrossel.innerHTML = "";
  indicadores.innerHTML = "";

  livros.forEach((livro, index) => {
    const card = document.createElement("div");
    card.classList.add("card-livro");
    card.innerHTML = `
      <img src="${livro.capa_url}" alt="${livro.titulo}">
      <h3>${livro.titulo}</h3>
      <p>${livro.descricao || "Sem descrição"}</p>
    `;
    carrossel.appendChild(card);

    const indicador = document.createElement("div");
    indicador.classList.add("indicador");
    if (index === 0) indicador.classList.add("ativo");
    indicador.addEventListener("click", () => irParaSlide(index));
    indicadores.appendChild(indicador);
  });

  iniciarCarrossel(livros.length);
}

let slideAtual = 0;

function irParaSlide(index) {
  const total = document.querySelectorAll(".card-livro").length;
  if (index >= total) index = 0;
  if (index < 0) index = total - 1;
  slideAtual = index;
  carrossel.style.transform = `translateX(-${index * 100}%)`;
  atualizarIndicadores();
}

function atualizarIndicadores() {
  document.querySelectorAll(".indicador").forEach((dot, i) => {
    dot.classList.toggle("ativo", i === slideAtual);
  });
}

function iniciarCarrossel(total) {
  setInterval(() => {
    slideAtual = (slideAtual + 1) % total;
    irParaSlide(slideAtual);
  }, 4000);
}

carregarLivros();
