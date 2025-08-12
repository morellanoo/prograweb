/* Javascript: variables, tipos de datos y arrays */ 
//comentario 
/* let para crear cualquier tipo de variable */
let nombre = "Juan"; // variable de tipo string
let edad = 1; // variable de tipo number
let esEstudiante = true; // variable de tipo boolean
//hola
console.log(nombre,edad);

console.log("esteban"+1); // concatenación de string con número

console.log("11" + 1); // concatenación de string con número me da 111
console.log(11 + 1); // suma de números me da 12
console.log("11" - 1); // resta de string con número me da 10
console.log("esteban" - 1); // resta de string con número me da NaN (Not a Number)

const EDAD = 32; // constante, no se puede cambiar su valor , si le sumo algo me va a dar error
console.log(EDAD);

let array1 = [1, 2, 3]; //los arrays empiezan en 0
console.log(array1[0]); // accedo al primer elemento del array me da 1

const ARRAY2=["Esteban",1,true] // array con diferentes tipos de datos
ARRAY2.push("hola"); // añado un nuevo elemento al final del array
console.log(ARRAY2); // imprime el array con el nuevo elemento añadido
/* por mas que sea un array de constantes, puedo modificar el contenido del array, no el array en si */
/* lo que hace poner const ARRAY2 es que no puedo transformar el array en una variable, no puedo hacer ARRAY2 = [1,2,3] por ejemplo
sera siempre un array, pero puedo modificar lo que hay adentro */

let perro_Violeta = {
    nombre: "tai",
    edad: 11,
    vivo: true,
    cumplirAños: function() {
        this.edad += 1; // incrementa la edad del perro en 1
    }
}
console.log(perro_Violeta.nombre); // accedo al nombre del perro. Estoy accediendo del objeto perro_Violeta a la propiedad nombre

/*Perro Violeta es un objeto que tiene propiedades y métodos.
Propiedades: nombre, edad, vivo.
Métodos: cumplirAños (que incrementa la edad del perro en 1).
*/
let perro_Meri = {
    nombre: "walter",
    edad: 9,
    vivo: true,
}

// Array de objetos, cada objeto es un perro con sus propiedades
const PERROS = [perro_Violeta, perro_Meri];
console.log(PERROS[0].nombre); // accedo al nombre del primer perro del array PERROS

console,log("Esteban"&&"perro"); // operador AND, me da el segundo valor si ambos son verdaderos, en este caso "perro"
console.log("Esteban"||"perro"); // operador OR, me da el primer valor si es verdadero, en este caso "Esteban"

/* truthy y falsy es como los llama*/
/*falsy: 0, "", null, undefined, NaN
truthy: cualquier otro valor que no sea falsy, por ejemplo: 1, "hola", [], {}, true, etc. */

//Operadores matematicos y aritmeticos

console.log(1+2)
console.log(1-2)
console.log(1*2)
console.log(1/2)
console.log(1%2) // division por resto, en este caso 1
console.log(2**3) // potencia, me da 8 (2 elevado a 3)

console.log(1<2) // menor que, me da true
console.log(1>2) // mayor que, me da false
console.log(1<=2) // menor o igual que, me da true
console.log(1>=2) // mayor o igual que, me da false

console.log(1==2) // igual a, me da false (igualdad debil)
console.log(1==="1") // igual a, me da false (igualdad estricta, compara tipo y valor)

console.log(1!=2) // diferente a, me da true
console.log(1!="2") // diferente a, me da true (desigualdad debil)
console.log(1!=="1") // diferente a, me da false (desigualdad estricta, compara tipo y valor)

console.log(2!==3) // diferente a, me da true (desigualdad estricta, compara tipo y valor)

edad3 = "12"; // variable de tipo string
let edad_numerica = parseInt(edad3); // convierto la variable edad3 a un número entero
console.log(edad_numerica); // imprime 12 como número
console.log(typeof edad_numerica); // imprime "number", el tipo de dato de la variable edad_numerica

