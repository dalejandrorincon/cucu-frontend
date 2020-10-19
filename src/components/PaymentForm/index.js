import React, { useState, useEffect } from "react";
import {
	CardElement,
	useStripe,
	useElements
} from "@stripe/react-stripe-js";

import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";

import * as StripeAPI from '../../api/stripe';
import * as ServicesAPI from '../../api/services';

import "./styles.scss"

export default function CheckoutForm(props) {
	const [succeeded, setSucceeded] = useState(false);
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState('');
	const stripe = useStripe();
	const elements = useElements();
	const [available, setAvailable] = useState("0");


	useEffect(() => {
		getIntent()
	}, [props.service]);

	const payService = () => {
		ServicesAPI.payService(localStorage.getItem("token"), props.service?.id).then((res) => {
			setSucceeded(true);
			setProcessing(false);
		}).catch((err)=>{
			setError(true)
			setProcessing(false);
		})
	}

	const getIntent = () => {
		if(props.service){
			StripeAPI.getPaymentIntent(localStorage.getItem("token"), {service_id: props.service?.id}).then((res) => {
				setClientSecret(res.intent?.client_secret)
				setAvailable("1")
			}).catch((err)=>{
				setAvailable("2")
			})
		}
	}

	const cardStyle = {
		style: {
			base: {
				color: "#32325d",
				fontFamily: 'Arial, sans-serif',
				fontSmoothing: "antialiased",
				fontSize: "16px",
				"::placeholder": {
					color: "#32325d"
				}
			},
			invalid: {
				color: "#fa755a",
				iconColor: "#fa755a"
			}
		}
	};
	const handleChange = async (event) => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		setDisabled(event.empty);
		setError(event.error ? event.error.message : "");
	};
	const handleSubmit = async ev => {
		ev.preventDefault();
		setProcessing(true);
		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement)
			}
		});
		if (payload.error) {
			setError(`Payment failed ${payload.error.message}`);
			setProcessing(false);
		} else {
			setError(null);
			payService()
		}
	};
	return (
		<>
			<form className={available=="1" ? '' : 'hidden' } id="payment-form" onSubmit={handleSubmit}>
				<CardElement id="card-element" options={cardStyle} onChange={handleChange} />
				<button
					className="main"
					disabled={processing || disabled || succeeded}
					id="submit"
				>
					<span id="button-text">
						{processing ? (
							<div className="spinner" id="spinner"></div>
						) : (
								"Pagar"
							)}
					</span>
				</button>
				{/* Show any error that happens when processing the payment */}
				{error && (
					<div className="alert alert-danger" role="alert">
						{error}
					</div>
				)}
				{/* Show a success message upon completion */}
				<p className={succeeded ? "result-message" : "result-message hidden"}>
					El pago ha sido exitoso, haz click en el siguiente botón para volver a la lista de solicitudes:

					<Link
						to="/services"
					>
						<Button
							className="cucu-button">
							Volver
						</Button>
					</Link>

				</p>
			</form>
			<div className={available=="2" ? 'alert alert-danger' : 'alert alert-danger hidden' } role="alert">
				No es posible realizar este pago.
			</div>
		</>
	);
}