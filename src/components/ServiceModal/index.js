/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { itemStatusLabel } from "../../utils/constants"
import { isParseable } from "../../utils/constants"

import {
  WellContainerModal,
  URLLabel,
  Submit,
  Cancel,
} from "./styles"

import "./styles.scss"

import CancelModal from "../CancelModal"
import * as ServicesAPI from '../../api/services';

import moment from "moment";

export default function ServiceModal(props) {
  const [statusButtons, setStatusButtons] = useState(null);
  const [modalCancel, setModalCancel] = useState(false);
  const [modalType, setModalType] = useState(false);
	const [confirmDisable, setConfirmDisable] = useState(false)


  const [role] = useState(localStorage.getItem("role") === "2" ? "translator" : "client");

  const acceptService = () => {
    setConfirmDisable(true)
		ServicesAPI.acceptService(localStorage.getItem("token"), props.service?.id).then((res) => {
			setConfirmDisable(false)
			props.onHide()
			props.updateServices()
		})
  }
  
  const startService = () => {
    setConfirmDisable(true)
		ServicesAPI.startService(localStorage.getItem("token"), props.service?.id).then((res) => {
			setConfirmDisable(false)
			props.onHide()
			props.updateServices()
		})
	}


  const getButtons = () => {

    let buttons;

    if (localStorage.getItem("role") === "2") {
      switch (props.service.status) {
        case "0":
          buttons =
            <>
              <Submit 
                disable={confirmDisable}
                onClick={() => {
                  acceptService()
                }}>
                Aceptar servicio
              </Submit>
              <Cancel 
                onClick={() => {
                  setModalCancel(true)
                  setModalType("reject")
                }}
              >
                Rechazar
              </Cancel>
            </>

          break;

        case "1":
          buttons =
            <>
              <Submit 
                disable={confirmDisable}
                onClick={() => { 
                  startService()
                }}>
                Iniciar traducción
            </Submit>
              <Cancel 
                onClick={() => {
                  setModalCancel(true)
                  setModalType("cancel")
                }}>
                Cancelar servicio
            </Cancel>
            </>
      }
    }

    setStatusButtons(buttons)
  }

  useEffect(() => {
    getButtons()
  }, [props.service]);

  return (
    <>
      <Modal
        className="right service-modal"
        show={props.show}
        onHide={props.onHide}
        autoFocus
        keyboard
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalles de servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="contentUserIcon">
            <div className="userIconModal">
              <div>
                <img
                  src="/assets/images/no_avatar_default.png"
                  alt="logo"
                  className="image-profile"
                />
              </div>
              <div className="user-container">
                <div>
                  <p className="name-modal">
                    {
                      role == "translator" ?
                        <>
                          {props.service.client?.firstname}
                          {props.service.client?.lastname}
                        </>
                        :
                        <>
                          {props.service.translator?.firstname}
                          {props.service.translator?.lastname}
                        </>
                    }
                  </p>
                  <p className="tradu-ins">Traducción {props.service.service_type == "0" ? "programada" : "instantánea"}</p>
                </div>
                {itemStatusLabel(props.service.status)}
              </div>
            </div>
          </div>
          <WellContainerModal>

            {props.service.cancel_reason && props.service.status=="5" || props.service.status=="6" ?
              <div className="cancel-reason">
                <p className="title">Motivo de {props.service.status=="5"? <>cancelación</> : <>rechazo</>}</p>
                <p className="desc">{props.service.cancel_reason}</p>
              </div>
              : null  
            }

            <p className="price-modal">
              $ {props.service.amount}{" "}
              <span className="price-detail">
                (${props.service.duration_type == "0" ? props.service.translator?.rate_hour : props.service.translator?.rate_minute}
                  /{props.service.duration_type == "0" ? "hr" : "min"}) x {props.service.duration_amount}
              </span>
            </p>
            <p className="detail-modal-text">
              <b>Cucumetro: </b>
              <span>
                {props.service.time_type === 0 ? "Servicio fijo" : "Minuto consumido"}
              </span>
            </p>
            <p className="detail-modal-text">
              <b>Cobro por: </b>
              <span>
                {props.service.duration_type === 0 ? "Hora" : "Minutos"}
              </span>
            </p>
            <p className="detail-modal-text">
              <b>Duración:  </b>
              <span>{props.service.duration_amount}</span>
            </p>
            <p className="detail-modal-text">
              <b>Fecha inicio: </b>
              <span> {moment(props.service.date).format("D MMM  YYYY")}</span>
            </p>
            <URLLabel
              type="button"
              className="url-button"
              onClick={() => {
                window.open(props.service.url);
              }}
            >
              <img src="/assets/images/video-purple.png"></img>
            Visitar URL de la sesión
          </URLLabel>
            <hr></hr>
            <p className="detail-modal-text">Adjuntos</p>
            <div className="container-files">
              {(props.service.url) && isParseable(props.service.url) ? JSON.parse(props.service.url)?.map((file) => (
                <a key={file.name} href={file.url}>
                  <span className="file">
                    <i className="fa fa-file margin-file"></i>{file.name}
                  </span>
                </a>
              )) :
                <p className="no-content">
                  Sin archivos adjuntos
              </p>
              }
            </div>

            {props.service.description ? (
              <div className="modal-description">
                <p className="detail-modal-text">Información adicional</p>
                <p className="detail-text">{props.service.description}</p>
              </div>
            ) : null}
          </WellContainerModal>
        </Modal.Body>

        <Modal.Footer>
          {statusButtons}
        </Modal.Footer>

      </Modal>
      
      <CancelModal
        onHide={() => setModalCancel(false)}
        updateServices={()=>{props.updateServices()}}
        show={modalCancel}
        service={props.service}
        type={modalType}
      >
      </CancelModal>


    </>
  );
}