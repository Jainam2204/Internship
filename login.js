const admins = [
  { user: "admin1", pass: "123" },
  { user: "admin2", pass: "123" },
  { user: "admin3", pass: "123" },
  { user: "admin4", pass: "123" },
  { user: "admin5", pass: "123" }
];

function setCookie(name, value, hours) {
  let d = new Date();
  d.setTime(d.getTime() + hours * 60 * 60 * 1000);
  document.cookie = name + "=" + value + "; expires=" + d.toUTCString();
}

function getCookie(name) {
  let cookies = document.cookie.split("; ");
  for (let c of cookies) {
    let [k, v] = c.split("=");
    if (k === name) return v;
  }
  return null;
}

if (getCookie("role")) {
  window.location.href = "index.html";
}

function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  const isAdmin = admins.find(a => a.user === u && a.pass === p);

  if (isAdmin) {
    setCookie("role", "admin", 24);
    window.location.href = "index.html";
  } 
  else if (u === "user" && p === "123") {
    setCookie("role", "user", 24);
    window.location.href = "index.html";
  } 
  else {
    document.getElementById("msg").innerText = "Invalid Login!";
  }
}
