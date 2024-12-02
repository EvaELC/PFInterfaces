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

//comportamiento del botón de calendario
document.addEventListener('DOMContentLoaded', () => {
    const calendarButton = document.getElementById('calendar-button');
    const calendario = document.getElementById('calendario');
    const today = new Date(); 
    const currentDay = today.getDate(); 
    const cancionNavidad = document.getElementById('cancion-navidad');
    const backButton = document.getElementById('back-button');
    const currentDayCell = document.getElementById(`day-${currentDay}`);
    const profCont = document.getElementById('container-prof');

    if (currentDayCell) {
        currentDayCell.classList.add('current-day'); 
        currentDayCell.addEventListener('click', () => {
            calendario.style.display = 'none'; 
            cancionNavidad.style.display = 'flex';
        });
    }
    
    calendarButton.addEventListener('click', (event) => {
        event.preventDefault();
        calendario.style.display = 'flex'; 
        profCont.style.display = 'none';
    });
    
    backButton.addEventListener('click', () => {
        cancionNavidad.style.display = 'none';
        calendario.style.display = 'flex';
    });

    const audio = new Audio('happy-xmas.mp3'); 
    const playButton = document.getElementById('play-button');
    const progressBar = document.getElementById('progress-bar');
    const timeDisplay = document.getElementById('time-display');

    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playButton.textContent = '⏸'; 
        } else {
            audio.pause();
            playButton.textContent = '▶'; 
        }
    });

    audio.addEventListener('timeupdate', () => {
        const currentTime = Math.floor(audio.currentTime);
        const duration = Math.floor(audio.duration) || 0;
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;
        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = duration % 60;

        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds} / ${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
        progressBar.value = (audio.currentTime / audio.duration) * 100;
    });

    progressBar.addEventListener('input', () => {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });
    
});

//comportamiento del botón de postales
document.addEventListener('DOMContentLoaded', () => {
    const postalButton = document.getElementById('postal-button');
    const postNavidad = document.getElementById('postal-navidad');
    const profCont = document.getElementById('container-prof');
    
    postalButton.addEventListener('click', (event) => {
        event.preventDefault();
        postNavidad.style.display = 'flex'; 
        profCont.style.display = 'none';
    });
    
});

//comportamiento actualización de perfil
document.addEventListener('DOMContentLoaded', () => {
    const profilePopup = document.getElementById('profile-popup');
    const openProfileBtn = document.getElementById('update-profile-button'); 
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
