async function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("login-message");

    if(!username || !password) {
        msg.innerText = "Please enter both username and password";
        return;
    }

    try {
        const res = await fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if(res.ok){
            msg.style.color = "green";
            msg.innerText = data.message;
            setTimeout(() => window.location.href = "index.html", 1000);
        } else {
            msg.style.color = "red";
            msg.innerText = data.detail || "Login failed";
        }

    } catch(error) {
        msg.style.color = "red";
        msg.innerText = "Unable to connect to server";
    }
}