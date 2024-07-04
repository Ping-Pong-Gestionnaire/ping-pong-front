import React, { useState, useEffect } from 'react';
import {route} from './route';

export async function getCommandeAll() {
    try {
        return fetch(route + "commandeAchat/getAll", {
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
        return fetch(route + "commandeAchat/getOne/" + id, {
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
        return fetch(route + "commandeAchat/supp", {
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
        return fetch(route +"commandeAchat/modif", {
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
export async function creaCommande( statut, dateLivPrev, dateLivReel, id_fourn, matricule) {
    try {
        return fetch(route +"commandeAchat/crea", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "statut": statut,
                "dateLivPrev": dateLivPrev,
                "dateLivReel":  dateLivReel,
                "id_fourn": id_fourn,
                "matricule": matricule
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
        return fetch(route + "commandeAchat/getByStatut/" + statut + "/0000", {
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
        return fetch(route +"commandeAchat/getById/" + id, {
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

export async function getCommandeByMois(mois) {
    try {
        return fetch(route +"commandeAchat/getByMois/" + mois, {
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
        return fetch(route +"ligneAchat/getByCommande/" + id, {
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

export async function creaLigne( libelle, qte, prix, prix_unitaire,  id_gamme, id_commande) {
    try {
        return fetch(route +"ligneAchat/crea", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "libelle": libelle,
                "qte": qte,
                "prix":  prix,
                "prix_unitaire": prix_unitaire,
                "id_gamme": id_gamme,
                "id_commande" : id_commande
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

export async function suppLigne( id) {
    try {
        return fetch(route + "ligneAchat/supp", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id":  id
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

