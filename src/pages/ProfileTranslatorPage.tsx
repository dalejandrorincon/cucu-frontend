/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from "react";
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
  Nav,
  NavDropdown,
  FormControl,
  Modal,
} from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import RangeSlider from "react-bootstrap-range-slider";
import { Range } from "rc-slider";
const baseUri = process.env.REACT_APP_API_URL;

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
  margin-right: 10px;
  margin-left: 10px;
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
  width: 100%;
  min-height: 50px;
  margin-bottom: 20px;
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

function ProfileTranslatorPage({
  reduxIncreaseCounter,
  reduxDecreaseCounter,
  counter,
}: Props) {
  const history = useHistory();
  let { id } = useParams();
  const [isVisible, setisVisible] = useState(false);

  const [translators, setTranslators] = useState<any>({});

  const getTranslators = () => {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", localStorage.getItem("token")!);

    try {
      fetch(`${baseUri}/users/${id}`, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setTranslators(responseJson.user);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getTranslators();
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
            <Title>Perfil de traductor</Title>
            <PasswordRecover>
              <Row>
                <Col className="col-md-12">
                  <WellContainer>
                    <div className="row-border col-padding">
                      <Col>
                        <div className="userIconTra iconuserprofile">
                          <div>
                            <img src="/assets/images/icon.png" alt="logo" />
                          </div>
                          <div>
                            <p className="name">
                              {translators?.firstname} {translators?.lastname}
                              <br></br> {translators?.total_experience_years}{" "}
                              años de experiencia
                              <div>
                                <span className="fa fa-star active"></span>
                                <span className="fa fa-star active"></span>
                                <span className="fa fa-star-o active"></span>
                                <span className="fa fa-star-o active"></span>
                                <span className="fa fa-star-o active"></span>
                              </div>
                            </p>
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <Row>
                          <Col>
                            <p className="price-hour">
                              ${translators?.rate_hour} / $
                              {translators?.rate_minute}
                            </p>
                          </Col>
                          <Col>
                            <Submit
                              type="button"
                              onClick={() => {
                                history.push(`/request-translator/${id}`);
                              }}
                            >
                              Solicitar servicio
                            </Submit>
                          </Col>
                        </Row>
                      </Col>
                    </div>
                    <Row className="col-padding">
                      <Col>
                        <Row>
                          <Col className="col-md-12">
                            <p className="text-profile">
                              {translators?.description}
                            </p>
                          </Col>
                          <Col className="col-md-12 col-margin">
                            <Row className="border-cont">
                              <Col>
                                <p>Especialista en</p>
                                {translators?.specialities?.map((sp: any) => (
                                  <span className="badge badge-light">
                                    {sp.name}
                                  </span>
                                ))}
                              </Col>
                              <Col>
                                <p>Idioma</p>
                                {translators?.languages?.map((lng: any) => (
                                  <>
                                    <span className="badge badge-light">
                                      {lng.to.name}
                                    </span>
                                    <span className="badge badge-light">
                                      {lng.from.name}
                                    </span>
                                  </>
                                ))}
                              </Col>
                            </Row>
                          </Col>
                          <Col className="col-md-12 col-margin">
                            <Row className="border-cont">
                              <Col>
                                <p>Ubicacion</p>
                                <span className="text-profile-item">
                                  {translators?.address_1}
                                </span>
                              </Col>
                              <Col>
                                <p>Nacionalidad</p>
                                <span className="text-profile-item">
                                  {translators?.nationality}
                                </span>
                              </Col>
                            </Row>
                          </Col>
                          <Col className="col-md-12 col-margin">
                            <Row className="border-cont">
                              <Col>
                                <p>Tarifa por hora</p>
                                <span className="text-profile-item">
                                  ${translators?.rate_hour}
                                </span>
                              </Col>
                              <Col>
                                <p>Tarifa por minuto</p>
                                <span className="text-profile-item">
                                  ${translators?.rate_minute}
                                </span>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>

                      <Col className="col-md-3 opinions">
                        <div className="opinion-container">
                          <div className="opinion-title">
                            <p>Opiniones</p>
                            <a
                              className="ver-todas"
                              onClick={() => {
                                setisVisible(true);
                              }}
                            >
                              Ver todas
                            </a>
                          </div>
                          <p>4.44 (23 opiniones)</p>
                        </div>
                        <div>
                          <p className="name">
                            <div className="opinion-name">
                              <p>
                                Emilia{" "}
                                <span className="fa fa-star active-green"></span>
                                <span className="fa fa-star active-green"></span>
                                <span className="fa fa-star-o active-green"></span>
                                <span className="fa fa-star-o active-green"></span>
                                <span className="fa fa-star-o active-green"></span>
                              </p>
                              <span className="opinion-date">12/09/19</span>
                            </div>
                            <span className="text-profile-item">
                              {" "}
                              Loved Chef Kreuther and his techniques with this
                              wonderful recipe.
                            </span>
                            <div></div>
                          </p>
                        </div>{" "}
                        <div>
                          <p className="name">
                            <div className="opinion-name">
                              <p>
                                Emilia{" "}
                                <span className="fa fa-star active-green"></span>
                                <span className="fa fa-star active-green"></span>
                                <span className="fa fa-star-o active-green"></span>
                                <span className="fa fa-star-o active-green"></span>
                                <span className="fa fa-star-o active-green"></span>
                              </p>
                              <span className="opinion-date">12/09/19</span>
                            </div>
                            <span className="text-profile-item">
                              {" "}
                              Loved Chef Kreuther and his techniques with this
                              wonderful recipe.
                            </span>
                            <div></div>
                          </p>
                        </div>{" "}
                        <div>
                          <p className="name">
                            <div className="opinion-name">
                              <p>
                                Emilia{" "}
                                <span className="fa fa-star active-green"></span>
                                <span className="fa fa-star active-green"></span>
                                <span className="fa fa-star-o active-green"></span>
                                <span className="fa fa-star-o active-green"></span>
                                <span className="fa fa-star-o active-green"></span>
                              </p>
                              <span className="opinion-date">12/09/19</span>
                            </div>
                            <span className="text-profile-item">
                              {" "}
                              Loved Chef Kreuther and his techniques with this
                              wonderful recipe.
                            </span>
                            <div></div>
                          </p>
                        </div>
                        <div>
                          <p className="name">
                            <div className="opinion-name">
                              <p>
                                Emilia{" "}
                                <span className="fa fa-star active-green"></span>
                                <span className="fa fa-star active-green"></span>
                                <span className="fa fa-star-o active-green"></span>
                                <span className="fa ffa-star-o active-green"></span>
                                <span className="fa fa-star-o active-green"></span>
                                <span className="fa fa-star-o active-green"></span>
                              </p>
                              <span className="opinion-date">12/09/19</span>
                            </div>
                            <span className="text-profile-item">
                              {" "}
                              Loved Chef Kreuther and his techniques with this
                              wonderful recipe.
                            </span>
                            <div></div>
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </WellContainer>
                </Col>
              </Row>
            </PasswordRecover>
          </Col>
        </RowRecover>
        <Modal
          className="right"
          show={isVisible}
          onHide={() => {
            setisVisible(false);
          }}
          autoFocus
          keyboard
        >
          <Modal.Header closeButton>
            <Modal.Title>Opiniones</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="opinion-container">
              <p className="opinion-modal">
                {" "}
                <span className="fa fa-star active-green"></span> 4.44 (23
                opiniones)
              </p>
              <Submit
                type="button"
                onClick={() => {
                  setisVisible(false);
                  history.push(`/request-translator/${id}`);
                }}
              >
                Solicitar servicio
              </Submit>
            </div>
            <div>
              <p className="name">
                <div className="opinion-name">
                  <p>
                    Emilia <span className="fa fa-star active-green"></span>
                    <span className="fa fa-star active-green"></span>
                    <span className="fa fa-star-o active-green"></span>
                    <span className="fa fa-star-o active-green"></span>
                    <span className="fa fa-star-o active-green"></span>
                  </p>
                  <span className="opinion-date">12/09/19</span>
                </div>
                <span className="text-profile-item">
                  {" "}
                  Loved Chef Kreuther and his techniques with this wonderful
                  recipe.
                </span>
                <div></div>
              </p>
            </div>{" "}
            <div>
              <p className="name">
                <div className="opinion-name">
                  <p>
                    Emilia <span className="fa fa-star active-green"></span>
                    <span className="fa fa-star active-green"></span>
                    <span className="fa fa-star-o active-green"></span>
                    <span className="fa fa-star-o active-green"></span>
                    <span className="fa fa-star-o active-green"></span>
                  </p>
                  <span className="opinion-date">12/09/19</span>
                </div>
                <span className="text-profile-item">
                  {" "}
                  Loved Chef Kreuther and his techniques with this wonderful
                  recipe.
                </span>
                <div></div>
              </p>
            </div>{" "}
            <div>
              <p className="name">
                <div className="opinion-name">
                  <p>
                    Emilia <span className="fa fa-star active-green"></span>
                    <span className="fa fa-star active-green"></span>
                    <span className="fa fa-star-o active-green"></span>
                    <span className="fa fa-star-o active-green"></span>
                    <span className="fa fa-star-o active-green"></span>
                  </p>
                  <span className="opinion-date">12/09/19</span>
                </div>
                <span className="text-profile-item">
                  {" "}
                  Loved Chef Kreuther and his techniques with this wonderful
                  recipe.
                </span>
                <div></div>
              </p>
            </div>
            <div>
              <p className="name">
                <div className="opinion-name">
                  <p>
                    Emilia <span className="fa fa-star active-green"></span>
                    <span className="fa fa-star active-green"></span>
                    <span className="fa fa-star-o active-green"></span>
                    <span className="fa ffa-star-o active-green"></span>
                    <span className="fa fa-star-o active-green"></span>
                    <span className="fa fa-star-o active-green"></span>
                  </p>
                  <span className="opinion-date">12/09/19</span>
                </div>
                <span className="text-profile-item">
                  {" "}
                  Loved Chef Kreuther and his techniques with this wonderful
                  recipe.
                </span>
                <div></div>
              </p>
            </div>
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

ProfileTranslatorPage.propTypes = {
  counter: PropTypes.number.isRequired,
  reduxIncreaseCounter: PropTypes.func.isRequired,
  reduxDecreaseCounter: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileTranslatorPage);
