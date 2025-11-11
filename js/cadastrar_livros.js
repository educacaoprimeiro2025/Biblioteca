import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://qzsmrnbpawbydqeezqua.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6c21ybmJwYXdieWRxZWV6cXVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MDM0NTAsImV4cCI6MjA3ODM3OTQ1MH0.HwOSk4_qtfRKLjYeO1o0e4qyXULxDRM7NSwzy2xvSoQ";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


document.addEventListener("DOMContentLoaded", () => {
  const tipoUsuario = localStorage.getItem("tipoUsuario");
  const adm = localStorage.getItem("adm");

  if (!tipoUsuario) {
    alert("Você precisa estar logado!");
    window.location.href = "login.html";
    return;
  }

  if (adm !== "true") {
    alert("Apenas administradores podem cadastrar livros!");
    window.location.href = "catalogo.html";
    return;
  }
});



const form = document.getElementById("formLivro");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.textContent = "Salvando...";

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const arquivo = document.getElementById("capa").files[0];

  if (!arquivo) {
    msg.textContent = "Selecione uma imagem.";
    return;
  }


  const nomeArquivo = `capas/${Date.now()}-${arquivo.name}`;


  const { error: uploadError } = await supabase.storage
    .from("capas")
    .upload(nomeArquivo, arquivo);

  if (uploadError) {
    msg.textContent = "Erro ao enviar imagem!";
    console.error(uploadError);
    return;
  }


  const { data: urlData } = supabase.storage
    .from("capas")
    .getPublicUrl(nomeArquivo);

  const capa_url = urlData.publicUrl;


  const { error } = await supabase
    .from("livros")
    .insert([{ titulo, descricao, capa_url }]);

  if (error) {
    msg.textContent = "Erro ao cadastrar!";
    console.error(error);
    return;
  }

  msg.textContent = "✅ Livro cadastrado com sucesso!";
  form.reset();
});