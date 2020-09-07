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

function HomePage({
  reduxIncreaseCounter,
  reduxDecreaseCounter,
  counter,
}: Props) {
  return (
    <>
      <nav className="navbar navbar-expand-md layout">
        <a className="navbar-brand" href="#">
          <img src="/assets/images/logo.png" alt="logo" />
        </a>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link nav-item-inactive" to="translators">
              Traductores
            </Link>
          </li>
          <li className="nav-item nav-item-active">
            <Link className="nav-link" to="home">
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
            <Title>Mis solicitudes</Title>
            <PasswordRecover>
              <WellContainer>
                <Container className="themed-container" fluid={true}>
                  <Row>
                    <Col>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select">
                          <option>Todos los tipos</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select">
                          <option>Todos los estados</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select">
                          <option>Más recientes</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select">
                          <option>Todos los cobros</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select">
                          <option>Desde: 07/07/20</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select">
                          <option>Desde: 07/07/20</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select">
                          <option>Todos los cobros</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <FormControl
                        id="inlineFormInputGroup"
                        placeholder="Buscar por traductor"
                      />
                    </Col>
                  </Row>
                </Container>
                <div className="table-responsive">
                  <table className="table ">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Traductor</th>
                        <th scope="col">Tipo de solicitud</th>
                        <th scope="col">Cobro</th>
                        <th scope="col">Creación</th>
                        <th scope="col">Estado</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="userIcon">
                            <div>
                              <img src="/assets/images/icon.png" alt="logo" />
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
                        <td>Programada</td>
                        <td>$25</td>
                        <td>7 Jul, 2020</td>
                        <td>
                          <span className="badge badge-light">En progreso</span>
                        </td>
                        <td>
                          <ResendLink to="#">Ver</ResendLink>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="userIcon">
                            <div>
                              <img src="/assets/images/icon.png" alt="logo" />
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
                        <td>Programada</td>
                        <td>$25</td>
                        <td>7 Jul, 2020</td>
                        <td>
                          <span className="badge badge-light">En progreso</span>
                        </td>
                        <td>
                          <ResendLink to="#">Ver</ResendLink>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="userIcon">
                            <div>
                              <img src="/assets/images/icon.png" alt="logo" />
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
                        <td>Programada</td>
                        <td>$25</td>
                        <td>7 Jul, 2020</td>
                        <td>
                          <span className="badge badge-light">En progreso</span>
                        </td>
                        <td>
                          <ResendLink to="#">Ver</ResendLink>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="userIcon">
                            <div>
                              <img src="/assets/images/icon.png" alt="logo" />
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
                        <td>Programada</td>
                        <td>$25</td>
                        <td>7 Jul, 2020</td>
                        <td>
                          <span className="badge badge-light">En progreso</span>
                        </td>
                        <td>
                          <ResendLink to="#">Ver</ResendLink>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="userIcon">
                            <div>
                              <img src="/assets/images/icon.png" alt="logo" />
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
                        <td>Programada</td>
                        <td>$25</td>
                        <td>7 Jul, 2020</td>
                        <td>
                          <span className="badge badge-light">En progreso</span>
                        </td>
                        <td>
                          <ResendLink to="#">Ver</ResendLink>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="userIcon">
                            <div>
                              <img src="/assets/images/icon.png" alt="logo" />
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
                        <td>Programada</td>
                        <td>$25</td>
                        <td>7 Jul, 2020</td>
                        <td>
                          <span className="badge badge-light">En progreso</span>
                        </td>
                        <td>
                          <ResendLink to="#">Ver</ResendLink>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </WellContainer>
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

HomePage.propTypes = {
  counter: PropTypes.number.isRequired,
  reduxIncreaseCounter: PropTypes.func.isRequired,
  reduxDecreaseCounter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
