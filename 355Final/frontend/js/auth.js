// Base URL for all API requests
// In production, change this to your live domain e.g. 'https://yoursite.com/api'
const API_URL = 'http://localhost:5555/api' // make sure to change this later

// ===== REGISTER =====
// Grab the register form — will be null on the login page so we check before using it
const registerForm = document.getElementById('registerForm')
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    
    // Prevent the form from doing its default behavior (refreshing the page)
    e.preventDefault()

    // Read the values the user typed into the input fields
    const username = document.getElementById('regUsername').value
    const password = document.getElementById('regPassword').value

    try {
      console.log("api: ", API_URL)
      // Send a POST request to /api/users with the form data as JSON
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // tell the server we are sending JSON
        body: JSON.stringify({ username, password })  // convert JS object to a JSON string
      })
      
      console.log("status: ", res.status)

      // Parse the JSON response body from the server
      const data = await res.json()
      console.log("response: ", data)

    const msg = document.getElementById("registerMsg");

    if (!res.ok) {
      msg.textContent = data.message || "Registration failed";
      msg.style.color = "red";
      return;
    }

    msg.textContent = "Account created!";
    msg.style.color = "green";

      // Registration was successful — show a message then redirect to login after 1.5 seconds
      // document.getElementById('registerMsg').textContent = 'Account created!'
      // setTimeout(() => window.location.href = 'index.html', 1500)

      localStorage.setItem("token", data.token)

      // window.location.href = "dashboard.html"

    } catch (err) {
      // This catch block runs if fetch itself failed — e.g. backend server is not running
      document.getElementById('errorMsg').textContent = 'Could not connect to server'
    }
  })
}

// ===== LOGIN =====
// Grab the login form — will be null on the register page so we check before using it
const loginForm = document.getElementById('loginForm')
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    // Prevent page refresh on form submit
    e.preventDefault()

    // Read the values the user typed into the input fields
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    try {
      // Send a POST request to /api/users/login with username and password
      const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      // Parse the JSON response body
      const data = await res.json()

      if (!res.ok) {
        // Show the server error message (e.g. 'Invalid credentials')
        document.getElementById('errorMsg').textContent = data.message || 'Login failed'
        return
      }

      // Save the JWT token in localStorage so we can attach it to every future note request
      // Without this token, the backend will reject requests with 401 Unauthorized
      localStorage.setItem('token', data.token)

      // Redirect to the dashboard where the user can manage their notes
      window.location.href = 'dashboard.html'

    } catch (err) {
      // Fetch failed — backend is likely not running
      document.getElementById('errorMsg').textContent = 'Could not connect to server'
    }
  })
}
