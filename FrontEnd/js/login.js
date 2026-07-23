const loginForm = document.querySelector(".loginForm");
const errorMessage = document.querySelector(".errorMessage");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const login = {
        email: email,
        password: password
    }
    const response = await fetch("http://localhost:5678/api/users/login", {  
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(login)     
})
    if (response.ok) {
        const data = await response.json();  
        sessionStorage.setItem("token", data.token);
        window.location.href = "index.html";      
    } else {
        errorMessage.textContent = "Email ou mot de passe incorrect"    
    }
})


