/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { logout } from "../../utils/session";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  NavDropdown,
  Modal,
} from "react-bootstrap";

import{
  Title,
  PasswordInfo,
  WellContainer,
  PasswordRecover,
  RowRecover,
  Label,
  ControlPassword,
  ShowPassword,
  Control,
  Submit,
  SubmitButton
}

from './styles'

import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
const baseUri = process.env.REACT_APP_API_URL;

interface Props {
  counter: number;
  reduxIncreaseCounter: () => void;
  reduxDecreaseCounter: () => void;
}

function ProfilePage({
  reduxIncreaseCounter,
  reduxDecreaseCounter,
  counter,
}: Props) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("client");
  const [terms, setTerms] = useState(false);
  const history = useHistory();

  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const getProfile = () => {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", localStorage.getItem("token")!);

    try {
      fetch(`${baseUri}/users/${localStorage.getItem("userId")}`, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setProfile(responseJson.user);
          setFirstname(responseJson.user.firstname);
          setLastname(responseJson.user.lastname);
          setDocument(responseJson.user.document);
          setPhone(responseJson.user.phone);
          setEmail(responseJson.user.email);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-md layout">
        <Link className="navbar-brand" to="/translators">
          <img src="/assets/images/logo.png" alt="logo" />
        </Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link nav-item-inactive" to="/translators">
              Traductores
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link nav-item-inactive" to="/home">
              Mis solicitudes
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <img src="/assets/images/bell@2x.png"></img>
          </li>
        </ul>
        <ul className="navbar-nav">
          <img
            src="/assets/images/no_avatar_default.png"
            className="ico-user"
          />
          <NavDropdown
            title={localStorage.getItem("userName")}
            id="nav-dropdown"
          >
            <NavDropdown.Item>
              <Link to="/profile">Perfil</Link>
            </NavDropdown.Item>{" "}
            <NavDropdown.Item>
              <Link
                to="#"
                onClick={() => {
                  logout();
                  history.push("/");
                }}
              >
                Cerrar sesión
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </ul>
      </nav>

      <Container className="themed-container" fluid={true}>
        <RowRecover className="layout-content">
          <Col className="col-md-12">
            <Title>Perfil</Title>
            <PasswordRecover>
              <Row>
                <Col className="col-md-12">
                  <WellContainer>
                    <div className="row-border col-padding container-profile">
                      <Col>
                        <div className="userIconTra">
                          <div>
                            <img
                              className="image-profile"
                              src="/assets/images/no_avatar_default.png"
                              alt="logo"
                            />
                          </div>
                          <div>
                            <div className="name-container">
                              <p className="name-profile">
                                {profile?.firstname} {profile?.lastname}
                              </p>

                              {/* <p className="enterprise">. NativApps S.A.S</p> */}
                            </div>
                            <p className="email-text">{profile?.email}</p>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <Row>
                          <Col>
                            <p className="services">0 servicios</p>
                            <p className="cucucreditos">
                              $0 invertidos en Cucu
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </div>
                    <Row className="col-padding">
                      <Col className="col-md-3 menu-profile ">
                        <div className="item-menu-active">
                          <p className="text-item-menu-active">Mi cuenta</p>
                        </div>
                        <div className="item-menu">
                          <p className="text-item-menu">Métodos de pago</p>
                        </div>
                        <div className="item-menu">
                          <p className="text-item-menu">Cucucréditos</p>
                        </div>
                      </Col>
                      <Col className="col-padding item-active-profile">
                        <Title>Mi cuenta</Title>
                        <Form>
                          <Form.Group>
                            <Label className="label-filter">Nombre</Label>
                            <Control
                              type="text"
                              value={firstname}
                              onChange={(e: any) =>
                                setFirstname(e.target.value)
                              }
                            />
                          </Form.Group>
                          <Form.Group>
                            <Label className="label-filter">Apellido</Label>
                            <Control
                              type="text"
                              value={lastname}
                              onChange={(e: any) => setLastname(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Label className="label-filter">
                              Documento de identidad
                            </Label>
                            <Control type="text" value="1047450855" />
                          </Form.Group>
                          <Form.Group>
                            <Label className="label-filter">
                              Correo electrónico
                            </Label>
                            <Control
                              type="text"
                              value={email}
                              onChange={(e: any) => setEmail(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Label className="label-filter">Teléfono</Label>
                            <Control
                              type="text"
                              value={phone}
                              onChange={(e: any) => setPhone(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Label className="label-filter">Contraseña</Label>
                            <InputGroup>
                              <ControlPassword
                                type="password"
                                value="password"
                              />
                              <InputGroup.Prepend>
                                <ShowPassword onClick={handleShow}>
                                  Cambiar
                                </ShowPassword>
                              </InputGroup.Prepend>
                            </InputGroup>
                          </Form.Group>
                          <Form.Group>
                            <Label className="label-filter">Sobre mí</Label>
                            <Control type="text" />
                          </Form.Group>
                          <Submit
                            type="button"
                            onClick={() => {
                              alert("Perfil actualizado");
                            }}
                          >
                            Guardar cambios
                          </Submit>
                        </Form>
                        <Link className="disabled-account" to="#">
                          Desactivar cuenta
                        </Link>
                      </Col>
                    </Row>
                  </WellContainer>
                </Col>
              </Row>
            </PasswordRecover>
          </Col>
        </RowRecover>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cambiar contraseña</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="info-change-password">
              Escribe tu contraseña actual para poder cambiar tu contraseña.
            </p>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <InputGroup>
                  <ControlPassword
                    type={showOldPassword ? "text" : "password"}
                    name="old_password"
                    placeholder="Contraseña actual"
                    ref={register({ required: true })}
                  />
                  <InputGroup.Prepend>
                    <ShowPassword
                      onClick={() => {
                        setShowOldPassword(!showOldPassword);
                      }}
                    >
                      {showOldPassword ? "Ocultar" : "Mostrar"}
                    </ShowPassword>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
              {errors.old_password && (
                <div className="alert alert-danger">
                  La contraseña actual es requerida
                </div>
              )}
              <Form.Group>
                <InputGroup>
                  <ControlPassword
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Nueva contraseña"
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
                <InputGroup>
                  <ControlPassword
                    type={showVerifyPassword ? "text" : "password"}
                    name="password_repeat"
                    placeholder="Confirma nueva contraseña"
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
              <SubmitButton type="submit">Cambiar contraseña</SubmitButton>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    counter: state.counter.counter,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    reduxIncreaseCounter: () =>
      dispatch({
        type: "INCREASE_COUNTER",
        value: 1,
      }),
    reduxDecreaseCounter: () =>
      dispatch({
        type: "DECREASE_COUNTER",
        value: 1,
      }),
  };
};

ProfilePage.propTypes = {
  counter: PropTypes.number.isRequired,
  reduxIncreaseCounter: PropTypes.func.isRequired,
  reduxDecreaseCounter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
