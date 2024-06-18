import React, { useState, useEffect } from 'react';
import NavBar from "../components/navbar.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getUser} from '../model/user.js'
import { getHabilitationByUser} from '../model/habilitation.js'
import { getGammeByUser} from '../model/gamme.js'

export function InformationP(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [error, setError] = useState("");
    const [userCour, setUserCour] = useState("");
    const [habilitations, sethabilitations] = useState("");
    const [gammes, setGammes] = useState("");

    useEffect(() => {
        const GetUser = async () => {

            try {
                const data = await getUser(user.id_user);
                if(data == "400"){
                    console.log("data/error : ", data.status);
                    setError("Récupération d'information sur le compte impossible." )
                }
                else{
                    //console.log(" je regarde dans mon utilisateur" + data)
                    setUserCour(data);
                }
            } catch (error) {
                console.error("Erreur lors de la connexion :", error);
            }

        };
        const getHabilitation = async () => {

            try {
                const data = await getHabilitationByUser(user.id_user);
                if(data == "400"){
                    console.log("data/error : ", data.status);
                    setError("Récupération d'information sur les habilitations." )
                }
                else{
                    //console.log(" je regarde dans mes habilitations" + data)
                    sethabilitations(data);
                }
            } catch (error) {
                console.error("Erreur lors de la connexion :", error);
            }

        };
        const getGamme = async () => {

            try {
                const data = await getGammeByUser(user.id_user);
                if(data == "400"){
                    console.log("data/error : ", data.status);
                    setError("Récupération d'information sur les habilitations." )
                }
                else{
                    console.log(" je regarde dans mes gammes" + data)
                    setGammes(data);
                }
            } catch (error) {
                console.error("Erreur lors de la connexion :", error);
            }

        };
        GetUser();
        getHabilitation();
        getGamme();
    }, [user.id_user])


    return (<>
            <NavBar login={user.login} droit={user.droit} />
            <div className="container-md">

                <div >
                    <h2> Information</h2>

                    <div className="information " >

                        <div className="d-flex flex-row">
                            <div className="row g-3 align-items-center m-2">
                                <div className="col-auto">
                                    <label htmlFor="inputPassword6" className="col-form-label">Login</label>
                                </div>
                                <div className="col-auto">
                                    <input type="password" id="inputPassword6" className="form-control"
                                           aria-describedby="passwordHelpInline" placeholder={userCour.login} disabled></input>
                                </div>

                            </div>

                            <div className="row g-3 align-items-center m-2">
                                <div className="col-auto">
                                    <label htmlFor="inputPassword6" className="col-form-label"> Nom </label>
                                </div>
                                <div className="col-auto">
                                    <input type="password" id="inputPassword6" className="form-control"
                                           aria-describedby="passwordHelpInline" placeholder={userCour.nom} disabled></input>
                                </div>

                            </div>

                            <div className="row g-3 align-items-center m-2">
                                <div className="col-auto">
                                    <label htmlFor="inputPassword6" className="col-form-label" >Prénom</label>
                                </div>
                                <div className="col-auto">
                                    <input type="password" id="inputPassword6" className="form-control"
                                           aria-describedby="passwordHelpInline" placeholder={userCour.prenom} disabled></input>
                                </div>

                            </div>
                        </div>

                        <div className="d-flex flex-row">
                            <div className="row g-3 align-items-center m-2">
                                <div className="col-auto">
                                    <label htmlFor="inputPassword6" className="col-form-label">Rôle</label>
                                </div>
                                <div className="col-auto">
                                    <input type="password" id="inputPassword6" className="form-control"
                                           aria-describedby="passwordHelpInline" placeholder={userCour.droit} disabled></input>
                                </div>

                            </div>

                            <div className="row g-3 align-items-center m-2">
                                <div className="col-auto">
                                    <label htmlFor="inputPassword6" className="col-form-label"> Email </label>
                                </div>
                                <div className="col-auto">
                                    <input type="password" id="inputPassword6" className="form-control"
                                           aria-describedby="passwordHelpInline" placeholder={userCour.email} ></input>
                                </div>

                            </div>

                        </div>


                    </div>

                </div>

                <div className="mt-3">
                    <h2> Habilitation </h2>
                    <div className="information">
                        <table className="table table-striped m-2">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Poste</th>

                            </tr>
                            </thead>
                            <tbody>

                            {habilitations.length > 0 && habilitations.map((habilitation, cpt) => {
                                return (
                                    <tr>
                                        <th scope="row">{habilitation.id_poste}</th>
                                        <td >{habilitation.nom}</td>

                                    </tr>
                                )

                            })}

                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="mt-3">
                    <h2> Responsable </h2>
                    <div className="information">
                        <table className="table table-striped m-2">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Gamme</th>
                                <th scope="col">Prix</th>
                                <th scope="col">Type</th>

                            </tr>
                            </thead>
                            <tbody>

                            {gammes.length > 0 && gammes.map((gamme, cpt) => {
                                return (
                                    <tr>
                                        <th scope="row">{gamme.id_gamme}</th>
                                        <td >{gamme.libelle}</td>
                                        <td >{gamme.prix}</td>
                                        <td >{gamme.type}</td>

                                    </tr>
                                )

                            })}

                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

        </>
    );
}