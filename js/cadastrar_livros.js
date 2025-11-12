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

  console.log("✅ Acesso permitido: usuário administrador.");
});

// ------------------------------
// 🟩 Cadastro do livro (com imagem otimizada)
// ------------------------------
const form = document.getElementById("formLivro");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.textContent = "📤 Enviando dados...";

  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const arquivo = document.getElementById("capa").files[0];

  if (!titulo || !descricao) {
    msg.textContent = "Preencha todos os campos.";
    return;
  }

  if (!arquivo) {
    msg.textContent = "Selecione uma imagem de capa.";
    return;
  }

  try {
    // 🖼️ Converte e redimensiona imagem antes do upload
    const imagemConvertida = await converterImagemParaWebP(arquivo, 300, 350);

    const nomeArquivo = `capas/${Date.now()}-${arquivo.name.split(".")[0]}.webp`;

    // 📦 Upload no Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("capas")
      .upload(nomeArquivo, imagemConvertida, {
        contentType: "image/webp",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // 🔗 Pega a URL pública
    const { data: urlData } = supabase.storage
      .from("capas")
      .getPublicUrl(nomeArquivo);

    const capa_url = urlData.publicUrl;

    // 💾 Salva o livro na tabela
    const { error } = await supabase
      .from("livros")
      .insert([{ titulo, descricao, capa_url }]);

    if (error) throw error;

    msg.textContent = "✅ Livro cadastrado com sucesso!";
    form.reset();
  } catch (err) {
    console.error(err);
    msg.textContent = "❌ Erro ao cadastrar livro.";
  }
});

// ------------------------------
// 📸 Função auxiliar: converter imagem para WebP e redimensionar
// ------------------------------
async function converterImagemParaWebP(arquivo, larguraMax, alturaMax) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(arquivo);

    img.onload = () => {
      // Define dimensões proporcionais
      let { width, height } = img;
      if (width > larguraMax || height > alturaMax) {
        const proporcao = Math.min(larguraMax / width, alturaMax / height);
        width *= proporcao;
        height *= proporcao;
      }

      // Desenha a imagem num canvas
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Converte o canvas em Blob .webp (qualidade 80%)
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (blob) resolve(blob);
          else reject("Falha ao converter imagem");
        },
        "image/webp",
        0.8
      );
    };

    img.onerror = reject;
    img.src = url;
  });
}
