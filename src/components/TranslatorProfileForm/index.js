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
        country: "",
        city: "",
        nationality: "",
        address_1: "",
        address_2: "",
        address_additional: ""
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
        CitiesAPI.getCities({country_id: country}).then((res) => {
            console.log(res)
            if (res) {
                const items = res.results.map((item) =>
                    <option key={item.id} value={item.id}>{item.name}</option>
                );
                setCities(items)
            }
        })
    }

    const handleCountryChange = (e) => {
        let current;
        countries.forEach(element => {
            if (element.props.value == e.target.value) {
                current = element
                getCities(current.key)
            }
        });
    }

    const saveChanges = (values) => {
        console.log(values)
        setButtonState({ ...buttonState, ...{ label: "Guardando", disabled: false } })
        UsersAPI.updateUser(values, localStorage.getItem("token") ).then((res) => {
            let message = 'Cambios guardados exitosamente.'
            setButtonState({ label: "Enviar", disabled: false })
            setResponse(
                <Alert variant={'success'} >
                    {message}
                </Alert>
            )
            formik.resetForm()
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
        UsersAPI.disableUser(localStorage.getItem("token") ).then((res) => {
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
            .required("*Este campo es obligatorio"),
        email: Yup.string()
            .email("*Debe ser un correo válido")
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        phone: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        password: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres"),
            //.required("*Este campo es obligatorio"),
        description: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        country: Yup.string()
            .min(1, "*Debes elegir un campo")
            .required("*Este campo es obligatorio"),
        city: Yup.string()
            .min(1, "*Debes elegir un campo")
            .required("*Este campo es obligatorio"),
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
            //.required("*Este campo es obligatorio"),

    });

    const formik = useFormik({
        initialValues: {
            firstname: entity.firstname ? entity.firstname : "",
            lastname: entity.lastname ? entity.lastname : "",
            document: entity.document ? entity.document : "",
            email: entity.email ? entity.email : "",
            phone   : entity.phone  ? entity.phone   : "",
            password: entity.password ? entity.password : "",
            description: entity.description ? entity.description : "",
            country: entity.country ? entity.country : "",
            city: entity.city ? entity.city : "",
            nationality: entity.nationality ? entity.nationality : "",
            address_1: entity.address_1 ? entity.address_1 : "",
            address_2: entity.address_2 ? entity.address_2 : "",
            address_additional: entity.address_additional ? entity.address_additional : ""
        },
        onSubmit: values => {
            saveChanges({ ...values })
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        enableReinitialize: true
    });




    return (
        <div>

            <Title>Mi cuenta</Title>

            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Label>Nombre</Label>
                    <Control
                        id="firstname"
                        type="text"
                        value={formik.values.firstname}
                        onChange={(e) =>{
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
                        value={formik.values.lastname}
                        onChange={(e) =>{
                            formik.setFieldTouched('lastname');
                            formik.handleChange(e)
                        }}
                    />
                </Form.Group>
                {formik.touched.lastname && formik.errors.lastname ? (
                    <div className="alert alert-danger">{formik.errors.lastname}</div>
                ) : null}

                <Form.Group>
                    <Form.Label>Documento</Form.Label>
                    <Form.Control
                        id="document"
                        type="number"
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
                    <Form.Label>Correo electrónico</Form.Label>
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
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        id="phone"
                        type="phone"
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
                                Cambiar
                                </ShowPassword>
                        </InputGroup.Prepend>
                    </InputGroup>
                </Form.Group>

                {formik.touched.password && formik.errors.password ? (
                    <div className="alert alert-danger">{formik.errors.password}</div>
                ) : null}

                <Form.Group className="outline">
                    <Form.Label>Pais</Form.Label>
                    <Form.Control
                        as="select"
                        id="country"
                        name="country"
                        className="form-control input-lg"
                        onChange={e => {
                            formik.setFieldTouched('country');
                            formik.handleChange(e);
                            handleCountryChange(e)
                        }}
                        value={formik.values.country} >
                        <option value="">Seleccionar...</option>
                        {countries}
                    </Form.Control>
                </Form.Group>

                {formik.touched.country && formik.errors.country ? (
                    <div className="alert alert-danger">{formik.errors.country}</div>
                ) : null}

                <Form.Group className="outline">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control
                        as="select"
                        id="city"
                        name="city"
                        className="form-control input-lg"
                        onChange={e => {
                            formik.setFieldTouched('city');
                            formik.handleChange(e);
                        }}
                        value={formik.values.city} >
                        <option value="">Seleccionar...</option>
                        {cities}
                    </Form.Control>
                </Form.Group>

                {formik.touched.city && formik.errors.city ? (
                    <div className="alert alert-danger">{formik.errors.city}</div>
                ) : null}

                <Form.Group>
                    <Label>Nacionalidad</Label>
                    <Control
                        id="nationality"
                        type="text"
                        value={formik.values.nationality}
                        onChange={(e) =>{
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
                        value={formik.values.address_1}
                        onChange={(e) =>{
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
                        value={formik.values.address_2}
                        onChange={(e) =>{
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
                        value={formik.values.address_additional}
                        onChange={(e) =>{
                            formik.setFieldTouched('address_additional');
                            formik.handleChange(e)
                        }}
                    />
                </Form.Group>
                {formik.touched.address_additional && formik.errors.address_additional ? (
                    <div className="alert alert-danger">{formik.errors.address_additional}</div>
                ) : null}

                   
                <Submit
                    disabled={buttonState.disabled}
                    type="button"
                    type="submit"
                >
                    {buttonState.label}
                </Submit>
            
            </Form>

            <Link className="disabled-account" to="#" onClick={()=>setModalShow(true)}>
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
