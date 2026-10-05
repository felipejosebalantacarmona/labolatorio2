// Animación del Fondo Espacial de la Nave
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const stars = [];
for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1
    });
}

function renderSpace() {
    ctx.fillStyle = '#020208';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(renderSpace);
}
renderSpace();

// Lógica del Escape Room
function iniciarJuego() {
    document.getElementById('intro').classList.remove('active');
    document.getElementById('nivel1').classList.add('active');
    document.getElementById('sys-status').innerText = 'OPERATIVO';
    document.getElementById('sys-status').style.color = '#00f0ff';
}

function verificar(nivel, respuestaCorrecta, siguienteNivel) {
    let inputUsuario = document.getElementById('input' + nivel).value;

    if (inputUsuario.trim() === respuestaCorrecta) {
        document.getElementById('nivel' + nivel).classList.remove('active');
        document.getElementById(siguienteNivel).classList.add('active');
        document.getElementById('input' + nivel).value = '';

        // Actualizar barra de energía HUD
        let porcentaje = nivel * 10;
        document.getElementById('energy-bar').style.width = porcentaje + '%';
        document.getElementById('energy-val').innerText = porcentaje + '%';

        if (siguienteNivel === 'final') {
            activarHiperespacio();
        }
    } else {
        mostrarModal("❌ ERROR DE CÁLCULO: Código de seguridad denegado.");
    }
}

function activarHiperespacio() {
    document.getElementById('sys-status').innerText = 'HIPERESPACIO';
    document.getElementById('sys-status').style.color = '#39ff14';
    document.getElementById('hyperspace-overlay').style.opacity = '0.4';
}

function mostrarTeoria(texto) {
    mostrarModal("📄 DOCUMENTO DE NAVEGACIÓN:\n\n" + texto);
}

function mostrarPista(texto) {
    mostrarModal("💡 ASISTENTE DE IA:\n\n" + texto);
}

function mostrarModal(mensaje) {
    document.getElementById('modal-text').innerText = mensaje;
    document.getElementById('modal-msg').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modal-msg').style.display = 'none';
}
