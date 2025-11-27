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

        const newsAdminLi = document.createElement('li');
        newsAdminLi.innerHTML = '<a href="news-admin.html" style="color: var(--accent-color);">Admin Noticias</a>';
        navLinksContainer.appendChild(newsAdminLi);

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

    // Cargar Noticias en Home
    const newsGrid = document.getElementById('news-grid');
    if (newsGrid) {
        fetch('/api/news')
            .then(res => res.json())
            .then(news => {
                if (news.length === 0) {
                    newsGrid.innerHTML = '<p style="text-align: center; width: 100%;">No hay noticias recientes.</p>';
                    return;
                }
                
                newsGrid.innerHTML = news.map(item => `
                    <div class="card">
                        <div class="card-img-container" style="${item.imageUrl2 ? 'display: grid; grid-template-columns: 1fr 1fr; gap: 10px;' : ''}">
                            ${item.imageUrl ? `
                            <img src="${item.imageUrl}" alt="${item.title}" class="news-img" 
                                 style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; cursor: pointer;" 
                                 onclick="openModal(this)">` : ''}
                            ${item.imageUrl2 ? `
                            <img src="${item.imageUrl2}" alt="${item.title}" class="news-img" 
                                 style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; cursor: pointer;" 
                                 onclick="openModal(this)">` : ''}
                        </div>
                        <h3>${item.title}</h3>
                        <p>${item.content}</p>
                        <small style="color: #666; display: block; margin-top: 1rem;">${new Date(item.date).toLocaleDateString()}</small>
                    </div>
                `).join('');
            })
            .catch(err => {
                console.error('Error cargando noticias:', err);
                newsGrid.innerHTML = '<p>Error al cargar noticias.</p>';
            });
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

    // Función global para abrir modal (usada en noticias dinámicas)
    window.openModal = function(element) {
        modal.style.display = "block";
        modalImg.src = element.src;
        captionText.innerHTML = element.alt;
    }

    // Seleccionar todas las imágenes ampliables estáticas (tarjetas y galería about)
    const images = document.querySelectorAll('.card-img, .about-img');

    images.forEach(img => {
        img.addEventListener('click', function() {
            window.openModal(this);
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
