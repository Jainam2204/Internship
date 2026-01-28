const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      credentials: "include", // ⭐ IMPORTANT
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      msg.innerText = data.message || "Login failed";
      return;
    }

    // JWT cookie is set by backend
    window.location.href = "index.html";

  } catch (err) {
    console.error(err);
    msg.innerText = "Server error";
  }
});