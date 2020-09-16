import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
const baseUri = process.env.REACT_APP_API_URL;

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
  const [role, setRole] = useState("1");
  const [type, setType] = useState("client");
  const { register, handleSubmit, watch, errors } = useForm();
  const history = useHistory();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data: any) => {
    const body = new URLSearchParams({ ...data, role });

    try {
      fetch(`${baseUri}/users`, {
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
    } catch (error) {
      console.log("Error", error);
    }
  };

  const ButtonActiveOrInactive = (active, text, action) => {
    return active ? (
      <OptionActive type="button" onClick={action}>
        {text}
      </OptionActive>
    ) : (
      <Option type="button" onClick={action}>
        {text}
      </Option>
    );
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
                {ButtonActiveOrInactive(role === "1", "Soy usuario", () => {
                  setRole("1");
                })}
              </Col>
              <Col>
                {ButtonActiveOrInactive(role === "2", " Soy traductor", () => {
                  setRole("2");
                })}
              </Col>
            </Row>
            <SignupInfo>
              ¿Ya tienes cuenta CUCÚ?
              <BackToLoginLink to="/">Inicia sesión</BackToLoginLink>
            </SignupInfo>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <Label>Nombre</Label>
                <Control
                  type="text"
                  name="firstname"
                  ref={register({ required: true })}
                />
              </Form.Group>
              {errors.firstname && (
                <div className="alert alert-danger">El nombre es requerido</div>
              )}
              <Form.Group>
                <Label>Apellido</Label>
                <Control
                  type="text"
                  name="lastname"
                  ref={register({ required: true })}
                />
              </Form.Group>
              {errors.lastname && (
                <div className="alert alert-danger">
                  El apellido es requerido
                </div>
              )}
              {role === "1" && (
                <>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Label>Tipo de cliente</Label>
                    <Form.Control
                      className="form-select"
                      as="select"
                      name="client_type"
                      ref={register({ required: true })}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    >
                      <option value=""></option>
                      <option value="client">Persona natural</option>
                      <option value="enterprise">Persona juridica</option>
                    </Form.Control>
                  </Form.Group>
                  {errors.client_type && (
                    <div className="alert alert-danger">
                      El tipo de cliente es requerido
                    </div>
                  )}
                  {type === "enterprise" && (
                    <>
                      <Form.Group>
                        <Label>Nombre de tu empresa</Label>
                        <Control
                          type="text"
                          name="company_name"
                          ref={register({ required: true })}
                        />
                      </Form.Group>
                      {errors.company_name && (
                        <div className="alert alert-danger">
                          El nombre de tu empresa es requerido
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
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
              <Form.Group>
                <Label>Teléfono</Label>
                <Control
                  type="text"
                  name="phone"
                  ref={register({ required: true })}
                />
              </Form.Group>
              {errors.phone && (
                <div className="alert alert-danger">
                  El teléfono es requerido
                </div>
              )}
              <Form.Group>
                <Label>Contraseña</Label>
                <InputGroup>
                  <ControlPassword
                    type={showPassword ? "text" : "password"}
                    name="password"
                    ref={register({
                      required: "La contraseña es requerida",
                      minLength: {
                        value: 8,
                        message: `La contraseña Debe contener como mínimo una letra mayúscula, una letra minúscula, 1 número, 1 carácter especial y 8 caracteres sin espacio en blanco`,
                      },
                    })}
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
                  {errors.password.message}
                </div>
              )}
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
                    name="password_repeat"
                    ref={register({
                      validate: (value) =>
                        value === password.current ||
                        "Las contraseñas no coinciden",
                    })}
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
              {errors.password_repeat && (
                <div className="alert alert-danger">
                  {errors.password_repeat.message}
                </div>
              )}
              <FormCheck>
                <input
                  type="checkbox"
                  name="terms"
                  className="form-check-input"
                  ref={register({ required: true })}
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
              {errors.terms && (
                <div className="alert alert-danger">
                  Acepta los términos y condiciones
                </div>
              )}
              <Submit type="submit">Crear mi cuenta</Submit>
            </Form>
          </Signup>
        </Col>
        <Col className="bg-image-signup"></Col>
      </Row>
    </Container>
  );
}

export default SignupPage;
