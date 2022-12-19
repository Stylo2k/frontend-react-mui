import { FormGroup, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";


interface PaginationProps {
    setOffset : React.Dispatch<React.SetStateAction<number>>;
    setLimit : React.Dispatch<React.SetStateAction<number>>;
    setOrderDir : React.Dispatch<React.SetStateAction<string>>;
    setOrderBy : React.Dispatch<React.SetStateAction<string>>;
    limit : number;
    offset : number;
}

function Pagination ({setOffset, setLimit, setOrderDir, setOrderBy, limit, offset} : PaginationProps) {
    /**
     * Handle the next button
    */
     function handleNext() : void {
        setOffset((currentOffset) => currentOffset + limit);
    }

    /**
     * handles the previous button
      */
    function handlePrevious() : void {
        setOffset((currentOffset) => currentOffset - limit);
    }
    

    /**
     * Handles the results per page select
     * 
     * @param event the change event coming from the select
     */
    function handleResultsChange(event : SelectChangeEvent<string>) : void {
      const newValue = parseInt(event.target.value);
      setLimit(newValue);
      setOffset((currentOffset) => Math.floor(currentOffset / newValue) * newValue);
    }

    return (
        <>
        <Grid item xs={8} sm={4} md={4} >
            <FormGroup sx={{p:1}}>
            <FormControl variant="standard" size="small"> 
                <InputLabel id="results-label">Per Page</InputLabel>

                <Select id="results" name="results" onChange={handleResultsChange}>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="20">20</MenuItem>
                    <MenuItem value="50">50</MenuItem>
                    <MenuItem value="100">100</MenuItem>
                </Select>
            </FormControl>
            </FormGroup>
        </Grid>

        <Grid item xs={8} sm={4} md={4} >
            <FormGroup sx={{p:1}}>
            <FormControl variant="standard" size="small">
                <InputLabel id="order-by-label">Order By</InputLabel>

                <Select id="order-by" name="order-by" onChange={(e : SelectChangeEvent) => setOrderBy(e.target.value)}>
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="year">Year</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                </Select>
            </FormControl>
            </FormGroup>
        </Grid>
        <Grid item xs={8} sm={4} md={4}>
            <FormGroup sx={{p:1}}>
            <FormControl variant="standard" size="small">
                <InputLabel id="order-dir-label">Order</InputLabel>
                <Select id="order-dir" name="order-dir" onChange={(e : SelectChangeEvent) => setOrderDir(e.target.value)}>
                    <MenuItem value="asc">ASC</MenuItem>
                    <MenuItem value="desc">DESC</MenuItem>
                </Select>
            </FormControl>
            </FormGroup>
        </Grid>
        
        <Grid item xs={12}>
            <ButtonGroup variant="contained" aria-label="text button group" fullWidth sx={{p:2}}>
                <Button size='small' disabled={offset <= 0} type="button" onClick={handlePrevious}>Previous</Button>
                <Button size='small' type="button" onClick={handleNext}>Next</Button>
            </ButtonGroup>
         </Grid>
        </>
    );
}

export {
    Pagination
}