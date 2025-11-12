// ===========================
// 🔐 Controle de Sessão Local
// ===========================
export function verificarLogin(redirecionar = true) {
  const tipoUsuario = localStorage.getItem("tipoUsuario");
  const usuario = localStorage.getItem("usuario");
  const adm = localStorage.getItem("adm");

  if (!tipoUsuario) {
    if (redirecionar) {
      alert("Você precisa estar logado para acessar esta página!");
      window.location.href = "../paginas/login.html";
    }
    return null;
  }

  return { tipoUsuario, usuario, adm };
}

// ===========================
// 🚪 Logout (sair da conta)
// ===========================
export function logout() {
  localStorage.clear();
  window.location.href = "../paginas/login.html";
}

// ===========================
// 👀 Mostrar usuário no header
// ===========================
export function mostrarUsuarioHeader() {
  const header = document.querySelector("header");
  const usuario = localStorage.getItem("usuario");
  const tipoUsuario = localStorage.getItem("tipoUsuario");

  if (!header || !usuario || !tipoUsuario) return;

  const msg = document.createElement("p");
  msg.textContent = `Bem-vindo, ${usuario} (${tipoUsuario})`;
  msg.style.textAlign = "right";
  msg.style.marginRight = "20px";
  msg.style.fontWeight = "bold";
  header.appendChild(msg);
}
