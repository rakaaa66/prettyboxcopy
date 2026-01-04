const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Kredensial demo (ubah di sini untuk kustomisasi)
const validUsername = 'Raka';
const validPassword = '123456';

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (username === validUsername && password === validPassword) {
        // Simpan status login
        localStorage.setItem('isLoggedIn', 'true');
        // Redirect ke halaman utama
        window.location.href = 'index.html';
    } else {
        // Tampilkan error
        errorMsg.style.display = 'block';
        usernameInput.value = '';
        passwordInput.value = '';
    }

});

