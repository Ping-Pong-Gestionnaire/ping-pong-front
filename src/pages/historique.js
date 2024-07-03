import {GammeAdministration} from "./gamme";
import {Route} from "react-router-dom";
import NavBar from "../components/navbar";
import React, { useEffect, useState } from "react";
import {getAll} from "../model/realisation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



export function HistoriquePage(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [realisations, setRealisations] = useState("");
    const [error, setError] = useState("");

    const GetRealisationAll = async () => {

        try {
            const data = await getAll();
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                setRealisations(data);
                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }
    };

    useEffect(() => {
        GetRealisationAll();

    }, [user.id_user])

    return (<>
            <NavBar login={user.login} droit={user.droit} />
            <div className="container-fluid d-flex flex-row">

                <div className="posteTravailInfo d-flex flex-row">
                    <div className="InformationPoste">
                        <div>
                            <h2> Historique</h2>
                            <div className={error == "" ? "d-none" : "alert alert-danger mt-3"} role="alert">
                                {error == "" ? "" : error}
                            </div>

                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col"  >Opération</th>
                                    <th scope="col"  >Date</th>
                                    <th scope="col"  >Agent</th>
                                    <th scope="col"  >Machine</th>
                                    <th scope="col" >Poste</th>

                                </tr>
                                </thead>
                                <tbody>
                                {realisations.length > 0 && realisations.map((realisation, cpt) => {
                                    return (
                                        <tr className="align-middle">

                                            <th scope="row"> {realisation.id_realisation}</th>
                                            <td>{realisation.nomoperation}</td>
                                            <td>{realisation.date}</td>
                                            <td>{realisation.user}</td>
                                            <td>{realisation.nomMachine}</td>
                                            <td>{realisation.nomPoste}</td>


                                        </tr>
                                    )

                                })}

                                </tbody>
                            </table>




                        </div>
                    </div>
                </div>
            </div>

        </>
    )


}