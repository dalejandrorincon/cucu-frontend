

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import {
	NavDropdown,
	Modal,
} from "react-bootstrap";
import { logout } from "../../utils/session";
import { Link, useHistory, useParams } from "react-router-dom";

export default function Header() {

	const history = useHistory();
	const [options, setOptions] = useState(null);
	const [profileLink, setProfileLink] = useState(null);


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
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link className="nav-link nav-item-inactive" to="/services">
								Solicitudes
						</Link>
						</li>
						<li className="nav-item ">
							<Link className="nav-link nav-item-inactive" /* to="/transactions" */>
								Transacciones
						</Link>
						</li>
						<li className="nav-item ">
							<Link className="nav-link nav-item-inactive" to="/availabilities">
								Agenda
						</Link>
						</li>
					</ul>
				break;
			default:
				content =
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link className="nav-link nav-item-inactive" to="/translators">
								Traductores
							</Link>
						</li>
						<li className="nav-item ">
							<Link className="nav-link nav-item-inactive" to="/services">
								Mis solicitudes
							</Link>
						</li>
					</ul>
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
						<img src="/assets/images/bell@2x.png"></img>
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

