import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import {
  Logo,
  Successful,
  SuccessfulContainer,
  Title,
  SuccessfulInfo,
  SuccessfulInfoLabel,
  ForgotPasswordInfo,
  BackToLogin,
  Label,
  Control,
  Submit,
  ButtonToLogin,
  ForgotPassword,
  ForgotPasswordSuccessful,
  ResendInfo,
  ResendLink,
} from "./styles"

const baseUri = process.env.REACT_APP_API_URL;

function ForgotPasswordPage() {
  const [successfulSendCode, setSuccessfulSendCode] = useState(false);
  const history = useHistory();

  const [email, setEmail] = useState("");

  const submitForm = () => {
    const body = new URLSearchParams({
      email,
    });

    try {
      if (email !== "") {
        fetch(`${baseUri}/auth/password-recovery`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: body,
        })
          .then((response) => response.json())
          .then((responseJson) => {
            alert(responseJson.message);
            setSuccessfulSendCode(true);
            setEmail("");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Ingresa por favor tu correo electrónico");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Container className="themed-container" fluid={true}>
      <Row className="no-gutter">
        <Col>
          {successfulSendCode ? (
            <ForgotPasswordSuccessful>
              <Logo src="/assets/images/logo.png"></Logo>
              <SuccessfulContainer>
                <Successful src="/assets/images/check@2x.png"></Successful>
              </SuccessfulContainer>
              <Title>¡Correo electrónico enviado!</Title>
              <SuccessfulInfo>
                En unos momentos recibirás un correo electrónico con un
                instrucciones para recuperar tu contraseña.
              </SuccessfulInfo>
              <SuccessfulInfoLabel>
                Reciba tu bandeja de entrada y SPAM.
              </SuccessfulInfoLabel>
              <ButtonToLogin>
                <Submit
                  type="button"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Iniciar sesión
                </Submit>
                <ResendInfo>
                  ¿No recibiste el correo?
                  <ResendLink
                    to="#"
                    onClick={() => {
                      setSuccessfulSendCode(false);
                    }}
                  >
                    Reenviar
                  </ResendLink>
                </ResendInfo>
              </ButtonToLogin>
            </ForgotPasswordSuccessful>
          ) : (
            <ForgotPassword>
              <Logo src="/assets/images/logo.png"></Logo>
              <Title>Recupera tu contraseña</Title>
              <ForgotPasswordInfo>
                Escribe el correo electrónico de tu cuenta y te enviaremos
                instrucciones para restablecer tu contraseña.
              </ForgotPasswordInfo>
              <Form>
                <Form.Group>
                  <Label>Correo electrónico</Label>
                  <Control
                    type="email"
                    onChange={(e: any) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Submit type="button" onClick={submitForm}>
                  Enviar correo electrónico
                </Submit>
              </Form>
              <BackToLogin to="/">Volver a iniciar sesión</BackToLogin>
            </ForgotPassword>
          )}
        </Col>
        <Col className="bg-image"></Col>
      </Row>
    </Container>
  );
}

export default ForgotPasswordPage;
