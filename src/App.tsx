import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { store } from "./redux/store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import TranslatorsPage from "./pages/TranslatorsPage";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/translators" component={TranslatorsPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/change-password/:token" component={RecoverPasswordPage} />
      </Router>
    </Provider>
  );
}
