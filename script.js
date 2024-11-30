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

//comportamiento del popup de inicio de sesión
document.addEventListener('DOMContentLoaded', () => {
    const loginPopup = document.getElementById('login-popup');
    const openLoginBtn = document.querySelector('.auth-btn[href="#sign-in"]');
    const closeLoginBtn = document.getElementById('close-login-popup');
    const cancelLoginBtn = document.getElementById('login-cancel');
    const loginSubmit = document.getElementById('login-submit');
    const loginForm = document.getElementById('login-form');

    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const modalConfirm = document.getElementById('modal-confirm');
    const modalCancel = document.getElementById('modal-cancel');
    let modalAction = null;

    function openModal(message, action) {
        modalMessage.textContent = message;
        modal.style.display = 'flex';
        modalCancel.style.display = 'inline-block';
        modalAction = action;
    }

    function infoModal(message, action) {
        modalMessage.textContent = message;
        modal.style.display = 'flex';
        modalCancel.style.display = 'none';
        modalAction = action;
    }

    function closeModal() {
        modal.style.display = 'none';
        modalAction = null;
    }

    modalConfirm.addEventListener('click', () => {
        if (modalAction) {
            modalAction();
        }
        closeModal();
    });

    modalCancel.addEventListener('click', closeModal);

    openLoginBtn.addEventListener('click', (event) => {
        event.preventDefault();
        loginPopup.style.display = 'flex';
    });

    closeLoginBtn.addEventListener('click', () => {
        loginPopup.style.display = 'none';
    });

    cancelLoginBtn.addEventListener('click', () => {
        loginPopup.style.display = 'none';
    });

    loginSubmit.addEventListener('click', (event) => {
        event.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const storedUserData = localStorage.getItem('userData');

        console.log(storedUserData);

        let userData = storedUserData ? JSON.parse(storedUserData) : null;

        if (userData && userData.username === username && userData.password === password) {
            infoModal("Inicio de sesión exitoso", () => {
                loginPopup.style.display = 'none';
                loginForm.reset();
                showProfileIcon(username); // Llamar a la función para cambiar los botones
            });
        } else {
            infoModal("Nombre de usuario o contraseña incorrectos.", () => {
                document.getElementById('login-username').focus();
                document.getElementById('login-password').focus();
            });
        }
    });

    function showProfileIcon(username) {
        const authContainer = document.querySelector('.auth-buttons');
        
        authContainer.innerHTML = '';

        const profileIcon = document.createElement('div');
        profileIcon.className = 'profile-icon';
    
        profileIcon.innerHTML = `
            <a href="profile.html" class="profile-link">
            <div class="profile-img-container">
                <img src="images/perfil-icono.png" alt="Icono de perfil" class="profile-img">
            </div>
            <span class="profile-text">Perfil</span>
        </a>
        `;
    
        authContainer.appendChild(profileIcon);

        localStorage.setItem('isLoggedIn', 'true'); // Marca que el usuario está logueado
    }
    

    window.addEventListener('click', (event) => {
        if (event.target === loginPopup) {
            loginPopup.style.display = 'none';
        }
    });
});

// comprobar si el usuario está logueado para no mostrar botones de inicio y registro
document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.querySelector('.auth-buttons');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        // Mostrar solo el icono de perfil
        authContainer.innerHTML = `
            <div class="profile-icon">
                <a href="profile.html" class="profile-link">
                    <div class="profile-img-container">
                        <img src="images/perfil-icono.png" alt="Icono de perfil" class="profile-img">
                    </div>
                    <span class="profile-text">Perfil</span>
                </a>
            </div>
        `;
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

        const userData = {
            username: username,
            email: email,
            password: password,
            country: country
        };

        localStorage.setItem('userData', JSON.stringify(userData));
        console.log("Datos guardados en localStorage:", userData);

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

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const envCarta = document.getElementById('env-card');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const modalConfirm = document.getElementById('modal-confirm');
    const modalCancel = document.getElementById('modal-cancel');
    let modalAction = null;

    function infoModal(message, action) {
        modalMessage.textContent = message;
        modal.style.display = 'flex';
        modalCancel.style.display = 'none';
        modalAction = action;
    }

    function closeModal() {
        modal.style.display = 'none';
        modalAction = null;
    }

    modalConfirm.addEventListener('click', () => {
        if (modalAction) {
            modalAction();
        }
        closeModal();
    });

    modalCancel.addEventListener('click', closeModal);

    envCarta.addEventListener('click', (event) => {
        event.preventDefault(); 
    
        if (isLoggedIn === 'true') {
            // validar el formulario
            if (!validateForm()) {
                infoModal("Rellena correctamente el formulario", () => {
                });
            } else {
                infoModal("¡Carta enviada correctamente!", () => {
                    contactForm.reset();
                });
            }
        } else {
            infoModal("Solo se puede enviar una carta si se ha iniciado sesión", () => {
            });
        }
    
    });  

    function validateForm() {
        const name = document.getElementById('env-nombre').value.trim();
        const ciudad = document.getElementById('env-ciudad').value.trim();
        const pais = document.getElementById('env-pais').value.trim();
        const texto = document.getElementById('env-carta').value.trim();

        if (name.length < 3) {
            infoModal("El nombre debe tener al menos 3 caracteres.");
            return false;
        }
        if (ciudad.length < 3) {
            infoModal("La ciudad debe tener al menos 3 caracteres.");
            return false;
        }
        if (pais.length < 3) {
            infoModal("El país debe tener al menos 3 caracteres.");
            return false;
        }
        if (texto.length < 10) {
            infoModal("La carta debe tener al menos 10 caracteres.");
            return false;
        }
        return true;
    }
});
  