import React, { useState, useEffect } from 'react'
import ReactTags from 'react-tag-autocomplete'
import './styles.scss';

import { Form, Dropdown, Button } from "react-bootstrap";

import { useFormik } from 'formik';
import * as Yup from 'yup';

import * as PlatformsAPI from '../../api/platforms';
import * as LanguagesAPI from '../../api/languages';
import * as SpecialitiesAPI from '../../api/specialities';

import ExperienceModal from '../ExperienceModal';
import CertificationModal from '../CertificationModal';


import {
    Title
} from "./styles"

export default function TranslatorExperienceForm() {


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
        experiences: [
            { "company": "asd", "description": "asd", "labor_months": "asd", "url": "" },
            { "company": "zzz", "description": "zzz", "labor_months": "zzz", "url": "" },
            { "company": "eee", "description": "eee", "labor_months": "eee", "url": "" }
        ],
        certifications: [
            { "name": "xxx", "school": "xxx", "date": "xxx", "url": "" },
            { "name": "yyy", "school": "yyy", "date": "yyy", "url": "" },
            { "name": "zzz", "school": "zzz", "date": "zzz", "url": "" }
        ],
    });

    const validationSchema = Yup.object().shape({
        platforms: Yup.string()
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
            .required("*Este campo es obligatorio")
    });

    const formik = useFormik({
        initialValues: {
            ...entity
        },
        onSubmit: values => {
            //saveChanges({ ...values })
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        enableReinitialize: true

    });

    const reactTags = React.createRef()

    useEffect(() => {
        getPlatforms();
        getLanguages();
        getSpecialities();
    }, []);

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
        switch(type){
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
        switch(type){
            case "experiences":
                current = formik.values.experiences
                if(data.index==undefined){
                    current.push(data)
                    formik.setFieldValue("experiences", current)
                }else{
                    current[data.index] = data
                    delete current[data.index].index
                    formik.setFieldValue("experiences", current)
                }
                setModalExperiences(false)
            break;

            case "certifications":
                current = formik.values.certifications
                if(data.index==undefined){
                    current.push(data)
                    formik.setFieldValue("certifications", current)
                }else{
                    current[data.index] = data
                    delete current[data.index].index
                    formik.setFieldValue("certifications", current)
                }
                setModalCertifications(false)
        }        
    }

    const editExperience = (index, type) => {
        let current;
        switch(type){
            case "experiences":
                current = formik.values.experiences
                setSelectedExperience({...current[index], ...{index: index} })
                setModalExperiences(true)
            break;

            case "certifications":
                current = formik.values.certifications
                setSelectedCertification({...current[index], ...{index: index} })
                setModalCertifications(true)
        }
    }

    const removeExperience = (index, type) => {
        console.log(index)
        let current;
        switch(type){
            case "experiences":
                current = formik.values.experiences
                current.splice(index, 1)
                formik.setFieldValue("experiences", current)
            break;

            case "certifications":
                current = formik.values.certifications
                current.splice(index, 1)
                formik.setFieldValue("certifications", current)
        }
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

                <h6><b>Idiomas</b></h6>
                <p><b>Agrega idiomas que dominas perfectamente y puedes traducir desde y hacia otro idioma.</b></p>

                <div className="filter-languaje">
                    <span>Idiomas</span>
                    <select className="selec">
                        {languages?.map((elm) => (
                            <option key={elm.id}>{elm.name}</option>
                        ))}
                    </select>
                    <img
                        className="img-filer"
                        src="/assets/images/load.png"
                    ></img>
                    <select className="selec">
                        {languages?.map((elm) => (
                            <option key={elm.id}>{elm.name}</option>
                        ))}
                    </select>
                </div>

                <h6><b>Especialidades</b></h6>
                <p>Escribe los temas en los que tienes amplia experiencia o conocimiento para traducir.</p>

                <ReactTags
                    ref={reactTags}
                    tags={selectedSpecialities}
                    suggestions={specialities}
                    onDelete={(data) => onDelete(data, "specialities")}
                    onAddition={(data) => onAddition(data, "specialities")}
                />

                <h6><b>Experiencia laboral</b></h6>
                <p>Agrega los lugares donde has fortalecido tu experiencia en la traducción oral</p>

                {JSON.stringify(formik.values.experiences)}

                <div className="experience-component">
                    {formik.values.experiences?.map((experience, index) => (
                        <div className="experience-container" key={index}>
                            <div className="top">
                                <div className="head">
                                    <b className="title">{experience.company}</b>
                                    <p className="time">{experience.labor_months}</p>
                                </div>
                                <div className="options">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-success" className="green" id="dropdown-basic">
                                            ...
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={()=>editExperience(index, "experiences")}>
                                                Editar
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={()=>removeExperience(index, "experiences")}>
                                                Eliminar
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="bottom" >
                                <p className="description">
                                    {experience.description}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="new-exp">
                        <Button onClick={() => newExperience(true, "experiences")}>
                            Agregar experiencia
                        </Button>

                    </div>

                </div>
                    

                <h6><b>Certifiaciones</b></h6>
                <p>Agrega todas las certificaciones de tu práctica profesional.</p>

                {JSON.stringify(formik.values.certifications)}

                <div className="experience-component">
                    {formik.values.certifications?.map((certification, index) => (
                        <div className="experience-container" key={index}>
                            <div className="top">
                                <div className="head">
                                    <b className="title">{certification.name}</b>
                                    <p className="time">{certification.date}</p>
                                </div>
                                <div className="options">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-success" className="green" id="dropdown-basic">
                                            ...
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={()=>editExperience(index, "certifications")}>
                                                Editar
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={()=>removeExperience(index, "certifications")}>
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
