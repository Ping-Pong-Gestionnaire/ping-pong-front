import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import {route} from './route';

export async function connexionApi(user, mdp) {
    try{
        return fetch(route +"user/auth", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "login": user,
                "mdp": mdp
            })
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

               if(data == "400"){
                   return data
               }else{
                   // on met le token en session
                   sessionStorage.setItem("token", data.token);

                   const decodedToken = jwtDecode(data.token);
                   console.log(decodedToken)

                   const user = decodedToken.id_user
                   const tab = {"id_user": user.id_user, "login": user.login , "droit": user.droit }

                   return tab;
               }

            });
        // ce then la return la reponse
    }
    catch(error){
        return "j'ai une erreur" +  error
    }

}
export async function getUser(id) {
    try{
        return fetch(route + "user/getUser/" + id, {
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
               // console.log(data);
                return data;
            });
        // ce then la return la reponse
    }
    catch(error){
        return "j'ai une erreur" +  error
    }

}
export async function getAllUser() {
    try{
        return fetch(route +"user/getAll" , {
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
                // console.log(data);
                return data;
            });
        // ce then la return la reponse
    }
    catch(error){
        return "j'ai une erreur" +  error
    }

}
export async function getByName(login) {
    try{
        return fetch(route +"user/getByName/" + login, {
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
                // console.log(data);
                return data;
            });
        // ce then la return la reponse
    }
    catch(error){
        return "j'ai une erreur" +  error
    }

}
export async function suppUser(id) {
    try {
        return fetch("http://127.0.0.1:3333/user/supp", {
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
export async function modifUser(id, login, nom, prenom, email, droit, mdp ) {
    try {
        return fetch("http://127.0.0.1:3333/user/modif", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": id,
                "login": login,
                "nom": nom,
                "prenom":  prenom,
                "droit": droit,
                "email": email,
                "mdp" : mdp
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
export async function creaUser( login, droit, mdp ) {
    try {
        return fetch("http://127.0.0.1:3333/user/crea", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "login": login,
                "droit": droit,
                "mdp" : mdp
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