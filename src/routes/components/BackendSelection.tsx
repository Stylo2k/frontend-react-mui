import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useContext } from "react";
import { SetBackend } from "../../Models";
import { BackendContext } from "../BackendContext";

/**
 * Global backend selection component
 * 
 * @param setBackend the setBackend prop which is passed down from the parent
 * @returns the backend selection component
 */
function BackendSelection({setBackend} : SetBackend) : JSX.Element {

    const backend = useContext(BackendContext);
    /**
     * handles the select event of the backend selection
     * 
     * @param event the event from the select element
     */
    const handleSelect = (event : SelectChangeEvent<string>, child: React.ReactNode) => {
        setBackend(event.target.value);
    }

    // get the list of backends from the environment variable called REACT_APP_BACKENDS from the dotenv file
    let backends = process.env.REACT_APP_BACKENDS?.split(',');
    
    // if no backends are found in the environment variable, then use the fallback values
    if (!backends || backends?.[0] === '') {
        console.error("No backends found");
        backends = [
            "http://localhost:3001",
            "http://localhost:3002"
        ]
    }
    
    const options = backends.map((backend) => <MenuItem key={backend} value={backend}>{backend}</MenuItem>);

    return (
        <div>
            <FormControl fullWidth sx={{m : 2, p : 2}}>
            <InputLabel id="backend">Backend</InputLabel>
            <Select value={backend} label="backend" onChange={handleSelect} placeholder="Choose a backend" >
                {options}
            </Select>
            </FormControl>
        </div>
    );
}


export {
    BackendSelection
};