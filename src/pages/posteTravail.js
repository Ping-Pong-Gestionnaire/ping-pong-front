import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from "../components/navbar.js";
import React, {useEffect, useState} from "react";
import { getAllPoste, getOnePoste, getMachineByPoste, modifPoste, suppPoste, creaPoste} from '../model/poste.js'
import { suppPosteMachine } from '../model/machine.js'
// import { Toast } from 'bootstrap'
import {getUser} from "../model/user";



export function PosteTravail(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [postes, setPostes] = useState("");
    const [infoPoste, setInfoPoste] = useState("");
    const [machines, setMachines] = useState("");
    const [error, setError] = useState("");
    const [errorModal, setErrorModal] = useState("");
    const [inputNom, setInputNom] = useState('');


    const handleChangeNom = (event) => {
        console.log("mon handle change");
        setInputNom(event.target.value);
    };


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
                setError("" )
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    useEffect(() => {
        GetAllPoste();
    }, [user.id_user])


    const GetInfoPoste = async (id) => {
        console.log("jedemande a changer")
        try {
            const data = await getOnePoste(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                console.log(" je regarde dans mon poste" + data)
                setInfoPoste(data);
                setInputNom(data.nom)
                setError("" )
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
                setError("" )
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };
    const suppMachine = async (id) => {
        // const toastLiveExample = document.getElementById('liveToast')
        // const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample)

        try {
            const data = await suppPosteMachine(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                setError("Impossible de supprimer la machine." )
            }
            else{
                console.log("C'est supprimerrr" + data)
                console.log("L'id poste actuel " + infoPoste.id_poste)
                var id_btn = "btnclosemodal" + id
                // Ferme la modal
                var closeModalBtn = document.getElementById(id_btn);
                closeModalBtn.click();

                setError("" )
                GetInfoPoste(infoPoste.id_poste)


            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };
   const modificationPoste = async (id, nom) => {

        if( nom != "" ) {
            try {
               const data = await modifPoste(id, nom);
                if(data == "400"){
                    setError("Il y a eu une erreur sur la modification du poste." )
                }
                else{
                    setError("" )
                    GetInfoPoste(infoPoste.id_poste)
                    GetAllPoste()

                }
            } catch (error) {
                setError("Il y a eu une erreur sur la modification du poste." )
            }
        }
        else{
            setError("Le nom de poste doit être renseigné." )
        }


    };

    const suppressionPoste = async (id) => {

        try {
            const data = await suppPoste(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                setError("Il y a eu une erreur sur la suppression du poste." )
            }
            else{

                // Ferme la modal
                var closeModalBtn = document.getElementById("btnclosemodalPoste");
                closeModalBtn.click();
                setError("" );
                setInfoPoste("");
                setInputNom("");
                GetAllPoste();

            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    const ajoutPoste = async () => {
        console.log("test je clic")
        var nom = document.getElementById("nomPosteAjout").value;
        console.log(nom)

        if( nom != ""){
            try {
                const data = await creaPoste(nom);
                if(data == "400"){
                    console.log("data/error : ", data.status);
                    setErrorModal("Nom de poste déjà utilisé." )
                }
                else{

                    // Ferme la modal
                    var closeModalBtn = document.getElementById("btnclosemodalPosteAjout");
                    closeModalBtn.click();
                    setErrorModal("" );
                    setInfoPoste("");
                    setInputNom("");
                    GetAllPoste();

                }
            } catch (error) {
                console.error("Erreur lors de la recherche de poste :", error);
            }
        }
        else{
            setErrorModal("Vous devez remplir tous les champs." )
        }


    };


    return (<>
            <NavBar login={user.login} droit={user.droit} />
            <div className="container-fluid d-flex flex-row">

                <div className="tableauPoste border-end">

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
                <div className="posteTravailInfo d-flex flex-row">
                    <div className="InformationPoste">
                        <div>
                            <h2> Poste de travail</h2>

                            <div className={infoPoste == "" ? "information d-none" : "information"}>
                                <div className={error == "" ? "d-none" : "alert alert-danger mt-3"} role="alert">
                                    {error == "" ? "" : error}
                                </div>
                                <div className="d-flex flex-row">

                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6"
                                                   className="col-form-label">Identifiant </label>
                                        </div>

                                        <div className="col-auto">
                                            <input type="text" id="idPoste" className="form-control"
                                                   aria-describedby="passwordHelpInline"
                                                   value={infoPoste.id_poste == undefined ? "" : infoPoste.id_poste}
                                                   disabled></input>
                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label">Libellé </label>
                                        </div>

                                        <div className="col-auto">
                                            <input type="text" id="nomPoste" className="form-control"
                                                   aria-describedby="passwordHelpInline"
                                                   value={inputNom}  onChange={handleChangeNom}  ></input>
                                        </div>
                                    </div>


                                </div>


                            </div>
                        </div>
                        <div className={infoPoste == "" ? " d-none" : "mt-3"}>
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
                                            <td>{machine.nom}</td>
                                            <td>
                                                <p data-bs-toggle="dropdown" aria-expanded="false" className="pt-3">
                                                    <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical"
                                                                     className="icone3pts" size="lg"/>

                                                </p>

                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" data-bs-toggle="modal"
                                                           data-bs-target={"#supp" + machine.id_machine}>Supprimer</a>
                                                    </li>
                                                    <li><a className="dropdown-item" href="#">Suivre</a></li>
                                                </ul>


                                                <div className="modal fade" id={"supp" + machine.id_machine}
                                                     tabIndex="-1" aria-labelledby="exampleModalLabel"
                                                     aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h1 className="modal-title fs-5"
                                                                    id="exampleModalLabel">Suppression</h1>
                                                                <button type="button" className="btn-close"
                                                                        id={"btnclosemodal" + machine.id_machine}
                                                                        data-bs-dismiss="modal"
                                                                        aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                Etes-vous sur de vouloir supprimer du poste
                                                                "{infoPoste.nom}" la machine "{machine.nom}" ?

                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary"
                                                                        id={"boutonferme" + machine.id_machine}
                                                                        data-bs-dismiss="modal">Annuler
                                                                </button>
                                                                <button type="button" className="btn btn-danger"
                                                                        onClick={() => {
                                                                            suppMachine(machine.id_machine)
                                                                        }}>Supprimer
                                                                </button>
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

                    <div className="actionPoste d-flex flex-column">
                        <div className="text-center mt-4">
                            <p className="dropdown-item" data-bs-toggle="modal" data-bs-target="#ajoutPoste">
                                <FontAwesomeIcon icon="fa-solid fa-plus " className="hoverColor" size="2xl"/>
                            </p>
                        </div>
                        <div className="text-center mt-4">
                            <FontAwesomeIcon icon="fa-solid fa-floppy-disk "  className="hoverColor"size="2xl" onClick={() => { modificationPoste(infoPoste.id_poste, inputNom) }}/>
                        </div>
                        <div className="text-center mt-4">
                            <FontAwesomeIcon icon="fa-solid fa-x"   className="hoverColor"size="2xl" onClick={() => {  GetInfoPoste(infoPoste.id_poste) }}/>
                        </div>

                        <div className="text-center mt-4">
                            <p className="dropdown-item" data-bs-toggle="modal" data-bs-target="#suppPoste">
                                <FontAwesomeIcon icon="fa-solid fa-trash "  className="hoverColor" size="2xl"/>
                            </p>
                        </div>

                        <div className="modal fade" id="ajoutPoste"
                             tabIndex="-1" aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5"
                                            id="exampleModalLabel">Création poste</h1>
                                        <button type="button" className="btn-close"
                                                id="btnclosemodalPosteAjout"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className={errorModal == "" ? "d-none" : "alert alert-danger mt-3"} role="alert">
                                            {errorModal == "" ? "" : errorModal}
                                        </div>
                                        <div className="row g-3 align-items-center m-2">
                                            <div className="col-auto">
                                                <label htmlFor="inputPassword6" className="col-form-label">Libellé : </label>
                                            </div>

                                            <div className="col-auto">
                                                <input type="text" id="nomPosteAjout" className="form-control"
                                                       aria-describedby="passwordHelpInline"></input>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                id="boutonferme"
                                                data-bs-dismiss="modal">Annuler
                                        </button>
                                        <button type="button" className="btn btn-success" onClick={() => { ajoutPoste() }}>Créer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade" id="suppPoste"
                             tabIndex="-1" aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5"
                                            id="exampleModalLabel">Suppression</h1>
                                        <button type="button" className="btn-close"
                                                id="btnclosemodalPoste"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        Etes-vous sur de vouloir supprimer le poste ?

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                id="boutonferme"
                                                data-bs-dismiss="modal">Annuler
                                        </button>
                                        <button type="button" className="btn btn-danger"
                                                onClick={() => {suppressionPoste(infoPoste.id_poste) }}>Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">

                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    Hello, world! This is a toast message.
                </div>
            </div>
        </div>

    </>
    );
}