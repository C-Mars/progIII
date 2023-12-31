import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export function ActulizarListaFutb(){
const baseURL = 'http://localhost:3005';
    // datos de estudiantes
    const [datos, setDatos] = useState([]);


    useEffect(() => {
        BuscarTodosFutbolistas();
    }, []);

    const BuscarTodosFutbolistas = async () => {
        await axios.get(baseURL + '/api/v1/futbolista/futbolistas',{ headers:{
            Authorization:`Bearer ${userData.token}`
        }})
            .then(resp => {
                console.log(resp.data.dato);
                setDatos(resp.data.dato);

            })
            .catch(error => {
                console.log(error);
            })
    }
}

