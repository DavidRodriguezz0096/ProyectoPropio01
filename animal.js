var btnMostrar = document.getElementById("mostrar");
var parOculto = document.getElementById("oculto");
btnMostrar === null || btnMostrar === void 0 ? void 0 : btnMostrar.addEventListener("click", function () {
    if (parOculto.style.display == "none") {
        parOculto.style.display = 'inline';
        btnMostrar.textContent = "Ver menos";
    }
    else {
        parOculto.style.display = "none";
        btnMostrar.textContent = "Ver más";
    }
});

var mailContacto = document.getElementById("exampleFormControlInput1");
var nombreContacto = document.getElementById("exampleFormControlSelect1");
var consultaContacto = document.getElementById("exampleFormControlTextarea1");
var formContacto = document.getElementById("formContacto");
var btnContacto = document.getElementById("btnContacto");
btnContacto === null || btnContacto === void 0 ? void 0 : btnContacto.addEventListener("click", function () {
    if (mailContacto.value === '' || nombreContacto.value === '' || consultaContacto.value === '') {
        alert("Por favor, Complete los campos solicitados");
    }
    else {
        alert("Tu mensaje ha sido enviado, pronto nos pondremos en contacto contigo");
        formContacto.reset;
    }
});