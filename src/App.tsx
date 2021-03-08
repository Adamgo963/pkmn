import './App.css';
import SetList from './components/SetList';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from "react-router-dom";
import CardList from './components/CardList';
import React, { FC } from 'react';
import { signOut, useUser } from './utils/firebase';
import { createMuiTheme, makeStyles, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { blue, indigo } from '@material-ui/core/colors';
import { AppBar, Button, Grid, Toolbar } from '@material-ui/core';
import Login from './pages/Login';
import PokedexList from './components/PokedexList';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: 20,
    marginBottom: 20
  }
}));

const appTheme = createMuiTheme({ 
  palette: {
      primary: indigo,
      secondary: blue,
      }, 
});

const App: FC = () => {

  const classes = useStyles();

  const isLoggedIn = useUser();
  
  return (
    <MuiThemeProvider theme={appTheme}>
      <Router>
        {!isLoggedIn && (<Redirect to={"/"}/>)}
        <AppBar color="primary" position="static" variant="outlined">
          <Toolbar>
            <h1>Pokémon TCG App</h1>
            {isLoggedIn &&
            <>
            <Link to={`/sets`}><Button>Sets</Button></Link>
            <Link to={`/pokedex`}><Button>Pokédex</Button></Link>
            <Button onClick={() => signOut()}>Log out</Button>
            </>
            }
          </Toolbar>
        </AppBar>
        <Grid container  direction="column" alignItems="center" justify="center" className={classes.container}>
          <Switch>
            <Route path="/" exact render={() => { return <Login/>}}/>
            <Route path="/pokedex" exact render={() => { return <PokedexList />}}/>
            <Route path="/sets" exact render={() => { return <SetList />}}/>
            <Route path="/sets/:setCode" render={({ match }) => <CardList setCode={match.params.setCode}/>}/>
          </Switch>
        </Grid>
      </Router>
    </MuiThemeProvider>

    
  )  
}

export default App;
