import axios from "axios";
import { MovieQuery, MovieSummary } from "../Models";
import { Movie } from "../Models";

function destructUrl (backend : string, props : MovieQuery) {
    let url = new URL(backend + '/movies?');
    
    const params = new URLSearchParams();
    // set the params ot the props
    params.set('title', props.title? props.title : '');
    params.set('year', props.year? props.year : '');
    params.set('limit', props.limit.toString());
    params.set('offset', props.offset.toString());
    params.set('order-dir', props.orderDir);
    params.set('order-by', props.orderBy);

    return url + params.toString();
}

/**
 * The function that gets all the movies from the backend
 * 
 * @param backend the backend to send the request to
 * @param props the properties to send to the backend
 * @returns the data returned by the backend
 */
async function getMovies(backend : string, props : MovieQuery) : Promise<MovieSummary[]> {
    const url = destructUrl(backend, props);
    const res = await axios.get(url);
    const data = res.data;
    return data;
}

/**
 * This function gets all the movies from the backend
 * 
 * @param backend the backend to send the request to
 * @param props the properties to send to the backend
 * @returns the data returned by the backend
 */
async function getActorMovies(backend : string, props : MovieQuery) : Promise<MovieSummary[]> {
    if (props.id) {
        backend += props.id;
    }

    let url = destructUrl(backend, props);
    const res = await axios.get(url);
    const data = res.data;
    return data;
}

/**
 * The function to get a single movie from the backend
 * 
 * @param backend the backend to send the request to
 * @param id the id of the movie to get
 * @returns the data returned by the backend
 */
async function getOneMovie(backend : string, id : string) : Promise<Movie> {
    const res = await axios.get(`${backend}/movies/${id}`);
    return res.data;
}


/**
 * Adds a movie to the backend 
 * 
 * @param backend the backend to send the request to
 * @param movie the movie to add
 * @returns the data returned by the backend
 */
async function addMovie(backend : string, movie : Movie) : Promise<number> {
    const res = await axios.post(`${backend}/movies`,  movie);
    const data : number = res.data;
    return data;
}

/**
 * Deletes a movie from the backend
 * 
 * @param backend the backend to send the request to
 * @param id the id of the movie to delete
 * @returns the data returned by the backend
 */
async function deleteMovie(backend : string, id : string) {
    const res = await axios.delete(`${backend}/movies/${id}`);
    return res.data;
}

export {
    getMovies,
    deleteMovie,
    getActorMovies,
    addMovie,
    getOneMovie
}