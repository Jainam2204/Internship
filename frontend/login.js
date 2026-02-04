const API_URL = CONFIG.API_URL;

const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

const handleLogin = async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const response = await res.json();

        if (!response.success) {
            msg.innerText = response.message;
            return;
        }

        alert(response.message);
        globalThis.location.href = "index.html";

    } catch (error) {
        console.error(error);
        msg.innerText = "Server error : " + error;
    }
}

form.addEventListener("submit", handleLogin);