//Eliminar pelicula
async function removeMovie(id){
    try {
        const res = await fetch(`http://localhost:1234/movies/${id}`,
            {
                method: 'DELETE'
            }
        );
        const movie = await res.json();
        return movie;
    } catch (error) {
        console.log('No se pudo eliminar la película:', error);
    }
}

//Eliminar peliculas
moviesContainer.addEventListener("click",(e)=>{
    //matches: verifica si el elemento coincide con el selector. Devuelve true o false
    //Se puede usar con etiquetas, clases, id, etc. ej: 'button', '.clase', '#id'
    if (e.target.matches('#btn-delete')){
        //const cardMovie = e.target.parentElement; //Devuelve el padre del elemento
        //Closest: devuelve el primer ancestro que cumple con el selector
        //Ancestro quiere decir que busca en el padre, si no, en el abuelo, y así sucesivamente
        const cardMovie = e.target.closest('article');
        const id = cardMovie.dataset.id;
        
        removeMovie(id)
            .then(data => {
                console.log(data); // Muestra la película eliminada
                //Con remove() se elimina el elemento del DOM
                cardMovie.remove();
            })
            .catch(error => {
                console.error('No se pudo eliminar la película:', error);
                // Aquí puedes mostrar un mensaje de error al usuario, revertir los cambios en la interfaz, etc.
            });
    }
});