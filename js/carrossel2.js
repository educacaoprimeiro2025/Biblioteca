import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://qzsmrnbpawbydqeezqua.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6c21ybmJwYXdieWRxZWV6cXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDM0NTAsImV4cCI6MjA3ODM3OTQ1MH0.HwOSk4_qtfRKLjYeO1o0e4qyXULxDRM7NSwzy2xvSoQ";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const wrapper = document.getElementById("carrosselLivros");
const indicadoresContainer = document.getElementById("indicadores");

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
  const quantidade = 4;

  for (let i = 0; i < quantidade; i++) {
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
}

function criarIndicadores(qtd) {
  indicadoresContainer.innerHTML = "";

  for (let i = 0; i < qtd; i++) {
    const bolinha = document.createElement("div");
    bolinha.classList.add("indicador");
    if (i === 0) bolinha.classList.add("ativo");
    bolinha.addEventListener("click", () => destacarLivro(i));
    indicadoresContainer.appendChild(bolinha);
  }
}

function destacarLivro(indice) {
  const cards = document.querySelectorAll(".card-livro");
  const bolinhas = document.querySelectorAll(".indicador");

  cards.forEach((card, i) => {
    card.style.opacity = i === indice ? "1" : "0.6";
    card.style.transform = i === indice ? "scale(1.05)" : "scale(1)";
  });

  bolinhas.forEach((b, i) =>
    b.classList.toggle("ativo", i === indice)
  );
}

carregarLivros();

