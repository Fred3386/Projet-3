const galerie = document.querySelector(".gallery");
console.log(galerie);

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => {

        works.forEach(project => {
            const figure = document.createElement("figure");
            const image = document.createElement("img");
            image.src = project.imageUrl;
            image.alt = project.title;
            const figcaption = document.createElement("figcaption");
            figcaption.textContent = project.title;
            figure.appendChild(image);
            figure.appendChild(figcaption);
            galerie.appendChild(figure);
        });
    });

const filtres = document.querySelector(".filters");

    const boutonTous = document.createElement("button");
    boutonTous.textContent = "Tous";
    filtres.appendChild(boutonTous);

fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categories => {

        categories.forEach(categorie => {

            const bouton = document.createElement("button");
            bouton.textContent = categorie.name;

            filtres.appendChild(bouton);

        });

    });


