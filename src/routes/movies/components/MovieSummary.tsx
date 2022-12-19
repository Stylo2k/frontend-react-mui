import { Link } from "react-router-dom";
import { MovieSummary as MovieSummaryType} from '../../../Models';
import Card from '@mui/material/Card';
import { CardActions, CardContent, CircularProgress, Grid, Typography } from '@mui/material';

import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

interface Loading {
    loading : boolean
}

interface MoviesResults {
    movies : MovieSummaryType[]
}

// type for the props of the movie results component
//  * this is a combination of the movies and loading props
type MovieResultsProps = MoviesResults  & Loading;

/**
 * The movie results component
 * 
 * @param results the results and loading props
 * @param loading the loading prop (whether or not the results are loading)
 * @returns the movie results component
 */
function MovieSummary({movies, loading}: MovieResultsProps) : JSX.Element {
    return (
        <>
            {/* if loading show "loading" */}
            {loading ? <CircularProgress sx={{ width: '100%' }} /> : (
            // not loading and no results show "no results"
            movies.length === 0 ?
            <Grid item xs={2} sm={4} md={4} >
                <Typography color='error' fontSize={25} sx={{mx:2}}>No results<SentimentVeryDissatisfiedIcon sx={{mx:2}}/></Typography> 
            </Grid>
            :
            // not loading and results show the results
            <>
                {movies.map((movie : MovieSummaryType) => (
                    <Grid item xs={2} sm={4} md={4} >
                    <Card sx={{ m: 2 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">{movie.title} ({movie.year})<LocalMoviesIcon sx={{mx:2}}/></Typography>
                            <Typography variant="body2" color="text.secondary">Rating: {movie.rating}</Typography>
                            <br/>
                            <CardActions>
                            <Link to={`/movies/${movie.id}`}>More Details</Link> <HighQualityIcon sx={{mx:2}}/><TheaterComedyIcon sx={{mx:2}}/><SubtitlesIcon sx={{mx:2}}/>
                            </CardActions>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
            </>
            )}
        </>
    );
}

export {
    MovieSummary
};
