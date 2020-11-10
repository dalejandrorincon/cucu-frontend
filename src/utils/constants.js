import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

export const url = process.env.REACT_APP_API_URL
export const socket_url = process.env.REACT_APP_SOCKET_URL

export const stripe_publishable = process.env.REACT_APP_STRIPE_PUBLISHABLE

export const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);

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
            label = "Pagado";
            tagtype = "paid"
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

export const combineDateWithTime = (d, t) => {
    return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        t.getHours(),
        t.getMinutes(),
        t.getSeconds(),
        t.getMilliseconds()
    );
}

export const connectSocket = () => {

    socket.on('connect',function(){ 
        let userId = localStorage.getItem("userId")
        socket.emit('login', userId);
    });
    
    socket.on("notifications", data => {
        console.log(data)
    });
}
