import React, { useEffect, useRef, useState } from "react";
import {
	Container,
	Col,
} from "react-bootstrap";

import {
	Title,
	WellContainer,
	PasswordRecover,
	RowRecover
}

	from './styles'
	import moment from 'moment';

import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
const baseUri = process.env.REACT_APP_API_URL;


export default function TranslatorServices() {

  const [data, setData] = useState({});
	const [page, setPage] = useState(1);
  const [services, setServices] = useState([]);
	
	const validateStatus = (status) => {
    switch (status) {
      case "0":
        return "Solicitado";
      case "1":
        return "En progreso";
      case "2":
        return "Finalizado";
      case "3":
        return "Reprogramado";
      case "4":
        return "Cancelado";
      default:
        return "Solicitado";
    }
  };

	return (


		<Container className="themed-container" fluid={true}>
			<RowRecover className="layout-content">
				<Col className="col-md-12">
					<Title>Mis solicitudes</Title>
					<PasswordRecover>
						<WellContainer>
							<div className="table-responsive">
								<table className="table ">
									<thead className="thead-light">
										<tr>
											<th scope="col">Traductor</th>
											<th scope="col">Tipo de solicitud</th>
											<th scope="col">Cobro</th>
											<th scope="col">Creación</th>
											<th scope="col">Estado</th>
											<th scope="col"></th>
										</tr>
									</thead>
									<tbody>
										{services.map((ele) => (
											<tr>
												<td>
													<div className="userIcon">
														<div>
															<img
																src="/assets/images/no_avatar_default.png"
																className="image-icon"
															/>
														</div>
														<div>
															<p className="name">
																{ele.service.firstname}{" "}
																{ele.service.lastname}
																<div>
																	<span className="fa fa-star-o  active"></span>
																	<span className="fa fa-star-o  active"></span>
																	<span className="fa fa-star-o active"></span>
																	<span className="fa fa-star-o active"></span>
																	<span className="fa fa-star-o active"></span>
																</div>
															</p>
														</div>
													</div>
												</td>
												<td>Programada</td>
												<td>${ele.amount}</td>
												<td>{moment(ele.date).format("D MMM  YYYY")}</td>
												<td>
													<span className="badge badge-light">
														{validateStatus(ele.status)}
													</span>
												</td>
												<td>
													<Link
														className="view-mas"
														to="#"
														onClick={() => {
															/* setTranslator(ele);
															setisVisible(true); */
														}}
													>
														<img
															src="/assets/images/dots@2x.png"
															alt="logo"
														/>
													</Link>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<p className="paginador">
								{page > 1 && (
									<button
										className="atras"
										onClick={() => {
											setPage(data.page - 1);
										}}
									>
										Atrás
									</button>
								)}
                  Pagina {data.page} de {data.pages}
								<button
									className="siguiente"
									onClick={() => {
										setPage(data.page + 1);
									}}
								>
									Siguiente
                  </button>
							</p>
						</WellContainer>
					</PasswordRecover>
				</Col>
			</RowRecover>
		</Container>

	);
}

