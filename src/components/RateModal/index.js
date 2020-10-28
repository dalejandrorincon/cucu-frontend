import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import * as Yup from 'yup';

import { useFormik } from 'formik';
import * as RatingsAPI from '../../api/ratings';
import * as ServicesAPI from '../../api/services';

import { Form } from "react-bootstrap";

import Rating from "react-rating";

import "./styles.scss"

export default function RateModal(props) {

	const [confirmDisable, setConfirmDisable] = useState(false)

	const validationSchema = Yup.object().shape({
		comment: Yup.string()
			.min(3, "*Este campo debe tener al menos 3 caracteres"),
            //.required("*Este campo es obligatorio")
        rating: Yup.number()
            .min(1, "*Debes elegir una calificación")
            .required("*Este campo es obligatorio")
	});

	const formik = useFormik({
		initialValues: {
            comment: "",
            rating: 0
		},
		onSubmit: values => {
            console.log(values)
			setConfirmDisable(true)
			rateService(values)
		},
		validationSchema: validationSchema,
		validateOnBlur: true,
		enableReinitialize: true
	});

	const rateService = (values) => {

        let payload = {
            grade: values.rating,
            translator_id: props.service.translator_id,
            client_id: props.service.client_id,
            service_id: props.service.id,
            approved: "1"
        }

		RatingsAPI.createRating(localStorage.getItem("token"), payload).then((res) => {
            ServicesAPI.rateService(localStorage.getItem("token"), props.service?.id).then((res) => {
                setConfirmDisable(false)
                props.onHide()
                props.rateSuccess()
                formik.resetForm()
            })
		})
	}

	return (
		<Modal
			{...props}
			className="rate-modal"
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Califica el servicio
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container className="form-container">

                    <img
                        src={props.service?.translator?.image_url ? props.service?.translator.image_url : "/assets/images/no_avatar_default.png"}
                        className="image-profile ico-user"
                    />
                    <p className="user-name"><b>{props.service?.translator?.firstname} {props.service?.translator?.lastname}</b></p>			
        
                    <Rating
                        emptySymbol="fa fa-star-o fa-2x fa-start"
                        fullSymbol="fa fa-star fa-2x fa-start"
                        className="startcontainer"
                        onChange={(rate) =>{
                            formik.setFieldValue("rating", rate)
                        }}
                        initialRating={formik.values.rating}
                    />

                    {formik.touched.rating && formik.errors.rating ? (
						<div className="alert alert-danger">{formik.errors.rating}</div>
					) : null}

					<Form.Group>
						<Form.Control
							id="comment"
							type="textarea"
							as="textarea"
							rows="5"
							placeholder="Escribe aquí tus motivos..."
							value={formik.values.comment}
							onChange={(e) => {
								formik.setFieldTouched('comment');
								formik.handleChange(e)
							}}
						/>
					</Form.Group>
					{formik.touched.comment && formik.errors.comment ? (
						<div className="alert alert-danger">{formik.errors.comment}</div>
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
						Calificar servicio
					</Button>
				</Container>
			</Modal.Footer>
		</Modal>
	);
}