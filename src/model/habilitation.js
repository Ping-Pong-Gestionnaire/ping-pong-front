import React, { useState, useEffect } from 'react';

export async function getHabilitationByUser(id) {
    try{
        return fetch("http://127.0.0.1:3333/habilitation/getByUser" + id, {
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
