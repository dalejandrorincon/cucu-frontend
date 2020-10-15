import React, { useState } from 'react'
import * as Yup from 'yup';
import {Modal, Button, Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";

import { combineDateWithTime } from "../../utils/constants"
import { useFormik } from 'formik';
import * as UnavailabilitiesAPI from '../../api/unavailabilities';

import { Form } from "react-bootstrap";

export default function AvailabilitiesModal(props) {

  const [confirmDisable, setConfirmDisable] = useState(false)


    const validationSchema = Yup.object().shape({
        date: Yup.string()
          .min(1, "*Debes elegir una opcion")
          .required("*Este campo es obligatorio"),
        time_start: Yup.string()
          .min(1, "*Debes elegir una opcion")
          .required("*Este campo es obligatorio"),
        time_end: Yup.string()
          .min(1, "*Debes elegir una opcion")
          .required("*Este campo es obligatorio"),
      });


    const formik = useFormik({
        initialValues: {
            date: props.unavailability?.from,
            time_start: props.unavailability?.from,
            time_end: props.unavailability?.to
        },
        onSubmit: values => {
            setConfirmDisable(true)
            let userId = localStorage.getItem("userId")
            let startDateTime = combineDateWithTime(formik.values.date, formik.values.time_start)
            let endDateTime = combineDateWithTime(formik.values.date, formik.values.time_end)

            switch (props.type) {
                case "create":
                    createUnavailability({from: startDateTime, to: endDateTime, translator_id: userId})
                    break;
                case "edit":
                    editUnavailability({from: startDateTime, to: endDateTime, translator_id: userId})
            }
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        enableReinitialize: true
    });

    const createUnavailability = (values) => {
        UnavailabilitiesAPI.createUnavailability(values, localStorage.getItem("token")).then((res) => {
			setConfirmDisable(false)
			props.onHide()
			props.success("creada")
			formik.resetForm()
		})
    }

    const editUnavailability = (values) => {
        UnavailabilitiesAPI.updateUnavailability(values, localStorage.getItem("token"), props.unavailability?.id).then((res) => {
			setConfirmDisable(false)
			props.onHide()
			props.success("editada")
			formik.resetForm()
		})
    }



    return (
        <div>
            <Modal
                {...props}
                className="cancel-modal"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.type == "create" ? <>Crear no disponibilidad</> : <>Editar no disponibilidad</>}

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="form-container">
                        <div className="date-item">
                            <Form.Group>
                                <Row className="margin-row-form">
                                    <Col className="col-md-4">
                                        <DatePicker
                                            className="form-control"
                                            placeholderText="Fecha"
                                            selected={(formik.values.date && new Date(formik.values.date)) || null}
                                            onChange={(e) => {
                                                formik.setFieldTouched('date');
                                                formik.setFieldValue('date', e)
                                            }}
                                            minDate={new Date()}
                                            dateFormat="dd/MM/yyyy"

                                        />
                                    </Col>
                                    <Col className="col-md-3">
                                        <DatePicker
                                            className="form-control"
                                            placeholderText="Hora"
                                            selected={(formik.values.time_start && new Date(formik.values.time_start)) || null}
                                            onChange={(e) => {
                                                formik.setFieldTouched('time_start');
                                                formik.setFieldValue('time_start', e)
                                            }}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={30}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"

                                        />
                                    </Col>
                                    <Col className="col-md-3">
                                        <DatePicker
                                            className="form-control"
                                            placeholderText="Hora"
                                            selected={(formik.values.time_end && new Date(formik.values.time_end)) || null}
                                            onChange={(e) => {
                                                formik.setFieldTouched('time_end');
                                                formik.setFieldValue('time_end', e)
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
                        </div>
                        {(formik.touched.date && formik.errors.date) ||
                        (formik.touched.time_start && formik.errors.time_start) ||
                        (formik.touched.time_end && formik.errors.time_end)
                        ? (
                            <>
                                <div className="alert alert-danger">Debes seleccionar un dia y hora</div>
                            </>
                        ) : null}
                    </Container>

                </Modal.Body>
                <Modal.Footer>
                    <Container className="form-container">
                        <Button
                            className="cucu-button"
                            disabled={confirmDisable}
                            onClick={
                                () => formik.submitForm()
                            }>
                            {props.type == "create" ? <>Crear</> : <>Editar</>}
                        </Button>
                    </Container>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
