let nombreUsuario = document.getElementById("nombreUsuario")

console.log(nombreUsuario)
nombreUsuario.innerText = "Esteban Piazza"

let textosGenericos = document.getElementsByClassName("textoGenerico")

nombreUsuario.style.color="blue"

let imagenesGenericas = document.querySelectorAll(".imagenGenerica")
/* usamos . porque es una clase */

let encabezado = document.querySelector("#nombreUsuario")

/* usamos # porque es un id */

/* Listener */

let botonDelTonto = document.getElementById("testDelTonto")

botonDelTonto.addEventListener("click", function(){
    alert("Si eres tonto")
})

document.getElementById("otroBoton").addEventListener("click",function(){
    alert("pasaste por arriba")
})
