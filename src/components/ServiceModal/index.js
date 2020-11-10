/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
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
import RateModal from "../RateModal"

import * as ServicesAPI from '../../api/services';
import { Link, useHistory, useParams } from "react-router-dom";

import moment from "moment";
import { NotifierGenerator } from "../Alerts"


export default function ServiceModal(props) {
  const [statusButtons, setStatusButtons] = useState(null);
  const [modalCancel, setModalCancel] = useState(false);
  const [modalRate, setModalRate] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [confirmDisable, setConfirmDisable] = useState(false)

  const [confirmCancelBtn, setConfirmCancelBtn] = useState(false);

  const [alert, setAlert] = useState({ type: "", message: "" });

  const [role] = useState(localStorage.getItem("role") === "2" ? "translator" : "client");

  const history = useHistory();

  const acceptService = () => {
    setConfirmDisable(true)
    ServicesAPI.acceptService(localStorage.getItem("token"), props.service?.id).then((res) => {
      setConfirmDisable(false)
      props.onHide()
      props.updateServices()
      setAlert({ type: "success", message: "Servicio aceptado" })
    })
  }

  /* const startService = () => {
    setConfirmDisable(true)
    ServicesAPI.startService(localStorage.getItem("token"), props.service?.id).then((res) => {
      setConfirmDisable(false)
      props.onHide()
      props.updateServices()
      setAlert({type: "success", message: "Servicio iniciado"})     
    })
  } */

  const finishService = () => {
    setConfirmDisable(true)
    ServicesAPI.finishService(localStorage.getItem("token"), props.service?.id).then((res) => {
      setConfirmDisable(false)
      props.onHide()
      props.updateServices()
      setAlert({type: "success", message: "Servicio terminado"})     
    })
  }

  const cancelService = () => {
    console.log(typeof confirmDisable)
    setConfirmDisable(true)
    ServicesAPI.cancelService(localStorage.getItem("token"), props.service?.id).then((res) => {
      setConfirmDisable(false)
      props.onHide()
      props.updateServices()
      setAlert({ type: "success", message: "Servicio cancelado" })
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
                disabled={confirmDisable}
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
              {/* <Submit 
                disabled={confirmDisable}
                onClick={() => { 
                  startService()
                }}>
                Iniciar traducción
            </Submit> */}
              <Button
                variant="danger"
                className="client-cancel full"
                onClick={() => {
                  setModalCancel(true)
                  setModalType("cancel")
                }}>
                Cancelar servicio
            </Button>
            </>
          break;

        case "2":
          buttons =
            <>
              <Button
                className="cucu-button full"
                onClick={() => {
                  finishService()
                }}>
                Finalizar servicio
            </Button>
          </>
      }
    }
    if (localStorage.getItem("role") === "3" || localStorage.getItem("role") === "4") {

      switch (props.service.status) {
        case "0":
          buttons =
            <>
              {!confirmCancelBtn ?
                <Button
                  variant="outline-danger"
                  className="client-cancel full"
                  onClick={() => {
                    setConfirmCancelBtn(true)
                  }}>
                  Cancelar servicio
                </Button>
                :
                <Button
                  variant="danger"
                  className="client-cancel full"
                  disabled={confirmDisable}
                  onClick={() => {
                    cancelService()
                  }}>
                  Confirma la cancelación
                </Button>
              }
            </>
          break;

        case "1":
          buttons =
            <>
              {!confirmCancelBtn ?
                <>
                  <Submit
                    disabled={confirmDisable}
                    onClick={() => {
                      history.push("/payment/" + props.service.id)
                    }}>
                    Pagar
              </Submit>
                  <Cancel
                    onClick={() => {
                      setConfirmCancelBtn(true)
                    }}>
                    Cancelar servicio
              </Cancel>
                </>
                :
                <>
                  <Submit
                    variant="danger"
                    disabled={confirmDisable}
                    className="client-cancel"
                    onClick={() => {
                      cancelService()
                    }}>
                    Confirmar cancelación
              </Submit>
                  <Cancel
                    onClick={() => {
                      setConfirmCancelBtn(false)
                    }}>
                    No cancelar
              </Cancel>
                </>
              }
            </>
        break;

        case "2":
          buttons =
            <>
              <Button
                className="cucu-button full"
                onClick={() => {
                  finishService()
                }}>
                Finalizar servicio
            </Button>
          </>
        break;

        
        case "3":
        if(props.service?.rated==false){
          buttons =
            <>
              <Button
                className="cucu-button full"
                onClick={() => {
                  setModalRate(true)
                }}>
                Calificar servicio
            </Button>
          </>
        }
      }

    }

    setStatusButtons(buttons)
  }

  useEffect(() => {
    getButtons()
  }, [props.service, confirmCancelBtn]);

  return (
    <>
      <Modal
        className="right service-modal"
        show={props.show}
        onHide={() => {
          props.onHide();
          setConfirmCancelBtn(false)
        }}
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
                {role == "translator" ?
                  <img
                    src={props.service?.client?.image_url ? props.service?.client.image_url : "/assets/images/no_avatar_default.png"}
                    className="image-profile ico-user"
                  />
                  :
                  <img

                    src={props.service?.translator?.image_url ? props.service?.translator.image_url : "/assets/images/no_avatar_default.png"}
                    className="image-profile ico-user"
                  />
                }
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

            {props.service.cancel_reason && props.service.status == "5" || props.service.status == "6" ?
              <div className="cancel-reason">
                <p className="title">Motivo de {props.service.status == "5" ? <>cancelación</> : <>rechazo</>}</p>
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
            {/* <p className="detail-modal-text">
              <b>Cucumetro: </b>
              <span>
                {props.service.time_type === 0 ? "Servicio fijo" : "Minuto consumido"}
              </span>
            </p> */}
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
            { props.service?.status == "2" ?
              <URLLabel
                type="button"
                className="url-button"
                onClick={() => {
                  window.open(props.service?.url.includes("//") ? props.service.url : "//"+props.service.url);
                }}
              >
                <img src="/assets/images/video-purple.png"></img>
                Entrar a la sesión
              </URLLabel>
              : null
            }
            <hr></hr>
            <p className="detail-modal-text">Adjuntos</p>
            <div className="container-files">
              {(props.service.files_urls?.length) ? props.service.files_urls?.map((file, index) => (
                <a key={index} href={file.url}>
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
        cancelSuccess={(type) => {
          props.updateServices();
          setAlert({ type: "success", message: "Servicio " + type })
        }}
        show={modalCancel}
        service={props.service}
        type={modalType}
      >
      </CancelModal>

      <RateModal
        onHide={() => setModalRate(false)}
        rateSuccess={(type) => {
          props.updateServices();
          setAlert({ type: "success", message: "Servicio calificado"})
        }}
        show={modalRate}
        service={props.service}
        type={modalType}
      >
      </RateModal>

      <NotifierGenerator
        alert={alert}
      >
      </NotifierGenerator>

    </>
  );
}