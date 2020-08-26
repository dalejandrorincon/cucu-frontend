import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { store } from "./redux/store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import SignupPage from "./pages/SignupPage";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/recover-password" component={RecoverPasswordPage} />
      </Router>
    </Provider>
  );
}
