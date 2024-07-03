import React, { useState, useEffect } from 'react';

export async function getFournAll() {
    try {
        return fetch("http://127.0.0.1:3333/fourn/getAll", {
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

export async function getOnefourn(id) {
    try {
        return fetch("http://127.0.0.1:3333/fourn/getOne/" + id, {
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

export async function suppFourn(id) {
    try {
        return fetch("http://127.0.0.1:3333/fourn/supp", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": id
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
export async function modifFourn(id, nom, tel, email) {
    try {
        return fetch("http://127.0.0.1:3333/fourn/modif", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": id,
                "nom": nom,
                "tel": tel,
                "email": email,

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
export async function creaFourn(nom, tel, email) {
    try {
        return fetch("http://127.0.0.1:3333/fourn/crea", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "nom": nom,
                "tel": tel,
                "email": email
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

export async function getfournByName(name) {
    try {
        return fetch("http://127.0.0.1:3333/fourn/getByName/" + name, {
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