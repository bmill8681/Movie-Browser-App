import React from "react";
import { Route } from "react-router-dom";
import Home from "./home/Home";
import Browse from "./browse/Browse";
import styles from "./app.module.css";
import "./transitions.css";
import { CSSTransition } from "react-transition-group";

/**
 * App Component handles rendering different routes
 */
function App() {
  return (
    <main className={styles.AppWrapper}>
      {/**Home Route */}
      <Route key="/" exact path="/">
        {({ match }) => (
          <CSSTransition
            in={match != null}
            timeout={500}
            classNames="page"
            unmountOnExit
          >
            <Home />
          </CSSTransition>
        )}
      </Route>

      {/**Browse Route */}
      <Route
        key="/browse"
        exact
        path="/browse"
        render={({ location }) => <Browse location={location} />}
      />
    </main>
  );
}

export default App;
