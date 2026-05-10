const btnLogin = document.querySelector(".btnLogin");
const btnProjet = document.querySelector(".btnProjet");
const btnContact = document.querySelector(".btnContact");

btnLogin.addEventListener("click", () => {
  window.location.href = "login.html";
});

btnProjet.addEventListener("click", () => {
  window.location.href = "index.html#portfolio";
});

btnContact.addEventListener("click", () => {
  window.location.href = "index.html";
});
