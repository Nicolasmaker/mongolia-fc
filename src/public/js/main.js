document.addEventListener('DOMContentLoaded', () => {
    console.log('Mongolia FC Frontend Loaded ⚽');

    // Navbar Logic (Login/Admin)
    const navLinksContainer = document.querySelector('.nav-links');
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');

    if (token && userName) {
        // Usuario Logueado: Mostrar Admin y Logout
        const adminLi = document.createElement('li');
        adminLi.innerHTML = '<a href="matches.html" style="color: var(--accent-color);">Admin Partidos</a>';
        navLinksContainer.appendChild(adminLi);

        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = `<a href="#" id="logoutBtn" style="color: #ff4444;">Salir (${userName})</a>`;
        navLinksContainer.appendChild(logoutLi);

        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    } else {
        // Usuario No Logueado: Mostrar Login
        const loginLi = document.createElement('li');
        loginLi.innerHTML = '<a href="login.html" style="border: 1px solid var(--accent-color); padding: 5px 15px; border-radius: 20px;">Login</a>';
        navLinksContainer.appendChild(loginLi);
    }

    // Mobile Menu Logic
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Modal Logic
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];

    // Seleccionar todas las imágenes ampliables (tarjetas y galería about)
    const images = document.querySelectorAll('.card-img, .about-img');

    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
        // Añadir cursor pointer para indicar que es clicable
        img.style.cursor = "pointer";
    });

    // Cerrar modal al hacer click en la X
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Cerrar modal al hacer click fuera de la imagen
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
