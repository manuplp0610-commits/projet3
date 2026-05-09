async function afficherGallery() {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  try {
    const reponse = await fetch("http://localhost:5678/api/works");
    const data = await reponse.json();

    for (const elements of data) {
      const figure = document.createElement("figure");

      const img = document.createElement("img");
      img.src = elements.imageUrl;
      img.alt = ` image de ${elements.title}`;

      const figcaption = document.createElement("figcaption");
      figcaption.innerText = elements.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    }
  } catch (error) {
    console.error("Erreur API :", error);
    alert("Erreur réseau, impossible de charger les travaux");
  }
}
afficherGallery();
