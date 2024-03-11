const z = require('zod');

const movieSchema = z.object({
    title:z.string({
        invalid_type_error: 'Title must be a string',
        required_error: 'Title is required'
    }),
    year:z.number().int().min(1900).max(2024),
    genre:z.array(
        z.enum(['Action','Comedy','Drama','Horror','Romance','Sci-fi','Crime'])
    ),
    director:z.string(),
    duration:z.number().int().positive(),
    rate:z.number().min(0).max(10).default(5.5).nullish(),
    poster:z.string().url({
        message: 'Poster must be a valid URL'
    })
});

//Funcion para validar el objeto recibido de la request
const validateMovie=(object)=>{
    return movieSchema.safeParse(object);
}

//Funcion para validar las propiedades que se reciben de la request para modificar una movie.
const validatePartialMovie = (object) => {
    return movieSchema.partial().safeParse(object)
}

module.exports = {
    validateMovie,
    validatePartialMovie
};