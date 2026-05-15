export function pageAdmin() {
  // creation banniere
  const banner = document.createElement("div");
  banner.className = "banner";
  banner.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> Mode édition';
  document.body.insertBefore(banner, document.body.firstChild);

  // modif "login" en "Logout"
  const btnLogin = document.querySelector(".btnLogin");
  btnLogin.textContent = "Logout";

  //   Enlever les fitres
  const filters = document.querySelector(".filters");
  filters.style.display = "none";

  //  titre mes projets et btn modif
  const titreMesPtojets = document.querySelector("#portfolio h2");
  const btnModif = document.createElement("span");
  btnModif.className = "btnModif";
  btnModif.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> Modifier`;
  titreMesPtojets.appendChild(btnModif);
}
