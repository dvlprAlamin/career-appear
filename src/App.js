import { teal } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Navigation from './components/Shared/Navigation/Navigation';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home/Home';
import LoginSignup from './components/LoginSignup/LoginSignup';
import { ContextProvider } from './context';
import PostNewJob from './components/PostNewJob/PostNewJob';
import JobRequest from './components/JobRequest/JobRequest';
const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: teal[500],
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h2: {
        fontWeight: 600,
      },
    }

  });
  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginSignup} />
            <Route path="/signup" component={LoginSignup} />
            {/* <Route path="/dashboard" component={PostNewJob} /> */}
            <Route path="/dashboard" component={JobRequest} />
          </Switch>
        </Router>
      </ContextProvider>
    </ThemeProvider>
  );
};

export default App;