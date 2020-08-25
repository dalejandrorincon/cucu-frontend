import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { store } from "./redux/store/store";
import HomePage from "./pages/HomePage";
import ExamplePage from "./pages/ExamplePage";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route path="/example" component={ExamplePage} />
      </Router>
    </Provider>
  );
}
