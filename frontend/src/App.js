import React from 'react';

import './App.css';

import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import DashboardPage from './components/DashboardPage/DashboardPage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    content: () => <LandingPage/>
  },
  {
    path: "/dashboard",
    content: () => <DashboardPage/>
  },
  {
    path: "/data"
  }
];

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <Router>
          <Navbar/>
          <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={route.content}
                />
              ))}
          </Switch>
        </Router>
      </React.StrictMode>
    </div>
  );
}

export default App;