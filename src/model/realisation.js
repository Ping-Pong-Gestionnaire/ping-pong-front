import {route} from './route';

export async function creaRealisation(  tempsRea, date, id_machine, id_poste, id_operation, id_user) {
    try{
        return fetch(route + "realisation/crea", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "tempsRea": tempsRea,
                "date": date,
                "id_machine": id_machine,
                "id_poste": id_poste,
                "id_operation": id_operation,
                "id_user": id_user
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

export async function getAll() {
    try {
        return fetch(route + "realisation/getAll/", {
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