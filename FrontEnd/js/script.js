const galerie = document.querySelector(".gallery");
console.log(galerie);

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(travaux => {

        travaux.forEach(travail => {

            const figure = document.createElement("figure");

            const image = document.createElement("img");
            image.src = travail.imageUrl;
            image.alt = travail.title;

            const figcaption = document.createElement("figcaption");
            figcaption.textContent = travail.title;

            figure.appendChild(image);
            figure.appendChild(figcaption);

            galerie.appendChild(figure);

        });

    });