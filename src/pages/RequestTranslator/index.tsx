/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */

import React, { useState, useEffect, useCallback } from "react";
import { logout } from "../../utils/session";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { Title, PasswordInfo, WellContainer, RowRecover, Label, Submit, Control, OptionActive } from "./styles"
import "./styles.scss"

import { useDropzone } from 'react-dropzone'

import * as ServicesAPI from '../../api/services';
import * as UsersAPI from '../../api/users';
import * as PlatformsAPI from '../../api/platforms';

import { combineDateWithTime } from "../../utils/constants"
import { useFormik } from 'formik';
import { any } from "prop-types";
import Header from "../../components/Header";
import * as Yup from 'yup';


const baseUri = process.env.REACT_APP_API_URL;

function RequestTranslatorPage() {
  const history = useHistory();
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const { register, handleSubmit, errors } = useForm();

  const [translator, setTranslator] = useState<any>({});
  const [platforms, setPlatforms] = useState<any>([]);

  const [myFiles, setMyFiles] = useState<any>([])

  const onDrop = useCallback(acceptedFiles => {
    setMyFiles([...myFiles, ...acceptedFiles])
  }, [myFiles])

  const [buttonState, setButtonState] = useState({ label: "Solicitar servicio", disabled: false })
	const [response, setResponse] = useState<any>(null)


  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDrop })

  const parameters = useParams<any>()
  const translatorId = parameters.id

  const validationSchema = Yup.object().shape({
    duration_amount: Yup.string()
      .min(1, "*Este campo debe tener al menos 3 caracteres")
      .required("*Este campo es obligatorio"),
    url: Yup.string()
      .min(3, "*Este campo debe tener al menos 3 caracteres")
      .required("*Este campo es obligatorio"),
    platform_id: Yup.string()
      .min(1, "*Debes elegir una opcion")
      .required("*Este campo es obligatorio"),
    date_day: Yup.string()
      .min(1, "*Debes elegir una opcion")
      .required("*Este campo es obligatorio"),
    date_time: Yup.string()
      .min(1, "*Debes elegir una opcion")
      .required("*Este campo es obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      service_site: "1",
      service_type: "1",
      time_type: "0",
      url: "",
      platform_id: "",
      date: "",
      duration_amount: "",
      duration_type: "0",
      description: "",
      //record: "",
      date_day: "",
      date_time: "",
      client_id: localStorage.getItem("userId"),
      translator_id: translatorId,
    },
    onSubmit: values => {
      createService(values)
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    enableReinitialize: true

  });



  useEffect(() => {
    getTranslator();
    getPlatforms()
  }, []);

  const getTranslator = () => {
    UsersAPI.getUser({}, translatorId).then((res) => {
      setTranslator(res.user)
    })
  }

  const getPlatforms = () => {
    PlatformsAPI.getPlatforms().then((res) => {
      setPlatforms(res)
    })
  }

  const createService = async (values) => {

		setButtonState({ ...buttonState, ...{ disabled: true, label: "Enviando" } })

    let files_urls = [] as any
    for (let i = 0; i < myFiles.length; i++) {
      const file = myFiles[i];
      const res = await UsersAPI.saveFile(file)
      files_urls.push({
        name: file.name,
        url: res.image.Location
      })
    }

    let date = combineDateWithTime(formik.values.date_day, formik.values.date_time)
    let payload = { ...values, files_urls: JSON.stringify(files_urls), date: date }

    ServicesAPI.createService(localStorage.getItem("token"), payload).then((res) => {
      console.log(res)
      setButtonState({ label: "Solicitar servicio", disabled: false })
      history.push("/services")
    }).catch((err) => {
			let message;
			message = 'Ha ocurrido un error al enviar el correo.'
      setButtonState({ label: "Solicitar servicio", disabled: false })
			setResponse(
				<Alert variant={'danger'} >
					{message}
				</Alert>
			)
		})

  }

  const newFiles = myFiles.map((file, index) => (
    <div key={file.name} className="item">
      <p key={file.path}>
        {file.path} - {file.size} bytes
        </p>
      <Button className="remove" onClick={() => removeFile(file.path, index)} >✕</Button>
    </div>
  ));

  const removeFile = (file, index) => {
    let newFiles = [...myFiles]
    newFiles.splice(index, 1)
    console.log(newFiles)
    setMyFiles(newFiles)
  }


  return (
    <>
      <Header></Header>
      <Container className="themed-container request-translator" fluid={true}>
        <RowRecover>
          <Col className="col-md-5 mx-auto">
            <WellContainer>
              <div className="header-request">
                <img
                  className="icon-request ico-user"
                  src={translator?.image_url ? translator.image_url : "/assets/images/no_avatar_default.png"}
                  alt="logo"
                />
                <Title>
                  Contrata a {translator?.firstname} {translator?.lastname}
                </Title>
              </div>
              <Row>
                <Col>
                  <OptionActive type="button">Programado</OptionActive>
                </Col>
              </Row>
              <Form
                className="form-request"
              //onSubmit={handleSubmit(onSubmit)}
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
                      name="service_site"
                      type="radio"
                      id={`inline-radio-2`}
                      value="1"
                      checked
                    />
                  </div>
                </Form.Group>
                <Form.Group>
                  <Label className="label-filter">URL</Label>
                  <p>
                    Especifica el enlace de la sesión.
                  </p>
                  <Control
                    type="text"
                    className="input-request"
                    id="url"
                    name="url"
                    placeholder="Ingresa un enlace..."
                    value={formik.values.url}
                    onChange={(e) => {
                      formik.handleChange(e)
                    }}
                  />
                </Form.Group>

                {formik.touched.url && formik.errors.url ? (
                  <div className="alert alert-danger">{formik.errors.url}</div>
                ) : null}


                {/* <Form.Group>
                  <Label className="label-filter">Cucutiempo</Label>
                  <p>
                    Indica dónde vas a realizar la sesión. que será traducida.
                  </p>
                  <div key={`inline-radio`} className="mb-3">
                    <Form.Check
                      inline
                      label="Tiempo determinado"
                      name="time_type"
                      type="radio"
                      id={`inline-radio-2`}
                      value="0"
                      checked
                    />
                  </div>
                </Form.Group>
 */}

                <Form.Group>
                  <Label className="label-filter">Plataforma</Label>
                  <PasswordInfo>
                    Selecciona la plataforma en la que vas a tener la sesión.
                    </PasswordInfo>
                  <Form.Control
                    as="select"
                    className="form-select input-request"
                    id="platform_id"
                    name="platform_id"
                    value={formik.values.platform_id}
                    onChange={(e) => {
                      formik.handleChange(e)
                    }}
                  >
                    <option value="">Seleccionar una plataforma...</option>
                    {platforms?.map((elm: any) => (
                      <option key={elm.id} value={elm.id} >{elm.name}</option>
                    ))}
                  </Form.Control>

                  {formik.touched.platform_id && formik.errors.platform_id ? (
                    <div className="alert alert-danger">{formik.errors.platform_id}</div>
                  ) : null}

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
                <Form.Group className="time-radio">
                  <Label className="label-filter">Duración</Label>

                  <div
                    key={`inline-radio`}
                    className="mb-3 margin-top-10"
                  >

                    <div>Duración</div>



                    <label
                      onClick={() => {
                        formik.setFieldValue("duration_type", 0)
                      }}
                    >
                      <Form.Check
                        type="radio"
                        label="Horas"
                        name="duration_type"
                        checked={formik.values.duration_type == "0" ? true : false}
                      />
                    </label>

                    <label
                      onClick={() => {
                        formik.setFieldValue("duration_type", 1)
                      }}
                    >
                      <Form.Check
                        type="radio"
                        label="Minutos"
                        name="duration_type"

                        checked={formik.values.duration_type == "1" ? true : false}
                      />
                    </label>

                    <Control
                      inline
                      type="text"
                      className="input-request"
                      id="duration_amount"
                      name="duration_amount"
                      placeholder="Ingresa un valor..."
                      value={formik.values.duration_amount}
                      onChange={(e) => {
                        formik.handleChange(e)
                      }}
                    />



                  </div>

                </Form.Group>
                {formik.touched.duration_amount && formik.errors.duration_amount ? (
                  <div className="alert alert-danger">{formik.errors.duration_amount}</div>
                ) : null}
                <Form.Group>
                  <Label className="label-filter">Fecha</Label>
                  <Row className="margin-row-form">
                    <Col className="col-md-4">
                      <DatePicker
                        className="form-control"
                        placeholderText="Fecha"
                        selected={(formik.values.date_day && new Date(formik.values.date_day)) || null}
                        onChange={(e) => {
                          formik.setFieldTouched('date_day');
                          formik.setFieldValue('date_day', e)
                          console.log(e)
                        }}
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"

                      />
                    </Col>
                    <Col className="col-md-3">
                      <DatePicker
                        className="form-control"
                        placeholderText="Hora"
                        selected={(formik.values.date_time && new Date(formik.values.date_time)) || null}
                        onChange={(e) => {
                          formik.setFieldTouched('date_time');
                          formik.setFieldValue('date_time', e)
                          console.log(e)
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption="Time"
                        dateFormat="h:mm aa"

                      />
                    </Col>
                  </Row>
                </Form.Group>

                {(formik.touched.date_day && formik.errors.date_day) ||
                  (formik.touched.date_time && formik.errors.date_time) ? (
                    <>
                      <div className="alert alert-danger">Debes seleccionar un dia y hora</div>
                    </>
                  ) : null}


                <Form.Group>
                  <Label className="label-filter">
                    Comentarios adicionales
                    </Label>
                  <Control
                    type="text"
                    placeholder="Si tienes un enlace de contenido a traducir, agrégalo aquí."
                    className="input-request"
                    name="description"
                    id="description"
                    value={formik.values.description}
                    onChange={(e) => {
                      formik.handleChange(e)
                    }}
                  />
                </Form.Group>

                <Form.Group>
                  <div className="dropzone-container">
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <aside>
                      {newFiles}
                    </aside>
                  </div>


                </Form.Group>

                <Submit disabled={buttonState.disabled} onClick={() => formik.submitForm()}>{buttonState.label}</Submit>

                {response}

              </Form>
            </WellContainer>
          </Col>
        </RowRecover>
      </Container>
    </>
  );
}

export default RequestTranslatorPage;
