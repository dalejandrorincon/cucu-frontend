import React, { useState, useEffect } from "react";
import * as NotificationsAPI from '../../api/notifications';
import { Modal, Button } from "react-bootstrap";
import "./styles.scss"

import { socket } from "../../utils/constants"
import { logout } from "../../utils/session";
import { Link } from "react-router-dom";

export default function Notifications() {

	const [isVisible, setIsVisible] = useState(false);
	const [empty, setEmpty] = useState(null);
	const [notifications, setNotifications] = useState([]);
	const [pending, setPending] = useState(false);
	const [sessionText, setSessionText] = useState(null);
	const [isSessionClose, setIsSessionClose] = useState(false);


	useEffect(() => {
		getNotifications()
	}, []);

	useEffect(() => {
		watchNotifications()
	}, [notifications]);

	const getNotifications = () => {
		NotificationsAPI.getNotifications(localStorage.getItem("token")).then((res) => {
			setNotifications(res);
			if (res.length == 0) {
				setEmpty(
					<div className="item"><h5>No hay notificaciones disponibles</h5></div>
				)
			}
			res.forEach(item => {
				if(item.read==false){
					setPending(true)
				}
			});
		}).catch((err) => {
			console.log(err.response?.data?.message)
			if(err.response?.data?.message=="TOKEN_EXPIRED"){
				setSessionText("La sesión ha expirado.")
				setIsSessionClose(true)
				removeSession()
			}
			if(err.response?.data?.message=="INACTIVE_SESSION"){
				setSessionText("La sesión ha expirado por inactividad.")
				setIsSessionClose(true)
				removeSession()
			}
		})
	}

	const watchNotifications = () => {
		socket.on("notifications", data => {
			console.log(notifications)
			setNotifications([data, ...notifications])
			setPending(true)
			setEmpty(null)
			console.log([data, ...notifications])
		});
	}

	const closeNotifications = () => {
		setIsVisible(false)
		getNotifications()
	}


	const viewNotifications = () => {
		let view = notifications.map((item)=>{ if(!item.read) return item.id})
		
		setIsVisible(true)
		setPending(false)

		NotificationsAPI.readNotifications(view, localStorage.getItem("token")).then((res) => {

		}).catch((err) => {
			console.log(err)
		})
	}
	
	const removeSession = () => {
		logout()
	}

	const getItem = (notification) => {
		let item;
		switch (notification.type) {

			case "0":
				item =
					<>
						<h5><b>Solicitud Creada</b></h5>
						<p><b>{notification.sender.firstname} {notification.sender.lastname}</b> ha creado una solicitud </p>
						<a href="/services">Ver solicitud</a>
					</>
				break;
			case "1":
				item =
					<>
						<h5><b>Solicitud Aprobada</b></h5>
						<p><b>{notification.sender.firstname} {notification.sender.lastname}</b> ha aprobado tu solicitud </p>
						<a href="/services">Ver solicitud</a>
					</>
				break;

			case "2":
				item =
					<>
						<h5><b>Solicitud Pagada</b></h5>
						<p><b>{notification.sender.firstname} {notification.sender.lastname}</b> ha pagado su solicitud </p>
						<a href="/services">Ver solicitud</a>
					</>
				break;
			/* case "5":
				item =
				<>
					<h5><b>Solicitud Cancelada</b></h5>
					<p><b>{notification.sender.firstname} {notification.sender.lastname}</b> ha cancelado su solicitud </p>
					<a href="/services">Ver solicitud</a>
				</>
				break; */
			case "6":
				item =
					<>
						<h5><b>Solicitud Rechazada</b></h5>
						<p><b>{notification.sender.firstname} {notification.sender.lastname}</b> ha rechazado su solicitud </p>
						<a href="/translators">Buscar otro traductor</a>
					</>
				break;
		}
		return item;
	}


	return (
		<>
			<div className={pending ? "notification-indicator pending" : "notification-indicator" } onClick={() => { viewNotifications() }} >
				<img src="/assets/images/bell@2x.png"></img>
			</div>

			<Modal
				className="right notifications-modal"
				show={isVisible}
				onHide={() => {
					closeNotifications();
				}}
				autoFocus
				keyboard
			>
				<Modal.Header closeButton>
					<Modal.Title>Notificaciones</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{empty}
					{notifications?.map((notification) => (
						<div className="item" key={notification.id}>
							{getItem(notification)}
							<div className={notification.read ? "read-indicator" : "read-indicator unread"}></div>
						</div>
					))
					}

				</Modal.Body>
			</Modal>

			<Modal
				className="logout-modal"
				show={isSessionClose}
				autoFocus
				keyboard
				centered
			>
				<Modal.Header>
					<Modal.Title>Cierre de sesión</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>
						{sessionText}
					</p>
					<Link to="/">
						<Button
							className="cucu-button"
						>
							Volver
						</Button>
					</Link>
				</Modal.Body>
			</Modal>

		</>
	)
}
