import logo from "./logo.svg";

import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Destination from "./Components/Destination/Destination";
import Blog from "./Components/Blog/Blog";
import About from "./Components/About/About";
import { createContext, useState } from "react";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  
  
  

  return (
 
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      
      <Router>
        <Switch>
          <Route path="/Home">
            <Home></Home>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Header></Header>
            <Login></Login>
          </Route>
          <PrivateRoute path="/destination">
            <Header></Header>
            <Destination></Destination>
          </PrivateRoute>
          <Route path="/blog">
            <Header></Header>
            <Blog></Blog>
          </Route>
          <Route path="/about">
            <Header></Header>
            <About></About>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
