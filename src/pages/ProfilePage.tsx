/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { logout } from "../utils/session";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  NavDropdown,
  Modal,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
const baseUri = process.env.REACT_APP_API_URL;

interface Props {
  counter: number;
  reduxIncreaseCounter: () => void;
  reduxDecreaseCounter: () => void;
}

const Title = styled.p`
  margin-top: 30px;
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
  padding-top: 30px;
  margin-bottom: 30px;
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

const LabelFilter = styled(Row)`
  padding-left: 10px;
  padding-right: 10px;
`;

const ColFilter = styled(Col)`
  text-align: end;
`;

const SubmitButton = styled(Button)`
  background: #863df9 0% 0% no-repeat padding-box;
  border-radius: 3px;
  border-color: #863df9;
  opacity: 1;
  margin-bottom: 30px;
  min-height: 50px;
  width: 100%;
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

const Submit = styled(Button)`
  background: #863df9 0% 0% no-repeat padding-box;
  border-radius: 3px;
  border-color: #863df9;
  opacity: 1;
  margin-bottom: 30px;
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

const StarContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 60%;
`;
const TextFilter = styled.p`
  font: normal normal normal 15px Acumin Pro;
  letter-spacing: 0px;
  color: #a0a0a0;
  opacity: 1;
`;

const TextFilterBox = styled.p`
  background: #fafafa 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 1;
  height: 20px;
  padding: 3px;
  width: 60px;
  margin-top: 10px;
  font: normal normal normal 15px Acumin Pro;
  letter-spacing: 0px;
  opacity: 1;
`;

const TextFilterBoxEnd = styled.p`
  background: #fafafa 0% 0% no-repeat padding-box;
  text-align: end;
  border-radius: 3px;
  opacity: 1;
  height: 20px;
  width: 60px;
  padding: 3px;
  margin-top: 10px;
  font: normal normal normal 15px Acumin Pro;
  letter-spacing: 0px;
  opacity: 1;
  float: right;
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("client");
  const [terms, setTerms] = useState(false);
  const history = useHistory();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <li className="nav-item nav-item-active">
            <Link className="nav-link nav-item-inactive" to="/translators">
              Traductores
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link nav-item-inactive" to="/home">
              Mis solicitudes
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item ">
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
                                type={showPassword ? "text" : "password"}
                                onChange={(e: any) =>
                                  setPassword(e.target.value)
                                }
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
            <Form.Group>
              <Label className="label-filter">Contraseña actual</Label>
              <InputGroup>
                <ControlPassword
                  type={showOldPassword ? "text" : "password"}
                  name="password"
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
            <Form.Group>
              <Label className="label-filter">Contraseña</Label>
              <InputGroup>
                <ControlPassword
                  type={showPassword ? "text" : "password"}
                  name="password"
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
              <Label className="label-filter">Confirma contraseña</Label>
              <InputGroup>
                <ControlPassword
                  type={showVerifyPassword ? "text" : "password"}
                  name="password_repeat"
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
            <SubmitButton type="submit">Cambiar contraseña</SubmitButton>
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
