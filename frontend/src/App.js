import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/loginForm/loginForm";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
