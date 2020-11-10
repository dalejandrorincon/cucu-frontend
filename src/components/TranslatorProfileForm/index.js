import React, { useState, useEffect } from 'react'
import { Form, InputGroup, Alert } from "react-bootstrap";

import { Link, useHistory, useParams } from "react-router-dom";
import {
    Label,
    Submit,
    ControlPassword,
    ShowPassword,
    Control,
    Title
} from "./styles"

import * as CountriesAPI from '../../api/countries';

import NumberFormat from 'react-number-format';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import * as UsersAPI from '../../api/users';
import * as CitiesAPI from '../../api/cities';
import ConfirmationModal from '../ConfirmationModal';
import messages from "../../utils/messages"
//const messages = require('../../utils/messages')


export default function TranslatorProfileForm() {

    const [entity, setEntity] = useState({
        firstname: "",
        lastname: "",
        document: "",
        email: "",
        number: "",
        password: "",
        description: "",
        country_id: "",
        city_id: "",
        nationality: "",
        address_1: "",
        address_2: "",
        address_additional: "",
        labor_months: "",
        rate_hour: "",
        rate_minute: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [buttonState, setButtonState] = useState({ label: "Guardar cambios", disabled: false })
    const [countries, setCountries] = useState(null)
    const [cities, setCities] = useState(null)
    const [response, setResponse] = useState(null)

    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        getProfile();
        getCountries();
    }, []);


    const getProfile = () => {
        UsersAPI.getUser({}, localStorage.getItem("userId")).then((res) => {
            console.log(res.user)
            setEntity(res.user)
        })
        console.log(messages)
    };

    const getCountries = () => {
        CountriesAPI.getCountries().then((res) => {
            console.log(res)
            if (res) {
                const items = res.map((item) =>
                    <option key={item.id} value={item.id}>{item.name}</option>
                );
                setCountries(items)
            }
        })
    }

    const getCities = (country) => {
        console.log(country)
        CitiesAPI.getCities({ country_id: country }).then((res) => {
            console.log(res)
            if (res) {
                const items = res?.map((item) =>
                    <option key={item.id} value={item.id}>{item.name}</option>
                );
                setCities(items)
                console.log(entity.city_id)
                if(country == entity.country_id){
                    formik.setFieldValue("city_id", entity.city_id)
                }else{
                    formik.setFieldValue("city_id", "")
                }
            }
        })
    }


    const saveChanges = (values) => {
        console.log(values)
        setButtonState({ ...buttonState, ...{ label: "Guardando", disabled: false } })
        UsersAPI.updateUser(values, localStorage.getItem("token")).then((res) => {
            let message = 'Cambios guardados exitosamente.'
            setButtonState({ label: "Enviar", disabled: false })
            setResponse(
                <Alert variant={'success'} >
                    {message}
                </Alert>
            )
        }).catch((err) => {
            console.log(err)
            let message;
            message = 'Ha ocurrido un error al guardar los cambios.'

            setResponse(
                <Alert variant={'danger'} >
                    {message}
                </Alert>
            )
        })
    }

    const disableAccount = () => {
        UsersAPI.disableUser(localStorage.getItem("token")).then((res) => {
            let message = 'Cambios cuenta deshabilitada exitosamente.'
            setResponse(
                <Alert variant={'success'} >
                    {message}
                </Alert>
            )
            setModalShow(false)
        }).catch((err) => {
            console.log(err)
            let message;
            message = 'Ha ocurrido un error al guardar los cambios.'
            setResponse(
                <Alert variant={'danger'} >
                    {message}
                </Alert>
            )
            setModalShow(false)
        })
    }

    const validationSchema = Yup.object().shape({

        firstname: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        lastname: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        document: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .max(15, "*Este campo debe tener como máximo 15 caracteres")
            .required("*Este campo es obligatorio"),
        email: Yup.string()
            .email("*Debe ser un correo válido")
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        phone: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio")
            .matches(/^[\+\d]?(?:[\d-.\s()]*)$/, "El teléfono debe contener solo números o el signo +"),
        password: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres"),
        //.required("*Este campo es obligatorio"),
        /* description: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"), */
        country_id: Yup.string()
            .min(1, "*Debes elegir un campo")
            .required("*Este campo es obligatorio"),
        city_id: Yup.string()
            .min(1, "*Debes elegir un campo")
            .required("*Este campo es obligatorio")
            .nullable(),
        nationality: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        address_1: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        address_2: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres"),
        //.required("*Este campo es obligatorio"),
        address_additional: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres"),
        labor_months: Yup.string()
            .required("*Este campo es obligatorio")
            .min(1, "*Este campo debe tener al menos 3 caracteres")
            .max(5, "*Este campo debe tener como máximo 5 caracteres"),
        rate_hour: Yup.number()
            .required("*Este campo es obligatorio")
            .min(25, "*El valor mínimo de este campo es $25")
            .max(100, "El valor máximo de este campo es $100"),
        rate_minute: Yup.number()
            .required("*Este campo es obligatorio")
            .min(1, "*El valor mínimo de este campo es $1")
            .max(2.5, "El valor máximo de este campo es $2.5"),

        //.required("*Este campo es obligatorio"),

    });

    const formik = useFormik({
        initialValues: {
            firstname: entity.firstname ? entity.firstname : "",
            lastname: entity.lastname ? entity.lastname : "",
            document: entity.document ? entity.document : "",
            email: entity.email ? entity.email : "",
            phone: entity.phone ? entity.phone : "",
            password: entity.password ? entity.password : "",
            description: entity.description ? entity.description : "",
            country_id: entity.country_id ? entity.country_id : "",
            city_id: entity.city_id ? entity.city_id : "",
            nationality: entity.nationality ? entity.nationality : "",
            address_1: entity.address_1 ? entity.address_1 : "",
            address_2: entity.address_2 ? entity.address_2 : "",
            address_additional: entity.address_additional ? entity.address_additional : "",
            labor_months: entity.labor_months ? entity.labor_months : "",
            rate_hour: entity.rate_hour ? entity.rate_hour : "",
            rate_minute: entity.rate_minute ? entity.rate_minute : ""

        },
        onSubmit: values => {
            saveChanges({ ...values })
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        enableReinitialize: true
    });


    useEffect(() => {
        getCities(formik.values.country_id)
    }, [formik.values.country_id]);




    return (
        <div>

            <Title>Mi cuenta</Title>

            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Label>Nombre</Label>
                    <Control
                        id="firstname"
                        type="text"
                        maxlength="100"
                        value={formik.values.firstname}
                        onChange={(e) => {
                            formik.setFieldTouched('firstname');
                            formik.handleChange(e)
                        }}
                    />
                </Form.Group>
                {formik.touched.firstname && formik.errors.firstname ? (
                    <div className="alert alert-danger">{formik.errors.firstname}</div>
                ) : null}

                <Form.Group>
                    <Label>Apellido</Label>
                    <Control
                        id="lastname"
                        type="text"
                        maxlength="100"
                        value={formik.values.lastname}
                        onChange={(e) => {
                            formik.setFieldTouched('lastname');
                            formik.handleChange(e)
                        }}
                    />
                </Form.Group>
                {formik.touched.lastname && formik.errors.lastname ? (
                    <div className="alert alert-danger">{formik.errors.lastname}</div>
                ) : null}

                <Form.Group>
                    <Label>Documento</Label>
                    <Form.Control
                        id="document"
                        type="number"
                        maxlength="100"
                        className="form-control input-lg"
                        onChange={e => {
                            formik.setFieldTouched('document');
                            formik.handleChange(e);
                        }}
                        value={formik.values.document} />
                </Form.Group>


                {formik.touched.document && formik.errors.document ? (
                    <div className="alert alert-danger">{formik.errors.document}</div>
                ) : null}

                <Form.Group>
                    <Label>Correo electrónico</Label>
                    <Form.Control
                        disabled
                        id="email"
                        type="text"
                        className="form-control input-lg"
                        onChange={e => {
                            formik.setFieldTouched('email');
                            formik.handleChange(e);
                        }}
                        value={formik.values.email} />
                </Form.Group>
                {formik.touched.email && formik.errors.email ? (
                    <div className="alert alert-danger">{formik.errors.email}</div>
                ) : null}

                <Form.Group>
                    <Label>Teléfono</Label>
                    <Form.Control
                        id="phone"
                        type="phone"
                        maxlength="17"
                        className="form-control input-lg"
                        onChange={e => {
                            formik.setFieldTouched('phone');
                            formik.handleChange(e);
                        }}
                        value={formik.values.phone} />
                </Form.Group>


                {formik.touched.phone && formik.errors.phone ? (
                    <div className="alert alert-danger">{formik.errors.phone}</div>
                ) : null}

                <Form.Group>
                    <Label>Contraseña</Label>
                    <InputGroup>
                        <ControlPassword
                            type={showPassword ? "text" : "password"}
                            onChange={(e) =>
                                formik.setFieldTouched('password')
                            }
                        />
                        <InputGroup.Prepend>
                            <ShowPassword
                                onClick={() => {
                                    setShowPassword(!showPassword)
                                }}
                            >
                                Mostrar
                                </ShowPassword>
                        </InputGroup.Prepend>
                    </InputGroup>
                </Form.Group>

                {formik.touched.password && formik.errors.password ? (
                    <div className="alert alert-danger">{formik.errors.password}</div>
                ) : null}

                <Form.Group className="outline">
                    <Label>Pais de residencia</Label>
                    <Form.Control
                        as="select"
                        id="country_id"
                        name="country_id"
                        className="form-control input-lg"
                        onChange={e => {
                            formik.setFieldTouched('country_id');
                            formik.handleChange(e);
                        }}
                        value={formik.values.country_id} >
                        <option value="">Seleccionar...</option>
                        {countries}
                    </Form.Control>
                </Form.Group>

                {formik.touched.country_id && formik.errors.country_id ? (
                    <div className="alert alert-danger">{formik.errors.country_id}</div>
                ) : null}

                <Form.Group className="outline">
                    <Label>Ciudad de residencia</Label>
                    <Form.Control
                        as="select"
                        id="city_id"
                        name="city_id"
                        className="form-control input-lg"
                        onChange={e => {
                            formik.setFieldTouched('city_id');
                            formik.handleChange(e);
                        }}
                        value={formik.values.city_id} >
                        <option value="">Seleccionar...</option>
                        {cities}
                    </Form.Control>
                </Form.Group>

                {formik.touched.city_id && formik.errors.city_id ? (
                    <div className="alert alert-danger">{formik.errors.city_id}</div>
                ) : null}

                <Form.Group>
                    <Label>Nacionalidad</Label>
                    <Control
                        id="nationality"
                        type="text"
                        maxlength="100"
                        value={formik.values.nationality}
                        onChange={(e) => {
                            formik.setFieldTouched('nationality');
                            formik.handleChange(e)
                        }}
                    />
                </Form.Group>
                {formik.touched.nationality && formik.errors.nationality ? (
                    <div className="alert alert-danger">{formik.errors.nationality}</div>
                ) : null}

                <Form.Group>
                    <Label>Dirección linea 1</Label>
                    <Control
                        id="address_1"
                        type="text"
                        maxlength="80"
                        value={formik.values.address_1}
                        onChange={(e) => {
                            formik.setFieldTouched('address_1');
                            formik.handleChange(e)
                        }}
                    />
                </Form.Group>
                {formik.touched.address_1 && formik.errors.address_1 ? (
                    <div className="alert alert-danger">{formik.errors.address_1}</div>
                ) : null}

                <Form.Group>
                    <Label>Dirección linea 2 (opcional)</Label>
                    <Control
                        id="address_2"
                        type="text"
                        maxlength="80"
                        value={formik.values.address_2}
                        onChange={(e) => {
                            formik.setFieldTouched('address_2');
                            formik.handleChange(e)
                        }}
                    />
                </Form.Group>
                {formik.touched.address_2 && formik.errors.address_2 ? (
                    <div className="alert alert-danger">{formik.errors.address_2}</div>
                ) : null}

                <Form.Group>
                    <Label>Apto/Oficina/Local (opcional)</Label>
                    <Control
                        id="address_additional"
                        type="text"
                        maxlength="5"
                        value={formik.values.address_additional}
                        onChange={(e) => {
                            formik.setFieldTouched('address_additional');
                            formik.handleChange(e)
                        }}
                    />
                </Form.Group>
                {formik.touched.address_additional && formik.errors.address_additional ? (
                    <div className="alert alert-danger">{formik.errors.address_additional}</div>
                ) : null}

                <Form.Group>
                    <Label>Meses de experiencia</Label>
                    <Control
                        id="labor_months"
                        type="number"
                        value={formik.values.labor_months}
                        onChange={(e) => {
                            formik.setFieldTouched('labor_months');
                            formik.handleChange(e)
                        }}
                    />
                </Form.Group>
                {formik.touched.labor_months && formik.errors.labor_months ? (
                    <div className="alert alert-danger">{formik.errors.labor_months}</div>
                ) : null}

                <Form.Group>
                    <Label>Valor hora</Label>
                    <NumberFormat
                        id="rate_hour"
                        className="form-control"
                        value={formik.values.rate_hour}
                        onValueChange={e => {
                            formik.setFieldValue("rate_hour", e.value)
                        }}
                        thousandSeparator={true} prefix={'$'}
                    />
                </Form.Group>
                {formik.touched.rate_hour && formik.errors.rate_hour ? (
                    <div className="alert alert-danger">{formik.errors.rate_hour}</div>
                ) : null}

                <Form.Group>
                    <Label>Valor minuto</Label>
                    <NumberFormat
                        id="rate_minute"
                        className="form-control"
                        value={formik.values.rate_minute}
                        onValueChange={e => {
                            formik.setFieldValue("rate_minute", e.value)
                        }}
                        thousandSeparator={true} prefix={'$'}
                    />
                </Form.Group>
                {formik.touched.rate_minute && formik.errors.rate_minute ? (
                    <div className="alert alert-danger">{formik.errors.rate_minute}</div>
                ) : null}




                <Submit
                    disabled={buttonState.disabled}
                    type="button"
                    type="submit"
                >
                    {buttonState.label}
                </Submit>

            </Form>

            <Link className="disabled-account" to="#" onClick={() => setModalShow(true)}>
                Desactivar cuenta
            </Link>

            <ConfirmationModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                setConfirm={() => disableAccount()}
                title={messages.data.modals.confirmDisable.title}
                body={messages.data.modals.confirmDisable.body}
                confirm={messages.data.modals.confirmDisable.confirm}
                cancel={messages.data.modals.confirmDisable.cancel}
            ></ConfirmationModal>

            {response}

        </div>
    )
}
