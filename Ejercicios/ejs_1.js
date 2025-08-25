//1. Ejercicio 1: Declaración de Variables

/*Declara tres variables: una para almacenar tu ciudad, otra para almacenar tu país, y otra para almacenar tu edad de nacimiento.
Imprime los valores en la consola y después intenta cambiar los valores y observa los resultados con let y const. */
let ciudad = "Adrogue";
let pais = "Argentina";
let edadNacimiento = 2003;
console.log("Ciudad:",ciudad,"Pais:",pais,"Ano de nacimiento:", edadNacimiento);


//2. Ejercicio 2: Operaciones Matemáticas

/*Declara tres variables numéricas. 
Calcula el promedio de las tres y encuentra el residuo de la división de la suma total entre 2. 
Imprime los resultados.*/
const num1 = 5;
const num2 = 10;
const num3 = 15;

let promedio = (num1 + num2 + num3) / 3;
let residuo = (num1 + num2 + num3) % 2;
console.log("Promedio:", promedio);
console.log("Residuo de la suma total entre 2:", residuo);

//3. Ejercicio 3: Tipos de Datos

/*Declara una variable para almacenar un objeto que represente un coche con propiedades como marca, modelo y año. 
Imprime el tipo de cada propiedad con typeof.*/
let coche = {
    marca: "Nissan",
    modelo: "Kicks",
    año: 2024
};
console.log("Marca:", typeof coche.marca);
console.log("Modelo:", typeof coche.modelo);
console.log("Año:", typeof coche.año);

//4. Ejercicio 4: Arrays Básicos

/*Crea un array con los nombres de 5 ciudades que te gustaría visitar. 
Reemplaza el tercer elemento por otra ciudad y luego imprime el array actualizado.*/
const ciudades = ["Barcelona", "Monaco", "Nueva York", "Tokio", "Sídney"];
ciudades[2] = "París";
console.log("Ciudades actualizadas:", ciudades);

//5. Ejercicio 5: Array de Objetos

/*Crea un array de 3 objetos que representen películas, cada una con título, director y año de lanzamiento.
Imprime el director de la última película.*/
let peli_1 = {
    titulo: "Interstellar",
    director: "Christopher Nolan",
    año: 2014  
}
let peli_2 = {
    titulo: "Inception",
    director: "Christopher Nolan",  
    año: 2010
}
let peli_3 = {
    titulo: "Narnia",
    director: "Andrew Adamson",
    año: 2005
}
const peliculas = [peli_1, peli_2, peli_3];

console.log("Director de la última película:", peliculas[2].director);


//6. Ejercicio 6: Operadores Lógicos

/*Declara tres variables booleanas y usa operadores lógicos para verificar si al menos dos son verdaderas. 
Imprime true o false en la consola dependiendo del resultado.*/



//8. Ejercicio 8: Concatenación de Strings

/*Declara dos variables que almacenen strings (por ejemplo, tu nombre y tu apellido). 
Luego, crea una tercera variable que concatene las dos primeras y muestra el resultado en la consola.*/
let nombre = "Maria";
let apellido = "Orellano";
console.log(nombre + " " + apellido);

//9. Ejercicio 9: Incremento y Decremento

/*Declara una variable numérica y utiliza los operadores de incremento (++) y decremento (--) para modificar su valor. 
Imprime el valor de la variable después de cada operación.*/
let numero = 5;
numero++;
console.log("Después del incremento:", numero);
numero--;
console.log("Después del decremento:", numero);

//13. Ejercicio 13: Uso de typeof con Variables No Definidas

/*Declara una variable sin asignarle un valor y otra variable con valor null. 
Utiliza typeof para imprimir el tipo de cada variable.*/
let variableSinValor;
let variableNull = null;
console.log("Tipo de variable sin valor:", typeof variableSinValor); // undefined
console.log("Tipo de variable null:", typeof variableNull); // object

//14. Ejercicio 14: Conversión de Tipos

/*Declara una variable que almacene un número como string (por ejemplo, "123"). 
Convierte este string a un número usando parseInt o Number y demuestra que ahora puedes realizar operaciones matemáticas con él.*/

let num = "123";
let numconv=parseInt(num);
console.log(numconv + 100)
