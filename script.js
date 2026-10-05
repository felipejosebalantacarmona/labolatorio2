function iniciarJuego() {
    document.getElementById('intro').classList.remove('active');
    document.getElementById('nivel1').classList.add('active');
}

function verificar(nivel, respuestaCorrecta, siguienteNivel) {
    let inputUsuario = document.getElementById('input' + nivel).value;
    
    if (inputUsuario.trim() === respuestaCorrecta) {
        document.getElementById('nivel' + nivel).classList.remove('active');
        document.getElementById(siguienteNivel).classList.add('active');
        document.getElementById('input' + nivel).value = ''; 

        // Si llega a la pantalla final, se activa la celebración
        if (siguienteNivel === 'final') {
            iniciarCelebracion();
        }
    } else {
        mostrarModal("❌ Acceso denegado. Código matemático incorrecto.");
    }
}

function mostrarTeoria(texto) {
    mostrarModal("📄 ARCHIVO CLASIFICADO: \n\n" + texto);
}

function mostrarPista(texto) {
    mostrarModal("💡 " + texto);
}

function mostrarModal(mensaje) {
    document.getElementById('modal-text').innerText = mensaje;
    document.getElementById('modal-msg').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modal-msg').style.display = 'none';
}

/* ANIMACIÓN DE CONFETI PARA LA CELEBRACIÓN FINAL */
function iniciarCelebracion() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#58a6ff', '#3fb950', '#d29922', '#ff7b72', '#a371f7'];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            vy: Math.random() * 3 + 2,
            vx: Math.random() * 2 - 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.y += p.vy;
            p.x += p.vx;
            if (p.y > canvas.height) p.y = -10;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });
        requestAnimationFrame(animate);
    }
    animate();
}
