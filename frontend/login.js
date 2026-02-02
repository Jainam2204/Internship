const API_URL = CONFIG.API_URL;


const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

const handleLogin = async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            msg.innerText = "Login failed";
            return;
        }
        alert("Login Successful");
        globalThis.location.href = "index.html";

    } catch (error) {
        console.error(error);
        msg.innerText = "Server error : " + error;
    }
}

form.addEventListener("submit", handleLogin);