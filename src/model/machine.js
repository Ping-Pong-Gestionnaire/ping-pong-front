import React, { useState, useEffect } from 'react';

export async function suppPosteMachine(id) {
    try{
        return fetch("http://127.0.0.1:3333/machine/suppPoste", {
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

