

import React, { useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import {
    NavDropdown,
    Modal,
} from "react-bootstrap";
import { logout } from "../../utils/session";
import { Link, useHistory, useParams } from "react-router-dom";

export default function Header() {

    const history = useHistory();

    return (
        <nav className="navbar navbar-expand-md layout">
            <Container>
                <Link className="navbar-brand" to="/translators">
                    <img src="/assets/images/logo.png" alt="logo" />
                </Link>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link nav-item-inactive" to="/translators">
                            Traductores
            </Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link nav-item-inactive" to="/home">
                            Mis solicitudes
            </Link>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item ">
                        <img src="/assets/images/bell@2x.png"></img>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <img
                        src="/assets/images/no_avatar_default.png"
                        className="ico-user"
                    />
                    <NavDropdown
                        title={localStorage.getItem("userName")}
                        id="nav-dropdown"
                    >
                        <NavDropdown.Item>
                            <Link to="/profile">Perfil</Link>
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

