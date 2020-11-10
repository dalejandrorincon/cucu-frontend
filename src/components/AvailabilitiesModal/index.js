import React, { useState } from 'react'
import * as Yup from 'yup';
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from "moment";

import { combineDateWithTime } from "../../utils/constants"
import { useFormik } from 'formik';
import * as UnavailabilitiesAPI from '../../api/unavailabilities';

import { Form } from "react-bootstrap";

export default function AvailabilitiesModal(props) {

    const [confirmDisable, setConfirmDisable] = useState(false)


    const validationSchema = Yup.object().shape({
        date_start: Yup.string()
            .min(1, "*Debes elegir una opcion")
            .required("*Este campo es obligatorio"),
        date_end: Yup.string()
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
            date_start: props.unavailability?.from,
            date_end: props.unavailability?.to,
            time_start: props.unavailability?.from,
            time_end: props.unavailability?.to
        },
        onSubmit: values => {
            setConfirmDisable(true)
            let userId = localStorage.getItem("userId")
            let startDateTime = combineDateWithTime(formik.values.date_start, formik.values.time_start)
            let endDateTime = combineDateWithTime(formik.values.date_end, formik.values.time_end)

            switch (props.type) {
                case "create":
                    createUnavailability({ from: startDateTime, to: endDateTime, translator_id: userId })
                    break;
                case "edit":
                    editUnavailability({ from: startDateTime, to: endDateTime, translator_id: userId })
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
                className="availabilities-modal right"
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
                            <p>Indica el horario en el que no vas a estar disponible para recibir solicitudes de servicios en la plataforma.</p>
                            <Form.Group>
                                <Row className="margin-row-form">

                                    <Col className="col-md-5">
                                        <DatePicker
                                            className="form-control"
                                            placeholderText="Fecha"
                                            selected={(formik.values.date_start && new Date(formik.values.date_start)) || null}
                                            onChange={(e) => {
                                                formik.setFieldTouched('date_start');
                                                formik.setFieldValue('date_start', e)
                                            }}
                                            minDate={new Date()}
                                            maxDate={formik.values.date_end}
                                            dateFormat="dd/MM/yyyy"

                                        />
                                    </Col>
                                    <Col className="col-md-2">
                                        <span>Hasta</span>
                                    </Col>

                                    <Col className="col-md-5">
                                        <DatePicker
                                            className="form-control"
                                            placeholderText="Fecha"
                                            selected={(formik.values.date_end && new Date(formik.values.date_end)) || null}
                                            onChange={(e) => {
                                                formik.setFieldTouched('date_end');
                                                formik.setFieldValue('date_end', e)
                                            }}
                                            minDate={formik.values.date_start}
                                            dateFormat="dd/MM/yyyy"

                                        />
                                    </Col>                                   

                                </Row>
                                <Row className="margin-row-form">

                                    <Col className="col-md-5">
                                        <DatePicker
                                            className="form-control"
                                            placeholderText="Hora"
                                            selected={(formik.values.time_start && new Date(formik.values.time_start)) || null}
                                            onChange={(e) => {
                                                formik.setFieldTouched('time_start');
                                                formik.setFieldValue('time_start', e)
                                            }}
                                            minTime={ moment().isSame(moment((formik?.values?.date_start)?.toString()), 'date') ? moment().toDate() : moment().startOf("day").toDate()}
                                            maxTime={ moment(formik?.values?.date_end?.toString()).isSame(moment(formik?.values?.date_start?.toString()), 'date') ? moment(formik.values.time_end).subtract(30, 'minutes').toDate() : moment().endOf("day").toDate()}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={30}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"

                                        />
                                    </Col>
                                    
                                    <Col className="col-md-2">
                                        <span>Hasta</span>
                                    </Col>

                                    <Col className="col-md-5">
                                        <DatePicker
                                            className="form-control"
                                            placeholderText="Hora"
                                            selected={(formik.values.time_end && new Date(formik.values.time_end)) || null}
                                            onChange={(e) => {
                                                formik.setFieldTouched('time_end');
                                                formik.setFieldValue('time_end', e)
                                            }}
                                            minTime={ moment(formik?.values?.date_end?.toString()).isSame(moment(formik?.values?.date_start?.toString()), 'date') ? moment(formik.values.time_start).add(30, 'minutes').toDate() : moment().startOf("day").toDate()}
                                            maxTime={ moment().endOf("day").toDate()}
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