import React, { useState, useEffect } from 'react';
import {route} from './route';

export async function getHabilitationByUser(id) {
    try{
        return fetch(route +"habilitation/getByUser/" + id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            // la on transforme en json
            .then(
                res =>{
                    if ( res.status == "400"){
                        return res.status
                    }else{
                        return res.json()
                    }
                }
            )
            .then(data => {
                console.log(data);
                return data;
            });
        // ce then la return la reponse
    }
    catch(error){
        return "j'ai une erreur" +  error
    }

}

export async function suppHabilitation(id_user, id_poste) {
    try {
        return fetch(route + "habilitation/supp", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id_user": id_user,
                "id_poste": id_poste,
            })
        })
            // la on transforme en json
            .then(
                res => {
                    return res.status
                }
            )
            .then(data => {
                // console.log(data);
                return data;
            });
        // ce then la return la reponse
    }
    catch (error) {
        return "j'ai une erreur" + error
    }

}
export async function creaHabilitation(id_user, id_poste) {
    try {
        return fetch(route + "habilitation/crea", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id_user": id_user,
                "id_poste": id_poste,
            })
        })
            // la on transforme en json
            .then(
                res => {
                    return res.status
                }
            )
            .then(data => {
                // console.log(data);
                return data;
            });
        // ce then la return la reponse
    }
    catch (error) {
        return "j'ai une erreur" + error
    }

}


