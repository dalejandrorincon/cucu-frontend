import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import * as Yup from 'yup';

import { useFormik } from 'formik';
import * as ServicesAPI from '../../api/services';

import { Form } from "react-bootstrap";

import "./styles.scss"

export default function CancelModal(props) {

	const [response, setResponse] = useState(null)
	const [confirmDisable, setConfirmDisable] = useState(false)

	const validationSchema = Yup.object().shape({
		cancel_reason: Yup.string()
			.min(3, "*Este campo debe tener al menos 3 caracteres")
			.required("*Este campo es obligatorio")
	});

	const formik = useFormik({
		initialValues: {
			cancel_reason: ""
		},
		onSubmit: values => {
			setConfirmDisable(true)
			switch (props.type) {
				case "cancel":
					cancelService(values)
					break;
				case "reject":
					rejectService(values)
			}
		},
		validationSchema: validationSchema,
		validateOnBlur: true,
		enableReinitialize: true
	});



	const cancelService = (values) => {
		ServicesAPI.cancelService(localStorage.getItem("token"), props.service?.id, values).then((res) => {
			setConfirmDisable(false)
			props.onHide()
		})
	}

	const rejectService = (values) => {
		ServicesAPI.rejectService(localStorage.getItem("token"), props.service?.id, values).then((res) => {
			setConfirmDisable(false)
			props.onHide()
		})
	}



	return (
		<Modal
			{...props}
			className="cancel-modal"
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{props.type == "cancel" ? <>Cancelar servicio</> : <>Rechazar servicio</>}

				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container className="form-container">
					{props.type == "cancel" ?
						<>Cancelar servicios puede significarte sanciones. Explícanos el motivo por el cual cancelas este servicio.</>
						: <>Rechazar servicios puede significarte sanciones. Explícanos el motivo por el cual rechazas este servicio.</>
					}
					<Form.Group>
						<Form.Control
							id="cancel_reason"
							type="textarea"
							as="textarea"
							rows="5"
							placeholder="Escribe aquí tus motivos..."
							value={formik.values.cancel_reason}
							onChange={(e) => {
								formik.setFieldTouched('cancel_reason');
								formik.handleChange(e)
							}}
						/>
					</Form.Group>
					{formik.touched.cancel_reason && formik.errors.cancel_reason ? (
						<div className="alert alert-danger">{formik.errors.cancel_reason}</div>
					) : null}
				</Container>

			</Modal.Body>
			<Modal.Footer>
				<Container className="form-container">
					<Button
						variant="danger"
						disabled={confirmDisable}
						onClick={
							() => formik.submitForm()
						}>
						{props.type == "cancel" ? <>Cancelar servicio</> : <>Rechazar servicio</>}
					</Button>
				</Container>
			</Modal.Footer>
		</Modal>
	);
}