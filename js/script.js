// Prevenir zoom accidental en dispositivos táctiles
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

// Mejorar la experiencia táctil
document.addEventListener('touchstart', function() {}, {passive: true});

// Funciones para abrir/cerrar modales
function openModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  // Prevenir scroll del body cuando el modal está abierto
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add("hidden");
  // Restaurar scroll del body
  document.body.style.overflow = 'auto';
  
  // Pausar video si existe en el modal
  const video = modal.querySelector('video');
  if (video) {
    video.pause();
  }
}

// Cerrar modal al hacer clic fuera del contenido
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    const modalId = e.target.id;
    closeModal(modalId);
  }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.modal:not(.hidden)');
    if (openModal) {
      closeModal(openModal.id);
    }
  }
});

// Controles de audio mejorados
function togglePlay(audioId) {
  const audio = document.getElementById(audioId);
  const playBtn = document.getElementById('playBtn1');
  
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '⏸️ Pausar';
    playBtn.classList.remove('play');
    playBtn.classList.add('pause');
  } else {
    audio.pause();
    playBtn.innerHTML = '▶️ Reproducir';
    playBtn.classList.remove('pause');
    playBtn.classList.add('play');
  }
}

function stopAudio(audioId) {
  const audio = document.getElementById(audioId);
  const playBtn = document.getElementById('playBtn1');
  
  audio.pause();
  audio.currentTime = 0;
  playBtn.innerHTML = '▶️ Reproducir';
  playBtn.classList.remove('pause');
  playBtn.classList.add('play');
}

function changeVolume(audioId, volume) {
  const audio = document.getElementById(audioId);
  audio.volume = volume / 100;
  
  // Cambiar icono según el volumen
  const volumeIcon = document.querySelector(`#${audioId}`).parentElement.querySelector('.volume-icon');
  if (volume == 0) {
    volumeIcon.innerHTML = '🔇';
  } else if (volume < 30) {
    volumeIcon.innerHTML = '🔉';
  } else {
    volumeIcon.innerHTML = '🔊';
  }
}

// Función para manejar el cambio de volumen en tiempo real
function handleVolumeInput(audioId, volume) {
  changeVolume(audioId, volume);
}

// Inicializar volumen por defecto
document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('song1');
  if (audio) {
    audio.volume = 0.5; // 50% por defecto
  }
  
  // Listener para cuando termine la canción
  audio.addEventListener('ended', function() {
    const playBtn = document.getElementById('playBtn1');
    playBtn.innerHTML = '▶️ Reproducir';
    playBtn.classList.remove('pause');
    playBtn.classList.add('play');
  });
});

// Contador de días juntos (desde el 20/05/2024)
const inicio = new Date("2024-05-20T00:00:00");
const hoy = new Date();
const diffTime = hoy - inicio;
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
document.getElementById("contador").innerText =
  `Han pasado ${diffDays} días desde que empezó nuestra historia 💖`;