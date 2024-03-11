//Actualizar pelicula
async function updateMovie(id, movie){
    try {
        const res = await fetch(`http://localhost:1234/movies/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });
        const updatedMovie = await res.json();
        return updatedMovie;
    } catch (error) {
        console.log('No se pudo actualizar la película:', error);
    }
}

// Actualizar peliculas
const updateMovieForm = document.getElementById('update-movie-form');
const movieFormContainer =  document.querySelector('.movie-form-container');

// Event listener para mostrar el formulario de actualización
moviesContainer.addEventListener("click", (e) => {
    const cardMovie = e.target.matches('#btn-update');
    if (cardMovie) {
        const cardMovie = e.target.closest('article');
        console.log(cardMovie);
        const id = cardMovie.dataset.id;
        //Mostrar el formulario de actualización
        movieFormContainer.classList.toggle('active');

        //Llenar el formulario con los datos actuales de la película
        const title = cardMovie.querySelector('h2').textContent;
        movieFormContainer.querySelector('h2').textContent = `Actualizar datos de: ${title}`
        updateMovieForm.title.value = title;
        updateMovieForm.year.value = cardMovie.querySelector('p').textContent;
        updateMovieForm.poster.value = cardMovie.querySelector('img').src;
        // Asignar el ID de la película al formulario de actualización
        updateMovieForm.dataset.id = id;
    }
});

// Event listener para enviar el formulario de actualización
updateMovieForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = updateMovieForm.dataset.id;
    const title = updateMovieForm.title.value;
    const year = parseInt(updateMovieForm.year.value);
    const poster = updateMovieForm.poster.value;

    const movieUpdate = {
        title,
        year,
        poster,
    };

    updateMovie(id, movieUpdate)
        .then(data => {
            console.log("Actualización exitosa:", data);
            //Actualizar el DOM con los nuevos datos de la película
            const cardMovie = document.querySelector(`article[data-id="${id}"]`);
            cardMovie.querySelector('h2').textContent = data.title;
            cardMovie.querySelector('img').src = data.poster;
            cardMovie.querySelector('p').textContent = data.year;
            //Ocultar el formulario
            movieFormContainer.classList.remove('active');
        });
});