import React from "react";
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

function TranslatorsPage({
  reduxIncreaseCounter,
  reduxDecreaseCounter,
  counter,
}: Props) {
  // const [isVisible, setIsVisible] = useState(false);

  // const updateModal = (isVisible) => {
  //   setIsVisible(isVisible);
  //   //this.forceUpdate();
  // };

  return (
    <>
      <nav className="navbar navbar-expand-md layout">
        <a className="navbar-brand" href="#">
          <img src="/assets/images/logo.png" alt="logo" />
        </a>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item nav-item-active">
            <Link className="nav-link " to="translators">
              Traductores
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link nav-item-inactive" to="home">
              Mis solicitudes
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          <div className="ico-user" />
          <NavDropdown title="Alvaro Pérez" id="nav-dropdown">
            <NavDropdown.Item>Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
        </ul>
      </nav>
      <Container className="themed-container" fluid={true}>
        <RowRecover className="layout-content">
          <Col className="col-md-12">
            <Title>Traductores</Title>
            <PasswordRecover>
              <Row>
                <Col className="col-md-3">
                  <div className="card">
                    <div className="card-header">Filtrar por</div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div>Calificación</div>
                        <StarContainer>
                          <span className="fa fa-star active-filter"></span>
                          <span className="fa fa-star active-filter"></span>
                          <span className="fa fa-star-o active-filter"></span>
                          <span className="fa fa-star-o active-filter"></span>
                          <span className="fa fa-star-o active-filter"></span>
                        </StarContainer>
                      </li>
                      <li className="list-group-item">
                        Experiencia
                        <div className="slidecontainer">
                          <input
                            type="range"
                            min="1"
                            max="100"
                            className="slider"
                            id="myRange"
                          />
                        </div>
                        <LabelFilter>
                          <Col>
                            <TextFilter>1 años</TextFilter>
                          </Col>
                          <ColFilter>
                            <TextFilter>5 años</TextFilter>
                          </ColFilter>
                        </LabelFilter>
                      </li>
                      <li className="list-group-item">
                        Disponible
                        <FormControl
                          id="inlineFormInputGroup"
                          placeholder="Hoy (16 Jul, 2020)"
                        />
                        <LabelFilter>
                          <Col>
                            <TextFilterBox>9:00AM</TextFilterBox>
                          </Col>
                          <ColFilter>
                            <TextFilterBoxEnd>9:00AM</TextFilterBoxEnd>
                          </ColFilter>
                        </LabelFilter>
                      </li>
                      <li className="list-group-item">
                        Precio por hora
                        <TextFilter>Hasta $25</TextFilter>
                        <TextFilter>$25 - $50</TextFilter>
                        <TextFilter>$50 - $100</TextFilter>
                        <div className="slidecontainer">
                          <input
                            type="range"
                            min="1"
                            max="100"
                            className="slider"
                            id="myRange"
                          />
                        </div>
                        <LabelFilter>
                          <Col>
                            <TextFilter>$40</TextFilter>
                          </Col>
                          <ColFilter>
                            <TextFilter>$120</TextFilter>
                          </ColFilter>
                        </LabelFilter>
                      </li>
                      <li className="list-group-item">
                        Precio por minuto <TextFilter>Hasta $25</TextFilter>
                        <TextFilter>$25 - $50</TextFilter>
                        <TextFilter>$50 - $100</TextFilter>
                        <div className="slidecontainer">
                          <input
                            type="range"
                            min="1"
                            max="100"
                            className="slider"
                            id="myRange"
                          />
                        </div>
                        <LabelFilter>
                          <Col>
                            <TextFilter>$40</TextFilter>
                          </Col>
                          <ColFilter>
                            <TextFilter>$120</TextFilter>
                          </ColFilter>
                        </LabelFilter>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col className="col-md-9">
                  <WellContainer>
                    <Container className="themed-container" fluid={true}>
                      <Row>
                        <Col>
                          <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control as="select">
                              <option>Todas las especialidades</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control as="select">
                              <option>Todos los idiomas</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col>
                          <FormControl
                            id="inlineFormInputGroup"
                            placeholder="Buscar por nombre"
                          />
                        </Col>
                      </Row>
                    </Container>
                    <div className="table-responsive">
                      <table className="table ">
                        <tbody>
                          <tr>
                            <td>
                              <div className="userIconTra">
                                <div>
                                  <img
                                    src="/assets/images/icon.png"
                                    alt="logo"
                                  />
                                </div>
                                <div>
                                  <p className="name">
                                    Emma
                                    <div>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa ffa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                    </div>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p>Especialista en</p>
                              <span className="badge badge-light">
                                Comercio
                              </span>
                              <span className="badge badge-light">
                                Estilo de vida
                              </span>
                            </td>
                            <td>
                              <p>Idioma</p>
                              <span className="badge badge-light">Ingles</span>
                            </td>
                            <td>
                              <ResendLink to="#">Ver perfil</ResendLink>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="userIconTra">
                                <div>
                                  <img
                                    src="/assets/images/icon.png"
                                    alt="logo"
                                  />
                                </div>
                                <div>
                                  <p className="name">
                                    Emma
                                    <div>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa ffa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                    </div>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p>Especialista en</p>
                              <span className="badge badge-light">
                                Comercio
                              </span>
                              <span className="badge badge-light">
                                Estilo de vida
                              </span>
                            </td>
                            <td>
                              <p>Idioma</p>
                              <span className="badge badge-light">Ingles</span>
                            </td>
                            <td>
                              <ResendLink to="#">Ver perfil</ResendLink>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="userIconTra">
                                <div>
                                  <img
                                    src="/assets/images/icon.png"
                                    alt="logo"
                                  />
                                </div>
                                <div>
                                  <p className="name">
                                    Emma
                                    <div>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa ffa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                    </div>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p>Especialista en</p>
                              <span className="badge badge-light">
                                Comercio
                              </span>
                              <span className="badge badge-light">
                                Estilo de vida
                              </span>
                            </td>
                            <td>
                              <p>Idioma</p>
                              <span className="badge badge-light">Ingles</span>
                            </td>
                            <td>
                              <ResendLink to="#">Ver perfil</ResendLink>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="userIconTra">
                                <div>
                                  <img
                                    src="/assets/images/icon.png"
                                    alt="logo"
                                  />
                                </div>
                                <div>
                                  <p className="name">
                                    Emma
                                    <div>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa ffa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                    </div>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p>Especialista en</p>
                              <span className="badge badge-light">
                                Comercio
                              </span>
                              <span className="badge badge-light">
                                Estilo de vida
                              </span>
                            </td>
                            <td>
                              <p>Idioma</p>
                              <span className="badge badge-light">Ingles</span>
                            </td>
                            <td>
                              <ResendLink to="#">Ver perfil</ResendLink>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="userIconTra">
                                <div>
                                  <img
                                    src="/assets/images/icon.png"
                                    alt="logo"
                                  />
                                </div>
                                <div>
                                  <p className="name">
                                    Emma
                                    <div>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa ffa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                    </div>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p>Especialista en</p>
                              <span className="badge badge-light">
                                Comercio
                              </span>
                              <span className="badge badge-light">
                                Estilo de vida
                              </span>
                            </td>
                            <td>
                              <p>Idioma</p>
                              <span className="badge badge-light">Ingles</span>
                            </td>
                            <td>
                              <ResendLink to="#">Ver perfil</ResendLink>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="userIconTra">
                                <div>
                                  <img
                                    src="/assets/images/icon.png"
                                    alt="logo"
                                  />
                                </div>
                                <div>
                                  <p className="name">
                                    Emma
                                    <div>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa ffa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                    </div>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p>Especialista en</p>
                              <span className="badge badge-light">
                                Comercio
                              </span>
                              <span className="badge badge-light">
                                Estilo de vida
                              </span>
                            </td>
                            <td>
                              <p>Idioma</p>
                              <span className="badge badge-light">Ingles</span>
                            </td>
                            <td>
                              <ResendLink to="#">Ver perfil</ResendLink>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="userIconTra">
                                <div>
                                  <img
                                    src="/assets/images/icon.png"
                                    alt="logo"
                                  />
                                </div>
                                <div>
                                  <p className="name">
                                    Emma
                                    <div>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa ffa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                    </div>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p>Especialista en</p>
                              <span className="badge badge-light">
                                Comercio
                              </span>
                              <span className="badge badge-light">
                                Estilo de vida
                              </span>
                            </td>
                            <td>
                              <p>Idioma</p>
                              <span className="badge badge-light">Ingles</span>
                            </td>
                            <td>
                              <ResendLink to="#">Ver perfil</ResendLink>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="userIconTra">
                                <div>
                                  <img
                                    src="/assets/images/icon.png"
                                    alt="logo"
                                  />
                                </div>
                                <div>
                                  <p className="name">
                                    Emma
                                    <div>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa ffa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                    </div>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p>Especialista en</p>
                              <span className="badge badge-light">
                                Comercio
                              </span>
                              <span className="badge badge-light">
                                Estilo de vida
                              </span>
                            </td>
                            <td>
                              <p>Idioma</p>
                              <span className="badge badge-light">Ingles</span>
                            </td>
                            <td>
                              <ResendLink to="#">Ver perfil</ResendLink>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="userIconTra">
                                <div>
                                  <img
                                    src="/assets/images/icon.png"
                                    alt="logo"
                                  />
                                </div>
                                <div>
                                  <p className="name">
                                    Emma
                                    <div>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa ffa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                      <span className="fa fa-star-o active"></span>
                                    </div>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p>Especialista en</p>
                              <span className="badge badge-light">
                                Comercio
                              </span>
                              <span className="badge badge-light">
                                Estilo de vida
                              </span>
                            </td>
                            <td>
                              <p>Idioma</p>
                              <span className="badge badge-light">Ingles</span>
                            </td>
                            <td>
                              <ResendLink to="#">Ver perfil</ResendLink>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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

TranslatorsPage.propTypes = {
  counter: PropTypes.number.isRequired,
  reduxIncreaseCounter: PropTypes.func.isRequired,
  reduxDecreaseCounter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TranslatorsPage);
