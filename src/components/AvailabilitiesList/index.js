import React, { useEffect, useState } from "react";
import { Container, Col, Dropdown, Button, Row, Form } from "react-bootstrap";
import { Title, WellContainer } from './styles'

import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { useFormik } from 'formik';
import DatePicker from "react-datepicker";

import AvailabilitiesModal from "../../components/AvailabilitiesModal"
import { NotifierGenerator } from "../Alerts"

import * as UsersAPI from '../../api/users';
import * as UnavailabilitiesAPI from '../../api/unavailabilities';

import "./styles.scss"

export default function AvailabilitiesList() {

	const [unavailabilities, setUnvailabilities] = useState([]);
	const [options, setOptions] = useState();
	const [pageCount, setPageCount] = useState(1)

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [activeType, setActiveType] = useState();
	const [activeUnavailability, setActiveUnavailability] = useState();
	const [alert, setAlert] = useState({ type: "", message: "" });

	const formik = useFormik({
		initialValues: {
			sort_by: "",
			min_date: "",
			max_date: "",
			sort_order: ""
		},
		validateOnBlur: true,
		enableReinitialize: true

	});

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

	const handlePageClick = data => {
		console.log(data)
		let selected = data.selected;
		setOptions({ ...options, page: selected + 1 });
	};

	const getUnavailabilities = (type) => {
		UsersAPI.getUnavailabilities(localStorage.getItem("token"), options).then((res) => {
			console.log(res.results)
			setUnvailabilities(res.results)
			setPageCount(res.pages)
		})
	};

	const deleteUnavailability = (id) => {
		UnavailabilitiesAPI.deleteUnavailability(localStorage.getItem("token"), id).then((res) => {
			setAlert({ type: "success", message: "No disponiblidad eliminada"})
			getUnavailabilities()
		})
	}

	useEffect(() => {
		getUnavailabilities()
	}, [
		options,
	]);

	return (
		<div>
			<Container className="themed-container" className="availabilities-list">
				<Col className="col-md-12">
					<Title>No disponibilidades</Title>

						<Row className="filters">
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
											<option value="created_at">Fecha de creación</option>
											<option value="from">Fecha y hora</option>
										</Form.Control>
									</Form.Group>
								</Col>

								<Col>
									<Form.Group>
										<Form.Control
											as="select"
											id="sort_order"
											name="sort_order"
											className="form-control input-lg"
											onChange={e => {
												formik.handleChange(e);
												handleInputChange(e)
											}}
											value={formik.values.sort_order}>
											<option value="desc">Descendente</option>
											<option value="asc">Ascendente</option>
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
										dateFormat="dd/MM/yyyy"
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
										dateFormat="dd/MM/yyyy"
										placeholderText="Hasta: "
									/>
								</Col>

							</Row>
					<WellContainer>
						<div className="table-responsive">
							<table className="table ">
								<thead className="thead-light">
									<tr>
										<th scope="col">Fecha y hora de inicio</th>
										<th scope="col">Fecha y hora de fin</th>
										<th scope="col">
											<Button
												className="cucu-button plus-button"
												onClick={() => {
													setActiveUnavailability({})
													setActiveType("create")
													setIsModalVisible(true)
												}}
											>
												<i className="fa fa-plus"></i>
												Crear Nuevo
											</Button>

										</th>
									</tr>
								</thead>
								<tbody>
									{unavailabilities?.map((ele) => (
										<tr key={ele.id}>
											<td>{moment(ele.from).format('D MMM  YYYY - hh:mm a')}</td>
											<td>{moment(ele.to).format('D MMM  YYYY - hh:mm a	')}</td>
											{/* <td>{moment(ele.to).format('h:mm a')}</td> */}
											<td>
												<Dropdown className="cucu-dropdown">
													<Dropdown.Toggle variant="outline" id="dropdown-basic">
														...
													</Dropdown.Toggle>

													<Dropdown.Menu>
														<Dropdown.Item
															onClick={() => {
																setActiveUnavailability(ele)
																setActiveType("edit")
																setIsModalVisible(true)
															}}
														>
															Editar
															</Dropdown.Item>
														<Dropdown.Item onClick={() => deleteUnavailability(ele.id)}>
															Eliminar
															</Dropdown.Item>
													</Dropdown.Menu>
												</Dropdown>
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
			<AvailabilitiesModal
				success={(type) => {
					setIsModalVisible(false)
					getUnavailabilities()
					setAlert({ type: "success", message: "No disponiblidad " + type })
				}}
				type={activeType}
				unavailability={activeUnavailability}
				onHide={() => setIsModalVisible(false)}
				show={isModalVisible}
			></AvailabilitiesModal>

			<NotifierGenerator
				alert={alert}
			>
			</NotifierGenerator>
		</div>
	)
}
