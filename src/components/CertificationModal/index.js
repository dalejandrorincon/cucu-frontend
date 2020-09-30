
import React, { useState } from "react";

import { Form, Modal, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import { Submit, Label, Control, Cancel } from "./styles"

import { useFormik } from 'formik';
import * as Yup from 'yup';


const baseUri = process.env.REACT_APP_API_URL;

export default function CertificationModal(props) {


    //console.log({...props.values})

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        school: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        date: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        /* url: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio") */
    });


    const formik = useFormik({
        initialValues: {
            ...props.values
        },
        onSubmit: values => {
            props.newCertification(values)
            //saveChanges({ ...values })
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        enableReinitialize: true

    });


    return (

        <Modal
            {...props}
            className="right"
            autoFocus
            keyboard
        >
            <Modal.Header closeButton>
                <Modal.Title>Experiencia laboral</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group>
                        <Label>Nombre</Label>
                        <Control
                            id="name"
                            type="text"
                            value={formik.values.name}
                            onChange={(e) => {
                                formik.setFieldTouched('name');
                                formik.handleChange(e)
                            }}
                        />
                    </Form.Group>
                    {formik.touched.name && formik.errors.name ? (
                        <div className="alert alert-danger">{formik.errors.name}</div>
                    ) : null}

                    <Form.Group>
                        <Label>Instituto</Label>
                        <Control
                            id="school"
                            type="textarea"
                            as="textarea"
                            rows="5"
                            value={formik.values.school}
                            onChange={(e) => {
                                formik.setFieldTouched('school');
                                formik.handleChange(e)
                            }}
                        />
                    </Form.Group>
                    {formik.touched.school && formik.errors.school ? (
                        <div className="alert alert-danger">{formik.errors.school}</div>
                    ) : null}
                    <Form.Group>
                        <Label>Fecha</Label>
                        <Control
                            id="date"
                            type="text"
                            value={formik.values.date}
                            onChange={(e) => {
                                formik.setFieldTouched('date');
                                formik.handleChange(e)
                            }}
                        />
                    </Form.Group>
                    {formik.touched.date && formik.errors.date ? (
                        <div className="alert alert-danger">{formik.errors.date}</div>
                    ) : null}
                </Form>


            </Modal.Body>
            <Modal.Footer>
                <Submit onClick={() => formik.submitForm()}>
                    Solicitar servicio
                </Submit>
                <Cancel onClick={props.onHide}>
                    Cancelar
                </Cancel>
            </Modal.Footer>

        </Modal>
    );
}


