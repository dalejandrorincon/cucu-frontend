/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../utils/session";
import {
  Container,
  Row,
  Col,
  Form,
  NavDropdown,
  FormControl,
  Button
} from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { Range } from "rc-slider";
import { FormGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Rating from "react-rating";
import {
  Title,
  WellContainer,
  PasswordRecover,
  RowRecover,
  LabelFilter,
  ColFilter,
  ResendLink,
  TextFilter,
  TextFilterBox,
  TextFilterBoxEnd
} from "./styles"
import './styles.scss';

import Header from "../../components/Header"

import * as UsersAPI from '../../api/users';
import * as SpecialitiesAPI from '../../api/specialities';
import * as LanguagesAPI from '../../api/languages';
import moment from 'moment';

import { combineDateWithTime } from "../../utils/constants"
import ReactPaginate from 'react-paginate';

import { useFormik } from 'formik';

interface Props {
  counter: number;
  reduxIncreaseCounter: () => void;
  reduxDecreaseCounter: () => void;
}

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
  const [pageCount, setPageCount] = useState(1);


  const ExampleCustomInput = (props) => <Form.Control {...props} />;
  const ExampleCustomInputTime = (props) => (
    <TextFilterBox onClick={props.onClick}>{props.value ? props.value : "Desde"}</TextFilterBox>
  );

  const ExampleCustomInputTimeTwo = (props) => (
    <TextFilterBoxEnd onClick={props.onClick} >{props.value ? props.value : "Hasta"}</TextFilterBoxEnd>
  );

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  const [value, setValue] = useState([0, 10]);

  const [minHour, setMinHour] = useState(25);
  const [maxHour, setMaxHour] = useState(100);
  const [valueHour, setValueHour] = useState([25, 100]);

  const [minMinute, setMinMinute] = useState(1);
  const [maxMinute, setMaxMinute] = useState(2.5);
  const [valueMinute, setValueMinute] = useState([1, 2.5]);
  const [rate, setRate] = useState(0);

  /* const [lang, setLang] = useState([]); */


  const onSliderChange = (value) => {
    setValue(value);
  };

  const onSliderChangeMinute = (value) => {
    setValueMinute(value);
  };

  const onSliderChangeHour = (value) => {
    setValueHour(value);
  };

  const getLanguages = () => {
    LanguagesAPI.getLanguages().then((res) => {
      console.log(res)
      setLanguages(res)
    })
  };

  const getSpecialities = () => {
    SpecialitiesAPI.getSpecialities().then((res) => {
      console.log(res)
      setSpecialities(res)
    })
  }

  const getTranslators = (lang = []) => {

    let settings = {
      grade: rate,
      min_price_minute: valueMinute[0],
      max_price_minute: valueMinute[1],
      min_experience: value[0],
      max_experience: value[1],
      min_price_hour: valueHour[0],
      max_price_hour: valueHour[1],
      page: page
    }

    if (startTime && endTime) {
      let startDateTime = combineDateWithTime(startDate, startTime)
      let endDateTime = combineDateWithTime(startDate, endTime)
      settings = { ...settings, ...{ min_available_time: startDateTime, max_available_time: endDateTime } }
    }

    if (formik.values.name) {
      settings = { ...settings, ...{ name: formik.values.name } }
    }

    /* if(lang!=[]){
      settings = { ...settings, ...{languages: JSON.stringify(lang)}}
    } */


    if (formik.values.languageFrom && formik.values.languageTo) {

      settings = {
        ...settings,
        ...{
          languages:
            JSON.stringify(
              [{
                from: formik.values.languageFrom,
                to: formik.values.languageTo
              }]
            )
        }
      }
    }

    if (formik.values.speciality) {
      settings = {
        ...settings,
        ...{ speciality_id: JSON.stringify([parseInt(formik.values.speciality)]) }
      }
    }


    UsersAPI.getTranslators(settings, localStorage.getItem("token")).then((res) => {
      setTranslators(res.users);
      setData(res);
			setPageCount(res.pages)
    }).catch((err) => {
      console.log(err)
    })
  };


  useEffect(() => {
    getLanguages();
    getSpecialities();
  }, []);

  const formik = useFormik({
    initialValues: {
      languageFrom: "",
      languageTo: "",
      speciality: "",
      name: ""

    },
    onSubmit: values => {
      console.log("values")
    },
    //validationSchema: validationSchema,
    validateOnBlur: true,
    enableReinitialize: true

  });


  useEffect(() => {
    getTranslators();
  }, [
    formik.values.languageFrom,
    formik.values.languageTo,
    formik.values.speciality,
    formik.values.name,
    startTime,
    endTime,
    rate,
    page
  ]);

  const switchLanguages = () => {
    let languages = [formik.values.languageFrom, formik.values.languageTo]
    console.log(languages)
    formik.setFieldValue("languageFrom", languages[1])
    formik.setFieldValue("languageTo", languages[0])
  }

  const handlePageClick = data => {
		console.log(data)
    let selected = data.selected;
    setPage(selected + 1)
	};


  /* useEffect(() => {
    getTranslators();
  }, [rate]); */

  const history = useHistory();

  return (
    <>
      <Header></Header>
      <Container className="themed-container translators-container">
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
                          onClick={(rating: any) => rate == rating ? setRate(0) : setRate(rating)}
                          initialRating={rate}
                        />
                      </li>
                      <li className="list-group-item">
                        <div className="label-filter">Experiencia</div>
                        <div className="slidecontainer">
                          <Range
                            value={value}
                            min={min}
                            max={max}
                            onChange={onSliderChange}
                            onAfterChange={() => getTranslators()}
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
                        <Form.Group>
                          <Form.Label className="label-filter">
                            Disponible
                          </Form.Label>
                          <DatePicker
                            selected={startDate}
                            onChange={(date: any) => setStartDate(date)}
                            customInput={
                              <ExampleCustomInput></ExampleCustomInput>
                            }
                            dateFormat="dd/MM/yyyy"
                          />
                        </Form.Group>
                        <LabelFilter className="home-date">
                          
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
                            <div className="separator">
                              <i className="fa fa-clock-o" aria-hidden="true"></i>
                            </div>

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
                        </LabelFilter>
                      </li>
                      <li className="list-group-item">
                        <div className="label-filter">Precio por hora</div>
                        <br></br>
                        {/* <TextFilter
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
                        </TextFilter> */}
                        <div className="slidecontainer">
                          <Range
                            value={valueHour}
                            min={minHour}
                            max={maxHour}
                            onChange={onSliderChangeHour}
                            onAfterChange={() => getTranslators()}
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
                        {/* <TextFilter
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
                        </TextFilter> */}
                        <div className="slidecontainer">
                          <Range
                            value={valueMinute}
                            min={minMinute}
                            max={maxMinute}
                            step={0.5}
                            onChange={onSliderChangeMinute}
                            onAfterChange={() => getTranslators()}
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
                          <Form.Group>
                            <Form.Control
                              as="select"
                              id="speciality"
                              name="speciality"
                              className="form-control input-lg"
                              onChange={e => {
                                formik.handleChange(e);
                              }}
                              value={formik.values.speciality}>
                              <option value="">Todas las especialidades</option>
                              {specialities?.map((elm: any) => (
                                <option key={elm.id} value={elm.id} >{elm.name}</option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col>
                          <div className="filter-language">
                            <div>
                              <Form.Control
                                as="select"
                                id="languageFrom"
                                name="languageFrom"
                                className="form-control input-lg"
                                onChange={e => {
                                  formik.handleChange(e);
                                }}
                                value={formik.values.languageFrom} >
                                <option value="">Seleccionar...</option>
                                {languages?.map((elm: any) => (
                                  <option key={elm.id} value={elm.id} >{elm.name}</option>
                                ))}
                              </Form.Control>
                              <Button className="switch" onClick={() => switchLanguages()}>
                                <img
                                  className="img-filer"
                                  src="/assets/images/load.png"
                                ></img>
                              </Button>
                              <Form.Control
                                as="select"
                                id="languageTo"
                                name="languageTo"
                                className="form-control input-lg"
                                onChange={e => {
                                  formik.handleChange(e);
                                }}
                                value={formik.values.languageTo} >
                                <option value="0">Seleccionar...</option>
                                {languages?.map((elm: any) => (
                                  <option key={elm.id} value={elm.id}>{elm.name}</option>
                                ))}
                              </Form.Control>
                            </div>
                          </div>
                        </Col>
                        <Col>
                          <FormControl
                            placeholder="Buscar por nombre"
                            id="name"
                            type="text"
                            value={formik.values.name}
                            onChange={(e) => {
                              formik.handleChange(e)
                            }}
                          />
                        </Col>
                      </Row>
                    </Container>
                    <div className="table-responsive">
                      <table className="table ">
                        <tbody>
                          {translators?.map((ele: any) => (
                            <tr>
                              <td>
                                <div className="userIconTra">
                                  <div>
                                    <img
                                      src={ele?.image_url ? ele.image_url : "/assets/images/no_avatar_default.png"}
                                      className="image-icon ico-user"
                                    />
                                  </div>
                                  <div className="star-container">
                                    <p className="name">
                                      {ele.firstname} {ele.lastname}

                                      <Rating
                                          emptySymbol="fa fa-star-o fa-2x fa-start"
                                          fullSymbol="fa fa-star fa-2x fa-start"
                                          className="startcontainer"
                                          readonly={true}
                                          initialRating={Math.floor(ele.rating)}
                                      />
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p>Especialista en</p>
                                {ele.specialities?.map((sp: any) => (
                                  <span className="badge badge-light">
                                    {sp.name}
                                  </span>
                                ))}
                              </td>
                              <td>
                                <p>Idioma</p>
                                {ele.languages?.map((lng: any) => (
                                  <>
                                    <span className="badge badge-light">
                                      De {lng.from.name} a {lng.to.name}
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
                    <div className="pagination-container">
                      <ReactPaginate
                        previousLabel={'Anterior'}
                        nextLabel={'Siguiente'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                      />
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