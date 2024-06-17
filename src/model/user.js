import React, { useState, useEffect } from 'react';



export async function connexionApi(user, mdp) {
    try{
        return fetch("http://127.0.0.1:3333/user/auth", {
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
                console.log(data);
                    return data;
            });
        // ce then la return la reponse
    }
    catch(error){
        return "j'ai une erreur" +  error
    }

}

export async function GetAllUser() {
    return fetch('http://127.0.0.1:3333/user/getAll', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        'Cache-Control': 'no-cache',
    })
        // la on transforme en json
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("mon tableau :" + data)
            return data;
        });
    // ce then la return la reponse
}

export async function getPost() {

    return fetch('https://dummyjson.com/posts?limit=10')
        .then(res => res.json())
        .then(data => {
            return data;
        });

}