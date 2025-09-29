/*1. Ejercicio 1: Función Declarada
Escribe una función que tome tres números como argumentos y retorne el mayor de ellos. 
Llama a la función con diferentes valores e imprime el resultado.*/

let mayorDeTres = function(num1, num2, num3) {
    if (num1 >= num2 && num1 >= num3) {
        return num1;
    } else if (num2 >= num1 && num2 >= num3) {
        return num2;
    } else {
        return num3;
    }
};

console.log(mayorDeTres(5, 10, 3));

/*2. Ejercicio 2: Función Expresada

Crea una función expresada que reciba un array de strings y retorne un string que concatena todos los elementos del array separados por espacios. */

function saludo(saludo, objeto) {
    return (saludo +" "+objeto)
}
console.log(saludo("Hola", "Mundo"));

/* 3. Ejercicio 3: Función Flecha
Convierte la función del ejercicio anterior a una función de flecha. Además, agrega una validación para que, si el array está vacío, retorna un mensaje de advertencia.*/
let saludoflecha = array => array.length === 0 ? 'Array Vacio': array.join(" ")

console.log(saludoflecha(["Hola","Mundo"]));

//todo lo que va dps del ? es lo que se ejecuta si la condicion es verdadera, y lo que va dps del : es lo que se ejecuta si la condicion es falsa


/* 4. Ejercicio 4: Estructura If-Else
Escribe una función que tome una temperatura en grados Celsius como argumento y devuelva un mensaje que indique si hace frío (menor a 15 grados), templado (entre 15 y 25 grados) o calor (mayor a 25 grados).*/

let temperatura = function(valor) {
    if(valor<15) {
        return("Frio")
    } else if (valor<=25) {
        return("Templado")
    }else {return("Calor")}
}
console.log(temperatura(100));

/*5. Ejercicio 5: Operador Ternario
Reescribe una función que tome una hora (formato 24 horas) y devuelva "Buenos días" si es antes de las 12, "Buenas tardes" si es entre las 12 y 18, o "Buenas noches" si es después de las 18, utilizando operadores ternarios.*/

let saludohorario = hora => hora<12 ? "Buenos dias" : hora<=18 ? "Buenas tardes" : "Buenas noches";
console.log(saludohorario(19))

/*6. Ejercicio 6: Operadores And y Or
Escribe una función que reciba cuatro argumentos booleanos y retorne true si al menos uno de los dos primeros es verdadero y al menos uno de los dos últimos es falso.*/

let booleanos = function(bool1, bool2, bool3, bool4) {
    return (bool1 || bool2) && (!bool3 || !bool4);
}
console.log(booleanos(true, true, false, false))

/*7. Ejercicio 7: Función que Calcula el Factorial
Escribe una función que tome un número como argumento y retorne su factorial. Utiliza una estructura if para manejar el caso base.*/

function factorial(n) {
    // Caso base: el factorial de 0 y 1 es 1
    if (n === 0 || n === 1) {
        return 1;
    }
    // Caso recursivo: n! = n * (n-1)!
    return n * factorial(n - 1);
}
console.log(factorial(3))

/*8. Ejercicio 8: Función con Parámetros por Defecto
Crea una función que salude a una persona. Si no se proporciona el nombre, debe saludar con "Hola, invitado".*/

function saludos(nombre = "invitado") {
    if (nombre === "") {
        nombre = "invitado";
    }
    return "Hola, " + nombre;
}
console.log(saludos(""));

// let saludos = function(nombre = "invitado") {
//     if (nombre.length === 0) {
//         return "Hola, invitado";
//     } else {
//         return "Hola, " + nombre;
//     }
// };

// function saludos(nombre = "invitado") {
//     return "Hola, " + nombre;
// }
// // Funciona para saludos() pero no para saludos("")

/*9. Par o impar (módulo + ternario)
Escribí un código esPar(n) que use % y ? : para retornar true si es par, false si es impar.*/

let esPar = n => n % 2 === 0 ? true : false;
console.log(esPar(10))

// % nos da el resto de la division

// 10. Switch (día de la semana)
//  Escribí un código que reciba un número 1–7 y retorne el nombre del día.

function obtenerDiaSemana(numero) {
    switch (numero) {
        case 1:
            return "Lunes";
        case 2:
            return "Martes";
        case 3:
            return "Miércoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        case 6:
            return "Sábado";
        case 7:
            return "Domingo";
        default:
            return "Número inválido. Debe ser del 1 al 7";
    }
}
console.log(obtenerDiaSemana(5))

// 11. Recursiva (suma 1..n)
//  Escribí un código que calcule recursivamente la suma de 1 a n.

function sumaRecursiva(n) {
    // Caso base: si n es 1, la suma es 1
    if (n === 1) {
        return 1;
    }
    
    // Caso recursivo: n + suma de (1 hasta n-1)
    return n + sumaRecursiva(n - 1);
}

console.log(sumaRecursiva(10))

// 12. Validación de contraseña
// Escribí un código esPasswordValida(p) que retorne true si p tiene ≥8 caracteres, al menos un número y una mayúscula (usá lógicos).

function esPasswordValida(p) {
    return p.length >= 8 && /\d/.test(p) && /[A-Z]/.test(p);
}
console.log(esPasswordValida("Qwerty99"))

// EXPLICACIÓN DETALLADA DE LA REGEX CON LOOKAHEADS:
// /(?=.*\d)(?=.*[A-Z])/

// /* 
// LOOKAHEAD POSITIVO: (?=...)
// - Es una "mirada hacia adelante" que verifica una condición SIN consumir caracteres
// - No cambia la posición actual en la cadena
// - Solo verifica que la condición se pueda cumplir desde ese punto

// DESGLOSE:
// 1. (?=.*\d)     - Lookahead que verifica "en algún lugar hay un dígito"
//    - .* significa "cero o más caracteres de cualquier tipo"
//    - \d significa "un dígito (0-9)"
//    - Juntos: "en algún lugar después de aquí hay un dígito"

// 2. (?=.*[A-Z])  - Lookahead que verifica "en algún lugar hay una mayúscula"
//    - .* significa "cero o más caracteres de cualquier tipo"
//    - [A-Z] significa "una letra mayúscula"
//    - Juntos: "en algún lugar después de aquí hay una mayúscula"*/

//  13. For (pares 1–20)
//  Escribí un código que imprima los pares entre 1 y 20.

for (let i = 2; i <= 20; i += 2) {
    console.log(i);
}

// 14. For (listar películas)
//  Escribí un código que recorra un array con 5 películas e imprima "1. El Padrino", etc.
const peliculas = [
    "El Padrino",
    "Titanic", 
    "Avatar",
    "Los Vengadores",
    "Jurassic Park"
];

for (let i = 0; i < peliculas.length; i++) {
    console.log((i + 1) + ". " + peliculas[i]);
}

//  15. forEach (par/impar)
//  Escribí un código que, dado un array de números, imprima con forEach si cada uno es par o impar.

const numeros = [1,2,3,4,5,6,7,8,9.10];
//forEach = Loop automático que recorre TODO el array hasta el final
numeros.forEach(function(numero) {
    if (numero % 2 === 0) {
        console.log(numero + " es par");
    } else {
        console.log(numero + " es impar");
    }
});

// 16. find (>20)
//  Escribí un código que encuentre con find el primer número > 20.

const numbersArray = [4, 9, 16, 25, 63];
const first20 = numbersArray.find(num => num > 20); 
console.log(first20); //imprime el primer elemento del array que cumple la condicion

//  17. some (≥18)
//  Escribí un código que verifique con some si hay al menos una edad ≥18.

