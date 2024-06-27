
export async function creaRealisation(  tempsRea, date, id_machine, id_poste, id_operation, id_user) {
    try{
        return fetch("http://127.0.0.1:3333/realisation/crea", {
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