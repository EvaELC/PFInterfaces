//comportamiento del botón de cierre de sesión
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }
});

//comportamiento actualización de perfil
document.addEventListener('DOMContentLoaded', () => {
    const profilePopup = document.getElementById('profile-popup');
    const openProfileBtn = document.getElementById('update-profile-button'); //abre el popup
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
        const storedUserData = localStorage.getItem('userData');
        let userData = storedUserData ? JSON.parse(storedUserData) : null;

        if (userData) {
            document.getElementById('profile-username').value = userData.username;
            document.getElementById('profile-email').value = userData.email;
            document.getElementById('profile-password').value = userData.password;
            document.getElementById('profile-confirm-password').value = userData.password;
            document.getElementById('profile-country').value = userData.country;
        } else {
            profileForm.reset();
        }

        profilePopup.style.display = 'flex';  
    });

    // NO HAY
    closeProfileBtn.addEventListener('click', () => {
        profilePopup.style.display = 'none';
    });


    cancelProfileBtn.addEventListener('click', () => {
        openModal("¿Estás seguro de que no deseas continuar actualizando el perfil?", () => {
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
        if (password !== confirmPassword) {
            showInfoModal("Las contraseñas no coinciden.");
            return;
        }
        if (country.length < 3) {
            showInfoModal("El país debe tener al menos 3 caracteres.");
            return;
        }

        // nuevos datos en localstorage
        const userData = {
            username: username,
            email: email,
            password: password,
            country: country
        };

        localStorage.setItem('userData', JSON.stringify(userData));

        showInfoModal("¡Datos actualizados con éxito!", () => {
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
});
