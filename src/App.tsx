import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { store } from "./redux/store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import TranslatorsPage from "./pages/TranslatorsPage";
import "rc-slider/assets/index.css";
import ProfileTranslatorPage from "./pages/ProfileTranslatorPage";
import RequestTranslatorPage from "./pages/RequestTranslatorPage";
import ProfilePage from "./pages/ProfilePage";

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
        <Route
          path="/profile-translator/:id"
          component={ProfileTranslatorPage}
        />
        <Route
          path="/request-translator/:id"
          component={RequestTranslatorPage}
        />
        <Route path="/profile" component={ProfilePage} />
      </Router>
    </Provider>
  );
}
