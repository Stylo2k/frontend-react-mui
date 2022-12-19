import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Actor } from "../../Models";
import { ActorsForm, ActorsToList } from "./components";


/**
 * Actors home component
 * 
 * @returns the actors home component
 */
function ActorList() {
    // we need a state to store the actors
    // - this is used to pass down to the ActorsResult component
    // - this is also used to pass down to the ActorsForm component
    const [actors, setActors] = useState<Actor[]>([]);

    return(
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <ActorsForm setActors={setActors} />
            </Grid>
            
            <Grid container xs={8}>
                <ActorsToList actors={actors} />
            </Grid>
        </Grid>
    )

}


export {
    ActorList
}