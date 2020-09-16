import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
const baseUri = process.env.REACT_APP_API_URL;

const Logo = styled.img`
  left: calc(50% - 41px);
  position: relative;
  width: 82px;
  margin-top: 30px;
  height: 35px;
`;

const Successful = styled.img`
  left: calc(50% - 50px);
  width: 100px;
  position: relative;
  height: 100px;
`;

const SuccessfulContainer = styled.div`
  margin-top: 30px;
`;

const Title = styled.p`
  text-align: center;
  font: normal normal bold 28px Acumin Pro;
  letter-spacing: 0px;
  color: #3c3c3c;
  opacity: 1;
  padding-top: 30px;
`;

const SuccessfulInfo = styled.p`
  text-align: center;
  margin-top: 30px;
  font: normal normal normal 15px Acumin Pro;
  letter-spacing: 0px;
  color: #2d2d2d;
`;

const SuccessfulInfoLabel = styled.p`
  margin-top: 10px;
  text-align: center;
  font: italic normal normal 13px/19px Acumin Pro;
  letter-spacing: 0px;
  color: #a0a0a0;
  opacity: 1;
`;

const ForgotPasswordInfo = styled.p`
  margin-top: 30px;
  text-align: left;
  font: normal normal normal 15px Acumin Pro;
  letter-spacing: 0px;
  color: #2d2d2d;
`;

const BackToLogin = styled(Link)`
  text-align: center;
  text-decoration: underline;
  font: normal normal normal 15px Acumin Pro;
  letter-spacing: 0px;
  color: #863df9;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 30px;
  &:hover {
    color: #863df9;
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

const ButtonToLogin = styled.div`
  padding-left: 20%;
  padding-right: 20%;
`;

const ForgotPassword = styled.div`
  min-height: 100vh;
  padding-left: 15%;
  padding-right: 5%;
`;

const ForgotPasswordSuccessful = styled.div`
  min-height: 100vh;
  padding-left: 15%;
  padding-right: 5%;
`;

const ResendInfo = styled.p`
  margin-top: 20px;
  text-align: center;
  font: normal normal normal 15px Acumin Pro;
  letter-spacing: 0px;
  color: #2d2d2d;
`;

const ResendLink = styled(Link)`
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
