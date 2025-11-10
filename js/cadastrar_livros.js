import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://SEU-PROJETO.supabase.co";
const SUPABASE_KEY = "SUA-CHAVE-ANON";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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

  // Nome único
  const nomeArquivo = `capas/${Date.now()}-${arquivo.name}`;

  // 1) Upload no Storage
  const { error: uploadError } = await supabase.storage
    .from("capas")
    .upload(nomeArquivo, arquivo);

  if (uploadError) {
    msg.textContent = "Erro ao enviar imagem!";
    console.error(uploadError);
    return;
  }

  // Pega URL pública
  const { data: urlData } = supabase.storage
    .from("capas")
    .getPublicUrl(nomeArquivo);

  const capa_url = urlData.publicUrl;

  // 2) Insere no banco
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