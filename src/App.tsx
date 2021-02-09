import './App.css';
import SetList from './components/SetList';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CardList from './components/CardList';

function App() {
  
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => { return <SetList />}}/>
        <Route path="/sets/:setCode" render={({ match }) => <CardList setCode={match.params.setCode}/>}/>
      </Switch>
    </Router>
  )  
}

export default App;
