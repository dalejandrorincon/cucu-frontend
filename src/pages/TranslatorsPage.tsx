/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { Range } from "rc-slider";
import { FormGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Rating from "react-rating";

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
  padding-bottom: 30px;
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
  margin-top: 10px;
`;
const TextFilter = styled.p`
  font: normal normal normal 15px Acumin Pro;
  letter-spacing: 0px;
  color: #a0a0a0;
  opacity: 1;
`;

const TextFilterBox = styled.p`
  background: #e9e9e9 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 1;
  height: 25px;
  padding: 5px;
  width: 70px;
  margin-top: 0px;
  font: normal normal normal 15px Acumin Pro;
  -webkit-letter-spacing: 0px;
  -moz-letter-spacing: 0px;
  -ms-letter-spacing: 0px;
  letter-spacing: 0px;
  opacity: 1;
  text-align: end;
`;

const TextFilterBoxEnd = styled.p`
  background: #e9e9e9 0% 0% no-repeat padding-box;
  border-radius: 3px;
  opacity: 1;
  height: 25px;
  padding: 5px;
  width: 70px;
  margin-top: 0px;
  font: normal normal normal 15px Acumin Pro;
  -webkit-letter-spacing: 0px;
  -moz-letter-spacing: 0px;
  -ms-letter-spacing: 0px;
  letter-spacing: 0px;
  opacity: 1;
  text-align: end;
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
  const [valueRange, setValueRange] = useState([20, 40]);
  const [translators, setTranslators] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [specialities, setSpecialities] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [data, setData] = useState<any>({});
  const [page, setPage] = useState(1);

  const ExampleCustomInput = (props) => <Form.Control {...props} />;
  const ExampleCustomInputTime = (props) => (
    <TextFilterBox onClick={props.onClick}>{props.value}</TextFilterBox>
  );

  const ExampleCustomInputTimeTwo = (props) => (
    <TextFilterBoxEnd onClick={props.onClick}>{props.value}</TextFilterBoxEnd>
  );

  const [min, setMin] = useState(1);
  const [max, setMax] = useState(40);
  const [value, setValue] = useState([10, 30]);

  const [minHour, setMinHour] = useState(1);
  const [maxHour, setMaxHour] = useState(200);
  const [valueHour, setValueHour] = useState([40, 120]);

  const [minMinute, setMinMinute] = useState(1);
  const [maxMinute, setMaxMinute] = useState(200);
  const [valueMinute, setValueMinute] = useState([40, 120]);
  const [rate, setRate] = useState(0);

  const onSliderChange = (value) => {
    setValue(value);
  };

  const onSliderChangeMinute = (value) => {
    setValueMinute(value);
  };

  const onSliderChangeHour = (value) => {
    setValueHour(value);
  };

  const getSpecialities = () => {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    try {
      fetch(`https://cucu-api-dev.n-techlab.xyz/api/specialities`, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setSpecialities(responseJson);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getLanguages = () => {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    try {
      fetch(`https://cucu-api-dev.n-techlab.xyz/api/languages`, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setLanguages(responseJson);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getTranslators = () => {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    try {
      fetch(
        `https://cucu-api-dev.n-techlab.xyz/api/users/translators?page=${page}`,
        {
          method: "GET",
          headers: headers,
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setTranslators(responseJson.users);
          setData(responseJson);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getTranslatorsPage = () => {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    try {
      fetch(
        `https://cucu-api-dev.n-techlab.xyz/api/users/translators?grade=${rate}&min_price_minute=${valueMinute[0]}&max_price_minute=${valueMinute[1]}&min_experience=${value[0]}&max_experience=${value[1]}&min_price_hour=${valueHour[0]}&max_price_hour${valueHour[1]}`,
        {
          method: "GET",
          headers: headers,
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setTranslators(responseJson.users);
          setData(responseJson);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getTranslatorsPage();
  }, [value, valueHour, valueMinute, rate]);

  useEffect(() => {
    getTranslators();
  }, [page]);

  useEffect(() => {
    getTranslators();
    getLanguages();
    getSpecialities();
  }, []);
  const history = useHistory();

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
        <RowRecover className="layout-content">
          <Col className="col-md-12">
            <Title>Traductores</Title>
            <PasswordRecover>
              <Row className="margin-5">
                <Col className="col-md-3">
                  <div className="card">
                    <div className="card-header titleFilter">Filtrar por</div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div className="label-filter">Calificación</div>
                        <Rating
                          emptySymbol="fa fa-star-o fa-2x fa-start"
                          fullSymbol="fa fa-star fa-2x fa-start"
                          className="startcontainer"
                          onChange={(rate: any) => setRate(rate)}
                          initialRating={rate}
                        />
                      </li>
                      <li className="list-group-item">
                        <div className="label-filter">Experiencia</div>
                        <div className="slidecontainer">
                          <Range
                            defaultValue={value}
                            min={min}
                            max={max}
                            onChange={onSliderChange}
                          />
                        </div>
                        <LabelFilter>
                          <Col>
                            <TextFilter>{value[0]} años</TextFilter>
                          </Col>
                          <ColFilter>
                            <TextFilter>{value[1]} años</TextFilter>
                          </ColFilter>
                        </LabelFilter>
                      </li>
                      <li className="list-group-item">
                        <Form.Group controlId="dob">
                          <Form.Label className="label-filter">
                            Disponible
                          </Form.Label>
                          <DatePicker
                            selected={startDate}
                            onChange={(date: any) => setStartDate(date)}
                            customInput={
                              <ExampleCustomInput></ExampleCustomInput>
                            }
                          />
                        </Form.Group>
                        <LabelFilter>
                          <Col>
                            <DatePicker
                              selected={startTime}
                              onChange={(date: any) => setStartTime(date)}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={30}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                              customInput={
                                <ExampleCustomInputTime></ExampleCustomInputTime>
                              }
                            />
                          </Col>
                          <Col className="rpw">
                            <span>Hasta</span>
                          </Col>
                          <ColFilter>
                            <DatePicker
                              selected={endTime}
                              onChange={(date: any) => setEndTime(date)}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={30}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                              customInput={
                                <ExampleCustomInputTimeTwo></ExampleCustomInputTimeTwo>
                              }
                            />
                          </ColFilter>
                        </LabelFilter>
                      </li>
                      <li className="list-group-item">
                        <div className="label-filter">Precio por hora</div>
                        <br></br>
                        <TextFilter
                          onClick={() => {
                            setValueHour([1, 25]);
                          }}
                        >
                          Hasta $25
                        </TextFilter>
                        <TextFilter
                          onClick={() => {
                            setValueHour([25, 50]);
                          }}
                        >
                          $25 - $50
                        </TextFilter>
                        <TextFilter
                          onClick={() => {
                            setValueHour([50, 100]);
                          }}
                        >
                          $50 - $100
                        </TextFilter>
                        <div className="slidecontainer">
                          <Range
                            value={valueHour}
                            min={minHour}
                            max={maxHour}
                            onChange={onSliderChangeHour}
                          />
                        </div>
                        <LabelFilter>
                          <Col>
                            <TextFilter>${valueHour[0]}</TextFilter>
                          </Col>
                          <ColFilter>
                            <TextFilter>${valueHour[1]}</TextFilter>
                          </ColFilter>
                        </LabelFilter>
                      </li>
                      <li className="list-group-item">
                        <div className="label-filter">Precio por minuto</div>
                        <br></br>
                        <TextFilter
                          onClick={() => {
                            setValueMinute([1, 25]);
                          }}
                        >
                          Hasta $25
                        </TextFilter>
                        <TextFilter
                          onClick={() => {
                            setValueMinute([25, 50]);
                          }}
                        >
                          $25 - $50
                        </TextFilter>
                        <TextFilter
                          onClick={() => {
                            setValueMinute([50, 100]);
                          }}
                        >
                          $50 - $100
                        </TextFilter>
                        <div className="slidecontainer">
                          <Range
                            value={valueMinute}
                            min={minMinute}
                            max={maxMinute}
                            onChange={onSliderChangeMinute}
                          />
                        </div>
                        <LabelFilter>
                          <Col>
                            <TextFilter>${valueMinute[0]}</TextFilter>
                          </Col>
                          <ColFilter>
                            <TextFilter>${valueMinute[1]}</TextFilter>
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
                              {specialities.map((elm: any) => (
                                <option>{elm.name}</option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col>
                          <div className="filter-languaje">
                            <span>Idiomas</span>
                            <select className="selec">
                              {languages.map((elm: any) => (
                                <option>{elm.name}</option>
                              ))}
                            </select>
                            <img
                              className="img-filer"
                              src="/assets/images/load.png"
                            ></img>
                            <select className="selec">
                              {languages.map((elm: any) => (
                                <option>{elm.name}</option>
                              ))}
                            </select>
                          </div>
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
                          {translators.map((ele: any) => (
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
                                      {ele.firstname} {ele.lastname}
                                      <div>
                                        <span className="fa fa-star-o active"></span>
                                        <span className="fa fa-star-o active"></span>
                                        <span className="fa fa-star-o active"></span>
                                        <span className="fa fa-star-o active"></span>
                                        <span className="fa fa-star-o active"></span>
                                      </div>
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p>Especialista en</p>
                                {ele.specialities.map((sp: any) => (
                                  <span className="badge badge-light">
                                    {sp.name}
                                  </span>
                                ))}
                              </td>
                              <td>
                                <p>Idioma</p>
                                {ele.languages.map((lng: any) => (
                                  <>
                                    <span className="badge badge-light">
                                      {lng.to.name}
                                    </span>
                                    <span className="badge badge-light">
                                      {lng.from.name}
                                    </span>
                                  </>
                                ))}
                              </td>
                              <td>
                                <ResendLink to={`profile-translator/${ele.id}`}>
                                  Ver perfil
                                </ResendLink>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="paginador">
                      {page > 1 && (
                        <button
                          className="atras"
                          onClick={() => {
                            setPage(data.page - 1);
                          }}
                        >
                          Atrás
                        </button>
                      )}
                      Pagina {data.page} de {data.pages}
                      <button
                        className="siguiente"
                        onClick={() => {
                          setPage(data.page + 1);
                        }}
                      >
                        Siguiente
                      </button>
                    </p>
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
