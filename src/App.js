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
import { useMyContext } from './context';
import PostNewJob from './components/PostNewJob/PostNewJob';
import JobRequest from './components/JobRequest/JobRequest';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
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
  const { userRole } = useMyContext();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginSignup} />
          <Route path="/signup" component={LoginSignup} />
          <PrivateRoute path="/dashboard">
            {userRole === 'employer' && <PostNewJob />}
            {userRole === 'admin' && <JobRequest />}
          </PrivateRoute>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;