import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Alert, InputGroup } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Logo,
  Title,
  SignupInfo,
  BackToLoginLink,
  ForgotPasswordLink,
  Label,
  Control,
  ControlPassword,
  OptionActive,
  Option,
  Submit,
  Signup,
  ShowPassword,
  PasswordInfo,
  FormCheck,
  FormCheckLabel
} from "./styles"

import * as UsersAPI from '../../api/users';
import * as AuthAPI from '../../api/auth';

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [role, setRole] = useState("3");
  const [type, setType] = useState("client");
  const { register, handleSubmit, watch, errors } = useForm();
  const history = useHistory();
  const password = useRef({});
  password.current = watch("password", "");
  const [response, setResponse] = useState<any>(null)
  const [buttonState, setButtonState] = useState({ label: "Crear mi cuenta", disabled: false })

  const onSubmit = (data: any) => {
    console.log(role)
    let userRole = role
    if(role=="3" && type=="enterprise"){
      userRole = "4"
    }

    saveChanges({ ...data, role: userRole })
  };

  const saveChanges = (values) => {
    console.log(values)
    setButtonState({ ...buttonState, ...{ label: "Creando...", disabled: false } })
    UsersAPI.createUser(values).then((res) => {
        setButtonState({ label: "Enviar", disabled: false })
        setResponse(null)
        AuthAPI.login(values).then((res)=>{
          localStorage.setItem("token", res.token);
          localStorage.setItem("userId", res.user.id);
          localStorage.setItem("role", res.user.role);
          localStorage.setItem(
            "userName",
            res.user.firstname + " " + res.user.lastname
          );
          localStorage.setItem("image_url", res.user.image_url)
          if (res.user.role == 3 || res.user.role == 4) {
            history.push("/translators");
          } else {
            history.push("/services");
          }
        })


    }).catch((err) => {
        let error = err.response?.data?.errors;

        console.log(err.response)
        let message = "Ha ocurrido un error al crear el usuario.";
        setResponse(
          <Alert variant={'danger'} >
              {error ? JSON.stringify(error) : message}
          </Alert>
        )
    })
  }


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
                {ButtonActiveOrInactive(role === "3" || role=="4", "Soy usuario", () => {
                  setRole("3");
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
                  max="100"
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
                  max="100"
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
                  max="60"
                  ref={register({
                    required: "El correo es requerido",
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: `EL correo debe ser válido`,
                    },
                  })}
                />
              </Form.Group>
              {errors.email && (
                <div className="alert alert-danger">
                  {errors.email.message}
                </div>
              )}
              <Form.Group>
                <Label>Teléfono</Label>
                <Control
                  type="text"
                  name="phone"
                  max="14"
                  ref={register({
                    required: "El teléfono es requerido",
                    pattern: {
                      value: /^[\+\d]?(?:[\d-.\s()]*)$/,
                      message: `El teléfono debe contener solo números o el signo +`,
                    },
                  })}
                />
              </Form.Group>
              {errors.phone && (
                <div className="alert alert-danger">
                  {errors.phone.message}
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
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/i,
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
              <Submit
                disabled={buttonState.disabled}
                type="submit"
              >
                {buttonState.label}
              </Submit>

              {response}

            </Form>
          </Signup>
        </Col>
        <Col className="bg-image-signup"></Col>
      </Row>
    </Container>
  );
}

export default SignupPage;
