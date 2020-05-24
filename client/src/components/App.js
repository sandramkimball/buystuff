import React from 'react';
import './App.css';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

// Pages
import Homepage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import NavBar from '../pages/NavBar';

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

// Create client engine instance
const engine = new Styletron();

// Provide engine to App
function App() {
  return (
    <Styletron className="App" value={engine} debug={debug} debugAfterHydration>
      <Router>
        <NavBar/>
        <Switch>
          <Route path='/' component={HomePage}/>
          <Route path='/product' component={ProductPage}/>
        </Switch>
      </Router>

    </Styletron>
  );
}

export default App;