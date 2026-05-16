export function pageAdmin() {
  createBanner();
  loginButton();
  removeFilters();
  portfolioTitle();
  setImage();
}

// ==================BANNIÈRE=================
function createBanner() {
  const banner = document.createElement("div");
  banner.className = "banner";
  banner.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> Mode édition`;
  document.body.prepend(banner);
}

// ==================LOGIN → LOGOUT====================
function loginButton() {
  const btnLogin = document.querySelector(".btnLogin");
  if (btnLogin) {
    btnLogin.textContent = "Logout";
  }
}

// ================FILTRES====================
function removeFilters() {
  const filters = document.querySelector(".filters");
  if (filters) {
    filters.style.display = "none";
  }
}

// =================TITRE + BOUTON MODIF=================
function portfolioTitle() {
  const title = document.querySelector("#portfolio h2");
  if (!title) return;

  title.style.marginTop = "150px";
  title.style.marginBottom = "100px";

  const btnModif = document.createElement("span");
  btnModif.className = "btnModif";
  btnModif.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> modifier`;

  title.appendChild(btnModif);

  btnModif.addEventListener("click", openModal);
}

// ======================MODALE====================
function openModal() {
  if (document.querySelector(".fondModif")) return;

  const fondModif = document.createElement("div");
  fondModif.className = "fondModif";

  const fenetreModif = document.createElement("div");
  fenetreModif.className = "fenetreModif";
  fondModif.style.height = document.body.scrollHeight + "px";
  fondModif.appendChild(fenetreModif);
  document.body.prepend(fondModif);

  createModalContent(fenetreModif, fondModif);
}

// ==================CONTENU MODALE======================
function createModalContent(container, fondModif) {
  // bouton fermer
  const closeBtn = document.createElement("span");
  closeBtn.className = "fermerModif";
  closeBtn.textContent = "X";
  container.appendChild(closeBtn);

  closeBtn.addEventListener("click", () => fondModif.remove());

  // fermer au clic extérieur
  fondModif.addEventListener("click", (e) => {
    if (e.target === fondModif) {
      fondModif.remove();
    }
  });

  // titre gallerie
  const title = document.createElement("h4");
  title.className = "titleGallery";
  title.textContent = "Galerie photos";
  container.appendChild(title);

  // galerie
  const galerie = document.createElement("div");
  galerie.className = "galeriePhotos";
  container.appendChild(galerie);

  afficherGallery(galerie);

  // séparateur
  const separator = document.createElement("hr");
  container.appendChild(separator);

  // bouton ajouter
  const btnAjouter = document.createElement("button");
  btnAjouter.className = "btnAjouterPhoto";
  btnAjouter.textContent = "Ajouter une photo";
  container.appendChild(btnAjouter);
  btnAjouter.addEventListener("click", () => {
    title.textContent = "Ajout photo";
    btnAjouter.textContent = "";
    galerie.innerHTML = "";

    // bouton retour
    const btnRetour = document.createElement("button");
    btnRetour.textContent = "←";
    btnRetour.className = "btnRetour";

    btnRetour.addEventListener("click", () => {
      title.textContent = "Galerie photos";
      galerie.innerHTML = "";
      btnAjouter.textContent = "Ajouter une photo";
      afficherGallery(galerie);
    });

    galerie.appendChild(btnRetour);

    // formulaire
    const form = document.createElement("form");
    form.className = "formulairAjout";
    form.innerHTML = `
  <div class="zoneAjout">
    <i class="fa-regular fa-image"></i>
    <label class="btnajout">
      + Ajouter photo
      <input type="file" name="image" hidden required>
    </label>
    <p>jpg, png : 4mo max</p>
  </div>

  <label>Titre</label>
  <input type="text" name="title" required>

  <label>Catégorie</label>
  <select name="category" required>
    <option value=""></option>
  </select>
  <button type="submit">Valider</button>
`;

    galerie.appendChild(form);
    const select = form.querySelector("select");
    loadCategories(select);
  });
}
// prendre categories de l API
async function loadCategories(select) {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    categories.forEach((categorie) => {
      const option = document.createElement("option");
      option.value = categorie.id;
      option.textContent = categorie.name;

      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur catégories :", error);
  }
}
// ==================API======================
async function afficherGallery(galerie) {
  try {
    galerie.innerHTML = "";

    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();

    works.forEach((work) => {
      // wrapper image
      const wrapper = document.createElement("div");
      wrapper.className = "imgWrapper";

      // image
      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;
      img.className = "galeriePhotosImg";

      // boutton poubelle
      const trash = document.createElement("i");
      trash.className = "fa-solid fa-trash trashIcon";

      trash.addEventListener("click", () => {
        console.log("sup : " + work.title);
      });

      // assemblage
      wrapper.appendChild(img);
      wrapper.appendChild(trash);
      galerie.appendChild(wrapper);
    });
  } catch (error) {
    console.error("Erreur API :", error);
  }
}
// ============ SET IMAGES =============
function setImage(params) {
  const formulairAjout = document.querySelector(".formulairAjout");
  formulairAjout.addEventListener();
}
