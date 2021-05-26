import React from "react";
import DetailPage from "./components/DetailPage";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { Route, Switch } from "react-router";


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
            <HomePage />
        </Route>
        <Route path="/detail/:name/:id">
          <DetailPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
