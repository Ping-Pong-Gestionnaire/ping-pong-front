import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from "../components/navbar.js";
import React, {useEffect, useState} from "react";
import { getAllPoste, getOnePoste, getMachineByPoste} from '../model/poste.js'
import {getUser} from "../model/user";


export function PosteTravail(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [postes, setPostes] = useState("");
    const [infoPoste, setInfoPoste] = useState("");
    const [machines, setMachines] = useState("");

    useEffect(() => {
        const GetAllPoste = async () => {

            try {
                const data = await getAllPoste();
                if(data == "400"){
                    console.log("data/error : ", data.status);
                    //setError("Récupération d'information sur le compte impossible." )
                }
                else{
                    console.log(" je regarde dans mon poste" + data)
                    setPostes(data);
                }
            } catch (error) {
                console.error("Erreur lors de la recherche de poste :", error);
            }

        };

        GetAllPoste();
    }, [user.id_user])

    const GetInfoPoste = async (id) => {

        try {
            const data = await getOnePoste(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                console.log(" je regarde dans mon poste" + data)
                setInfoPoste(data);
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

        try {
            const data = await getMachineByPoste(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                console.log(" je regarde dans mon poste" + data)
                setMachines(data);
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }


    };
    const suppMachine = async (id) => {

        try {
            const data = await getOnePoste(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                console.log(" je regarde dans mon poste" + data)
                setInfoPoste(data);
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }



    };



    return (<>
            <NavBar login={user.login} droit={user.droit} />
            <div className="container d-flex flex-row">

                <div className="tableauPoste">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Poste</th>
                        </tr>
                        </thead>
                        <tbody>
                            {postes.length > 0 && postes.map((poste, cpt) => {
                                return (
                                    <tr onClick={() => { GetInfoPoste(poste.id_poste) }}>
                                        <th scope="row">{poste.id_poste}</th>
                                        <td >{poste.nom}</td>

                                    </tr>
                                )

                            })}

                        </tbody>
                    </table>
                </div>
                <div className="posteTravailInfo">
                    <div>
                        <h2> Poste de travail</h2>

                        <div className="information " >

                            <div className="d-flex flex-row">
                                <div className="row g-3 align-items-center m-2">
                                    <div className="col-auto">
                                        <label htmlFor="inputPassword6" className="col-form-label">Identifiant </label>
                                    </div>

                                    <div className="col-auto">
                                        <input type="text" id="inputPassword6" className="form-control"
                                               aria-describedby="passwordHelpInline" value={infoPoste.id_poste == undefined ? "" : infoPoste.id_poste } disabled></input>
                                    </div>
                                </div>
                                <div className="row g-3 align-items-center m-2">
                                    <div className="col-auto">
                                        <label htmlFor="inputPassword6" className="col-form-label">Libellé </label>
                                    </div>

                                    <div className="col-auto">
                                        <input type="text" id="inputPassword6" className="form-control"
                                               aria-describedby="passwordHelpInline" value={infoPoste.nom  == undefined ? "" : infoPoste.nom } ></input>
                                    </div>
                                </div>



                            </div>


                        </div>
                    </div>
                    <div className="mt-3 ">
                        <h2>Machines</h2>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Machine</th>
                                <th scope="col" className="tab3pts"></th>

                            </tr>
                            </thead>
                            <tbody>
                            {machines.length > 0 && machines.map((machine, cpt) => {
                                return (
                                    <tr className="align-middle">

                                        <th scope="row"> {machine.id_machine}</th>
                                        <td >{machine.nom}</td>
                                        <td>
                                            <p data-bs-toggle="dropdown" aria-expanded="false" className="pt-3">
                                                <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical"  className="icone3pts" size="lg"/>

                                            </p>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item"  data-bs-toggle="modal" data-bs-target={"#supp" +machine.id_machine}>Supprimer</a></li>
                                                <li><a className="dropdown-item" href="#">Suivre</a></li>
                                            </ul>


                                            <div class="modal fade" id={"supp" +machine.id_machine} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Suppression</h1>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            Etes-vous sur de vouloir supprimer du poste "{infoPoste.nom}" la machine "{machine.nom}" ?

                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                                            <button type="button" class="btn btn-danger" onClick={() => { suppMachine(machine.id_machine) }} >Supprimer</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </td>

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