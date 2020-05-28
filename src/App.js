import React from 'react';
import './App.css';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Pages
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import NavBar from './components/NavBar';
import Cart from './components/Cart';

// Context Provider
import ShopProvider from './context/shopContext';

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

// Create client engine instance
const engine = new Styletron();

// Provide engine to App
function App() {
  return (
    <ShopProvider>
      <StyletronProvider className="App" value={engine} debug={debug} debugAfterHydration>
        <Router>
          <NavBar/>
          <Cart/>
          <Switch>
            <Route exact path='/'><HomePage/></Route>
            <Route path='/packages/:id'><ProductPage/></Route>
          </Switch>
        </Router>
      </StyletronProvider>
    </ShopProvider>
  );
}

export default App;