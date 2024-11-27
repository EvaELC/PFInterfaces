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

// Comportamiento del popup de inicio de sesión
const loginPopup = document.getElementById('login-popup');
const openLoginBtn = document.querySelector('.auth-btn[href="#sign-in"]'); 
const closeLoginBtn = document.getElementById('close-login-popup');
const cancelLoginBtn = document.getElementById('login-cancel');

openLoginBtn.addEventListener('click', function(event) {
    event.preventDefault(); 
    loginPopup.style.display = 'flex'; 
});

closeLoginBtn.addEventListener('click', function() {
    loginPopup.style.display = 'none'; 
});

cancelLoginBtn.addEventListener('click', function() {
    loginPopup.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === loginPopup) {
        loginPopup.style.display = 'none';
    }
});

// Comportamiento del popup de registro
document.addEventListener('DOMContentLoaded', () => {
    const profilePopup = document.getElementById('profile-popup');
    const openProfileBtn = document.querySelector('a[href="#reg"]');
    const closeProfileBtn = document.getElementById('close-profile-popup');
    const cancelProfileBtn = document.getElementById('cancel-profile');
    const saveProfileBtn = document.getElementById('save-profile');
    const profileForm = document.getElementById('profile-form');

    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const modalConfirm = document.getElementById('modal-confirm');
    const modalCancel = document.getElementById('modal-cancel');
    let modalAction = null;

    openProfileBtn.addEventListener('click', (event) => {
        event.preventDefault();
        profilePopup.style.display = 'flex';
    });

    // cerrar el popup cuando se hace clic en "x" -> NO HAY X ahora mismo 
    closeProfileBtn.addEventListener('click', () => {
        profilePopup.style.display = 'none';
    });

    cancelProfileBtn.addEventListener('click', () => {
        openModal("¿Estás seguro de que deseas cancelar el registro?", () => {
            profilePopup.style.display = 'none';
            profileForm.reset(); 
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === profilePopup) {
            profilePopup.style.display = 'none';
        }
    });

    function openModal(message, action) {
        modalMessage.textContent = message;
        modal.style.display = 'flex';
        modalCancel.style.display = action ? 'inline-block' : 'none';
        modalAction = action; 
    }

    function closeModal() {
        modal.style.display = 'none';
        modalAction = null;
    }

    modalConfirm.addEventListener('click', () => {
        if (modalAction) modalAction();
        closeModal();
    });

    modalCancel.addEventListener('click', closeModal);

    saveProfileBtn.addEventListener('click', () => {
        const username = document.getElementById('profile-username').value.trim();
        const email = document.getElementById('profile-email').value.trim();
        const password = document.getElementById('profile-password').value;
        const confirmPassword = document.getElementById('profile-confirm-password').value;
        const country = document.getElementById('profile-country').value.trim();

        if (username.length < 3) {
            showInfoModal("El nombre de usuario debe tener al menos 3 caracteres.");
            return;
        }
        if (!validateEmail(email)) {
            showInfoModal("Por favor, ingresa un correo electrónico válido.");
            return;
        }
        if (!validatePassword(password)) {
            showInfoModal("La contraseña debe tener al menos 12 caracteres, incluir una mayúscula, una minúscula, dos dígitos y un carácter especial.");
            return;
        }
        if (password !== confirmPassword) {
            showInfoModal("Las contraseñas no coinciden.");
            return;
        }
        if (country.length < 3) {
            showInfoModal("El país debe tener al menos 3 caracteres.");
            return;
        }

        showInfoModal("¡Registro exitoso!", () => {
            profilePopup.style.display = 'none';
            profileForm.reset(); 
        });
    });

    function showInfoModal(message, action = null) {
        modalMessage.textContent = message;
        modal.style.display = 'flex';
        modalCancel.style.display = 'none'; 
        modalAction = action;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{12,}$/;
        return passwordRegex.test(password);
    }
});
