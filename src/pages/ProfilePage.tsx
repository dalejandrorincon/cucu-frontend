import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Nav,
  NavDropdown,
  FormControl,
} from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import RangeSlider from "react-bootstrap-range-slider";
import { Range } from "rc-slider";

const Logo = styled.img`
  position: relative;
  width: 82px;
  height: 35px;
`;

interface Props {
  counter: number;
  reduxIncreaseCounter: () => void;
  reduxDecreaseCounter: () => void;
}

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
  // const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [firstname, setFirstname] = useState("Alvaro");
  const [lastname, setLastname] = useState("Perez");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("3197874887");
  const [email, setEmail] = useState("alvaro.perez@nativapps.com");
  const [role, setRole] = useState("client");
  const [terms, setTerms] = useState(false);
  const history = useHistory();
  // const updateModal = (isVisible) => {
  //   setIsVisible(isVisible);
  //   //this.forceUpdate();
  // };

  return (
    <>
      <nav className="navbar navbar-expand-md layout">
        <Link className="navbar-brand" to="/home">
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
          <div className="ico-user" />
          <NavDropdown title="Alvaro Pérez" id="nav-dropdown">
            <NavDropdown.Item>
              <Link to="profile">Perfil</Link>
            </NavDropdown.Item>{" "}
            <NavDropdown.Item>Cerrar sesión</NavDropdown.Item>
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
                              src="/assets/images/95554056e4c5a2e2d45f1240cb0cb6ab.png"
                              alt="logo"
                            />
                          </div>
                          <div>
                            <div className="name-container">
                              <p className="name-profile">Alvaro Perez</p>

                              <p className="enterprise">. NativApps S.A.S</p>
                            </div>
                            <p className="email-text">
                              alvaro.perez@nativapps.com
                            </p>
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
                            <Label>Nombre</Label>
                            <Control
                              type="text"
                              value={firstname}
                              onChange={(e: any) =>
                                setFirstname(e.target.value)
                              }
                            />
                          </Form.Group>
                          <Form.Group>
                            <Label>Apellido</Label>
                            <Control
                              type="text"
                              value={lastname}
                              onChange={(e: any) => setLastname(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Label>Documento de identidad</Label>
                            <Control type="text" value="1047450855" />
                          </Form.Group>
                          <Form.Group>
                            <Label>Correo electrónico</Label>
                            <Control
                              type="text"
                              value={email}
                              onChange={(e: any) => setEmail(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Label>Teléfono</Label>
                            <Control
                              type="text"
                              value={phone}
                              onChange={(e: any) => setPhone(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group>
                            <Label>Contraseña</Label>
                            <InputGroup>
                              <ControlPassword
                                type={showPassword ? "text" : "password"}
                                onChange={(e: any) =>
                                  setPassword(e.target.value)
                                }
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
