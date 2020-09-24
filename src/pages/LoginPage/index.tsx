import React, { useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Logo,
  Title,
  LoginInfo,
  CreateAccountLink,
  ForgotPasswordLink,
  Label,
  Control,
  ControlPassword,
  Submit,
  Check,
  Login,
  ShowPassword
} from './styles'

const baseUri = process.env.REACT_APP_API_URL;


function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    const body = new URLSearchParams(data);

    try {
      fetch(`${baseUri}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: body,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.message === "Login Successful") {
            localStorage.setItem("token", responseJson.token);
            localStorage.setItem("userId", responseJson.user.id);
            localStorage.setItem("role", responseJson.user.role);
            localStorage.setItem(
              "userName",
              responseJson.user.firstname + " " + responseJson.user.lastname
            );
            if (responseJson.user.role == 3 || responseJson.user.role == 4) {
              history.push("/translators");
            } else {
              history.push("/profile");
            }
          } else {
            alert(responseJson.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Container className="themed-container" fluid={true}>
      <Row className="no-gutter">
        <Col>
          <Login>
            <Logo src="/assets/images/logo.png"></Logo>
            <Title>Inicia sesión</Title>
            <LoginInfo>
              ¿No tienes cuenta CUCÚ?
              <CreateAccountLink to="/signup">
                Crea una cuenta
              </CreateAccountLink>
            </LoginInfo>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Label>Correo electrónico</Label>
                <Control
                  type="email"
                  name="email"
                  ref={register({ required: true })}
                />
              </Form.Group>
              {errors.email && (
                <div className="alert alert-danger">
                  El correo electrónico es requerido
                </div>
              )}
              <Form.Group controlId="formBasicPassword">
                <Label>Contraseña</Label>
                <InputGroup>
                  <ControlPassword
                    type={showPassword ? "text" : "password"}
                    name="password"
                    ref={register({ required: true })}
                  />
                  <InputGroup.Prepend>
                    <ShowPassword
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </ShowPassword>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
              {errors.password && (
                <div className="alert alert-danger">
                  La contraseña es requerida
                </div>
              )}
              <ForgotPasswordLink to="/forgot-password">
                La olvidé
              </ForgotPasswordLink>
              <Form.Group controlId="formBasicCheckbox">
                <Check type="checkbox" label="Recordarme en este dispositivo" />
              </Form.Group>
              <Submit type="submit">Iniciar sesión</Submit>
            </Form>
          </Login>
        </Col>
        <Col className="bg-image"></Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
