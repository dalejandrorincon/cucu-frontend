import React, { useState, useEffect } from 'react'
import { Form, Alert } from "react-bootstrap";

import {
    Label,
    Submit,
    Control,
    Title
} from "./styles"
import "./styles.scss"

import { useFormik } from 'formik';
import * as Yup from 'yup';

import * as BanksAPI from '../../api/banks';
import * as PaymentDataAPI from '../../api/payment_data';


export default function TranslatorProfileForm() {

    const [entity, setEntity] = useState({
        bank_id: "",
        account_type: "",
        account_number: "",
        owner_name: "",
        document_type: "",
        document_number: "",
        payoneer_account: "",
    });

    const [buttonState, setButtonState] = useState({ label: "Guardar cambios", disabled: false })
    const [banks, setBanks] = useState(null)
    const [response, setResponse] = useState(null)

    useEffect(() => {
        getBanks();
        getPaymentData()
    }, []);

    const getPaymentData = () => {
        PaymentDataAPI.getData(localStorage.getItem("token")).then((res) => {
            console.log(res)
            setEntity(res)
        })
    };


    const getBanks = () => {
        BanksAPI.getBanks({}).then((res) => {
            const items = res?.map((item) =>
                <option key={item.id} value={item.id}>{item.name}</option>
            );
            setBanks(items)
        })
    };

    const setSuccess = () => {
        let message = 'Cambios guardados exitosamente.'
        setButtonState({ label: "Enviar", disabled: false })
        setResponse(
            <Alert variant={'success'} >
                {message}
            </Alert>
        )
    }

    const setFail = () => {
        let message;
        message = 'Ha ocurrido un error al guardar los cambios.'

        setResponse(
            <Alert variant={'danger'} >
                {message}
            </Alert>
        )
    }



    const saveChanges = (values) => {
        console.log(values)
        setButtonState({ ...buttonState, ...{ label: "Guardando", disabled: false } })
        if (!entity) {
            PaymentDataAPI.createData({ ...values, user_id: localStorage.getItem("userId") }, localStorage.getItem("token")).then((res) => {
                setSuccess()
            }).catch((err) => {
                console.log(err)
                setFail()
            })

        } else {
            PaymentDataAPI.updateData({ ...values, user_id: localStorage.getItem("userId") }, localStorage.getItem("token")).then((res) => {
                setSuccess()
            }).catch((err) => {
                console.log(err)
                setFail()
            })
        }
    }


    const validationSchema = Yup.object().shape({

        bank_id: Yup.string()
            .min(1, "*Debes elegir un campo"),
            //.required("*Este campo es obligatorio"),
        account_type: Yup.string()
            .min(1, "*Debes elegir un campo"),
            //.required("*Este campo es obligatorio"),
        account_number: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres"),
            //.required("*Este campo es obligatorio"),
        owner_name: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres"),
            //.required("*Este campo es obligatorio"),
        document_type: Yup.string()
            .min(1, "*Debes elegir un campo"),
            //.required("*Este campo es obligatorio"),
        document_number: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres"),
            //.required("*Este campo es obligatorio"),
        payoneer_account: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            //.required("*Este campo es obligatorio"),

    });

    const formik = useFormik({
        initialValues: {
            bank_id: entity?.bank_id ? entity.bank_id : "",
            account_type: entity?.account_type ? entity.account_type : "",
            account_number: entity?.account_number ? entity.account_number : "",
            owner_name: entity?.owner_name ? entity.owner_name : "",
            document_type: entity?.document_type ? entity.document_type : "",
            document_number: entity?.document_number ? entity.document_number : "",
            payoneer_account: entity?.payoneer_account ? entity.payoneer_account : ""
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

            <Alert variant="primary">
                    Si tu cuenta bancaria no se encuentra en <a href="#">esta lista</a>, debes enlazar una cuenta de Payoneer
            </Alert>

            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Label>Banco</Label>
                    <Form.Control
                        as="select"
                        id="bank_id"
                        name="bank_id"
                        className="form-control input-lg"
                        onChange={e => {
                            formik.setFieldTouched('bank_id');
                            formik.handleChange(e);
                        }}
                        value={formik.values.bank_id} >
                        <option value="">Seleccionar...</option>
                        {banks}
                    </Form.Control>
                </Form.Group>
                {formik.touched.bank_id && formik.errors.bank_id ? (
                    <div className="alert alert-danger">{formik.errors.bank_id}</div>
                ) : null}

                <Form.Group>
                    <Label>Tipo de cuenta</Label>
                    <Form.Control
                        as="select"
                        id="account_type"
                        name="account_type"
                        className="form-control input-lg"
                        onChange={e => {
                            formik.setFieldTouched('account_type');
                            formik.handleChange(e);
                        }}
                        value={formik.values.account_type} >
                        <option value="">Seleccionar...</option>
                        <option value="0">Ahorros</option>
                        <option value="1">Corriente</option>

                    </Form.Control>
                </Form.Group>
                {formik.touched.account_type && formik.errors.account_type ? (
                    <div className="alert alert-danger">{formik.errors.account_type}</div>
                ) : null}

                <Form.Group>
                    <Form.Label>Número de cuenta</Form.Label>
                    <Form.Control
                        id="account_number"
                        type="number"
                        className="form-control input-lg"
                        onChange={e => {
                            formik.setFieldTouched('account_number');
                            formik.handleChange(e);
                        }}
                        value={formik.values.account_number} />
                </Form.Group>


                {formik.touched.account_number && formik.errors.account_number ? (
                    <div className="alert alert-danger">{formik.errors.account_number}</div>
                ) : null}

                <Form.Group>
                    <Form.Label>Nombre del titular de la cuenta</Form.Label>
                    <Form.Control
                        id="owner_name"
                        type="text"
                        className="form-control input-lg"
                        onChange={e => {
                            formik.setFieldTouched('owner_name');
                            formik.handleChange(e);
                        }}
                        value={formik.values.owner_name} />
                </Form.Group>
                {formik.touched.owner_name && formik.errors.owner_name ? (
                    <div className="alert alert-danger">{formik.errors.owner_name}</div>
                ) : null}

                <Form.Group>
                    <Form.Label>Documento del titular de la cuenta</Form.Label>

                    <div className="document-form">
                        <Form.Control
                            as="select"
                            id="document_type"
                            name="document_type"
                            className="form-control input-lg"
                            onChange={e => {
                                formik.setFieldTouched('document_type');
                                formik.handleChange(e);
                            }}
                            value={formik.values.document_type} >
                            <option value="">Seleccionar...</option>
                            <option value="0">Cédula de ciudadanía</option>
                            <option value="1">Cédula de extranjería</option>

                        </Form.Control>

                        <Form.Control
                            id="document_number"
                            type="document_number"
                            className="form-control input-lg"
                            onChange={e => {
                                formik.setFieldTouched('document_number');
                                formik.handleChange(e);
                            }}
                            value={formik.values.document_number} />
                    </div>
                </Form.Group>


                {formik.touched.document_type && formik.errors.document_type ? (
                    <div className="alert alert-danger">{formik.errors.document_type}</div>
                ) : null}

                {formik.touched.document_number && formik.errors.document_number ? (
                    <div className="alert alert-danger">{formik.errors.document_number}</div>
                ) : null}


                <hr />

                <Form.Group>
                    <Label>Cuenta de payoneer</Label>
                    <Control
                        id="payoneer_account"
                        type="text"
                        value={formik.values.payoneer_account}
                        onChange={(e) => {
                            formik.setFieldTouched('payoneer_account');
                            formik.handleChange(e)
                        }}
                    />
                </Form.Group>
                {formik.touched.payoneer_account && formik.errors.payoneer_account ? (
                    <div className="alert alert-danger">{formik.errors.payoneer_account}</div>
                ) : null}


                <Submit
                    disabled={buttonState.disabled}
                    type="button"
                    type="submit"
                >
                    {buttonState.label}
                </Submit>

            </Form>

            {response}

        </div>
    )
}
