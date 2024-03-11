import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
export const theme = createMuiTheme({
    palette: {
    primary: {
        main: '#003349',
    },
    secondary: {
        main: '#E87722',
    },
    error: {
        main: red.A400,
    },
    background: {
        default: '#D7D2CB',
    },
    },
});