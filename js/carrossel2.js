import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://qzsmrnbpawbydqeezqua.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6c21ybmJwYXdieWRxZWV6cXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDM0NTAsImV4cCI6MjA3ODM3OTQ1MH0.HwOSk4_qtfRKLjYeO1o0e4qyXULxDRM7NSwzy2xvSoQ";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


const carrossel = document.getElementById("carrosselLivros");

async function carregarLivros() {
  console.log("🔎 Buscando livros no Supabase...");

  const { data: livros, error } = await supabase
    .from("livros") // <-- confira o nome exato da tabela
    .select("*")
    .limit(4);

  if (error) {
    console.error("❌ Erro Supabase:", error.message);
    return;
  }

  console.log("📚 Livros recebidos:", livros);

  carrossel.innerHTML = "";

  if (!livros || livros.length === 0) {
    console.log("⚠️ Nenhum livro encontrado.");
    for (let i = 0; i < 4; i++) {
      const vazio = document.createElement("div");
      vazio.classList.add("card-livro", "vazio");
      carrossel.appendChild(vazio);
    }
    return;
  }

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

  // completa com placeholders se tiver menos de 4
  for (let i = livros.length; i < 4; i++) {
    const vazio = document.createElement("div");
    vazio.classList.add("card-livro", "vazio");
    carrossel.appendChild(vazio);
  }
}

carregarLivros();



