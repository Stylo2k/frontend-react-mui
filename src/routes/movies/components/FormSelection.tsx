import React from 'react';
import { FindMoviesForm } from './FindMoviesForm';
import { AddMovieForm } from './AddMovieForm';
import Button from "@mui/material/Button";

/**
 * The props object / interface for the form selection component
 * We put this on top of the component so that we can use it in the component
 * and export it if necessary
 */
interface FormSelectionProps {
    setForm: (form: JSX.Element) => void;
}

/**
 * The form selection component
 * 
 * @param setForm the setForm and backend props which is passed down from the parent
 * @returns the form selected
 */
function FormSelection({ setForm } : FormSelectionProps) : JSX.Element {
    
    const [value, setValue] = React.useState('find');

    /**
     * handles the select event of the form selection
     * 
     * @param event the event from the element
     */
    const handleSelect = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) : void => {
        const value = event.currentTarget.value;
        setValue(value);

        let form = null;

        /** the find movies form was selected */
        if (value === 'add') {
            form = <AddMovieForm />;
        }
        /** the add movie form was selected */
        else if (value === 'find') {
            form = <FindMoviesForm />;
        }
        else {
            return alert('unknown form selected');
        }
        // set the form which is a state in the parent
        setForm(form);
    }

    

    return (
        <>
        <span>Choose to either add or add a movie: </span>
            {value === 'find' ? 
                <Button size='small' variant="contained" onClick={(e) => handleSelect(e)} value="add">Add Movie</Button>
                :
                <Button size='small' variant="contained" onClick={(e) => handleSelect(e)} value="find">Find Movies</Button>
            }
        </>
    );
}


export {
    FormSelection
}