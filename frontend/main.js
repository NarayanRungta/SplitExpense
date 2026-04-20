async function register() {
  const res = await fetch("http://localhost:8080/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    })
  });

  const data = await res.json();
  console.log("Registered:", data);
}

async function login() {
  const res = await fetch("http://localhost:8080/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value
    })
  });

  const data = await res.json();

  localStorage.setItem("userId", data.id);
  localStorage.setItem("userName", data.name);

  alert("Login successful");
}

window.register = register;
window.login = login;