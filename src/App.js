import React, { Suspense, lazy } from "react";
import "./App.scss";
import { Route, Switch, Router } from "react-router-dom";
import history from "./shared/history";

import styles from "./styles/homepage.module.scss";

import CartContextProvider from "./context/CartContext";
import indexedDbService from "./database/IndexedDatabse";

const Navbar = lazy(() => import("./components/container/Navbar"));
const Sidebar = lazy(() => import("./components/container/Sidebar"));

const HomePage = lazy(() => import("./pages/HomePage"));
const CartPage = lazy(() => import("./pages/CartPage"));

function App() {
  indexedDbService.initDatabase();

  return (
      <React.Fragment>
        <Router history={history}>
          <div className="App">
            <div className={styles.main}>
              <div className={styles.sidebar}>
                <Suspense fallback={<div>Loadig Sidebar...</div>}>
                  <Sidebar />
                </Suspense>
              </div>
              <CartContextProvider>
                <div className="mainContainer">
                  <Suspense fallback={<div>Loadig Navbar...</div>}>
                    <Navbar />
                  </Suspense>
                  <div className="mainBody">
                    <Switch>
                      <Suspense fallback={<div>Loading Content...</div>}>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/cart" component={CartPage} />
                      </Suspense>
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
