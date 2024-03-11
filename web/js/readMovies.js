//Traer las peliculas
const getMovies = async () => {
    try {
        const res = await fetch("http://localhost:1234/movies");
        const movies = await res.json();
        return movies;
    } catch (error) {
        console.log(error);
    }
}

const movies = getMovies();

//Crear peliculas en el DOM
const moviesContainer = document.getElementById('movies-container');

movies.then(movies => {
    const html = movies.map(movie => {
        return `
            <article data-id="${movie.id}">
                <h2>${movie.title}</h2>
                <img src="${movie.poster}" alt="${movie.title}">
                <p>${movie.year}</p>
                <button id="btn-delete">Eliminar</button>
                <button id="btn-update">Actualizar</button>
            </article>
        `;
    }).join('');

    moviesContainer.innerHTML = html;
});
