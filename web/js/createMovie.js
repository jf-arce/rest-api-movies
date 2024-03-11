//Crear pelicula
async function createMovie(movie){
    try {
        const res = await fetch("http://localhost:1234/movies",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });
        const newMovie = await res.json();
        return newMovie;
    } catch (error) {
        console.log('No se pudo crear la película:', error);
    }
}

//Crear peliculas
const createMovieForm = document.getElementById('create-movie-form');

createMovieForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //Se puede acceder a los elementos del formulario por su nombre o por su id
    const title = createMovieForm.title.value;
    const year = parseInt(createMovieForm.year.value);
    const director = createMovieForm.director.value;
    const duration = parseFloat(createMovieForm.duration.value);
    const poster = createMovieForm.poster.value;
    const rate = parseFloat(createMovieForm.rate.value);
    //Recuperar los checkbox de los generos
    const genres = createMovieForm.genre;
    const genresChecked = Array.from(genres).filter(genre => genre.checked);
    const genresCheckedValues = genresChecked.map(genre => genre.value);

    const newMovie = {
        title,
        year,
        director,
        duration,
        poster,
        genre: genresCheckedValues,
        rate
    };

    createMovie(newMovie)
        .then(movie => {
            console.log("Pelicula creada con éxito:", movie);
            moviesContainer.innerHTML += `
                <article data-id="${movie.id}">
                    <h2>${movie.title}</h2>
                    <img src="${movie.poster}" alt="${movie.title}">
                    <p>${movie.year}</p>
                    <button id="btn-delete">Eliminar</button>
                    <button id="btn-update">Actualizar</button>
                </article>
            `;
        });
           
});
