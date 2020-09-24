import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { logout } from "../../utils/session";
import { Link, useHistory, useParams } from "react-router-dom";

import {
  Logo,
  Title,
  RecoverInfo,
  PasswordInfo,
  WellContainer,
  PasswordRecover,
  RowRecover,
  Successful,
  SuccessfulContainer,
  SuccessfulInfo,
  Label,
  Submit,
  ControlPassword,
  ShowPassword
} from "./styles"

const baseUri = process.env.REACT_APP_API_URL;

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

        fetch(`${baseUri}/auth/`, {
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
