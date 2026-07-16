
// Récupération des projets depuis l'API et affichage dans la galerie//
const galerie = document.querySelector(".gallery");
let projects = [];
const filters = document.querySelector(".filters");

function getData(endpoint) {
    return fetch("http://localhost:5678/api/" + endpoint)
        .then(response => response.json());
}

function displayProjets(projects) {
    projects.forEach(project => {
        let figure = document.createElement("figure");
        figure.dataset.categoryId = project.categoryId;
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

function displayCategories(categories) {
    categories.forEach(category => {
        let button = document.createElement("button");
        button.textContent = category.name;
        button.dataset.categoryId = category.id;
        filters.appendChild(button);
        button.addEventListener("click", () => {       
            removeActiveClass()    
            button.classList.add("active");
            filterProjects(button.dataset.categoryId);
        });
    });
}

function filterProjects(categoryId) {
    const figures = galerie.querySelectorAll("figure");
    figures.forEach(figure => {
        if (figure.dataset.categoryId === categoryId || categoryId === "all") {
            figure.style.display = "";
        } else {
            figure.style.display = "none";
        }
    });
}

function removeActiveClass() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.classList.remove("active"));
}

getData("works").then(works => {
    projects = works;
    displayProjets(projects);
});

getData("categories").then(categories => {
    displayCategories(categories);
});

const buttonAllCategories = document.querySelector(".buttonAllCategories");

buttonAllCategories.classList.add("active");

buttonAllCategories.addEventListener("click", () => { 
    removeActiveClass();
    buttonAllCategories.classList.add("active");
    filterProjects("all"); 
});


const token = localStorage.getItem("token");
console.log(token)

if (token) {
    const loginButton = document.querySelector(".loginButton")
    loginButton.textContent = "Logout"
    loginButton.addEventListener("click", () =>{
        event.preventDefault();
        localStorage.removeItem("token");
        window.location.reload();
    })
    console.log("Utilisateur connecté");
} else {
    console.log("Utilisateur non connecté");
}











