/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import TranslatorProfileForm from '../../components/TranslatorProfileForm'
import TranslatorExperienceForm from '../../components/TranslatorExperienceForm'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../utils/session";
import {
  Container,
  Row,
  Col,
  Nav,
  Form,
  InputGroup,
  NavDropdown,
} from "react-bootstrap";

import { Link, useHistory, Route, useLocation } from "react-router-dom";

import {
  Title,
  WellContainer,
  PasswordRecover,
  RowRecover,
} from "./styles"


interface Props {
  counter: number;
  reduxIncreaseCounter: () => void;
  reduxDecreaseCounter: () => void;
}




function ProfileTraductorPage({
  reduxIncreaseCounter,
  reduxDecreaseCounter,
  counter,
}: Props) {
  const [profile, setProfile] = useState<any>({});
  
  const history = useHistory();
  const location = useLocation();
  console.log(location.pathname)

  return (
    <>
      <nav className="navbar navbar-expand-md layout">
        <Link className="navbar-brand" to="#">
          <img src="/assets/images/logo.png" alt="logo" />
        </Link>
        
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
                        <Nav defaultActiveKey={location.pathname} className="flex-column">
                          <Nav.Link className="item-menu" href="/profile/">
                            <p className="text-item-menu">Mi cuenta</p>
                          </Nav.Link>
                          <Nav.Link className="item-menu" href="/profile/experience">
                            <p className="text-item-menu">Experiencia laboral</p>
                          </Nav.Link>
                          <Nav.Link className="item-menu" href="/profile/opiniones" >
                            <p className="text-item-menu">Opiniones</p>
                          </Nav.Link>
                        </Nav>
                      </Col>
                      <Col className="col-padding item-active-profile">

                        <Route path={`/profile/experience`} component={TranslatorExperienceForm}/>
                        <Route exact path={`/profile/`} component={TranslatorProfileForm}/>

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

ProfileTraductorPage.propTypes = {
  counter: PropTypes.number.isRequired,
  reduxIncreaseCounter: PropTypes.func.isRequired,
  reduxDecreaseCounter: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileTraductorPage);
