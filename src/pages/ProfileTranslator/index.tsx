/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../utils/session";
import {
  Container,
  Row,
  Col,
  NavDropdown,
  Modal,
} from "react-bootstrap";
import Rating from "react-rating";
import "./styles.scss"

import { Link, useHistory, useParams } from "react-router-dom";

import {
  Title,
  WellContainer,
  PasswordRecover,
  RowRecover,
  Submit
} from "./styles"
import Header from "../../components/Header";


const baseUri = process.env.REACT_APP_API_URL;

interface Props {
  counter: number;
  reduxIncreaseCounter: () => void;
  reduxDecreaseCounter: () => void;
}


function ProfileTranslatorPage({
  reduxIncreaseCounter,
  reduxDecreaseCounter,
  counter,
}: Props) {
  const history = useHistory();
  const { id } = useParams();
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
      <Header></Header>
      <Container className="themed-container">
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
                            <img
                              src={translators?.image_url ? translators.image_url : "/assets/images/no_avatar_default.png"}
                              className="image-profile ico-user"
                            />
                          </div>
                          <div className="translator-profile-main">
                            <p className="name">
                              <span className="user-name">{translators?.firstname} {translators?.lastname}</span>
                              <br></br> {translators?.total_experience_years}{" "}
                              años de experiencia
                              <div>
                                <Rating
                                  emptySymbol="fa fa-star-o fa-2x fa-start"
                                  fullSymbol="fa fa-star fa-2x fa-start"
                                  className="startcontainer"
                                  readonly={true}
                                  initialRating={translators?.rating}
                                />
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
                            {/* <a
                              className="ver-todas"
                              onClick={() => {
                                setisVisible(true);
                              }}
                            >
                              Ver todas
                            </a> */}
                          </div>
                          <p>{translators?.rating} ({translators?.total_ratings} {translators?.total_ratings!="1"?<>opiniones</>:<>opinión</>})</p>
                        </div>
                        {/* <div>
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
                        </div> */}
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
