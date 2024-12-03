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
    const backButton1 = document.getElementById('back-button1');
    const backButton2 = document.getElementById('back-button2');
    const postalButton = document.getElementById('postal-button');
    const postNavidad = document.getElementById('postal-navidad');
    const profCont = document.getElementById('container-prof');
    const postalInit = document.getElementById('init-button');
    const postSel = document.getElementById('postal-seleccion');
    const contButton = document.getElementById('continue-button')
    const postDib = document.getElementById('postal-dib');
    const contButton1 = document.getElementById('continue-button1')
    const postFin = document.getElementById('postal-final');
    const contButton2 = document.getElementById('continue-button2')
    const postInfo = document.getElementById('postal-info');
    const imgButton = document.getElementById('img-button');
    const imgInput = document.getElementById('img-input');
    const dibujoPreview = document.getElementById('dibujo-preview');
    const envButton = document.getElementById('env-button');
    const postalForm = document.getElementById('postal-form');
    const postButton1 = document.getElementById('post-button1');
    const postButton2 = document.getElementById('post-button2');
    const postButton3 = document.getElementById('post-button3');
    const postButton4 = document.getElementById('post-button4');

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

    function validateForm() {
        const direccion = document.getElementById('direccion').value.trim();
        const codpostal = document.getElementById('codigo-postal').value.trim();
        const localidad = document.getElementById('localidad').value.trim();

        if (direccion.length < 3) {
            infoModal("La direccion debe tener al menos 3 caracteres.");
            return false;
        }
        if (codpostal.length < 3) {
            infoModal("El codigo postal debe tener al menos 3 caracteres.");
            return false;
        }
        if (localidad.length < 3) {
            infoModal("La localidad debe tener al menos 3 caracteres.");
            return false;
        }
        return true;
    }

    

    postalButton.addEventListener('click', (event) => {
        event.preventDefault();
        postNavidad.style.display = 'flex'; 
        profCont.style.display = 'none';
        postalInit.addEventListener('click', (event) => {
            event.preventDefault();
            postNavidad.style.display = 'none'; 
            postSel.style.display = 'flex'; 
            let selectedPostal = "images/dibujo.jpg";
            let selectedDib = "images/dibujo.jpg";


            postButton1.addEventListener('click', (event) => {
                event.preventDefault();
                selectedPostal = "images/postal1.png";
                infoModal("Postal seleccionada", () => {
                });
            }); 

            postButton2.addEventListener('click', (event) => {
                event.preventDefault();
                selectedPostal = "images/postal2.png";
                infoModal("Postal seleccionada", () => {
                });
            }); 

            postButton3.addEventListener('click', (event) => {
                event.preventDefault();
                selectedPostal = "images/postal3.png";
                infoModal("Postal seleccionada", () => {
                });
            }); 

            postButton4.addEventListener('click', (event) => {
                event.preventDefault();
                selectedPostal = "images/postal4.png";
                infoModal("Postal seleccionada", () => {
                });
            }); 

            contButton.addEventListener('click', (event) => {
                event.preventDefault();
                postDib.style.display = 'flex'; 
                postSel.style.display = 'none'; 

                backButton1.addEventListener('click', () => {
                    event.preventDefault();
                    postDib.style.display = 'none';
                    postSel.style.display = 'flex';
                });

                imgButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    imgInput.click();
                });
                
                imgInput.addEventListener('change', (event) => {
                    const file = event.target.files[0]; 
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            selectedDib = e.target.result; 
                            dibujoPreview.src = selectedDib; 
                        };
                        reader.readAsDataURL(file);
                    }
                });

                contButton1.addEventListener('click', (event) => {
                    event.preventDefault();
                    postDib.style.display = 'none'; 
                    postFin.style.display = 'flex'; 
                    const finalPostal1 = document.getElementById('postal-sel');
                    finalPostal1.src = selectedPostal;
                    const finalPostal2 = document.getElementById('dib-sel');
                    finalPostal2.src = selectedDib;

                    backButton2.addEventListener('click', () => {
                        event.preventDefault();
                        postDib.style.display = 'flex';
                        postFin.style.display = 'none';
                    });

                    contButton2.addEventListener('click', (event) => {
                        event.preventDefault();
                        postInfo.style.display = 'flex'; 
                        postFin.style.display = 'none'; 
                        envButton.addEventListener('click', (event) => {
                            event.preventDefault();
                            if (!validateForm()) {
                                infoModal("Rellena correctamente el formulario", () => {
                                });
                            } else {
                                infoModal("Postal enviada correctamente!", () => {
                                });
                                postalForm.reset();
                                
                            }
                        });    
                    });
                });
            });
        });
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
