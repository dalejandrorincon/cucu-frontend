import React, { useEffect, useState } from "react";

export const url = process.env.REACT_APP_API_URL

export const itemStatusLabel = (status) => {
    let label = ""
    let tagtype = ""
    switch (status) {
        case "0":
            label = "Solicitado";
            break;
        case "1":
            label = "Aceptado";
            tagtype = "accepted"
            break;    
        case "2":
            label = "En progreso";
            tagtype = "in_progress"
            break;
        case "3":
            label = "Finalizado";
            tagtype = "success"
            break;
        case "4":
            label = "Reprogramado";
            tagtype = "danger"
            break;
        case "5":
            label = "Cancelado";
            tagtype = "cancelled"
            break;
        case "6":
            label = "Rechazado";
            tagtype = "danger"
            break;

        default:
            label = "Solicitado";
    }

    return (
        <span className={"badge badge-light service-types " + tagtype}>
            {label}
        </span>
    )
};

export const isParseable = string => {
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
}