// Sistema de Gestión de Estudiantes
//  Escribí el código JS que:


// Declare let estudiantes = []. Cada estudiante: {nombre, edad, calificaciones: number[], esEstudianteActivo: boolean}.


// Función agregarEstudiante(nombre, edad, calificaciones) que pushee el objeto con esEstudianteActivo=true.


// Función calcularPromedio(calificaciones) que retorne el promedio.


// Función mostrarEstudiantesActivos() que imprima nombres con esEstudianteActivo===true.


// Función evaluarEdad(edad) con ternario que retorne si es mayor o menor de edad.


// Función activarDesactivarEstudiante(nombre) que togglee esEstudianteActivo.


// Un for que recorra estudiantes e imprima nombre y promedio (usando calcularPromedio).


// filter para obtener solo mayores de edad.


// reduce para obtener el promedio de edades del curso.


// Tienda Online
//  Escribí el código JS que:


// Declare let carrito = [] y productos {nombre, precio, cantidadEnStock}.


// verificarStock(producto, cantidad) → true/false.


// agregarAlCarrito(producto, cantidad) que agregue si hay stock; si no, error en consola.


// calcularTotalCarrito() con reduce.


// aplicarDescuento(total) que aplique 10% si total>100.


// map para obtener nombres de productos en el carrito.


// filter para productos con stock >10.


// Un for que imprima nombre, precio, cantidad del carrito.


// Registro de Asistencia (empleados)
//  Escribí el código JS que:


// Declare let empleados = [{nombre, id, asistencias: boolean[]}, ...].


// registrarAsistencia(id, valorBool) que pushee en el array asistencias del empleado.


// calcularAsistencia(id) que devuelva el porcentaje de true en asistencias.


// esEmpleadoFrecuente(id) que retorne true si tiene >80% de asistencia.


// find para buscar empleado por id.


// Un for que imprima nombre y porcentaje de asistencia.


// filter para empleados con >90%.


// Inventario Biblioteca
//  Escribí el código JS que:


// Declare let biblioteca = [{titulo, autor, anio, cantidadDisponible}, ...].


// agregarLibro(libro) que pushee a biblioteca.


// disponibilidadLibro(titulo) que retorne true/false según cantidadDisponible.


// prestarLibro(titulo) que reste 1 si hay disponibilidad; si no, error.


// devolverLibro(titulo) que sume 1.


// forEach para imprimir título y cantidad de todos.


// map para obtener solo los títulos.


// filter para libros con anio > 2000.


// Buscador con API (usuarios)
//  Escribí el código HTML+JS con un <input> de búsqueda. En cada input (evento input), hacé fetch a https://jsonplaceholder.typicode.com/users, filtrá por coincidencia en el nombre y mostrà los resultados en una <ul>.
