import React, { useEffect, useState } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { Title, WellContainer } from './styles'
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { useFormik, useFormikContext } from 'formik';
import "./styles.scss"
import * as ServicesAPI from '../../api/services';
import ServiceModal from "../../components/ServiceModal"
import {itemStatusLabel} from "../../utils/constants"

export default function TranslatorServices() {

	const [activeService, setActiveService] = useState({});
	const [isModalVisible, setIsModalVisible] = useState(false);

	const [options, setOptions] = useState();
	const [pageCount, setPageCount] = useState(1)

	const [services, setServices] = useState([]);

	
	const formik = useFormik({
		initialValues: {
			service_type: "",
			duration_type: "",
			status: "",
			min_date: "",
			max_date: "",
			sort_by: "",
			sort_order: "",
			name: ""
		},
		onSubmit: values => {
			console.log("values")
		},
		//validationSchema: validationSchema,
		validateOnBlur: true,
		enableReinitialize: true

	});

	const getUserType = () =>{
		let role=""
		switch (localStorage.getItem("role")) {
			case "1":
				role = "admin"
				break;
			case "2":
				role = "translator"
				break;
			default:
				role = "client"
		}
		return role
	}

	useEffect(() => {
		let userType = getUserType()
		getServices(userType)
	}, [
		options,
	]);


	const getServices = (type) => {
		ServicesAPI.getServices(type, localStorage.getItem("token"), options).then((res) => {
			console.log(res.results)
			setServices(res.results)
			setPageCount(res.pages)
		})
	};

	const handlePageClick = data => {
		console.log(data)
		let selected = data.selected;
		setOptions({ ...options, page: selected + 1 });
	};


	const handleInputChange = (e) => {
		let name = e.target.name
		let val = e.target.value
		setOptions({
			...options,
			...{ [name]: val }
		})

	}

	const handleDateChange = (e, type) =>{
		let name = type
		let val = e
		setOptions({
			...options,
			...{ [name]: val }
		})
	}



	return (
		<>
			<Container className="themed-container" className="services-list">
				<Col className="col-md-12">
					<Title>Mis solicitudes</Title>
					<WellContainer>
						<div className="table-responsive">
							<Row className="filters">
								<Col>
									<Form.Group>
										<Form.Control
											as="select"
											id="service_type"
											name="service_type"
											className="form-control input-lg"
											onChange={e => {
												formik.handleChange(e);
												handleInputChange(e)
											}}
											value={formik.values.service_type}>
											<option value="">Todos los tipos</option>
											<option value="0">Instantáneo</option>
											<option value="1">Programado</option>
										</Form.Control>
									</Form.Group>
								</Col>

								<Col>
									<Form.Group>
										<Form.Control
											as="select"
											id="status"
											name="status"
											className="form-control input-lg"
											onChange={e => {
												formik.handleChange(e);
												handleInputChange(e)
											}}
											value={formik.values.status}>
											<option value="">Todos los estados</option>
											<option value="0">Solicitado</option>
											<option value="1">Aceptado</option>
											<option value="2">En progreso</option>
											<option value="3">Finalizado</option>
											<option value="4">Reprogramado</option>
											<option value="5">Cancelado</option>
										</Form.Control>
									</Form.Group>
								</Col>

								<Col>
									<Form.Group>
										<Form.Control
											as="select"
											id="sort_by"
											name="sort_by"
											className="form-control input-lg"
											onChange={e => {
												formik.handleChange(e);
												handleInputChange(e)
											}}
											value={formik.values.sort_by}>
											<option value="created_at">Más recientes</option>
											<option value="date">Fecha</option>
											<option value="duration_amount">Duración</option>
											<option value="duration_type">Tarifa</option>
										</Form.Control>
									</Form.Group>
								</Col>

								<Col>
									<Form.Group>
										<Form.Control
											as="select"
											id="duration_type"
											name="duration_type"
											className="form-control input-lg"
											onChange={e => {
												formik.handleChange(e);
												handleInputChange(e)
											}}
											value={formik.values.duration_type}>
											<option value="">Todos los cobros</option>
											<option value="0">Horas</option>
											<option value="1">Minutos</option>
										</Form.Control>
									</Form.Group>
								</Col>

								<Col>
									<DatePicker
										className="form-control"
										closeOnScroll={true}
										id="min_date"
										name="min_date"
										selected={formik.values.min_date}
										onChange={e => {
											formik.setFieldValue("min_date", e)
											handleDateChange(e, "min_date")
										}}
										placeholderText="Desde: "
									/>
								</Col>

								<Col>
									<DatePicker
										className="form-control"
										closeOnScroll={true}
										id="max_date"
										name="max_date"
										selected={formik.values.max_date}
										onChange={e => {
											formik.setFieldValue("max_date", e)
											handleDateChange(e, "max_date")
											
										}}
										placeholderText="Hasta: "
									/>
								</Col>

								<Col>
									<Form.Group>
										<Form.Control
											placeholder="Buscar por cliente"
											id="name"
											name="name"
											type="text"
											value={formik.values.name}
											onChange={(e) => {
												handleInputChange(e)
												formik.handleChange(e)
											}}
										/>
									</Form.Group>
								</Col>

							</Row>
							<table className="table ">
								<thead className="thead-light">
									<tr>
										<th scope="col">Traductor</th>
										<th scope="col">Tipo de servicio</th>
										<th scope="col">Duración</th>
										<th scope="col">Tarifa</th>
										<th scope="col">Fecha</th>
										<th scope="col">Estado</th>
										<th scope="col"></th>
									</tr>
								</thead>
								<tbody>
									{services?.map((ele) => (
										<tr key={ele.id}>
											<td className="user-container">
												<div className="userIcon">
													<div>
														<img
															src="/assets/images/no_avatar_default.png"
															className="image-icon"
														/>
													</div>
													<div>
														<p className="name">
															<b>
																{ele.client.firstname}{" "}
																{ele.client.lastname}
															</b>
															<div className="price">
																${ele.amount}
															</div>
														</p>
													</div>
												</div>
											</td>
											<td>{ele.service_type === "0" ? "Instantáneo" : "Programado"}</td>
											<td>{ele.duration_amount}</td>
											<td>{ele.duration_type === "0" ? "Hora" : "Minuto"}{ele.duration_amount > 1 ? "s" : null}</td>
											<td>{moment(ele.date).format("D MMM  YYYY")}</td>
											<td>
												{itemStatusLabel(ele.status)}
											</td>
											<td>
												<Link
													className="view-mas"
													to="#"
													onClick={() => {
														setActiveService(ele)
														setIsModalVisible(true)
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

						<div className="pagination-container">
							<ReactPaginate
								previousLabel={'Anterior'}
								nextLabel={'Siguiente'}
								breakLabel={'...'}
								breakClassName={'break-me'}
								pageCount={pageCount}
								marginPagesDisplayed={2}
								onPageChange={handlePageClick}
								pageRangeDisplayed={5}
								containerClassName={'pagination'}
								subContainerClassName={'pages pagination'}
								activeClassName={'active'}
							/>
						</div>

					</WellContainer>
				</Col>
			</Container>

			<ServiceModal 
				updateServices={()=>{
					setIsModalVisible(false)
					getServices(getUserType())
				}}
				service={activeService} 
				onHide={() => setIsModalVisible(false)}
				show={isModalVisible}
			></ServiceModal>

		</>
	);
}

