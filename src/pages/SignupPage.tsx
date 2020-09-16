import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

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

const SignupInfo = styled.p`
  margin-top: 30px;
  text-align: left;
  font: normal normal normal 15px Acumin Pro;
  letter-spacing: 0px;
  color: #2d2d2d;
`;

const BackToLoginLink = styled(Link)`
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

const OptionActive = styled(Button)`
  opacity: 1;
  width: 100%;
  min-height: 50px;
  text-align: center;
  font: normal normal medium 17px Acumin Pro;
  letter-spacing: 0px;
  background: #f9f5ff 0% 0% no-repeat padding-box;
  border: 1px solid #863df9;
  border-radius: 3px;
  opacity: 1;
  text-align: center;
  color: #863df9;
  &:hover {
    color: #863df9;
    background: #f9f5ff 0% 0% no-repeat padding-box;
    border-color: #863df9;
  }
  :not(:disabled):not(.disabled).active,
  :not(:disabled):not(.disabled):active,
  .show > .dropdown-toggle {
    color: #863df9;
    background: #f9f5ff 0% 0% no-repeat padding-box;
    border-color: #863df9;
  }
  .show > .dropdown-toggle {
    color: #863df9;
    background: #f9f5ff 0% 0% no-repeat padding-box;
    border-color: #863df9;
  }
  &:focus {
    color: #863df9;
    background: #f9f5ff 0% 0% no-repeat padding-box;
    border-color: #863df9;
    box-shadow: none;
  }
  margin-top: 30px;
`;

const Option = styled(Button)`
  opacity: 1;
  width: 100%;
  min-height: 50px;
  text-align: center;
  font: normal normal medium 17px Acumin Pro;
  letter-spacing: 0px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  opacity: 1;
  text-align: center;
  color: #2d2d2d;
  opacity: 1;
  &:hover {
    color: #2d2d2d;
    background: #f9f5ff 0% 0% no-repeat padding-box;
    border-color: #863df9;
  }
  :not(:disabled):not(.disabled).active,
  :not(:disabled):not(.disabled):active,
  .show > .dropdown-toggle {
    color: #2d2d2d;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #d5d5d5;
  }
  .show > .dropdown-toggle {
    color: #2d2d2d;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #d5d5d5;
  }
  &:focus {
    color: #2d2d2d;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #d5d5d5;
    box-shadow: none;
  }
  margin-top: 30px;
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
  margin-top: 30px;
`;

const Signup = styled.div`
  min-height: 100vh;
  padding-left: 15%;
  padding-right: 5%;
  padding-bottom: 30px;
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

const PasswordInfo = styled.p`
  text-align: left;
  font: normal normal normal 13px/19px Acumin Pro;
  letter-spacing: 0px;
  color: #a0a0a0;
  opacity: 1;
`;

const FormCheck = styled.div`
  position: relative;
  display: block;
  padding-left: 1.25rem;
`;

const FormCheckLabel = styled.div`
  margin-bottom: 0;
  text-align: left;
  font: normal normal normal 15px/21px Acumin Pro;
  letter-spacing: 0px;
  color: #2d2d2d;
`;

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("1");
  const [terms, setTerms] = useState(false);
  const [type, setType] = useState("client");

  const history = useHistory();

  const submitForm = () => {
    const body = new URLSearchParams({
      firstname,
      lastname,
      password,
      document,
      phone,
      email,
      role,
    });

    try {
      if (
        firstname !== "" &&
        lastname !== "" &&
        password !== "" &&
        phone !== "" &&
        email !== "" &&
        role !== ""
      ) {
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

        fetch("https://cucu-api-dev.n-techlab.xyz/api/users", {
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
            history.push("/");
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
      <Row className="no-gutter">
        <Col>
          <Signup>
            <Logo src="/assets/images/logo.png"></Logo>
            <Title>Crea una cuenta</Title>
            <Row>
              <Col>
                {role === "1" ? (
                  <OptionActive
                    type="button"
                    onClick={() => {
                      setRole("1");
                    }}
                  >
                    Soy usuario
                  </OptionActive>
                ) : (
                  <Option
                    type="button"
                    onClick={() => {
                      setRole("1");
                    }}
                  >
                    Soy usuario
                  </Option>
                )}
              </Col>
              <Col>
                {role === "2" ? (
                  <OptionActive
                    type="button"
                    onClick={() => {
                      setRole("2");
                    }}
                  >
                    Soy traductor
                  </OptionActive>
                ) : (
                  <Option
                    type="button"
                    onClick={() => {
                      setRole("2");
                    }}
                  >
                    Soy traductor
                  </Option>
                )}
              </Col>
            </Row>
            <SignupInfo>
              ¿Ya tienes cuenta CUCÚ?
              <BackToLoginLink to="/">Inicia sesión</BackToLoginLink>
            </SignupInfo>
            <Form>
              <Form.Group>
                <Label>Nombre</Label>
                <Control
                  type="text"
                  onChange={(e: any) => setFirstname(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Label>Apellido</Label>
                <Control
                  type="text"
                  onChange={(e: any) => setLastname(e.target.value)}
                />
              </Form.Group>
              {role === "1" && (
                <>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Label>Tipo de cliente</Label>
                    <Form.Control
                      className="form-select"
                      as="select"
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    >
                      <option value="client">Persona natural</option>
                      <option value="enterprise">Persona juridica</option>
                    </Form.Control>
                  </Form.Group>
                  {type === "enterprise" && (
                    <Form.Group>
                      <Label>Nombre de tu empresa</Label>
                      <Control type="text" />
                    </Form.Group>
                  )}
                </>
              )}

              {/* <Form.Group>
                <Label>Documento de identidad</Label>
                <Control
                  type="text"
                  onChange={(e: any) => setDocument(e.target.value)}
                />
              </Form.Group> */}
              <Form.Group>
                <Label>Correo electrónico</Label>
                <Control
                  type="text"
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Label>Teléfono</Label>
                <Control
                  type="text"
                  onChange={(e: any) => setPhone(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
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
                minúscula, 1 número, 1 carácter especial y 8 caracteres sin
                espacio en blanco
              </PasswordInfo>
              <Form.Group controlId="formBasicPassword">
                <Label>Confirma contraseña</Label>
                <InputGroup>
                  <ControlPassword
                    type={showVerifyPassword ? "text" : "password"}
                    onChange={(e: any) => setConfirmPassword(e.target.value)}
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
              <FormCheck>
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={(e: any) => setTerms(e.target.value)}
                />
                <FormCheckLabel>
                  He leído y acepto los
                  <BackToLoginLink to="/">
                    términos y condiciones
                  </BackToLoginLink>{" "}
                  del servicio así como la{""}
                  <BackToLoginLink to="/">
                    política de privacidad.
                  </BackToLoginLink>
                </FormCheckLabel>
              </FormCheck>
              <Submit type="button" onClick={submitForm}>
                Crear mi cuenta
              </Submit>
            </Form>
          </Signup>
        </Col>
        <Col className="bg-image-signup"></Col>
      </Row>
    </Container>
  );
}

export default SignupPage;
