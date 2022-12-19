import { Box, FormControl, FormGroup, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FormEventHandler } from "react";
import { Movie } from "../../Models"
import { arrToString, objectToList } from "../../utils";
import UpdateIcon from '@mui/icons-material/Update';

// the props object / interface for the update movie form
// we put this on top of the component so that we can use it in the component
// and export it if necessary
interface UpdateMovieFormProps {
    movie ? : Movie,
    onSubmit: FormEventHandler<HTMLFormElement>
}

/**
 * The update movie form component, if no movie is given it will return an empty fragment
 * 
 * @param movie the movie to update
 * @param handleSubmit the submit handler for the form
 * @returns 
 */
function MovieForm({movie, onSubmit} : UpdateMovieFormProps){
    return (
        <Box sx={{p:2, m:2}}>
        <form onSubmit={onSubmit}>

        <FormGroup sx={{p:2}}>
            <TextField required sx={{m:2}} label="Title" defaultValue={movie && movie.title} type="text" name="title" id="title"  />
            <TextField required sx={{m:2}} label="Description" defaultValue={movie && movie.description} multiline name="description" id="description"></TextField>
            <TextField required sx={{m:2}} label="Year" defaultValue={movie && movie.year} type="number" name="year" id="year"  />
            <TextField required sx={{m:2}} label="Rating" defaultValue={movie && movie.rating} type="text" name="rating" id="rating"  />
            <TextField required sx={{m:2}} label="User" defaultValue={movie && movie.review.user || 0} type="number" name="review_user" id="review_user"  />
            <TextField required sx={{m:2}} label="Usercount" defaultValue={movie && movie.review.usercount || 0} type="number" name="review_usercount" id="review_usercount"  />
            <TextField required sx={{m:2}} label="Metascore" defaultValue={movie && movie.review.metascore || 1} type="number" name="review_metascore" id="review_metascore"  />
            <br/>
            <TextField required helperText="Has to be a list of actors, separated by commas" sx={{m:2}} label="Actors" defaultValue={movie && objectToList(movie.actors, 'name')} type="text" name="actors" id="actors"  />
            {
                movie &&
                <FormControl>
                    <input hidden defaultValue={movie && objectToList(movie.actors, 'id')} type="text" name="actors-ids" id="actors-ids"  />
                </FormControl>
            }
            <br/>
            <TextField helperText="Has to be a list of languages, separated by commas" required sx={{m:2}} label="Languages" defaultValue={movie && arrToString(movie.languages)} type="text" name="languages" id="languages"  />
            <TextField  required sx={{m:2}} label="IMDB URL" defaultValue={movie && movie.imdb_url ? movie.imdb_url : ""} type="text" name="imdb_url" id="imdb_url"  />
            </FormGroup>
            <Button variant="contained" type="submit">Update Movie <UpdateIcon/></Button>
        </form>
        </Box>
    );
}

export {
    MovieForm
}