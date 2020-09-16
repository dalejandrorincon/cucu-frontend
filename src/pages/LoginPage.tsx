import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { logout } from "../utils/session";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const Logo = styled.img`
  left: calc(50% - 41px);
  position: relative;
  width: 82px;
  margin-top: 30px;
  height: 35px;
`;

const Title = styled.p`
  text-align: center;
  font: normal normal bold 28px Acumin Pro;
  letter-spacing: 0px;
  color: #3c3c3c;
  opacity: 1;
  padding-top: 30px;
`;

const LoginInfo = styled.p`
  margin-top: 30px;
  text-align: left;
  font: normal normal normal 15px Acumin Pro;
  letter-spacing: 0px;
  color: #2d2d2d;
`;

const CreateAccountLink = styled(Link)`
  text-align: left;
  text-decoration: underline;
  font: normal normal normal 15px Acumin Pro;
  letter-spacing: 0px;
  color: #863df9;
  margin-left: 5px;
  &:hover {
    color: #863df9;
    text-decoration: underline;
  }
`;

const ForgotPasswordLink = styled(Link)`
  text-align: left;
  text-decoration: underline;
  font: normal normal normal 13px Acumin Pro;
  letter-spacing: 0px;
  color: #2d2d2d;
  opacity: 1;
  &:hover {
    color: #2d2d2d;
    text-decoration: underline;
  }
`;

const Label = styled(Form.Label)`
  font: normal normal bold 15px Acumin Pro;
  letter-spacing: 0px;
  color: #3c3c3c;
  opacity: 1;
`;

const Control = styled(Form.Control)`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  opacity: 1;
  min-height: 45px;
  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #d5d5d5;
    outline: 0;
    box-shadow: none;
  }
`;

const ControlPassword = styled(Form.Control)`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  border-right: 0px;
  opacity: 1;
  min-height: 45px;
  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #d5d5d5;
    outline: 0;
    box-shadow: none;
  }
`;

const Submit = styled(Button)`
  background: #863df9 0% 0% no-repeat padding-box;
  border-radius: 3px;
  border-color: #863df9;
  opacity: 1;
  width: 100%;
  min-height: 50px;
  text-align: center;
  font: normal normal medium 17px Acumin Pro;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  &:hover {
    color: #fff;
    background-color: #863df9;
    border-color: #863df9;
  }
  :not(:disabled):not(.disabled).active,
  :not(:disabled):not(.disabled):active,
  .show > .dropdown-toggle {
    color: #fff;
    background-color: #863df9;
    border-color: #863df9;
  }
  &:focus {
    color: #fff;
    background-color: #863df9;
    border-color: #863df9;
    box-shadow: none;
  }
`;

const Check = styled(Form.Check)`
  margin-top: 10px;
  font: normal normal normal 15px Acumin Pro;
  letter-spacing: 0px;
  color: #3c3c3c;
  opacity: 1;
  .form-check-label {
    margin-top: 5px;
  }
  .form-check-input {
    background-color: #863df9;
  }
`;

const Login = styled.div`
  min-height: 100vh;
  padding-left: 15%;
  padding-right: 5%;
`;

const ShowPassword = styled(InputGroup.Text)`
  font: normal normal normal 13px Acumin Pro;
  letter-spacing: 0px;
  color: #2d2d2d;
  opacity: 1;
  border-left: 0;
  background: transparent;
  border-radius: 3px;
  cursor: pointer;
`;

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data: any) => {
    const body = new URLSearchParams(data);

    try {
      fetch("https://cucu-api-dev.n-techlab.xyz/api/auth/login", {
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
            //alert(responseJson.message);
            setEmail("");
            setPassword("");
            localStorage.setItem("token", responseJson.token);
            localStorage.setItem("userId", responseJson.user.id);
            localStorage.setItem(
              "userName",
              responseJson.user.firstname + " " + responseJson.user.lastname
            );
            history.push("/translators");
          } else {
            alert(responseJson.message);
            setEmail("");
            setPassword("");
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
                  // onChange={(e: any) => setEmail(e.target.value)}
                  // value={email}
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
