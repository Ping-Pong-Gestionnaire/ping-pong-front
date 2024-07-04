import {route} from './route';

export async function creaListeMP( id_machine, id_poste) {
    try{
        return fetch(route + "listemp/crea", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id_machine": id_machine,
                "id_poste": id_poste
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
export async function suppListeMP( id_machine, id_poste) {
    try{
        return fetch(route + "listemp/supp", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id_machine": id_machine,
                "id_poste": id_poste
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