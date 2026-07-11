
// Récupération des projets depuis l'API et affichage dans la galerie//
const galerie = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

function getData(endpoint) {
    return fetch("http://localhost:5678/api/" + endpoint)
        .then(response => response.json());
}

function displayProjets(projects) {
    galerie.innerHTML = ""; 
    projects.forEach(project => {
        let figure = document.createElement("figure");
        let image = document.createElement("img");
        image.src = project.imageUrl;
        image.alt = project.title;
        let figcaption = document.createElement("figcaption");
        figcaption.textContent = project.title;
        figure.appendChild(image);
        figure.appendChild(figcaption);
        galerie.appendChild(figure);
    });
}

function displayCategories() {
    getData("categories").then(categories => {
        categories.forEach(categorie => {
            const button = document.createElement("button");
            button.textContent = categorie.name;
            button.dataset.categoryId = categorie.id;
            button.addEventListener("click", () => {
                removeActiveClass();
                button.classList.add("active");
                const id = button.dataset.categoryId;
                const filteredProjects = projects.filter(project => project.categoryId == id);
                displayProjets(filteredProjects);
            });
            filters.appendChild(button);
        });
    });
}

function removeActiveClass() {
    const buttons = document.querySelectorAll(".filters button");
    buttons.forEach(btn => btn.classList.remove("active"));
}

const buttonAll = document.createElement("button");
buttonAll.textContent = "Tous";
buttonAll.classList.add("active");
buttonAll.addEventListener("click", () => {
    removeActiveClass();
    buttonAll.classList.add("active");
    displayProjets(projects);
});
filters.appendChild(buttonAll);

displayCategories();

getData("works").then(data => {
    projects = data;
    displayProjets(projects);
});










