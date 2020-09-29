import React, { useState, useEffect } from 'react'
import ReactTags from 'react-tag-autocomplete'
import './styles.scss';

import { Form, InputGroup, Alert } from "react-bootstrap";

import { useFormik } from 'formik';
import * as Yup from 'yup';

import * as PlatformsAPI from '../../api/platforms';
import * as LanguagesAPI from '../../api/languages';
import * as SpecialitiesAPI from '../../api/specialities';


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

    const [entity, setEntity] = useState({
        platforms: "",
        languages: "",
        specialities: "",
        experiences: "",
        work_experience: "",
        certifications: "",
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
        work_experience: Yup.string()
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


    return (
        <div>

            <Title>Experiencia laboral</Title>

            <Form onSubmit={formik.handleSubmit}>
                <h5><b>Herramientas remotas</b></h5>
                <ReactTags
                    ref={reactTags}
                    tags={selectedPlatforms}
                    suggestions={platforms}
                    onDelete={(data) => onDelete(data, "platforms")}
                    onAddition={(data) => onAddition(data, "platforms")} />

                <ReactTags
                    ref={reactTags}
                    tags={selectedSpecialities}
                    suggestions={specialities}
                    onDelete={(data) => onDelete(data, "specialities")}
                    onAddition={(data) => onAddition(data, "specialities")} />


                <div className="filter-languaje">
                    <span>Idiomas</span>
                    <select className="selec">
                        {languages?.map((elm) => (
                            <option>{elm.name}</option>
                        ))}
                    </select>
                    <img
                        className="img-filer"
                        src="/assets/images/load.png"
                    ></img>
                    <select className="selec">
                        {languages?.map((elm) => (
                            <option>{elm.name}</option>
                        ))}
                    </select>
                </div>
            </Form>


        </div>
    )
}
