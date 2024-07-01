import React, { useState, useEffect } from 'react';

export async function getCommandeAll() {
    try {
        return fetch("http://127.0.0.1:3333/commandeAchat/getAll", {
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

export async function getOneCommande(id) {
    try {
        return fetch("http://127.0.0.1:3333/commandeAchat/getOne/" + id, {
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

export async function suppCommande(id) {
    try {
        return fetch("http://127.0.0.1:3333/commandeAchat/supp", {
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
export async function modifCommande(id, statut, dateLivPrev, dateLivReel, id_fourn) {
    try {
        return fetch("http://127.0.0.1:3333/commandeAchat/modif", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": id,
                "statut": statut,
                "dateLivPrev": dateLivPrev,
                "dateLivReel":  dateLivReel,
                "id_fourn": id_fourn

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
export async function creaCommande( statut, dateLivPrev, dateLivReel, id_fourn) {
    try {
        return fetch("http://127.0.0.1:3333/commandeAchat/crea", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "statut": statut,
                "dateLivPrev": dateLivPrev,
                "dateLivReel":  dateLivReel,
                "id_fourn": id_fourn
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

export async function getCommandeByStatut(statut, nom) {
    try {
        return fetch("http://127.0.0.1:3333/commandeAchat/getByStatut/" + statut + "/0000", {
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
export async function getCommandeById(id) {
    try {
        return fetch("http://127.0.0.1:3333/commandeAchat/getById/" + id, {
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

/* partie ligne ############################################################################################################### */

export async function getLigneByCommande(id) {
    try {
        return fetch("http://127.0.0.1:3333/ligneAchat/getByCommande/" + id, {
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