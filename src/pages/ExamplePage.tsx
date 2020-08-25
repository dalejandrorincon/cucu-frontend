import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styled from "styled-components";

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
  padding-top: 50px;
`;

const LoginInfo = styled.p`
  margin-top: 50px;
  text-align: left;
  font: normal normal normal 15px Acumin Pro;
  letter-spacing: 0px;
  color: #2d2d2d;
`;

const CreateAccountLink = styled.a`
  text-align: left;
  text-decoration: underline;
  font: normal normal normal 15px Acumin Pro;
  letter-spacing: 0px;
  color: #863df9;
`;

const ForgotPasswordLink = styled.a`
  text-align: left;
  text-decoration: underline;
  font: normal normal normal 13px Acumin Pro;
  letter-spacing: 0px;
  color: #2d2d2d;
  opacity: 1;
`;

const Label = styled(Form.Label)`
  font: normal normal bold 15px Acumin Pro;
  letter-spacing: 0px;
  color: #3c3c3c;
  opacity: 1;
`;

const Control = styled(Form.Control)`
  border: 1px solid var(--light-grey);
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  opacity: 1;
`;

const Submit = styled(Button)`
  background: #863df9 0% 0% no-repeat padding-box;
  border-radius: 3px;
  border-color: #863df9;
  opacity: 1;
  width: 100%;
  height: 50px;
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
`;

function ExamplePage() {
  return (
    <Container className="themed-container" fluid={true}>
      <Row className="no-gutter">
        <Col>
          <Login className="login">
            <Logo src="/images/logo.png"></Logo>
            <Title>Inicia sesión</Title>
            <LoginInfo>
              ¿No tienes cuenta CUCÚ?{" "}
              <CreateAccountLink href="#">Crea una cuenta</CreateAccountLink>
            </LoginInfo>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Label>Correo electrónico</Label>
                <Control type="email" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Label>Contraseña</Label>
                <Control type="password" />
              </Form.Group>
              <ForgotPasswordLink href="#">La olvidé</ForgotPasswordLink>
              <Form.Group controlId="formBasicCheckbox">
                <Check type="checkbox" label="Recordarme en este dispositivo" />
              </Form.Group>
              <Submit type="button">Iniciar sesión</Submit>
            </Form>
          </Login>
        </Col>
        <Col className="bg-image"></Col>
      </Row>
    </Container>
  );
}

export default ExamplePage;
