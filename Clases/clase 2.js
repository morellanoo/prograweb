/* funciones(expresadas, declarada,flecha), estructura if, else if
operador ternario, and y or, estructura for, metodos de arrays
ejercicios con prompt sync*/

//Funcion expresada----------
function saludar(nombre) {
    return("Hola " + nombre)
}
console.log(saludar("Esteban"));

//java es un lenguaje compilado (distinto a python que es interpretado)
//primero lee todo el codigo y luego lo ejecuta
//por lo que si yo pongo console.log(saludar ("Daniela")) antes de declarar la funcion, no me da error


//Funcion declarada----------
//la funcion existe detro de una variable
let despedir = function(apellido){
    return("Chau "+ apellido)
}
console.log(despedir("Piazza"));

//si a este tipo de funciones las llamo antes de declararlas, no me da error

//back tick----------
function saludarConSuma(nombre){
    return(`Hola ${nombre} la suma de 1+1 es ${1+1}`) //el $ indica que es una variable, entonces puedo poner operaciones dentro
}
console.log(saludarConSuma("Mariana"));

//Funcion flecha----------
let saludarFlecha = nombre => "Hola " + nombre  //es una funcion anonima, no tiene nombre, se usa cuando la funcion es muy corta
//se usa la flecha para indicar que es una funcion
//no se usan llaves ni return, porque es una funcion de una sola linea
console.log(saludarFlecha("Pedro"));

//Estructura if-----------
let a = 1
let b = 2
if (a > b) {
    console.log("a es mayor que b") 
}
else if (a===b) {
    console.log("a y b son iguales")
}
else {
    console.log("a es menor que b")
}

//Operador ternario----------
console.log( a > b ? true:false); //si a es mayor que b, devuelve true, sino false
//todo lo que va dps del ? es lo que se ejecuta si la condicion es verdadera, y lo que va dps del : es lo que se ejecuta si la condicion es falsa
// es un if rapido
console.log( a > b ? "a es mayor que b" : "a es menor o igual que b");
//puedo concatenarlos tmbn

// for----------
// for(variable, condicion, variacion)
for (let i=0; i<10; i++) { //++ le suma 1 a i en cada iteracion, o sea que voy uno por uno, de i=0 a i=1 etc
    console.log(i); //imprime los numeros del 0 al 9
}

let nombre = "Esteban";
//recorrer un string con for
//puedo recorrer un string como si fuera un array, cada letra es un elemento del array
//length me da la cantidad de letras del string
for(let i=0; i < nombre.length; i++) {
    console.log(nombre[i]); //imprime cada letra del nombre
}

const CARRITO = [
    {id:1, nombre:"Remera blanca lisa", precio: 5},
    {id:2, nombre:"Pantalon azul", precio: 10},
    {id:3, nombre:"Zapatillas negras", precio: 15},
    {id:4, nombre:"Camisa a rayas", precio: 20}

]

for (let i=0; i < CARRITO.length; i++) {
    CARRITO[i].precio = CARRITO[i].precio * 1.2} //le sumo el 20% a cada producto
    console.log(CARRITO)    

for (let i=0; i < CARRITO.length; i++) {
    if (CARRITO[i].id < 3) {
        CARRITO[i].precio = CARRITO[i].precio * 1.2 //le sumo el 20% a los productos con id menor a 3
    }}
    console.log(CARRITO)    

let total = 0
for (let i = 0; i < CARRITO.length; i++) {
    total += CARRITO[i].precio //suma el precio de cada producto al total
}
console.log("El total del carrito es: " + total); //imprime el total del carrito

//Metodos de arrays----------

//Reduce
const array = [1,2,3,4]; //0+1+2+3+4
const sumWithInitial = array.reduce( //reduce es un metodo de arrays que reduce el array a un solo valor
    //funcion que recibe dos parametros, el acumulador y el valor actual
    (accumulator, currentValue) => accumulator + currentValue, //funcion que suma cada elemento del array al acumulador
    0 //valor inicial del acumulador
);
console.log(sumWithInitial); //imprime la suma de los elementos del array

//Map
var numbers = [1,5,10,15];
var doubles = numbers.map(function(x) { //map es un metodo de arrays que crea un nuevo array con los resultados de la funcion aplicada a cada elemento del array
    return x * 2; //funcion que multiplica cada elemento del array por 2
}); //aplica una funcion a cada elemento del array y devuelve un nuevo array
console.log(doubles); //imprime el nuevo array con los elementos multiplicados por 2

//Sort
const puntos = [4, 2, 5, 1, 3];
puntos.sort(function(a, b) { //sort es un metodo de arrays que ordena los elementos del array
    return a - b; //funcion que ordena los elementos del array de menor a mayor
    //return b - a; //si quiero ordenarlos de mayor a menor
});
console.log(puntos); //imprime el array ordenado de menor a mayor

//Splice
const months = ["Jan", "March", "April", "June"];  //splice es un metodo de arrays que cambia el contenido de un array eliminando o reemplazando elementos existentes y/o agregando nuevos elementos
months.splice(1, 0, "Feb");
//Insert "Feb" at index 1, sin eliminar ningun elemento
//primer parametro es el indice donde quiero agregar el elemento, segundo parametro es la cantidad de elementos a eliminar, tercer parametro es el elemento a agregar
console.log(months); //imprime el array con el nuevo elemento agregado
//Imprime: ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, "May"); //reemplaza el elemento en el indice 4 por "May"
console.log(months); //imprime el array con el elemento reemplazado
//Imprime: ["Jan", "Feb", "March", "April", "May"]

//Filter 
const words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];
const result = words.filter(word => word.length > 6); //filter es un metodo de arrays que crea un nuevo array con todos los elementos que cumplan la condicion de la funcion
console.log(result); //imprime el nuevo array con los elementos que cumplen la condicion
//Imprime: ["exuberant", "destruction", "present"]

//Find
const numbersArray = [4, 9, 16, 25];
const firstSquare = numbersArray.find(num => num > 10); 
console.log(firstSquare); //imprime el primer elemento del array que cumple la condicion
//Imprime: 16

//FindIndex
const numbersArray2 = [4, 9, 16, 25];
const firstIndex = numbersArray2.findIndex(num => num > 10); 
console.log(firstIndex); //imprime el indice del primer elemento del array que cumple la condicion
//Imprime: 2

//Push
const arrayPush = [1, 2, 3];
arrayPush.push(4);      
console.log(arrayPush); //imprime el array con el nuevo elemento agregado al final
//Imprime: [1, 2, 3, 4] 

//Pop
const arrayPop = [1, 2, 3];
arrayPop.pop();

//Reverse
const arrayReverse = [1, 2, 3];
arrayReverse.reverse(); 
console.log(arrayReverse); //imprime el array con los elementos en orden inverso
//Imprime: [3, 2, 1]

//Slice
const arraySlice = [1, 2, 3, 4, 5];
const slicedArray = arraySlice.slice(1, 3); //slice es un metodo de arrays que devuelve una copia superficial de una porcion del array
console.log(slicedArray); //imprime el nuevo array con los elementos seleccionados
//Imprime: [2, 3]

