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

Crea una función expresada que reciba un array de strings y retorne un string que concatena todos los elementos del array separados por espacios.

3. Ejercicio 3: Función Flecha
Convierte la función del ejercicio anterior a una función de flecha. Además, agrega una validación para que, si el array está vacío, retorna un mensaje de advertencia.

4. Ejercicio 4: Estructura If-Else
Escribe una función que tome una temperatura en grados Celsius como argumento y devuelva un mensaje que indique si hace frío (menor a 15 grados), templado (entre 15 y 25 grados) o calor (mayor a 25 grados).

5. Ejercicio 5: Operador Ternario
Reescribe una función que tome una hora (formato 24 horas) y devuelva "Buenos días" si es antes de las 12, "Buenas tardes" si es entre las 12 y 18, o "Buenas noches" si es después de las 18, utilizando operadores ternarios.

6. Ejercicio 6: Operadores And y Or
Escribe una función que reciba cuatro argumentos booleanos y retorne true si al menos uno de los dos primeros es verdadero y al menos uno de los dos últimos es falso.

7. Ejercicio 7: Función que Calcula el Factorial
Escribe una función que tome un número como argumento y retorne su factorial. Utiliza una estructura if para manejar el caso base.

8. Ejercicio 8: Función con Parámetros por Defecto
Crea una función que salude a una persona. Si no se proporciona el nombre, debe saludar con "Hola, invitado".*/
