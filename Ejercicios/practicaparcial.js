let libros = [];
let idCounter = 1;

function agregarLibro(titulo, autor, anio, genero, leido = false, arrayLibros = libros) {
    const libro = {
        id: idCounter++,
        titulo: titulo,
        autor: autor,
        anio: parseInt(anio),
        genero: genero,
        leido: leido
    };
    arrayLibros.push(libro);
    if (arrayLibros === libros && typeof document !== 'undefined') mostrarLibros();
    return libro;
}

function eliminarLibro(id, arrayLibros = libros) {
    const index = arrayLibros.findIndex(libro => libro.id === id);
    if (index !== -1) {
        arrayLibros.splice(index, 1);
        if (arrayLibros === libros && typeof document !== 'undefined') mostrarLibros();
    }
}

function marcarComoLeido(id, arrayLibros = libros) {
    const libro = arrayLibros.find(l => l.id === id);
    if (libro) {
        libro.leido = !libro.leido;
        if (arrayLibros === libros && typeof document !== 'undefined') mostrarLibros();
    }
}

function obtenerLibros(arrayLibros = libros) {
    return arrayLibros;
}

function filtrarPorGenero(genero, arrayLibros = libros) {
    return genero ? arrayLibros.filter(libro => libro.genero === genero) : arrayLibros;
}

function obtenerEstadisticas(arrayLibros = libros) {
    return {
        total: arrayLibros.length,
        leidos: arrayLibros.filter(l => l.leido).length,
        noLeidos: arrayLibros.filter(l => !l.leido).length,
        generos: [...new Set(arrayLibros.map(l => l.genero))].length
    };
}

function mostrarLibros() {
    const container = document.getElementById('listaLibros');
    const stats = document.getElementById('estadisticas');
    
    if (!container) return;
    
    if (libros.length === 0) {
        container.innerHTML = '<p>No hay libros</p>';
    } else {
        container.innerHTML = libros.map(libro => `
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
                <h3>${libro.titulo}</h3>
                <p>Autor: ${libro.autor}</p>
                <p>Año: ${libro.anio}</p>
                <p>Género: ${libro.genero}</p>
                <p>Estado: ${libro.leido ? 'LEÍDO' : 'NO LEÍDO'}</p>
                <button onclick="marcarComoLeido(${libro.id})">
                    ${libro.leido ? 'Marcar no leído' : 'Marcar leído'}
                </button>
                <button onclick="eliminarLibro(${libro.id})">Eliminar</button>
            </div>
        `).join('');
    }
    
    if (stats) {
        const estadisticas = obtenerEstadisticas();
        stats.innerHTML = `
            <p>Total de libros: ${estadisticas.total}</p>
            <p>Libros leídos: ${estadisticas.leidos}</p>
            <p>Libros no leídos: ${estadisticas.noLeidos}</p>
            <p>Géneros diferentes: ${estadisticas.generos}</p>
        `;
    }
}

function mostrarFiltrados(genero) {
    const container = document.getElementById('listaLibros');
    if (!container) return;
    
    const librosFiltrados = filtrarPorGenero(genero);
    
    if (librosFiltrados.length === 0) {
        container.innerHTML = '<p>No hay libros de este género</p>';
    } else {
        container.innerHTML = librosFiltrados.map(libro => `
            <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
                <h3>${libro.titulo}</h3>
                <p>Autor: ${libro.autor}</p>
                <p>Año: ${libro.anio}</p>
                <p>Género: ${libro.genero}</p>
                <p>Estado: ${libro.leido ? 'LEÍDO' : 'NO LEÍDO'}</p>
                <button onclick="marcarComoLeido(${libro.id})">
                    ${libro.leido ? 'Marcar no leído' : 'Marcar leído'}
                </button>
                <button onclick="eliminarLibro(${libro.id})">Eliminar</button>
            </div>
        `).join('');
    }
}

if (typeof document !== 'undefined') {
    window.addEventListener('load', function() {
        document.getElementById('formAgregar').addEventListener('submit', function(e) {
            e.preventDefault();
            agregarLibro(
                document.getElementById('titulo').value,
                document.getElementById('autor').value,
                document.getElementById('anio').value,
                document.getElementById('genero').value,
                document.getElementById('leido').checked
            );
            this.reset();
        });
        mostrarLibros();
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { agregarLibro, eliminarLibro, marcarComoLeido, obtenerLibros, filtrarPorGenero, obtenerEstadisticas };
}