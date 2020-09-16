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
import { PublicRoute } from "./components/PublicRoute";
import { PrivateRoute } from "./components/PrivateRoute";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <PublicRoute exact path="/" component={LoginPage} />
        <PublicRoute path="/signup" component={SignupPage} />
        <PrivateRoute path="/home" component={HomePage} />
        <PrivateRoute path="/translators" component={TranslatorsPage} />
        <PublicRoute path="/forgot-password" component={ForgotPasswordPage} />
        <PublicRoute
          path="/change-password/:token"
          component={RecoverPasswordPage}
        />
        <PrivateRoute
          path="/profile-translator/:id"
          component={ProfileTranslatorPage}
        />
        <PrivateRoute
          path="/request-translator/:id"
          component={RequestTranslatorPage}
        />
        <PrivateRoute path="/profile" component={ProfilePage} />
      </Router>
    </Provider>
  );
}
