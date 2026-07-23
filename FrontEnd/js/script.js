
// Récupération des projets depuis l'API et affichage dans la galerie//
const galerie = document.querySelector(".gallery");
let projects = [];
const filters = document.querySelector(".filters");

function getData(endpoint) {
    return fetch("http://localhost:5678/api/" + endpoint)
        .then(response => response.json());
}

async function checkToken() {
    const token = sessionStorage.getItem("token");
    if (!token) {
        return false;
    }
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            sessionStorage.removeItem("token");
            return false;
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

function displayProjets(projects) {
    projects.forEach(project => {
        let figure = document.createElement("figure");
        figure.dataset.categoryId = project.categoryId;
        figure.dataset.id = project.id;
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
const modalGallery = document.querySelector(".modal-gallery");
function displayModalProjects(projects) {
    projects.forEach(project => {
        const figure = document.createElement("figure");
        figure.dataset.categoryId = project.categoryId;
        figure.dataset.id = project.id;
        const img = document.createElement("img");
        img.src = project.imageUrl;
        img.alt = project.title;
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteButton.addEventListener("click", () => {
            deleteProject(project.id, figure);
        });
        figure.appendChild(img);
        figure.appendChild(deleteButton);
        modalGallery.appendChild(figure);
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
    displayModalProjects(projects);
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

//Edition mode
async function editionMode() {
    const isAuthenticated = await checkToken();
    if (isAuthenticated) {
        const loginButton = document.querySelector(".loginButton");
        const editionBanner = document.querySelector(".editionBanner");
        const modifyButton = document.querySelector(".modify");
        const projectTitle = document.querySelector(".projects-title")
        editionBanner.classList.add("visible")
        loginButton.textContent = "logout";
        filters.classList.add("hidden");
        modifyButton.style.display = "flex";
        projectTitle.classList.add("edition")
        loginButton.addEventListener("click", (event) => {
            event.preventDefault();
            sessionStorage.removeItem("token");
            window.location.reload();
        });
        console.log("Utilisateur connecté");
    } else {
        console.log("Utilisateur non connecté");
    }
}

async function deleteProject(id, figure) {
    const token = sessionStorage.getItem("token");
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (response.ok) {
        figure.remove();
    } else {
        console.log("Erreur suppression");
    }
}

editionMode();

const modal = document.querySelector(".modal");
const modifyButton = document.querySelector(".modify");
const closeModal = document.querySelector(".close-modal");

modifyButton.addEventListener("click", () => {
    modal.style.display = "flex";
});
modal.addEventListener("click", () => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});












