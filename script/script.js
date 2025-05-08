
window.addEventListener('DOMContentLoaded', function() {
  window.location.hash = '#home';
});

/*1- funcionalidad : Login de acceso*/
function mostrarUsuarioNavbar() {
  const loginData = JSON.parse(localStorage.getItem('login')) || JSON.parse(sessionStorage.getItem('login'));
  const userNavbar = document.getElementById('user-navbar');
  const logoutBtn = document.getElementById('logout-btn');
  const loginLink = document.getElementById('login-link');
  if (userNavbar && logoutBtn) {
    if (loginData && loginData.usuario) {
      userNavbar.textContent = `👤 ${loginData.usuario}`;
      userNavbar.style.display = 'inline-block';
      logoutBtn.style.display = 'inline-block';
      if (loginLink) loginLink.style.display = 'none';
    } else {
      userNavbar.textContent = '';
      userNavbar.style.display = 'none';
      logoutBtn.style.display = 'none';
      if (loginLink) loginLink.style.display = 'inline-block';
    }
  }
}
function actualizarMensajeLogin() {
  const loginMsg = document.getElementById('login-msg');
  const loginData = JSON.parse(localStorage.getItem('login')) || JSON.parse(sessionStorage.getItem('login'));
  if (!loginMsg) return;

  if (window.location.hash === '#login' && loginData && loginData.usuario) {
    loginMsg.textContent = `¡Bienvenido, ${loginData.usuario}!`;
    loginMsg.style.color = "#00b4d8";
  } else {
    loginMsg.textContent = '';
  }
}



/*2-Funcionalidad : Fecha y dia de la semana*/
const fechaElemento = document.getElementById('fecha-actual');
const fecha = new Date();

const opciones = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
const fechaFormateada = fecha.toLocaleDateString('es-ES',opciones);
if (fechaElemento) {
  fechaElemento.textContent = fechaFormateada;
}


/*3-funcionalidad: Deshabilitar el botón login hasta validación de condiciones */
const loginForm = document.getElementById('loginForm');
const aceptarCondiciones = document.getElementById('aceptar-condiciones');
const loginBtn = document.getElementById('login-btn');

if (aceptarCondiciones && loginBtn) {
  aceptarCondiciones.addEventListener('change', function() {
    loginBtn.disabled = !this.checked;
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    if (usuario && password && aceptarCondiciones.checked) {
      sessionStorage.setItem('login', JSON.stringify({ usuario }));
      actualizarMensajeLogin();
      loginForm.reset();
      loginBtn.disabled = true;
      mostrarUsuarioNavbar();
    }
  });
}

/*Logout para cerrar la cessión y volver a la sección Home*/
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('login');
    sessionStorage.removeItem('login');
    localStorage.removeItem('contacto');
    mostrarUsuarioNavbar();
    if (window.location.hash === '#login') {
      window.location.hash = '#home';
      setTimeout(() => {
        actualizarMensajeLogin(); 
      }, 10);
    } else {
      actualizarMensajeLogin();
    }
    const contactoMsg = document.getElementById('contacto-msg');
    if (contactoMsg) {
      contactoMsg.textContent = '';
    }
  });
}

/*4-funcionalidad:Cambio de imagines*/
document.querySelectorAll('.galeria-img').forEach(function(img) {
  img.setAttribute('data-original-src', img.getAttribute('src'));
  img.addEventListener('click', function() {
    if (img.getAttribute('src') === img.getAttribute('data-original-src')) {
      img.setAttribute('src', img.getAttribute('data-alt-src'));
    } else {
      img.setAttribute('src', img.getAttribute('data-original-src'));
    }
  });
});


/*Ver y ocultar la contraseña*/
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const eyeEmoji = document.getElementById('eyeEmoji');

if (togglePasswordBtn && passwordInput && eyeEmoji) {
  togglePasswordBtn.addEventListener('click', function() {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeEmoji.textContent = "👁️";
    } else {
      passwordInput.type = "password";
      eyeEmoji.textContent = "🙈";
    }
  });
}





