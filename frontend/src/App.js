import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/loginForm/loginForm";
import Register from "./components/registerForm/register";
import Home from "./components/home/home";
import Message from "./components/message/message";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/:id" component={Message}></Route>
          <Route path="/" component={Home} exact></Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
