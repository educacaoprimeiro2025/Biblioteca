document.addEventListener("DOMContentLoaded", () => {
  const tipoUsuario = localStorage.getItem("tipoUsuario");
  const usuario = localStorage.getItem("usuario");
  const linkPerfil = document.querySelector('a[href="perfil.html"]');
  const header = document.querySelector("header");

  // 🔒 Verificação de login
  if (!tipoUsuario) {
    alert("Você precisa fazer login para acessar o catálogo.");
    window.location.href = "login.html";
    return;
  }

  // 👋 Mensagem de boas-vindas no topo
  const msg = document.createElement("p");
  msg.style.textAlign = "right";
  msg.style.marginRight = "20px";
  msg.style.fontWeight = "bold";

  if (tipoUsuario === "visitante") {
    msg.textContent = "Acesso como Visitante";
  } else {
    msg.textContent = `Bem-vindo, ${usuario} (${tipoUsuario})`;
  }
  header.appendChild(msg);

  // 🚫 Restringe acesso do visitante e remove espaço do botão "Perfil"
  if (tipoUsuario === "visitante") {
    if (linkPerfil) {
      const liPerfil = linkPerfil.closest("li");
      if (liPerfil) liPerfil.remove(); // remove o <li> inteiro pra não deixar espaço
    }
    const botoesRestritos = document.querySelectorAll(".btn-editar, .btn-excluir");
    botoesRestritos.forEach(btn => btn.style.display = "none");
  }

  // =====================================================================
  // 📚 CÓDIGO ORIGINAL DO CATÁLOGO
  // =====================================================================

  const letrasContainer = document.getElementById("filtro-letras");
  const lista = document.getElementById("lista-livros");

  // Letras A–Z
  const alfabeto = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

  // MOCK — (iremos trocar por dados do Supabase)
  let livros = [
    { 
      titulo: "A Droga da Obediência", 
      descricao: "Aventura estudantil cheia de mistérios.",
      capa_url: "https://via.placeholder.com/200x260?text=Livro+A"
    },
    { 
      titulo: "A Droga da Desobediência", 
      descricao: "Aventura estudantil cheia de mistérios.",
      capa_url: "https://via.placeholder.com/200x260?text=Livro+A"
    },
    { 
      titulo: "Bíblia Sagrada", 
      descricao: "Livro sagrado da tradição cristã.",
      capa_url: "https://via.placeholder.com/200x260?text=Livro+B"
    },
    { 
      titulo: "Dom Casmurro", 
      descricao: "Clássico de Machado de Assis.",
      capa_url: "https://via.placeholder.com/200x260?text=Livro+D"
    },
  ];

  // 🅰️ Gerar botões A–Z
  alfabeto.forEach(letra => {
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.addEventListener("click", () => filtrarPorLetra(letra));
    letrasContainer.appendChild(btn);
  });

  // 🔠 Função de filtro
  function filtrarPorLetra(letra) {
    document.querySelectorAll(".filtro-letras button")
      .forEach(btn => btn.classList.remove("active"));

    [...document.querySelectorAll(".filtro-letras button")]
      .find(btn => btn.textContent === letra)
      .classList.add("active");

    const filtrados = livros.filter(l => l.titulo.toUpperCase().startsWith(letra));
    mostrarLivros(filtrados);
  }

  // 📘 Mostrar livros na tela
  function mostrarLivros(listaLivros) {
    lista.innerHTML = "";

    if (listaLivros.length === 0) {
      lista.innerHTML = "<p>Nenhum livro encontrado.</p>";
      return;
    }

    listaLivros.forEach(livro => {
      const li = document.createElement("li");
      li.className = "livro-card";

      li.innerHTML = `
        <img src="${livro.capa_url}" alt="${livro.titulo}">
        <h3>${livro.titulo}</h3>
        <p>${livro.descricao}</p>
      `;

      lista.appendChild(li);
    });
  }

  // 👀 Mostra todos os livros por padrão ao abrir a página
  mostrarLivros(livros);
});

// 🚪 Botão de sair
const btnLogout = document.querySelector(".botao-sair");
if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "../login/login.html";
  });
}