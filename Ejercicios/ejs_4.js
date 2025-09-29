function cambiarTexto() {
    document.getElementById("titulo").textContent = "Texto Cambiado";
    document.getElementById("parrafo").textContent = "El párrafo ha cambiado";
}

function cambiarColor() {
    document.body.style.backgroundColor = "lightblue";
}

function crearLi() {
let nuevoLi = document.createElement("li");   // 1. Create a new <li> element
nuevoLi.textContent = "Nuevo elemento";   // 2. Add text content
document.getElementById("lista").appendChild(nuevoLi);   // 3. Append it to the <ul> with id="lista"
}

function eliminarPrimerLi() {
    let listas = document.getElementById("listas");
    let primerLi = listas.children[0];

    if (primerLi) {
    primerLi.remove();
    } else {
    console.log("No hay elementos para eliminar");
    }
}

let boton = document.getElementById("miBoton")
let parrafo = document.getElementById("texto")

boton.addEventListener("click", function(){
    parrafo.textContent = "Hola Mundo!";
});

let boton2 = document.getElementById("miNuevoBoton");
let div = document.getElementById("miDiv");

boton2.addEventListener("click", function () {
    div.classList.toggle("resaltado");
});

let formulario = document.getElementById("miFormulario");

formulario.addEventListener("submit", function(event) {
    let nombre = document.getElementById("nombre").value; //.value → Obtiene el texto que escribió el usuario
    
    if (nombre === "") {
        alert("Completá el nombre");
        event.preventDefault(); //Evita el comportamiento por defecto del formulario.
//Sin preventDefault(), el formulario se enviaría de todas formas y la página se recargaría, incluso si mostraste el alert.
    }
});

let boton3 = document.getElementById("actualizar");

boton3.addEventListener("click", function() {
    let parrafos = document.querySelectorAll("p");
    
    for (let i = 0; i < parrafos.length; i++) {
        parrafos[i].textContent = "Párrafo actualizado";
    }
});
