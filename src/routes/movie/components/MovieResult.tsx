import { Language, Languages, Movie } from "../../../Models";
import {ActorsToList} from "../../actors/components";

import { Review } from "../../../Models";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DescriptionIcon from '@mui/icons-material/Description';

/**
 * The props object for the movie result component
 * the movie prop is optional because it might not be loaded yet or not found
 * 
 * formDisabled is a boolean that indicates whether the form is disabled
 * handleSubmit is the function that handles the submit event of the form
 * loading is a boolean that indicates whether the movie is loading
 */
interface MovieResProps {
    movie? : Movie,
    loading: boolean
}

/**
 * The movie result component
 * 
 * @param movie the movie received from the api
 * @param loading the loading prop (whether or not the movie is loading, being fetched)
 * @returns the movie result component
 */
function MovieResult ({movie, loading} : MovieResProps) {
    // JSX.Element[] since we are returning an array of JSX elements (the list of Languages)
    function fromLanguages(languages : Languages) : JSX.Element[] {
        return (
            languages.map((language : Language, index : number) => {
                return <li key={language + index}>{language}</li>
            })
        )
    }


    /**
     * Converts the review to a list of items
     * 
     * @returns a list of items that describe the review
     */
    function formToList(review : Review) : JSX.Element {
        return (
            <ul>
                <li>User : {review.user}</li>
                <li>User Count: {review.usercount || 0}</li>
                <li>Meta Score : {review.metascore || 0}</li>
            </ul>
        );
    }

    function fromMovie() : JSX.Element {
        if (!movie) {
            return <h1>No Movie Found</h1>;
        }
        
        return (
            <Box>
                <CardContent sx={{m:4, p:2}}> 
                    <Typography variant="h3" component="div">Title: {movie.title} ({movie.year})</Typography>
                    <Typography variant="body1">Description :<br/> {movie.description}</Typography>
                    <Typography>Year : {movie.year}</Typography>
                    <Typography>Rating : {movie.rating}</Typography>

                    <Typography>Actors: </Typography>
                    <ActorsToList actors={movie.actors}/>

                    <Typography>IMDB link : <a href={movie.imdb_url}>{movie.imdb_url}</a></Typography>

                    <Typography>Reviews: </Typography>
                    {formToList(movie.review)}

                    <p>Languages :</p>
                    {fromLanguages(movie.languages)}
                </CardContent>
            </Box>
        );
    }

    return (
        <div>
            {/* if loading, show loading else make the movie */}
            {loading ?<CircularProgress sx={{ width: '100%' }} /> : fromMovie()}
        </div>
    )
}


export {
    MovieResult
}
