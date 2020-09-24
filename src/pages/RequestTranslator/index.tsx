/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { logout } from "../../utils/session";
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
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import {
  Title,
  PasswordInfo,
  WellContainer,
  PasswordRecover,
  RowRecover,
  Label,
  Submit,
  Control,
  OptionActive
} from "./styles"

const baseUri = process.env.REACT_APP_API_URL;

function RequestTranslatorPage() {
  const history = useHistory();
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const { register, handleSubmit, errors } = useForm();

  const ExampleCustomInput = (props) => (
    <Control
      {...props}
      className="input-request"
      name="date"
      ref={register({ required: true })}
    />
  );

  const ExampleCustomInputTime = (props) => (
    <Control
      {...props}
      className="input-request"
      name="hour"
      ref={register({ required: true })}
    />
  );

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

  const onSubmit = (data: any) => {
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
        <Link className="navbar-brand" to="/translators">
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
        <RowRecover>
          <Col className="col-md-5 mx-auto">
            <PasswordRecover>
              <WellContainer>
                <div className="header-request">
                  <img
                    className="icon-request"
                    src="/assets/images/no_avatar_default.png"
                    alt="logo"
                  />
                  <Title>
                    Contrata a {translators?.firstname} {translators?.lastname}
                  </Title>
                </div>
                <Row>
                  <Col>
                    <OptionActive type="button">Programado</OptionActive>
                  </Col>
                </Row>
                <Form
                  className="form-request"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Form.Group>
                    <Label className="label-filter">Lugar de la sesión</Label>
                    <PasswordInfo>
                      Indica dónde vas a realizar la sesión. que será traducida.
                    </PasswordInfo>
                    <div key={`inline-radio`} className="mb-3">
                      <Form.Check
                        inline
                        label="Plataforma externa"
                        type="radio"
                        id={`inline-radio-2`}
                        checked
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Label className="label-filter">URL</Label>
                    <PasswordInfo>
                      Especifica el enlace de la sesión.
                    </PasswordInfo>
                    <Control
                      type="text"
                      className="input-request"
                      name="url"
                      ref={register({ required: true })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Label className="label-filter">Plataforma</Label>
                    <PasswordInfo>
                      Selecciona la plataforma en la que vas a tener la sesión.
                    </PasswordInfo>
                    <Form.Control
                      as="select"
                      className="form-select input-request"
                      name="platform_id"
                      ref={register({ required: true })}
                    >
                      <option></option>
                      <option value="zoom">Zoom</option>
                      <option value="meet">Meet Google</option>
                    </Form.Control>
                    <br></br>
                    <div key={`inline-radio`} className="mb-3">
                      <Form.Check
                        inline
                        label="No tengo los datos de la sesión"
                        type="radio"
                        checked
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Label className="label-filter">Duración</Label>
                    <Row className="margin-row-form">
                      <Col className="col-md-4">
                        <div
                          key={`inline-radio`}
                          className="mb-3 margin-top-10"
                        >
                          <Form.Check
                            inline
                            label="Horas"
                            type="radio"
                            name="time"
                            checked
                          />
                          <Form.Check
                            inline
                            label="Minutos"
                            type="radio"
                            name="time"
                          />
                        </div>
                      </Col>
                      <Col className="col-md-4">
                        <Control
                          inline
                          type="text"
                          className="input-request"
                          name="duration_amount"
                          ref={register({ required: true })}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group>
                    <Label className="label-filter">Fecha</Label>
                    <Row className="margin-row-form">
                      <Col className="col-md-4">
                        <DatePicker
                          selected={startDate}
                          onChange={(date: any) => setStartDate(date)}
                          customInput={
                            <ExampleCustomInput></ExampleCustomInput>
                          }
                        />
                      </Col>
                      <Col className="col-md-3">
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
                    </Row>
                  </Form.Group>
                  <Form.Group>
                    <Label className="label-filter">
                      Comentarios adicionales
                    </Label>
                    <Control
                      type="text"
                      placeholder="Si tienes un enlace de contenido a traducir, agrégalo aquí."
                      className="input-request"
                      name="description"
                      ref={register({ required: true })}
                    />
                  </Form.Group>
                  <Submit type="submit">Solicitar servicio</Submit>
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
