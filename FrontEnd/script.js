// localStorage page admin
import { pageAdmin } from "./admin.js";

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    pageAdmin();
  }
});
// $$$$$$$$$$$$$$$$$==aide de chatGPT==$$$$$$$$$$$$$$$$$$$$$$$$$$
window.addEventListener("load", () => {
  if (window.location.hash === "#contact") {
    setTimeout(() => {
      const section = document.querySelector("#contact");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });

        // 🔥 supprime le #contact de l'URL
        history.replaceState(null, null, " ");
      }
    }, 100);
  }
});
// ======================Gérer la navigation============================

//Récupérer les bouttons
const btnLogin = document.querySelector(".btnLogin");
const btnProjet = document.querySelector(".btnProjet");
const btnContact = document.querySelector(".btnContact");
// evenement des bouttons de la nav
btnLogin.addEventListener("click", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  } else {
    window.location.href = "login.html";
  }
});

btnProjet.addEventListener("click", () => {
  window.location.href = "index.html#portfolio";
});

btnContact.addEventListener("click", () => {
  window.location.href = "index.html#contact";
});

// ================ Création de la galerie dynamique ================

// Variable globale pour stocker les travaux
let works = [];
//Création de la galerie
function afficherWorks(data) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  for (const element of data) {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = element.imageUrl;
    img.alt = `image de ${element.title}`;

    const figcaption = document.createElement("figcaption");
    figcaption.innerText = element.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  }
}
// gestion reponse api
async function afficherGallery() {
  try {
    const reponse = await fetch("http://localhost:5678/api/works");
    works = await reponse.json();
    afficherWorks(works);
    // $$$$$$$$$$$$$$$$$==aide de chatGPT==$$$$$$$$$$$$$$$$$$$$$$$$$$
    if (window.location.hash === "#contact") {
      const section = document.querySelector("#contact");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  } catch (error) {
    console.error("Erreur API :", error);
  }
}

afficherGallery();

// ====================== Boutons filtre =======================

function creeBtnFiltres() {
  const gallery = document.querySelector(".gallery");

  // Créer un conteneur pour les filtres
  const filtersContainer = document.createElement("div");
  filtersContainer.classList.add("filters");

  // Créer les boutons
  const btnTous = document.createElement("button");
  btnTous.innerText = "Tous";

  const btnObjets = document.createElement("button");
  btnObjets.innerText = "Objets";

  const btnHotels = document.createElement("button");
  btnHotels.innerText = "Hotels & restaurants";

  const btnAppartements = document.createElement("button");
  btnAppartements.innerText = "Appartements";

  // Ajouter les boutons dans le conteneur
  filtersContainer.appendChild(btnTous);
  filtersContainer.appendChild(btnObjets);
  filtersContainer.appendChild(btnAppartements);
  filtersContainer.appendChild(btnHotels);

  // Insérer le bloc filtres avant la galerie
  gallery.before(filtersContainer);
}

creeBtnFiltres();

const btnFiltres = document.querySelectorAll(".filters button");
btnFiltres.forEach((btn) => {
  btnFiltres[0].classList.add("active");
  btn.addEventListener("click", () => {
    btnFiltres.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    switch (btn.textContent) {
      case "Tous":
        afficherWorks(works);
        break;
      case "Objets":
        const filtresObjets = works.filter(
          (work) => work.category.name === "Objets",
        );
        afficherWorks(filtresObjets);
        break;
      case "Appartements":
        const filtresAppartements = works.filter(
          (work) => work.category.name === "Appartements",
        );
        afficherWorks(filtresAppartements);
        break;
      case "Hotels & restaurants":
        const filtresHotels = works.filter(
          (work) => work.category.name === "Hotels & restaurants",
        );
        afficherWorks(filtresHotels);
        break;
    }
  });
});
