let libros = [];
let idCounter = 1;

// Función que se llama cuando se envía el formulario
function agregarLibroDesdeFormulario() {
    let titulo = document.getElementById('titulo').value;
    let autor = document.getElementById('autor').value;
    let anio = document.getElementById('anio').value;
    let genero = document.getElementById('genero').value;
    let leido = document.getElementById('leido').checked;
    
    agregarLibro(titulo, autor, anio, genero, leido);
    
    // Limpiar formulario
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('anio').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('leido').checked = false;
    
    return false; // Evita que la página se recargue
}

// Agrega un libro al array
function agregarLibro(titulo, autor, anio, genero, leido) {
    let libro = {
        id: idCounter,
        titulo: titulo,
        autor: autor,
        anio: parseInt(anio),
        genero: genero,
        leido: leido
    };
    idCounter++;
    libros.push(libro);
    mostrarTodos();
}

// Elimina un libro
function eliminarLibro(id) {
    for (let i = 0; i < libros.length; i++) {
        if (libros[i].id === id) {
            libros.splice(i, 1);
            break;
        }
    }
    mostrarTodos();
}

// Marca un libro como leído o no leído
function marcarComoLeido(id) {
    for (let i = 0; i < libros.length; i++) {
        if (libros[i].id === id) {
            libros[i].leido = !libros[i].leido;
            break;
        }
    }
    mostrarTodos();
}

// Muestra todos los libros
function mostrarTodos() {
    mostrarLibrosEnPantalla(libros);
    mostrarEstadisticas();
}

// Filtra libros por género
function filtrarLibros() {
    let generoSeleccionado = document.getElementById('filtroGenero').value;
    
    if (generoSeleccionado === '') {
        mostrarTodos();
    } else {
        let librosFiltrados = [];
        for (let i = 0; i < libros.length; i++) {
            if (libros[i].genero === generoSeleccionado) {
                librosFiltrados.push(libros[i]);
            }
        }
        mostrarLibrosEnPantalla(librosFiltrados);
    }
}

// Muestra los libros en pantalla
function mostrarLibrosEnPantalla(arrayLibros) {
    let container = document.getElementById('listaLibros');
    
    if (arrayLibros.length === 0) {
        container.innerHTML = '<p>No hay libros</p>';
    } else {
        let html = '';
        for (let i = 0; i < arrayLibros.length; i++) {
            let libro = arrayLibros[i];
            let estado = libro.leido ? 'LEÍDO' : 'NO LEÍDO';
            let botonTexto = libro.leido ? 'Marcar no leído' : 'Marcar leído';
            
            html += '<div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">';
            html += '<h3>' + libro.titulo + '</h3>';
            html += '<p>Autor: ' + libro.autor + '</p>';
            html += '<p>Año: ' + libro.anio + '</p>';
            html += '<p>Género: ' + libro.genero + '</p>';
            html += '<p>Estado: ' + estado + '</p>';
            html += '<button onclick="marcarComoLeido(' + libro.id + ')">' + botonTexto + '</button> ';
            html += '<button onclick="eliminarLibro(' + libro.id + ')">Eliminar</button>';
            html += '</div>';
        }
        container.innerHTML = html;
    }
}

// Muestra las estadísticas
function mostrarEstadisticas() {
    let total = libros.length;
    let leidos = 0;
    let noLeidos = 0;
    let generosUnicos = [];
    
    for (let i = 0; i < libros.length; i++) {
        if (libros[i].leido) {
            leidos++;
        } else {
            noLeidos++;
        }
        
        // Agregar género si no está en la lista
        let generoExiste = false;
        for (let j = 0; j < generosUnicos.length; j++) {
            if (generosUnicos[j] === libros[i].genero) {
                generoExiste = true;
                break;
            }
        }
        if (!generoExiste) {
            generosUnicos.push(libros[i].genero);
        }
    }
    
    let stats = document.getElementById('estadisticas');
    stats.innerHTML = '<p>Total de libros: ' + total + '</p>';
    stats.innerHTML += '<p>Libros leídos: ' + leidos + '</p>';
    stats.innerHTML += '<p>Libros no leídos: ' + noLeidos + '</p>';
    stats.innerHTML += '<p>Géneros diferentes: ' + generosUnicos.length + '</p>';
}