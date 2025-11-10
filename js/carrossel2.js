// =====================
// CARROSSEL DE LIVROS (versão sem Supabase)
// =====================

const livros = [
  {
    titulo: "O Pequeno Príncipe",
    descricao:
      "Uma viagem poética sobre amizade, amor e o verdadeiro sentido da vida. Descubra como um menino vindo de outro planeta ensina lições que nenhum adulto jamais entenderia sozinho.",
    capa: "../assets/livros/pq.jpg",
  },
  {
    titulo: "Dom Casmurro",
    descricao:
      "Ciúme, dúvida e paixão se misturam numa das maiores obras da literatura brasileira. Bentinho narra sua história com Capitu — mas será que ele diz toda a verdade?",
    capa: "../assets/livros/dom.jpg",
  },
  {
    titulo: "Harry Potter e a Pedra Filosofal",
    descricao:
      "Um garoto comum descobre que é um bruxo e embarca em uma jornada mágica repleta de amizade, coragem e mistério. O início da saga que encantou gerações.",
    capa: "../assets/livros/hp.jpg",
  },
  {
    titulo: "A Menina que Roubava Livros",
    descricao:
      "Em meio à Segunda Guerra Mundial, Liesel encontra nos livros uma forma de resistir e sonhar. Uma história comovente narrada pela própria Morte — e impossível de esquecer.",
    capa: "../assets/livros/di.jpg",
  },
];

const wrapper = document.getElementById("carrosselLivros");
let indiceAtual = 0;
let intervalo;

// =====================
// CRIAR ELEMENTOS
// =====================
function criarSlides() {
  wrapper.innerHTML = "";
  livros.forEach((livro, i) => {
    const card = document.createElement("div");
    card.classList.add("slide");
    if (i === 0) card.classList.add("ativo");

    card.innerHTML = `
      <img src="${livro.capa}" alt="${livro.titulo}">
      <div class="descricao">
        <h3>${livro.titulo}</h3>
        <p>${livro.descricao}</p>
      </div>
    `;
    wrapper.appendChild(card);
  });

  // 🔹 Criar indicadores (bolinhas)
  const indicadores = document.createElement("div");
  indicadores.classList.add("carrossel-indicadores");
  livros.forEach((_, i) => {
    const btn = document.createElement("button");
    if (i === 0) btn.classList.add("ativo");
    btn.addEventListener("click", () => irParaSlide(i));
    indicadores.appendChild(btn);
  });
  wrapper.parentElement.appendChild(indicadores);
}

// =====================
// MOSTRAR SLIDE
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
// TROCA AUTOMÁTICA
// =====================
function iniciarTroca() {
  intervalo = setInterval(() => {
    indiceAtual = (indiceAtual + 1) % livros.length;
    mostrarSlide(indiceAtual);
  }, 6000);
}

// =====================
// IR PARA SLIDE MANUAL
// =====================
function irParaSlide(index) {
  clearInterval(intervalo);
  indiceAtual = index;
  mostrarSlide(index);
  iniciarTroca(); // reinicia o loop
}

// =====================
// INICIALIZA
// =====================
document.addEventListener("DOMContentLoaded", () => {
  criarSlides();
  iniciarTroca();
});