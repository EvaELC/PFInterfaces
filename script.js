// funcionalidad cuenta atras 
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const countdownElem = document.getElementById('countdown');

    startButton.addEventListener('click', startCountdown);

    function startCountdown() {
        const targetDate = new Date(new Date().getFullYear(), 11, 24, 23, 59, 59); // mes 11 es diciembre porque enero es 0
        startButton.disabled = true;
        startButton.textContent = "Cuenta atrás...";

        const countdownInterval = setInterval(() => {
            const now = new Date();
            const dif = targetDate - now;

            if (dif <= 0) {
                clearInterval(countdownInterval);
                countdownElem.textContent = "¡Papá Noel está aquí!";
                startButton.textContent = "Cuenta atrás finalizada";
                return;
            }

            const days = Math.floor(dif / (1000 * 60 * 60 * 24));
            const hours = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const min = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
            const sec = Math.floor((dif % (1000 * 60)) / 1000);

            countdownElem.textContent = formatCountdown(days, hours, min, sec);
        }, 1000);
    }

    function formatCountdown(days, hours, min, sec) {
        const hourText = hours === 1 ? "hora" : "horas";
        return `${days} días ${hours} ${hourText} ${min} minutos ${sec} segundos`;
    }
});

// Obtener los elementos
const loginPopup = document.getElementById('login-popup');
const openLoginBtn = document.querySelector('.auth-btn[href="#sign-in"]'); // El botón de "Iniciar sesión"
const closeLoginBtn = document.getElementById('close-login-popup');
const cancelLoginBtn = document.getElementById('login-cancel');

// Mostrar el popup cuando se hace clic en "Iniciar sesión"
openLoginBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir la acción por defecto del enlace
    loginPopup.style.display = 'flex'; // Mostrar el popup
});

// Cerrar el popup cuando se hace clic en el botón de cerrar
closeLoginBtn.addEventListener('click', function() {
    loginPopup.style.display = 'none'; // Ocultar el popup
});

// Cerrar el popup cuando se hace clic en el botón de cancelar
cancelLoginBtn.addEventListener('click', function() {
    loginPopup.style.display = 'none'; // Ocultar el popup
});

// Cerrar el popup si se hace clic fuera del área del popup (opcional)
window.addEventListener('click', function(event) {
    if (event.target === loginPopup) {
        loginPopup.style.display = 'none'; // Ocultar el popup si el clic es fuera del contenido
    }
});


// Obtener los elementos
const profilePopup = document.getElementById('profile-popup');
const openProfileBtn = document.querySelector('.auth-btn[href="#reg"]'); // El botón de "Registrarse"
const closeProfileBtn = document.getElementById('close-profile-popup');
const cancelProfileBtn = document.getElementById('cancel-profile');

// Mostrar el popup cuando se hace clic en "Registrarse"
openProfileBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir la acción por defecto del enlace
    profilePopup.style.display = 'flex'; // Mostrar el popup
});

// Cerrar el popup cuando se hace clic en el botón de cerrar
closeProfileBtn.addEventListener('click', function() {
    profilePopup.style.display = 'none'; // Ocultar el popup
});

// Cerrar el popup cuando se hace clic en el botón de cancelar
cancelProfileBtn.addEventListener('click', function() {
    profilePopup.style.display = 'none'; // Ocultar el popup
});

// Cerrar el popup si se hace clic fuera del área del popup (opcional)
window.addEventListener('click', function(event) {
    if (event.target === profilePopup) {
        profilePopup.style.display = 'none'; // Ocultar el popup si el clic es fuera del contenido
    }
});
