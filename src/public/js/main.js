document.addEventListener('DOMContentLoaded', () => {
    console.log('Mongolia FC Frontend Loaded ⚽');

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
