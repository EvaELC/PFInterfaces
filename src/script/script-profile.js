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

//comportamiento del botón de reservas
document.addEventListener('DOMContentLoaded', () => {
    const reservaButton = document.getElementById('reserva-button');
    const reservaCasas = document.getElementById('reserva-casas');
    const profCont = document.getElementById('container-prof');
    const reservaButton1 = document.getElementById('res-button1');
    const reservaButton2 = document.getElementById('res-button2');
    const Casa1 = document.getElementById('res-casa1');
    const Casa2 = document.getElementById('res-casa2');
    const envButton1 = document.getElementById('env-res1');
    const envButton2 = document.getElementById('env-res2');
    const resForm1 = document.getElementById('res1-form');
    const resForm2 = document.getElementById('res2-form');
    const backButton7 = document.getElementById('back-button7');
    const backButton8 = document.getElementById('back-button8');

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

        modalConfirm.addEventListener('click', () => {
            if (modalAction) {
                modalAction();  
            }
        });
    }

    function validateForm(formId) {
        const nombre = document.getElementById(`${formId}-nombre`).value.trim();
        const correo = document.getElementById(`${formId}-correo`).value.trim();
        const telefono = document.getElementById(`${formId}-telefono`).value.trim();
        const noches = document.getElementById(`${formId}-noches`).value.trim();

        if (nombre.length < 3) {
            infoModal("El nombre debe tener al menos 3 caracteres.");
            return false;
        }
        if (correo.length < 3) {
            infoModal("El correo debe tener al menos 3 caracteres.");
            return false;
        }
        if (telefono.length < 9) {
            infoModal("El teléfono debe tener al menos 9 caracteres.");
            return false;
        }
        if (noches.length === 0) {
            infoModal("El número de noches no puede estar vacío.");
            return false;
        }
        return true;
    }

    backButton7.addEventListener('click', () => {
        Casa1.style.display = 'none';
        reservaCasas.style.display = 'flex';
    });

    backButton8.addEventListener('click', () => {
        Casa2.style.display = 'none';
        reservaCasas.style.display = 'flex';
    });

    reservaButton.addEventListener('click', (event) => {
        event.preventDefault();
        reservaCasas.style.display = 'flex'; 
        profCont.style.display = 'none';

        reservaButton1.addEventListener('click', (event) => {
            event.preventDefault();
            reservaCasas.style.display = 'none'; 
            Casa1.style.display = 'flex';

            envButton1.addEventListener('click', (event) => {
                event.preventDefault();
                if (validateForm('res1')) {
                    const nombre = document.getElementById('res1-nombre').value;
                    const correo = document.getElementById('res1-correo').value;
                    const telefono = document.getElementById('res1-telefono').value;
                    const noches = document.getElementById('res1-noches').value;
                    const reserva = `Reserva en Xmas Hotel- ${noches} noches, ${nombre}, ${correo}, ${telefono}`;
                    
                    // Guardar la reserva en localStorage
                    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
                    reservations.push(reserva);
                    localStorage.setItem('reservations', JSON.stringify(reservations));

                    infoModal("Reserva realizada correctamente!", () => {
                        window.location.href = 'profile.html';
                    });
                    resForm1.reset();
                }      
            });     
        });

        reservaButton2.addEventListener('click', (event) => {
            event.preventDefault();
            reservaCasas.style.display = 'none'; 
            Casa2.style.display = 'flex';

            envButton2.addEventListener('click', (event) => {
                event.preventDefault();
                if (validateForm('res2')) {
                    const nombre = document.getElementById('res2-nombre').value;
                    const correo = document.getElementById('res2-correo').value;
                    const telefono = document.getElementById('res2-telefono').value;
                    const noches = document.getElementById('res2-noches').value;
                    const reserva = `Reserva en Santa Santa Hotel - ${noches} noches, ${nombre}, ${correo}, ${telefono}`;

                    // Guardar la reserva en localStorage
                    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
                    reservations.push(reserva);
                    localStorage.setItem('reservations', JSON.stringify(reservations));

                    infoModal("Reserva realizada correctamente!", () => {
                        window.location.href = 'profile.html';
                    });
                    resForm2.reset();
                }
            });  
        });
    });   

    // Mostrar y actualizar las reservas
    const viewReservationsButton = document.getElementById("view-reservations-button");
    const reservationsModal = document.getElementById("reservations-modal");
    const closeReservationsModal = document.getElementById("close-reservations-modal");
    const reservationsList = document.getElementById("reservations-list");
    const modalContent = document.getElementById("modal-res-content");

    viewReservationsButton.addEventListener("click", () => {
        updateReservationsList();
        reservationsModal.style.display = "flex"; 
    });

    closeReservationsModal.addEventListener("click", () => {
        reservationsModal.style.display = "none";
    });

    reservationsModal.addEventListener('click', (event) => {
        if (event.target === reservationsModal) {  
            reservationsModal.style.display = 'none';  
        }
    });

    modalContent.addEventListener('click', (event) => {
        event.stopPropagation(); 
    });

    function updateReservationsList() {
        reservationsList.innerHTML = "";

        const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

        if (reservations.length === 0) {
            reservationsList.innerHTML = "<p>No tienes reservas actualmente.</p>";
        } else {
            reservations.forEach((reservation) => {
                const reservationCard = document.createElement("div");
                reservationCard.classList.add("reservation-card");

                const details = document.createElement("div");
                details.classList.add("reservation-details");

                const reservationText = document.createElement("p");
                reservationText.textContent = reservation;
                details.appendChild(reservationText);

                reservationCard.appendChild(details);
                reservationsList.appendChild(reservationCard);
            });
        }
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
        audio.pause();        
        audio.currentTime = 0;
        playButton.textContent = '▶';
    });

    const audio = new Audio('images/happy-xmas.mp3'); 
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
    const backButton0 = document.getElementById('back-button0');
    const backButton1 = document.getElementById('back-button1');
    const backButton2 = document.getElementById('back-button2');
    const backButton3 = document.getElementById('back-button3');
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

            backButton0.addEventListener('click', () => {
                event.preventDefault();
                postNavidad.style.display = 'flex';
                postSel.style.display = 'none';
            });

            postButton1.addEventListener('click', (event) => {
                event.preventDefault();
                selectedPostal = "images/postal1.png";
                highlightSelected(postButton1); 
            });
            
            postButton2.addEventListener('click', (event) => {
                event.preventDefault();
                selectedPostal = "images/postal2.png";
                highlightSelected(postButton2); 
            });
            
            postButton3.addEventListener('click', (event) => {
                event.preventDefault();
                selectedPostal = "images/postal3.png";
                highlightSelected(postButton3); 
            });
            
            postButton4.addEventListener('click', (event) => {
                event.preventDefault();
                selectedPostal = "images/postal4.png";
                highlightSelected(postButton4); 
            });

            function highlightSelected(selectedButton) {
                const buttons = [postButton1, postButton2, postButton3, postButton4];
                buttons.forEach(button => {
                    button.classList.remove('selected'); 
                    button.textContent = "Seleccionar"; 
                });
                selectedButton.classList.add('selected'); 
                selectedButton.textContent = "Seleccionado"; 
            }

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


                        backButton3.addEventListener('click', () => {
                            event.preventDefault();
                            postInfo.style.display = 'none';
                            postFin.style.display = 'flex';
                        });

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

document.addEventListener('DOMContentLoaded', () => {
    const backByButtonRes = document.getElementById('back-button4');
    const backButtonCalendar = document.getElementById('back-button5');
    const backButtonPostal = document.getElementById('back-button6');

        backByButtonRes.addEventListener('click', () => {
            window.location.href = 'profile.html';
        });
        
        backButtonCalendar.addEventListener('click', () => {
            window.location.href = 'profile.html';
        });

        backButtonPostal.addEventListener('click', () => {
            window.location.href = 'profile.html';
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


