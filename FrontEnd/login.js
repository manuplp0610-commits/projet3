const btnProjet = document.querySelector(".btnProjet");
const btnContact = document.querySelector(".btnContact");

btnProjet.addEventListener("click", () => {
  window.location.href = "index.html#portfolio";
});

btnContact.addEventListener("click", () => {
  window.location.href = "index.html#contact";
});

const formLogin = document.querySelector(".formLogin");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  if (email.value === "" || password.value === "") {
    alert("Veuillez saisir un utilisateur et un mot de passe");
  } else if (
    email.value !== "manuplp0610@gmail.com" ||
    password.value !== "aaa"
  ) {
    alert("Mauvais mot de passe ou email");
  } else {
    window.location = "index.html";
    localStorage.setItem("isLoggedIn", true);
  }
});
