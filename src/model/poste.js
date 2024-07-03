import React, { useState, useEffect } from 'react';

export async function getAllPoste() {
    try{
        return fetch("http://127.0.0.1:3333/poste/getAll", {
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
export async function getOnePoste(id) {
    try{
        return fetch("http://127.0.0.1:3333/poste/getOne/" + id, {
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
export async function getMachineByPoste(id) {
    try{
        return fetch("http://127.0.0.1:3333/poste/getMachines/" + id, {
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

export async function modifPoste(id, nom) {
    try{
        return fetch("http://127.0.0.1:3333/poste/modif", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": id,
                "nom": nom
            })
        })
            // la on transforme en json
            .then(
                res =>{
                    return res.status
                }
            )
            .then(data => {
                // console.log(data);
                return data;
            });
        // ce then la return la reponse
    }
    catch(error){
        return "j'ai une erreur" +  error
    }

}

export async function suppPoste(id) {
    try{
        return fetch("http://127.0.0.1:3333/poste/supp", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": id
            })
        })
            // la on transforme en json
            .then(
                res =>{
                    return res.status
                }
            )
            .then(data => {
                // console.log(data);
                return data;
            });
        // ce then la return la reponse
    }
    catch(error){
        return "j'ai une erreur" +  error
    }

}

export async function creaPoste(nom) {
    try{
        return fetch("http://127.0.0.1:3333/poste/crea", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "nom": nom
            })
        })
            // la on transforme en json
            .then(
                res =>{
                    return res.status
                }
            )
            .then(data => {
                // console.log(data);
                return data;
            });
        // ce then la return la reponse
    }
    catch(error){
        return "j'ai une erreur" +  error
    }

}

export async function getListeMachine(id) {
    try {
        return fetch("http://127.0.0.1:3333/poste/getMachine/" + id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            // la on transforme en json
            .then(
                res => {
                    if (res.status == "400") {
                        return res.status
                    } else {
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
    catch (error) {
        return "j'ai une erreur" + error
    }

}

