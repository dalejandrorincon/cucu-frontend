import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { logout } from "../utils/session";
import { Link, useHistory, useParams } from "react-router-dom";

const Logo = styled.img`
  left: calc(50% - 41px);
  position: relative;
  width: 82px;
  margin-top: 30px;
  height: 35px;
`;

const Recover = styled.img`
  left: calc(50% - 50px);
  width: 100px;
  position: relative;
  height: 100px;
`;

const RecoverContainer = styled.div`
  margin-top: 30px;
`;

const Title = styled.p`
  text-align: center;
  font: normal normal bold 28px Acumin Pro;
  letter-spacing: 0px;
  color: #3c3c3c;
  opacity: 1;
`;

const RecoverInfo = styled.p`
  text-align: left;
  font: normal normal normal 15px Acumin Pro;
  letter-spacing: 0px;
  color: #2d2d2d;
  opacity: 1;
`;

const PasswordInfo = styled.p`
  text-align: left;
  font: normal normal normal 13px/19px Acumin Pro;
  letter-spacing: 0px;
  color: #a0a0a0;
  opacity: 1;
`;

const WellContainer = styled.div`
  background-color: #fff !important;
  border-radius: 0 !important;
  border: #d1d1d1 solid 1px;
  margin-top: 30px;
  padding: 30px;
`;

const PasswordRecover = styled.div`
  min-height: 100vh;
`;

const RowRecover = styled(Row)`
  background: #f4f4f4;
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

const Label = styled(Form.Label)`
  font: normal normal bold 15px Acumin Pro;
  letter-spacing: 0px;
  color: #3c3c3c;
  opacity: 1;
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

const ForgotPasswordSuccessful = styled.div``;

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

function RecoverPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [successfulSend, setSuccessfulSend] = useState(false);
  const history = useHistory();
  let { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitForm = () => {
    const body = new URLSearchParams({
      password,
      token,
    });

    try {
      if (password !== "" && confirmPassword !== "") {
        if (
          password.match(/[a-z]/g) &&
          password.match(/[A-Z]/g) &&
          password.match(/[0-9]/g) &&
          password.match(/[^a-zA-Z\d]/g) &&
          password.length >= 8
        ) {
          console.log("valid password");
        } else {
          alert("Verifica el formato de tu contraseña");
          return;
        }

        if (password !== confirmPassword) {
          alert("Las contraseñas no coinciden");
          return;
        }

        fetch("https://cucu-api-dev.n-techlab.xyz/api/auth/change-password", {
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
            setSuccessfulSend(true);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Completa todos los campos");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <Container className="themed-container" fluid={true}>
      <RowRecover>
        <Col className="col-md-5 mx-auto">
          <PasswordRecover>
            <Logo src="/assets/images/logo.png"></Logo>
            <WellContainer>
              {successfulSend ? (
                <>
                  {" "}
                  <SuccessfulContainer>
                    <Successful src="/assets/images/check@2x.png"></Successful>
                  </SuccessfulContainer>
                  <Title>¡Contraseña creada!</Title>
                  <SuccessfulInfo>
                    Ya puedes iniciar sesión con tu correo electrónico y la
                    nueva contraseña que has creado.
                  </SuccessfulInfo>
                  <Submit
                    type="button"
                    onClick={() => {
                      history.push("/");
                    }}
                  >
                    Iniciar sesión
                  </Submit>
                </>
              ) : (
                <>
                  <Title>Crea tu contraseña</Title>
                  <RecoverInfo>
                    Ingresa la contraseña con la que vas a iniciar sesión a tu
                    cuenta.
                  </RecoverInfo>
                  <Form>
                    <Form.Group controlId="formBasicPassword">
                      <Label>Contraseña</Label>
                      <InputGroup>
                        <ControlPassword
                          type={showPassword ? "text" : "password"}
                          onChange={(e: any) => setPassword(e.target.value)}
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
                    <PasswordInfo>
                      Debe contener como mínimo una letra mayúscula, una letra
                      minúscula, 1 número, 1 carácter especial y 8 caracteres
                      sin espacio en blanco
                    </PasswordInfo>
                    <Form.Group controlId="formBasicPassword">
                      <Label>Confirma contraseña</Label>
                      <InputGroup>
                        <ControlPassword
                          type={showVerifyPassword ? "text" : "password"}
                          onChange={(e: any) =>
                            setConfirmPassword(e.target.value)
                          }
                        />
                        <InputGroup.Prepend>
                          <ShowPassword
                            onClick={() => {
                              setShowVerifyPassword(!showVerifyPassword);
                            }}
                          >
                            {showVerifyPassword ? "Ocultar" : "Mostrar"}
                          </ShowPassword>
                        </InputGroup.Prepend>
                      </InputGroup>
                    </Form.Group>
                    <Submit
                      type="button"
                      onClick={() => {
                        submitForm();
                      }}
                    >
                      Crear contraseña
                    </Submit>
                  </Form>
                </>
              )}
            </WellContainer>
          </PasswordRecover>
        </Col>
      </RowRecover>
    </Container>
  );
}

export default RecoverPasswordPage;
