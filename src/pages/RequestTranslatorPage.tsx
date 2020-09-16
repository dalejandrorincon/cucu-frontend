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
} from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import RangeSlider from "react-bootstrap-range-slider";
import { Range } from "rc-slider";
const baseUri = process.env.REACT_APP_API_URL;

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
  margin-top: 20px;
  font: normal normal normal 28px Acumin Pro;
  letter-spacing: 0px;
  color: #ffffff;
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
  margin-top: 90px;
  padding: 30px;
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

const Signup = styled.div`
  min-height: 100vh;
  padding-left: 15%;
  padding-right: 5%;
  padding-bottom: 30px;
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

function RequestTranslatorPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("translator");
  const history = useHistory();

  let { id } = useParams();

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

  const onSubmit = () => {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append(
      "Content-Type",
      "application/x-www-form-urlencoded;charset=UTF-8"
    );
    headers.append("Authorization", localStorage.getItem("token")!);

    var urlencoded = new URLSearchParams();
    urlencoded.append("service_site", "");
    urlencoded.append("amount", "100");
    urlencoded.append("service_type", "cucu");
    urlencoded.append("url", "http://test.com");
    urlencoded.append("length", "120");
    urlencoded.append("platform", "test");
    urlencoded.append("date", "10/10/2020");
    urlencoded.append("record", "true");
    urlencoded.append("client_id", "3");
    urlencoded.append("translator_id", id);

    try {
      fetch("https://cucu-api-dev.n-techlab.xyz/api/translation_services", {
        method: "POST",
        headers: headers,
        body: urlencoded,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          history.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-md layout">
        <Link className="navbar-brand" to="/home">
          <img src="/assets/images/logo.png" alt="logo" />
        </Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item nav-item-active">
            <Link className="nav-link " to="/translators">
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
        <RowRecover>
          <Col className="col-md-5 mx-auto">
            <PasswordRecover>
              <WellContainer>
                <div className="header-request">
                  <img
                    className="icon-request"
                    src="/assets/images/95554056e4c5a2e2d45f1240cb0cb6ab.png"
                    alt="logo"
                  />
                  <Title>
                    Contrata a {translators?.firstname} {translators?.lastname}
                  </Title>
                </div>
                <Row>
                  {/* <Col>
                    {role === "client" ? (
                      <OptionActive
                        type="button"
                        onClick={() => {
                          setRole("client");
                        }}
                      >
                        Instantáneo
                      </OptionActive>
                    ) : (
                      <Option
                        type="button"
                        onClick={() => {
                          setRole("client");
                        }}
                      >
                        Instantáneo
                      </Option>
                    )}
                  </Col> */}
                  <Col>
                    {role === "translator" ? (
                      <OptionActive
                        type="button"
                        onClick={() => {
                          setRole("translator");
                        }}
                      >
                        Programado
                      </OptionActive>
                    ) : (
                      <Option
                        type="button"
                        onClick={() => {
                          setRole("translator");
                        }}
                      >
                        Programado
                      </Option>
                    )}
                  </Col>
                </Row>
                <Form className="form-request">
                  <Form.Group>
                    <Label>Lugar de la sesión</Label>
                    <PasswordInfo>
                      Indica dónde vas a realizar la sesión. que será traducida.
                    </PasswordInfo>
                    <div key={`inline-radio`} className="mb-3">
                      {/* <Form.Check
                        inline
                        name="datospla"
                        label="Plataforma CUCÚ"
                        type="radio"
                        id={`inline-radio-1`}
                      /> */}
                      <Form.Check
                        inline
                        name="datospla"
                        label="Plataforma externa"
                        type="radio"
                        id={`inline-radio-2`}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Label>URL</Label>
                    <PasswordInfo>
                      Especifica el enlace de la sesión.
                    </PasswordInfo>
                    <Control
                      type="text"
                      onChange={(e: any) => setLastname(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Label>Plataforma</Label>
                    <PasswordInfo>
                      Selecciona la plataforma en la que vas a tener la sesión.
                    </PasswordInfo>
                    <Form.Control as="select">
                      <option>Zoom</option>
                      <option>Meet Google</option>
                    </Form.Control>
                    <br></br>
                    <div key={`inline-radio`} className="mb-3">
                      <Form.Check
                        inline
                        name="datossesion"
                        label="Tengo los datos de la sesión"
                        type="radio"
                        id={`inline-radio-1`}
                      />
                      <Form.Check
                        inline
                        name="datossesion"
                        label="No tengo los datos de la sesión"
                        type="radio"
                        id={`inline-radio-2`}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Label>Comentarios adicionales</Label>
                    <Control
                      type="text"
                      placeholder="Si tienes un enlace de contenido a traducir, agrégalo aquí."
                      onChange={(e: any) => setDocument(e.target.value)}
                    />
                  </Form.Group>
                  <Submit type="button" onClick={onSubmit}>
                    Solicitar servicio
                  </Submit>
                </Form>
              </WellContainer>
            </PasswordRecover>
          </Col>
        </RowRecover>
      </Container>
    </>
  );
}

export default RequestTranslatorPage;
