import React, { useState, useEffect } from 'react'
import ReactTags from 'react-tag-autocomplete'
import './styles.scss';

import { Form, Dropdown, Button, Alert } from "react-bootstrap";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import 'moment/locale/es'  // without this line it didn't work


import * as PlatformsAPI from '../../api/platforms';
import * as LanguagesAPI from '../../api/languages';
import * as SpecialitiesAPI from '../../api/specialities';
import * as UsersAPI from '../../api/users';

import ExperienceModal from '../ExperienceModal';
import CertificationModal from '../CertificationModal';

import { Title, Submit } from "./styles"

export default function TranslatorExperienceForm() {

    moment.locale('es')

    const [buttonState, setButtonState] = useState({ label: "Guardar cambios", disabled: false })
    const [submitAttempt, setSubmitAttempt] = useState(false)

    const [response, setResponse] = useState(null)

    const [platforms, setPlatforms] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);

    const [languages, setLanguages] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const [specialities, setSpecialities] = useState([]);
    const [selectedSpecialities, setSelectedSpecialities] = useState([]);

    const [modalExperiences, setModalExperiences] = useState(false);
    const [selectedExperience, setSelectedExperience] = useState({
        company: "",
        description: "",
        labor_months: "",
        url: ""
    });

    const [modalCertifications, setModalCertifications] = useState(false);
    const [selectedCertification, setSelectedCertification] = useState({
        name: "",
        school: "",
        date: "",
        url: ""
    });


    const [entity, setEntity] = useState({
        platforms: "",
        languages: "",
        specialities: "",
        experiences: [],
        certifications: [],
    });

    const validationSchema = Yup.object().shape({
        /* platforms: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        languages: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        specialities: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        experiences: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio"),
        certifications: Yup.string()
            .min(3, "*Este campo debe tener al menos 3 caracteres")
            .required("*Este campo es obligatorio") */
    });

    const formik = useFormik({
        initialValues: {
            ...entity,
            from: "",
            to: ""
        },
        onSubmit: values => {
            setSubmitAttempt(true)
            saveChanges(values)
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        enableReinitialize: true

    });

    const reactTags = React.createRef()

    const saveChanges = (values) => {

        let remote_tools = selectedPlatforms.map((item) => item.id)

        let specialities = selectedSpecialities.map((item) => item.id)

        let payload = {
            remote_tools: JSON.stringify(remote_tools),
            specialities: JSON.stringify(specialities),
            languages: JSON.stringify(selectedLanguages),
            work_experience: JSON.stringify(values.work_experience),
            certifications: JSON.stringify(values.certifications),
            approved_translator: 1
        }

        console.log(payload)

        UsersAPI.updateUser(payload, localStorage.getItem("token")).then((res) => {
            let message = 'Cambios guardados exitosamente.'
            setButtonState({ label: "Enviar", disabled: false })
            setResponse(
                <Alert variant={'success'} >
                    {message}
                </Alert>
            )
            formik.resetForm()
        }).catch((err) => {
            console.log(err)
            let message;
            message = 'Ha ocurrido un error al guardar los cambios.'

            setResponse(
                <Alert variant={'danger'} >
                    {message}
                </Alert>
            )
        })

    }



    useEffect(() => {
        getPlatforms();
        getLanguages();
        getSpecialities();
        getProfile();
    }, []);

    const getProfile = () => {
        UsersAPI.getUser({}, localStorage.getItem("userId")).then((res) => {
            console.log(res.user)
            setEntity(res.user)
            setSelectedPlatforms(res.user.remote_tools)
            setSelectedSpecialities(res.user.specialities)
            setSelectedLanguages(res.user.languages)
        })
    };

    const getPlatforms = () => {
        PlatformsAPI.getPlatforms().then((res) => {
            console.log(res)
            setPlatforms(res)
        })
    };

    const getLanguages = () => {
        LanguagesAPI.getLanguages().then((res) => {
            console.log(res)
            setLanguages(res)
        })
    };

    const getSpecialities = () => {
        SpecialitiesAPI.getSpecialities().then((res) => {
            console.log(res)
            setSpecialities(res)
        })
    }

    const switchLanguages = () =>{
        let languages = [formik.values.from, formik.values.to]
        console.log(languages)
        formik.setFieldValue("from", languages[1])
        formik.setFieldValue("to", languages[0])
    }


    const onDelete = (i, type) => {
        let newTags
        switch (type) {
            case "platforms":
                newTags = selectedPlatforms.slice(0)
                newTags.splice(i, 1)
                setSelectedPlatforms(newTags)
                break;
            case "specialities":
                newTags = selectedSpecialities.slice(0)
                newTags.splice(i, 1)
                setSelectedSpecialities(newTags)
        }
    }

    const onAddition = (tag, type) => {
        let newTags = []
        switch (type) {
            case "platforms":
                newTags = [].concat(selectedPlatforms, tag)
                setSelectedPlatforms(newTags)
                break;
            case "specialities":
                newTags = [].concat(selectedSpecialities, tag)
                setSelectedSpecialities(newTags)
        }
    }

    const newExperience = (data, type) => {
        switch (type) {
            case "experiences":
                setSelectedExperience({
                    company: "",
                    description: "",
                    labor_months: "",
                    url: ""
                })
                setModalExperiences(true)

                break;

            case "certifications":
                setSelectedCertification({
                    name: "",
                    school: "",
                    date: "",
                    url: ""
                })
                setModalCertifications(true)
        }
    }

    const saveExperience = (data, type) => {
        let current;
        switch (type) {
            case "experiences":
                current = formik.values.work_experience
                if (data.index == undefined) {
                    current.push(data)
                    formik.setFieldValue("experiences", current)
                } else {
                    current[data.index] = data
                    delete current[data.index].index
                    formik.setFieldValue("experiences", current)
                }
                setModalExperiences(false)
                break;

            case "certifications":
                current = formik.values.certifications
                if (data.index == undefined) {
                    current.push(data)
                    formik.setFieldValue("certifications", current)
                } else {
                    current[data.index] = data
                    delete current[data.index].index
                    formik.setFieldValue("certifications", current)
                }
                setModalCertifications(false)
        }
    }

    const editExperience = (index, type) => {
        let current;
        switch (type) {
            case "experiences":
                current = formik.values.work_experience
                setSelectedExperience({ ...current[index], ...{ index: index } })
                setModalExperiences(true)
                break;

            case "certifications":
                current = formik.values.certifications
                setSelectedCertification({ ...current[index], ...{ index: index } })
                setModalCertifications(true)
        }
    }

    const removeExperience = (index, type) => {
        console.log(index)
        let current;
        switch (type) {
            case "experiences":
                current = formik.values.work_experience
                current.splice(index, 1)
                formik.setFieldValue("experiences", current)
                break;

            case "certifications":
                current = formik.values.certifications
                current.splice(index, 1)
                formik.setFieldValue("certifications", current)
        }
    }

    const addLanguage = () => {

        let fromLabel
        let toLabel

        languages.forEach(element => {
            if (element.id == formik.values.from) {
                fromLabel = element.name
            }
            if (element.id == formik.values.to) {
                toLabel = element.name
            }
        });


        if (formik.values.from && formik.values.to) {
            setSelectedLanguages([...selectedLanguages, {
                from: {
                    id: formik.values.from,
                    name: fromLabel
                },
                to: {
                    id: formik.values.to,
                    name: toLabel
                }
            }])
        }
    }

    const removeLanguage = (index) => {
        let sel = selectedLanguages
        sel.splice(index, 1)
        setSelectedLanguages([...sel])
    }


    return (
        <div className="translator-experience-form">

            <Title>Experiencia laboral</Title>

            <Form onSubmit={formik.handleSubmit}>
                <h6><b>Herramientas remotas</b></h6>
                <ReactTags
                    ref={reactTags}
                    tags={selectedPlatforms}
                    suggestions={platforms}
                    onDelete={(data) => onDelete(data, "platforms")}
                    onAddition={(data) => onAddition(data, "platforms")}
                />

                {selectedPlatforms.length == 0 && submitAttempt ? (
                    <div className="alert alert-danger">Debe ingresar al menos una plataforma.</div>
                ) : null}

                <h6><b>Idiomas</b></h6>
                <p><b>Agrega idiomas que dominas perfectamente y puedes traducir desde y hacia otro idioma.</b></p>

                <div className="Language-panel">
                    {selectedLanguages?.map((elm, index) => (
                        <div key={index} className="item">
                            <div><p>De {elm.from.name} a {elm.to.name}</p></div>
                            <Button className="remove" onClick={() => removeLanguage(index)} >✕</Button>
                        </div>
                    ))}
                </div>

                <div className="filter-language">
                    <div>
                        <Form.Control
                            as="select"
                            id="from"
                            name="from"
                            className="form-control input-lg"
                            onChange={e => {
                                formik.handleChange(e);
                            }}
                            value={formik.values.from} >
                            <option value="">Seleccionar...</option>
                            {languages?.map((elm) => (
                                <option key={elm.id} value={elm.id} >{elm.name}</option>
                            ))}
                        </Form.Control>
                        <Button className="switch" onClick={() => switchLanguages()}>
                            <img
                                className="img-filer"
                                src="/assets/images/load.png"
                            ></img>
                        </Button>
                        <Form.Control
                            as="select"
                            id="to"
                            name="to"
                            className="form-control input-lg"
                            onChange={e => {
                                formik.handleChange(e);
                            }}
                            value={formik.values.to} >
                            <option value="">Seleccionar...</option>
                            {languages?.map((elm) => (
                                <option key={elm.id} value={elm.id}>{elm.name}</option>
                            ))}
                        </Form.Control>
                    </div>
                    <Button className="add" onClick={() => addLanguage()} >Agregar</Button>
                </div>

                {selectedLanguages.length == 0 && submitAttempt ? (
                    <div className="alert alert-danger">Debe ingresar al menos un par de lenguajes.</div>
                ) : null}

                <h6><b>Especialidades</b></h6>
                <p>Escribe los temas en los que tienes amplia experiencia o conocimiento para traducir.</p>

                <ReactTags
                    ref={reactTags}
                    tags={selectedSpecialities}
                    suggestions={specialities}
                    onDelete={(data) => onDelete(data, "specialities")}
                    onAddition={(data) => onAddition(data, "specialities")}
                />

                {selectedSpecialities.length == 0 && submitAttempt ? (
                    <div className="alert alert-danger">Debe ingresar al menos una especialidad.</div>
                ) : null}

                <h6><b>Experiencia laboral</b></h6>
                <p>Agrega los lugares donde has fortalecido tu experiencia en la traducción oral</p>

                <div className="experience-component">
                    {formik.values.work_experience?.map((experience, index) => (
                        <div className="experience-container" key={index}>
                            <div className="top">
                                <div className="head">
                                    <b className="title">{experience.company}</b>
                                </div>
                                <div className="options">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-success" className="green" id="dropdown-basic">
                                            ...
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => editExperience(index, "experiences")}>
                                                Editar
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => removeExperience(index, "experiences")}>
                                                Eliminar
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="new-exp">
                        <Button onClick={() => newExperience(true, "experiences")}>
                            Agregar experiencia
                        </Button>

                    </div>

                </div>

                {formik.values.work_experience == [] && submitAttempt ? (
                    <div className="alert alert-danger">Debe ingresar al menos una experiencia de trabajo.</div>
                ) : null}


                <h6><b>Certificaciones</b></h6>
                <p>Agrega todas las certificaciones de tu práctica profesional.</p>

                <div className="experience-component">
                    {formik.values.certifications?.map((certification, index) => (
                        <div className="experience-container" key={index}>
                            <div className="top">
                                <div className="head">
                                    <b className="title">{certification.name}</b>
                                    <p className="time">{moment(certification.date).format("YYYY")}</p>
                                </div>
                                <div className="options">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-success" className="green" id="dropdown-basic">
                                            ...
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => editExperience(index, "certifications")}>
                                                Editar
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => removeExperience(index, "certifications")}>
                                                Eliminar
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="new-exp">
                        <Button onClick={() => newExperience(true, "certifications")}>
                            Agregar certificación
                        </Button>

                    </div>

                </div>
                {formik.values.work_experience == [] && submitAttempt ? (
                    <div className="alert alert-danger">Debe ingresar al menos una certificación.</div>
                ) : null}

                <Submit
                    disabled={buttonState.disabled}
                    type="button"
                    type="submit"
                >
                    {buttonState.label}
                </Submit>

                {response}

            </Form>

            <ExperienceModal
                newExperience={(data) => saveExperience(data, "experiences")}
                onHide={() => setModalExperiences(false)}
                show={modalExperiences}
                values={selectedExperience}
            ></ExperienceModal>


            <CertificationModal
                newCertification={(data) => saveExperience(data, "certifications")}
                onHide={() => setModalCertifications(false)}
                show={modalCertifications}
                values={selectedCertification}
            ></CertificationModal>

        </div>
    )
}
