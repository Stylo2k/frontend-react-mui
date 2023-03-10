// imports the react-router-dom components that we need
// to define the routes of our app
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import the components that we want to use in the routes
import { MovieList } from "./movies";
import { Movie } from "./movie";
import { useState } from "react";
import { Actor, ActorList, ActorMovies } from "./actors";
import { NotFound, HomePage, BackendSelection } from "./components";

// import the context that we want to use in the routes
import { BackendContext } from "./BackendContext";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    },
    components: {
        MuiCssBaseline: {
          styleOverrides: `
            @font-face {
              font-family: 'Raleway';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('Raleway'), local('Raleway-Regular'), format('woff2');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
        },
    },
});


/**
 * The main app component
 *  note this is a function aka a functional component 
 * If you hover over the function name you will see that it returns a JSX.Element
 * - this is the type that react expects to be returned from a (functional) component
 */
function App() : JSX.Element {
    // we need a global state to store the selected backend
    const [backend, setBackend] = useState('http://localhost:3001');

    /**
     * In here we define the routes of our app 
     * - the / means the root of the app and thus the home page
     * - the * means that we have a 404 page, notice that this is the last route
     *   this is because react-router-dom will check the routes in order and
     *   if it finds a match it will not check the other routes, so at the end
     *   we catch all routes that are not defined before and send them to the 404 page
     */
    return (
        <Router>
        {/* to give our backend context to all child components
         * we need to wrap the components that do need the context
         * in the context provider, in this case the Routes component
         * and then assign the value of the context to the backend state.
         * 
         * If you would like to wrap some and not all see the utils/element.tsx
        */}
        <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme>
        <BackendContext.Provider value={backend}>
            {/* this component will be included in every route when we put it here
              * note that it is not in the `Routes` component (Because it is not a `Route` but
              * rather just a JSX.Element / component 
              )
            */}
            <BackendSelection setBackend={setBackend} />
            {/* 
            * This is where we start define our `Routes`
            */}
                <Routes>
                    {/* 
                    * Every `Route` gets a path and an element to serve when
                    * visiting that route
                    */}
                    <Route path="/" element={<HomePage />} />
                    {/* 
                     * Path variables are defined in the same style
                     * as the other frameworks. So `:id`` will give us
                     * a path variable called "id"
                    */}
                    <Route path="/movies/:id" element={<Movie />} />
                    <Route path="/movies" element={<MovieList />} />
                    <Route path="/actors/:id/movies" element={<ActorMovies />} />
                    <Route path="/actors/:id" element={<Actor />} />
                    <Route path="/actors" element={<ActorList />} />
                    <Route path="*" element={<NotFound />}/>
                </Routes>
        </BackendContext.Provider>
        </CssBaseline>
        </ThemeProvider>
        </Router>
    )
}


export {
    App
};