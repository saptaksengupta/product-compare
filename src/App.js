import React, { useState } from "react";
import "./App.css";
import { Route, Switch, Router } from "react-router-dom";
import history from "./shared/history";

import styles from "./styles/homepage.module.css";

import Navbar from "./components/container/Navbar";
import Sidebar from "./components/container/Sidebar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

import CartContextProvider from "./context/CartContext";
import indexedDbService from "./database/IndexedDatabse";
function App() {

  indexedDbService.initDatabase();

  return (
    <React.Fragment>
      <Router history={history}>
          <div className="App">
            <div className={styles.main}>
              <div className={styles.sidebar}>
                <Sidebar />
              </div>
              <CartContextProvider>
                <div className="mainContainer">
                  <Navbar />
                  <div className="mainBody">
                    <Switch>
                      <Route exact path="/" component={HomePage} />
                      <Route exact path="/cart" component={CartPage} />
                    </Switch>
                  </div>
                </div>
              </CartContextProvider>
            </div>
          </div>
        </Router>
    </React.Fragment>
  );
}

export default App;
