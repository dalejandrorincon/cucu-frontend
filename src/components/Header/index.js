

import React, { useState, useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import {
	NavDropdown,
	Modal,
} from "react-bootstrap";
import { logout } from "../../utils/session";
import { Link, useHistory, useLocation } from "react-router-dom";
import Notifications from "../Notifications/";

export default function Header() {

	const history = useHistory();
	const [options, setOptions] = useState(null);
	const [profileLink, setProfileLink] = useState(null);
	const location = useLocation()

	const getOptions = () => {

		let role = localStorage.getItem("role")
		let content
		let link

		console.log(role)

		switch (role) {
			case "1":
				link = null
				break;
			case "2":
				link =
					<Link to="/profile-translator-edit">Perfil</Link>
				break;
			default:
				link =
				<Link to="/profile-client">Perfil</Link>
		}

		setProfileLink(link)



		switch (role) {
			case "1":
				content = null
				break;
			case "2":
				content =

					<Nav defaultActiveKey={location.pathname} className="navbar-nav mr-auto">
						<Nav.Link className="item-menu" href="/services">
						<p className="text-item-menu">Solicitudes</p>
						</Nav.Link>
						<Nav.Link className="item-menu" href="/transactions">
						<p className="text-item-menu">Transacciones</p>
						</Nav.Link>
						<Nav.Link className="item-menu" href="/availabilities">
						<p className="text-item-menu">Agenda</p>
						</Nav.Link>
					</Nav>
				break;
			default:
				content =
					<Nav defaultActiveKey={location.pathname} className="navbar-nav mr-auto">
						<Nav.Link className="item-menu" href="/translators">
							<p className="text-item-menu">Traductores</p>
						</Nav.Link>
						<Nav.Link className="item-menu" href="/services">
							<p className="text-item-menu">Mis solicitudes</p>
						</Nav.Link>
					</Nav>
		}
		setOptions(content)

	}

	useEffect(() => {
		getOptions()
	}, []);

	return (
		<nav className="navbar navbar-expand-md layout">
			<Container>
				<Link className="navbar-brand" to="/translators">
					<img src="/assets/images/logo.png" alt="logo" />
				</Link>
				{options}
				<ul className="navbar-nav">
					<li className="nav-item ">
						<Notifications></Notifications>
					</li>
				</ul>
				<ul className="navbar-nav">
					<img
						src={ localStorage.getItem("image_url") &&  localStorage.getItem("image_url")!="null"?
							localStorage.getItem("image_url"):
							"/assets/images/no_avatar_default.png"}
						className="ico-user"
					/>
					<NavDropdown
						title={localStorage.getItem("userName")}
						id="nav-dropdown"
					>
						<NavDropdown.Item>
							{profileLink}
						</NavDropdown.Item>{" "}
						<NavDropdown.Item>
							<Link
								to="#"
								onClick={() => {
									logout();
									history.push("/");
								}}
							>
								Cerrar sesión
                        </Link>
						</NavDropdown.Item>
					</NavDropdown>
				</ul>
			</Container>
		</nav>
	);
}

