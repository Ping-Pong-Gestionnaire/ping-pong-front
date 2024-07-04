import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from "../components/navbar.js";
import React, { useEffect, useState } from "react";
import { getAllPoste, getOnePoste, getMachineByPoste, modifPoste, suppPoste, creaPoste } from '../model/poste.js'
import { getGammeAll, getGammeByType, getGammeByName } from '../model/gamme.js'
import { suppPosteMachine } from '../model/machine.js'
import {generateCSVFacture, generatePDF, generatePDFFacture} from "./services";
import { getCommandeByMois} from "../model/commande";

export function Facture(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [error, setError] = useState('');

    const [inputFacture, setInputFacture] = useState('');
    const [inputDate, setInputDate] = useState('');
    const [inputFormat, setInputFormat] = useState('');

    const handleFacture = (event) => {
        setInputFacture(event.target.value);
    };
    const handleDate = (event) => {
        setInputDate(event.target.value);
    };
    const handleFormat = (event) => {
        setInputFormat(event.target.value);
    };

    useEffect(() => {

        // Obtenir la date d'aujourd'hui
        const today = new Date();
        // Obtenir la date d'il y a un mois
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        setInputDate(lastMonth.toISOString().slice(0, 10));



    }, [user.id_user])

    const exportFormat = async () =>{

        console.log(inputFacture + " " + inputFormat + " " + inputDate + " ")
        if(inputFacture != ""  && inputFormat != "" && inputDate != ""){
            var tabCommande = []
            var titre = ""
            if(inputFacture == "A"){
                tabCommande = await  GetCommandeAByMois(inputDate)
                titre = "Récapitulatif commande d'achat"

            }else{
                setError("Les services pour les commandes de vente est à venir.")
                return
            }

            // formatage du tableau
            var tabBonFormat = []
            if(tabCommande.length > 0 ){

                tabCommande.map((ligne, cpt)=>{
                    tabBonFormat.push({ matricule: ligne.matricule, fournisseur: ligne.nom, id: ligne.id_commande, statut: ligne.statut, livraison: ligne.dateLivPrev})
                })

                if(inputFormat == "PDF"){
                    generatePDFFacture("A", "Récapitulatif commande Achat", inputDate, tabBonFormat );
                }else{
                    generateCSVFacture("A", "Récapitulatif commande Achat", inputDate, tabBonFormat )
                }

            }else{
                setError("Il n'y a pas eu de commande pour la date sélectionné")
            }

        }else{
            setError("Vous devez remplir tous les champs")
        }



    }

    const GetCommandeAByMois = async (mois) => {

        try {
            const data = await getCommandeByMois(mois);
            if (data == "400") {
                console.log("data/error : ", data.status);
                setError("Récupération d'information sur le compte impossible." )
            }
            else {
                setError("")
                return data

            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    return (<>
            <NavBar login={user.login} droit={user.droit} />
            <div className="container-fluid d-flex flex-row">

                <div className="posteTravailInfo d-flex flex-row">
                    <div className="InformationPoste">
                        <div >
                            <h2> Factures </h2>

                            <div  className="information">
                                <div className={error == "" ? "d-none" : "alert alert-danger mt-3"} role="alert">
                                    {error == "" ? "" : error}
                                </div>
                                <div className="d-flex flex-row">

                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6"
                                                   className="col-form-label">Facture </label>
                                        </div>

                                        <div className="col-auto">
                                            <select
                                                className="form-select form-control"
                                                aria-label="Default select example"
                                                value={inputFacture} onChange={handleFacture}
                                            >
                                                <option value="">Sélectionner</option>
                                                <option value="A">Commande Achat</option>
                                                <option value="V">Commande Vente</option>


                                            </select>
                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label">Date calculs </label>
                                        </div>

                                        <div className="col-auto">
                                            <input type="date" id="rechercheGammeNom" className="form-control rechercheInput"
                                                   aria-describedby="passwordHelpInline"
                                                   value={inputDate} onChange={handleDate}  ></input>

                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6"
                                                   className="col-form-label">Format </label>
                                        </div>

                                        <div className="col-auto">
                                            <select
                                                className="form-select form-control"
                                                aria-label="Default select example"
                                                value={inputFormat} onChange={handleFormat}
                                            >
                                                <option value="">Sélectionner</option>
                                                <option value="PDF">PDF</option>
                                                <option value="CSV">CSV</option>


                                            </select>
                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <button  className="btn btn-success" onClick={() =>{ exportFormat()}}>  Calculer </button>

                                        </div>
                                    </div>




                                </div>


                            </div>
                        </div>


                    </div>



                </div>

            </div>


        </>
    );
}