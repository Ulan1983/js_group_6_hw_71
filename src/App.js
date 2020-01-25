import React from 'react';
import './App.css';
import AdminPage from "./component/AdminPage/AdminPage";
import {Route, Switch} from "react-router-dom";
import Orders from "./component/Orders/Orders";

function App() {
  return (
    <div className="App">
        <Switch>
            <Route path='/' exact component={AdminPage}/>
            <Route path='/orders' component={Orders}/>
            <Route render={() => <h1>Not found</h1>}/>
        </Switch>
    </div>
  );
}

export default App;
