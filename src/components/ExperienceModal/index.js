
import React, { useState } from "react";

import { Form, Modal, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import { Submit, Label, Control, Cancel } from "./styles"

import { useFormik } from 'formik';
import * as Yup from 'yup';


const baseUri = process.env.REACT_APP_API_URL;

export default function ExperienceModal(props) {
    const history = useHistory();
    const { id } = useParams();
    const [isVisible, setisVisible] = useState(false);
    const [index, setindex] = useState(false);


    //console.log({...props.values})

    const validationSchema = Yup.object().shape({
        company: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        description: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        labor_months: Yup.string()
            .min(1, "*Este campo debe tener al menos 3 caracteres")
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
            props.newExperience(values)
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
                        <Label>Empresa</Label>
                        <Control
                            id="company"
                            type="text"
                            value={formik.values.company}
                            onChange={(e) => {
                                formik.setFieldTouched('company');
                                formik.handleChange(e)
                            }}
                        />
                    </Form.Group>
                    {formik.touched.company && formik.errors.company ? (
                        <div className="alert alert-danger">{formik.errors.company}</div>
                    ) : null}

                    <Form.Group>
                        <Label>Descripción de labor</Label>
                        <Control
                            id="description"
                            type="textarea"
                            as="textarea"
                            rows="5"
                            value={formik.values.description}
                            onChange={(e) => {
                                formik.setFieldTouched('description');
                                formik.handleChange(e)
                            }}
                        />
                    </Form.Group>
                    {formik.touched.description && formik.errors.description ? (
                        <div className="alert alert-danger">{formik.errors.description}</div>
                    ) : null}
                    <Form.Group>
                        <Label>Meses de labor</Label>
                        <Control
                            id="labor_months"
                            type="text"
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
                </Form>


            </Modal.Body>
            <Modal.Footer>
                <Submit onClick={() => formik.submitForm()}>
                    Agregar experiencia
                </Submit>
                <Cancel onClick={props.onHide}>
                    Cancelar
                </Cancel>
            </Modal.Footer>

        </Modal>
    );
}


