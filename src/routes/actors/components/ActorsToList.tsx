import { Card, CardContent, Typography } from "@mui/material"
import Grid from "@mui/material/Grid"
import { Link } from "react-router-dom"
import { Actors } from "../../../Models"
import AccountBoxIcon from '@mui/icons-material/AccountBox';

interface ActorsResultProps {
    actors : Actors
}

/**
 * Actors result component
 * 
 * @param actors the actors prop which is passed down from the parent to build the list
 * @returns the list of actors
 */
function ActorsToList({actors}: ActorsResultProps) {
    function formActors() {
        return actors.map((actor) => {
            return (
                <Grid item xs={2} sm={4} md={4} > 
                <Card sx={{ m: 2 }}>
                
                    <CardContent>
                    <AccountBoxIcon sx={{mx:2}}/><Link to={`/actors/${actor.id}`}>{actor.name}</Link>
                    </CardContent>
                </Card>
                </Grid>
            )
        })
    }

    return (
        <>
            {/* if the length is 0 then add paragraph with some text */}
            {actors.length === 0 ? <Typography color='error'>No actors found</Typography> : <>{formActors()}</> }
        </>
    )
}

export {
    ActorsToList
}