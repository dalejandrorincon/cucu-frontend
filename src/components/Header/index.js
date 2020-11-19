

import React, { useState, useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import {
	NavDropdown,
	Modal,
} from "react-bootstrap";
import { logout } from "../../utils/session";
import { Link, useHistory, useLocation } from "react-router-dom";
import Notifications from "../Notifications/";
import { useTranslation } from 'react-i18next';

import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';

export default function Header() {

	const history = useHistory();
	const [options, setOptions] = useState(null);
	const [profileLink, setProfileLink] = useState(null);
	const location = useLocation()
	const { t, i18n } = useTranslation();
	  
	const onSelectFlag = (flag) =>{
		localStorage.setItem('lang', flag)	
		i18n.changeLanguage(flag)	
		getOptions()
	}

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
					<Link to="/profile-translator-edit">{t('menu.profile')}</Link>
				break;
			default:
				link =
				<Link to="/profile-client">{t('menu.profile')}</Link>
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
						<p className="text-item-menu">{t('menu.requests')}</p>
						</Nav.Link>
						<Nav.Link className="item-menu" href="/transactions">
						<p className="text-item-menu">{t('menu.transactions')}</p>
						</Nav.Link>
						<Nav.Link className="item-menu" href="/availabilities">
						<p className="text-item-menu">{t('menu.schedule')}</p>
						</Nav.Link>
					</Nav>
				break;
			default:
				content =
					<Nav defaultActiveKey={location.pathname} className="navbar-nav mr-auto">
						<Nav.Link className="item-menu" href="/translators">
							<p className="text-item-menu">{t('menu.translators')}</p>
						</Nav.Link>
						<Nav.Link className="item-menu" href="/services">
							<p className="text-item-menu">{t('menu.my-requests')}</p>
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
				<Link className="navbar-brand" to="/">
					<img src="/assets/images/logo.png" alt="logo" />
				</Link>
				{options}
				<ReactFlagsSelect
					countries={["US", "ES"]}
					customLabels={{"US": "English","ES": "Español"}} 
					onSelect={(flag)=>{onSelectFlag(flag)}}
					defaultCountry={ localStorage.getItem("lang") ? localStorage.getItem("lang") : "US" }
				/>
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
								{t('menu.log-out')}
                        </Link>
						</NavDropdown.Item>
					</NavDropdown>
					
				</ul>
			</Container>
		</nav>
	);
}

