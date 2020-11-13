import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import i18n from 'i18next';

export const url = process.env.REACT_APP_API_URL
export const socket_url = process.env.REACT_APP_SOCKET_URL

export const stripe_publishable = process.env.REACT_APP_STRIPE_PUBLISHABLE

export const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);

export const itemStatusLabel = (status) => {    
    let label = ""
    let tagtype = ""
    switch (status) {
        case "0":
            label = i18n.t('status-0');
            break;
        case "1":
            label = i18n.t('status-1');
            tagtype = "accepted"
            break;
        case "2":
            label = i18n.t('status-2');
            tagtype = "paid"
            break;
        case "3":
            label = i18n.t('status-3');
            tagtype = "success"
            break;
        case "4":
            label = i18n.t('status-4');
            tagtype = "danger"
            break;
        case "5":
            label = i18n.t('status-5');
            tagtype = "cancelled"
            break;
        case "6":
            label = i18n.t('status-6');
            tagtype = "danger"
            break;

        default:
            label = i18n.t('status-0');
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

export const getLang = () => {
    if(i18n.language=="ES"){
      return "ES"
    }else{
      return "EN"
    }
}