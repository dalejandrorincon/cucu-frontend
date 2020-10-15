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

import Header from "../../components/Header"

import * as UsersAPI from '../../api/users';


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
  const [image, setImage] = useState<any>(null);

  const history = useHistory();
  const location = useLocation();
  console.log(location.pathname)

  const handleFileChange = async (event) => {
    const res = await UsersAPI.saveFile(event.target.files[0])
    console.log(res.image.Location)
    UsersAPI.updateUser({image_url: res.image?.Location}, localStorage.getItem("token")).then((res) => {
      getProfile()
    }).catch((err) => {
      console.log(err)
    })
  }

  const getProfile = () => {
    UsersAPI.getUser({}, localStorage.getItem("userId")).then((res) => {
        localStorage.setItem("image_url", res.user?.image_url);
        getImage()
    })
  }
  const getImage = () =>{
    let url = localStorage.getItem("image_url")
    if (url){
      setImage(url)
    }else{
      setImage("/assets/images/no_avatar_default.png")
    }
  }

  useEffect(() => {
    getImage();
  }, []);



  return (
    <>
      <Header></Header>
      <Container className="themed-container">
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
                              src={image}
                              alt="logo"
                            />
                            <div className="upload">
                              <label htmlFor="file" className="upload-btn-label">
                                <i className="fa fa-pencil"></i>
                              </label>
                              <input type="file" id="file" className="upload-btn" onChange={handleFileChange} />
                            </div>
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

                        <Route path={`/profile/experience`} component={TranslatorExperienceForm} />
                        <Route exact path={`/profile/`} component={TranslatorProfileForm} />

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
