import './App.css';
import SetList from './components/SetList';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CardList from './components/CardList';
import React, { FC, useEffect } from 'react';
import { signIn, useUser } from './utils/firebase';
import { createMuiTheme, makeStyles, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { blue, indigo } from '@material-ui/core/colors';
import { AppBar, Button, Grid, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: 20
  }
}));

const appTheme = createMuiTheme({ 
  palette: {
      primary: indigo,
      secondary: blue,
      }, 
});

const App: FC = () => {
  
  useEffect(() => {
    signIn("adamgo963@gmail.com", "test963")
  }, []);

  const user = useUser();
  const classes = useStyles();
  
  console.log(user);

  return (
    <MuiThemeProvider theme={appTheme}>
      <Router>
        <AppBar color="primary" position="static" variant="outlined">
          <Toolbar>
            <h1>Pokémon TCG App</h1>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.container}>
          <Switch>
            <Route path="/" exact render={() => { return <SetList />}}/>
            <Route path="/sets/:setCode" render={({ match }) => <CardList setCode={match.params.setCode}/>}/>
          </Switch>
        </Grid>
      </Router>
    </MuiThemeProvider>

    
  )  
}

export default App;
