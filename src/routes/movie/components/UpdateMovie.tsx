import axios from "axios";
import { useContext, useState } from "react";
import { Movie } from "../../../Models";
import { MovieResult } from "./MovieResult";
import { getFormValues } from "../../../utils";
import { BackendContext } from "../../BackendContext";
import { MovieForm } from "../../components/MovieForm";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { CardActions } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import { DeleteMovie } from "./DeleteMovie";

/**
 * The props for the UpdateMovie component
 * the movie is optional because we might not have it yet (still being fetched) or just not found
 * the id is optional since the path variable is optional
 */
interface UpdateMovieProps {
    movie? : Movie,
    id? : string,
    loading: boolean,
}

function UpdateMovie({movie, id, loading} : UpdateMovieProps) {
    // we need the backend url in this component, so we use the context
    // to get the value from the specific context we created and then import
    const backend = useContext(BackendContext);

    // we want to disable the form by default (just show the movie result)
    // but when the user clicks the edit button we want to enable the form
    // so we use a state to keep track of this
    const [formDisabled, setFormDisabled] = useState(true);
    
    /** Promise since the function is async */
    async function handleSubmit (event : React.FormEvent<HTMLFormElement>) : Promise<void>{
        event.preventDefault();
        if (!id || !movie) {
            return;
        }

        const form = event.currentTarget;
        const formData = new FormData(form);
        const body : Movie = getFormValues(formData);


        try {
            const url = `${backend}/movies/${id}`
            const res = await axios.put(url, body);
            // redirect to the movie page
            window.location.href = `/movies/${id}`;
        } catch (error) {
            alert('Error while updating');
            console.error(error);
        }
    }

    return (
      <div>
        {/* by default do the get request -> show the result */}

            {formDisabled ? 
                <>
                    <MovieResult movie={movie} loading={loading} />
                    <CardActions>
                        <Button size='small' variant="contained" onClick={() => setFormDisabled(false)}>Edit Movie <EditIcon/></Button>
                        <DeleteMovie id={id} />
                    </CardActions>
                </>
            :
                <>
                <MovieForm movie={movie} onSubmit={handleSubmit} />
                <CardActions>
                    <Button  size='small' variant="contained" color='warning' onClick={() => setFormDisabled(true)}>Cancel <EditOffIcon/></Button>
                    <DeleteMovie id={id} />
                </CardActions>
                </>
            }
      </div>
    );
}

export {
    UpdateMovie
}