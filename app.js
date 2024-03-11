const express = require('express');
const app = express();
const cors = require('cors');

const crypto = require('crypto');

const movies = require('./movies.json');
const { validateMovie, validatePartialMovie } = require('./moviesValidations');

//Desactivar la cabecera X-Powered-By
app.disable('x-powered-by');

//Manejo de CORS
app.use(cors({
    origin: (origin, callback) =>{
        const ORIGINS_ACCEPTED = [
            'http://localhost:3000',
            'https://movies.com',
            'https://localhost:1234',
            'http://127.0.0.1:5500',
            'http://localhost:8080'
        ];
        /*El callback recibe 2 parametros, el primero es un error y el segundo es un booleano 
        que indica si se acepta o no la solicitud (Por defecto el valor booleano es false);
        */
        if(!origin || ORIGINS_ACCEPTED.includes(origin)){
            return callback(null, true);
        }else{
            return callback(new Error('Not allowed by CORS'));
        }
    }
}));

//Parsear el body de las peticiones a JSON
app.use(express.json());

//Obtener todas las peliculas
app.get('/movies',(req,res)=>{
    const {genre} = req.query

    if(genre){
        const moviesFiltered = movies.filter(
            movie => movie.genre.some(gen => gen.toLocaleLowerCase() === genre.toLocaleLowerCase())
        );
        if (moviesFiltered.length !== 0){
            res.json(moviesFiltered);
        }else{
            res.status(404).json({error: `Movies not found with genre ${genre}`});
        }
    }else{
        res.json(movies);
    }

})

app.get('/movies/:id',(req,res)=>{;
    const {id} = req.params;
    const movie = movies.find(movie => movie.id === id);

    movie ? res.json(movie) : res.status(404).json({error: 'Movie not found'});
});

//Crear una pelicula
app.post('/movies',(req,res)=>{

    const result = validateMovie(req.body);

    //result tiene 2 objetos error y data
    if (result.error){
        return res.status(400).json({message: JSON.parse(result.error.message)});
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    };
    movies.push(newMovie);

    res.status(201).json(newMovie); //Devuelve el recurso creado para actualizar la cache del cliente
    
});

//Actualizar una pelicula
app.patch('/movies/:id',(req,res)=>{

    const {id} = req.params;
    
    const movieIndex = movies.findIndex(movie => movie.id === id);
    if (movieIndex === -1) return res.status(404).json({message: 'Movie not found'})

    const result = validatePartialMovie(req.body);

    const movie = movies[movieIndex];

    /*Las propiedades de result.data sobrescribirán cualquier propiedad de movie que tenga el mismo nombre*/
    const updateMovie = {
        ...movie,
        ...result.data 
    };

    movies[movieIndex] = updateMovie;
    
    res.status(201).json(updateMovie);
 
});

//Eliminar una pelicula

app.delete('/movies/:id',(req,res)=>{
    const {id} = req.params;
    
    const movieIndex = movies.findIndex(movie => movie.id === id); 

    if (movieIndex === -1) return res.status(404).json({message:"Movie not found"});

    const movie = movies[movieIndex]

    movies.splice(movieIndex,1)
    
    res.json(movie);
});

const PORT = process.env.PORT ?? 1234
app.listen(1234, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
