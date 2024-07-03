import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from "../components/navbar.js";
import React, { useEffect, useState } from "react";
import { suppPosteMachine , getMachineByName, getALlMachine , getOneMachine, suppMachine, modifMachine, creaMachine , getListePoste} from '../model/machine.js'
import {getAllPoste, getListeMachine} from "../model/poste";
import { creaListeMP, suppListeMP} from '../model/listeMP.js'
import {useLocation, useNavigate} from 'react-router-dom';


export function MachineAdministration(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    // navigation --------------------------------------------------------------
    const navigate = useNavigate();

    const redirectToAboutPage = (id_poste) => {
        localStorage.setItem('idPoste', id_poste);
        navigate('/posteTravail');
    };

    const [machines, setMachines] = useState("");
    const [postes, setPostes] = useState("");
    const [postesAll, setPostesAll] = useState("");
    const [infoMachine, setInfoMachine] = useState("");
    const [infoRedirect, setInfoRedirect] = useState("");

    const [error, setError] = useState("");
    const [errorModal, setErrorModal] = useState("");

    const [inputChangeNom, setInputChangeNom] = useState('');

    const [inputLibelle, setInputLibelle] = useState('');
    const [inputIdPoste, setInputIdPoste] = useState('');
    const [inputLibelleCrea, setInputLibelleCrea] = useState('');
    const [inputIdPosteCrea, setInputIdPosteCrea] = useState('');

    const [inputPoste, setInputPoste] = useState('');
    const [paramIdMachine, setParam_IdMachine] = useState('');


    useEffect(() => {
        const param_IdMachine =  localStorage.getItem('idMachine');
        if (param_IdMachine != undefined) {
            GetInfoMachine(param_IdMachine)
            setParam_IdMachine(param_IdMachine)
        }
    }, [localStorage]);


    const handleLibelle = (event) => {
        setInputLibelle(event.target.value);
    };
    const handleIdPoste = (event) => {
        setInputIdPoste(event.target.value);
    };
    const handleLibelleCrea = (event) => {
        setInputLibelleCrea(event.target.value);
    };
    const handleIdPosteCrea = (event) => {
        setInputIdPosteCrea(event.target.value);
    };

    const handleChangePoste = (event) => {
        setInputPoste(event.target.value);
    };


    const GetGammeByN = async (name) => {

        try {
            const data = await getMachineByName(name);
            if (data == "400") {
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                console.log(" je regarde dans mon poste" + data)
                setMachines(data);
                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste par name :", error);
        }

    };

    // Affichage toutes gamme ------------------------------------------------------------------------------------------
    const GetMachineAll = async () => {

        try {
            const data = await getALlMachine();
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                setMachines(data);
                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    // recherche gamme -------------------------------------------------------------------------------------------------
    const handleChangeNom = (event) => {
        console.log(event.target.value);

        if(  event.target.value == ""){
            GetMachineAll()
        }else{
            GetGammeByN(event.target.value)
        }
        setInputChangeNom(event.target.value);
    };

    // affichage -------------------------------------------------------------------------------------------------------

    const GetInfoMachine = async (id) => {
        console.log("jedemande a changer")
        try {
            const data = await getOneMachine(id);
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                //console.log(" je regarde dans mon poste" + data)
                setInfoMachine(data);
                setInputLibelle(data.nom)
                setInputPoste("")

                if(data.id_poste != null){
                    setInputIdPoste(data.id_poste)
                }else{
                    setInputIdPoste("null")
                }

                setError("");
                setErrorModal("");

            }
        } catch (error) {
            setError("Erreur récupération info de gamme.")
            console.error("Erreur lors de la recherche de machine :", error);
        }

        try {
            const data = await getListePoste(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                setPostes(data);
                setError("" )
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de liste poste:", error);
        }

        // si il y a un local storage on l'enleve
        if (paramIdMachine !== "") {
            setParam_IdMachine("")
            localStorage.removeItem('idMachine');
        }

    };

    // tableau de poste ------------------------------------------------------------------------------------------------

    const GetAllPoste = async () => {

        try {
            const data = await getAllPoste();
            if(data == "400"){
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                console.log(" je regarde dans mon poste" + data)
                setPostesAll(data);
                setError("" )
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    const location = useLocation();
    const param_IdMachine = location.state?.idMachine;

    useEffect(() => {
        GetMachineAll();
        GetAllPoste();

    }, [user.id_user])


    // tableau de poste ------------------------------------------------------------------------------------------------
    const suppressionMachine = async (id) => {

        try {
            const data = await suppMachine(id);
            if (data == "400") {
                console.log("data/error : ", data.status);
                setErrorModal("Impossible de supprimer la machine, un ou plusieurs postes l'utilisent ou une opération à été effectué avec")
            }
            else {
                var id_btn = "btnclosemodalPoste"
                // Ferme la modal
                var closeModalBtn = document.getElementById(id_btn);
                closeModalBtn.click();

                setError("");
                setErrorModal("");
                setInfoMachine("");
                setInputLibelle("")
                setInputIdPoste("")
                GetMachineAll();

            }
        } catch (error) {
            console.error("Erreur lors de la suppression de poste :", error);
        }

    };

    const modificationMachine = async () => {

        // vérification
        if (inputLibelle != "" ) {

            try {
                var data = ""
                if(inputIdPoste == "null"){
                    data = await modifMachine(infoMachine.id_machine, inputLibelle, null);
                }else{
                     data = await modifMachine(infoMachine.id_machine, inputLibelle, inputIdPoste);
                }

                if (data == "400") {
                    setError("Il y a eu une erreur sur la modification de la machine.")
                } else {
                    setError("")
                    GetInfoMachine(infoMachine.id_machine)
                    GetMachineAll()

                }
            } catch (error) {
                setError("Il y a eu une erreur sur la modification du poste.")
                console.log(error)
            }
        }
        else {
            setError("Tous les champs doivent être renseignés.")
        }
    };
    const ajoutMachine = async () => {

        if (inputLibelleCrea != "") {
            try {
                var data = ""
                if(inputIdPosteCrea == "null"){
                    data = await creaMachine(inputLibelleCrea, null);
                }else{
                    data = await creaMachine(inputLibelleCrea, inputIdPosteCrea);
                }
                if (data == "400") {
                    console.log("data/error : ", data.status);
                    setErrorModal("Nom de machine déjà utilisé.")
                }
                else {

                    // Ferme la modal
                    var closeModalBtn = document.getElementById("btnclosemodalPosteAjout");
                    closeModalBtn.click();
                    setErrorModal("");

                    setInfoMachine("");
                    GetMachineAll()

                }
            } catch (error) {
                console.error("Erreur lors de l'ajout de poste :", error);
            }
        }
        else {
            setErrorModal("Vous devez remplir tous les champs.")
        }

    };

    const ajoutPoste = async () =>{

        try {
            const data = await creaListeMP( infoMachine.id_machine, inputPoste);

            if (data == "400") {
                console.log("data/error : ", data.status);
                setError("Impossible d'ajouter' l'opération.")
            }
            else {
                var id_btn = "btnclosemodalGamme"
                // Ferme la modal
                const btnclose = document.getElementById("btnclosemodalInListeCrea" );
                btnclose.click();

                setErrorModal("");
                GetInfoMachine(infoMachine.id_machine)

            }
        } catch (error) {
            console.error("Erreur lors de la recherche d'opération :", error);
        }

    }
    const suppPoste = async (id) => {
        try {
            const data = await suppListeMP(infoMachine.id_machine, id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                setError("Impossible de supprimer la machine." )
            }
            else{
                var id_btn = "btnclosemodal" + id
                // Ferme la modal
                var closeModalBtn = document.getElementById(id_btn);
                closeModalBtn.click();

                setError("" )
                GetInfoMachine(infoMachine.id_machine)


            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };


    return (<>
            <NavBar login={user.login} droit={user.droit} />
            <div className="container-fluid d-flex flex-row">

                <div className="tableauPoste border-end">

                    <table className="table table-hover table-fixed">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" className="fixed-td" >machine</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="fixed-td"></td>
                            <td className="fixed-td2" >
                                <input type="text" id="rechercheGammeNom" className="form-control rechercheInput"
                                       aria-describedby="passwordHelpInline"
                                       value={inputChangeNom} onChange={handleChangeNom}  ></input>
                            </td>

                        </tr>
                        {machines.length > 0 && machines.map((machine, cpt) => {
                            return (
                                <tr onClick={() => {GetInfoMachine(machine.id_machine) }}>
                                    <th scope="row">{machine.id_machine}</th>
                                    <td >{machine.nom}</td>
                                </tr>
                            )
                        })}

                        </tbody>
                    </table>
                </div>
                <div className="posteTravailInfo d-flex flex-row">
                    <div className="InformationPoste">
                        <div >
                            <h2> Machine {infoRedirect}</h2>

                            <div  className={infoMachine == "" ? "information d-none" : "information"}>
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
                                                   value={infoMachine.id_machine}
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
                                                   value={inputLibelle} onChange={handleLibelle}
                                            ></input>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>

                        <div className={infoMachine == "" ? " d-none" : "mt-3"}>
                            <h2>Poste</h2>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Poste</th>
                                    <th scope="col" className="tab3pts">
                                        <p className='hoverColor ajoutTab' data-bs-toggle="modal"
                                           data-bs-target="#ajoutInListe"  >
                                            <FontAwesomeIcon icon="fa-solid fa-plus" />
                                        </p>
                                    </th>

                                </tr>
                                </thead>
                                <tbody>
                                {postes.length > 0 && postes.map((poste, cpt) => {
                                    return (
                                        <tr className="align-middle">

                                            <th scope="row"> {poste.id_poste}</th>
                                            <td>{poste.nom}</td>
                                            <td>
                                                <p data-bs-toggle="dropdown" aria-expanded="false" className="pt-3">
                                                    <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical"
                                                                     className="icone3pts" size="lg"/>

                                                </p>

                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" data-bs-toggle="modal" href=""
                                                           data-bs-target={"#supp" + poste.id_poste}>Supprimer</a>
                                                    </li>
                                                    <li><a className="dropdown-item" href=""
                                                           onClick={() => {
                                                               redirectToAboutPage(poste.id_poste)
                                                           }} >Suivre</a></li>
                                                </ul>


                                                <div className="modal fade" id={"supp" + poste.id_poste}
                                                     tabIndex="-1" aria-labelledby="exampleModalLabel"
                                                     aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h1 className="modal-title fs-5"
                                                                    id="exampleModalLabel">Suppression</h1>
                                                                <button type="button" className="btn-close"
                                                                        id={"btnclosemodal" +poste.id_poste}
                                                                        data-bs-dismiss="modal"
                                                                        aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                Etes-vous sur de vouloir supprimer la machine du poste ?

                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary"
                                                                        id={"boutonferme" + poste.id_poste}
                                                                        data-bs-dismiss="modal">Annuler
                                                                </button>
                                                                <button type="button" className="btn btn-danger"
                                                                        onClick={() => {
                                                                            suppPoste(poste.id_poste)
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
                            <div className="modal fade" id="ajoutInListe"
                                 tabIndex="-1" aria-labelledby="exampleModalLabel"
                                 aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5"
                                                id="exampleModalLabel">Ajout poste</h1>
                                            <button type="button" className="btn-close"
                                                    id={"btnclosemodalInListeCrea"}
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className={errorModal == "" ? "d-none" : "alert alert-danger mt-3"} role="alert">
                                                {errorModal == "" ? "" : errorModal}
                                            </div>

                                            <div className="row g-3 align-items-center m-2">
                                                <div className="col-auto">
                                                    <label htmlFor="inputPassword6"
                                                           className="col-form-label">Poste  </label>
                                                </div>

                                                <div className="col-auto">
                                                    <select
                                                        className="form-select form-control"
                                                        aria-label="Default select example"
                                                        onChange={handleChangePoste}
                                                        value={inputPoste} // Définir la valeur sélectionnée
                                                    >
                                                        <option >Sélectionner une machine </option>
                                                        {postesAll.length > 0 && postesAll.map((poste, cpt) => {
                                                            return (
                                                                <option value={poste.id_poste}>{poste.nom}</option>
                                                            )

                                                        })}
                                                    </select>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                    data-bs-dismiss="modal">Annuler
                                            </button>
                                            <button type="button" className="btn btn-success"
                                                    onClick={() => {
                                                        ajoutPoste()
                                                    }}>Ajouter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="actionPoste d-flex flex-column">
                        <div className="text-center mt-4">
                            <p className="dropdown-item" data-bs-toggle="modal" data-bs-target="#ajoutPoste">
                                <FontAwesomeIcon icon="fa-solid fa-plus " className="hoverColor" size="2xl" />
                            </p>
                        </div>
                        <div className="text-center mt-4">
                            <FontAwesomeIcon icon="fa-solid fa-floppy-disk " className="hoverColor" size="2xl" onClick={() => { modificationMachine() }} />
                        </div>
                        <div className="text-center mt-4">
                            <FontAwesomeIcon icon="fa-solid fa-x" className="hoverColor" size="2xl" onClick={() => { GetInfoMachine(infoMachine.id_machine) }} />
                        </div>

                        <div className="text-center mt-4">
                            <p className="dropdown-item" data-bs-toggle="modal" data-bs-target="#suppPoste">
                                <FontAwesomeIcon icon="fa-solid fa-trash " className="hoverColor" size="2xl" />
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
                                                       aria-describedby="passwordHelpInline"
                                                       onChange={handleLibelleCrea}
                                                       value={inputLibelleCrea}></input>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                id="boutonferme"
                                                data-bs-dismiss="modal">Annuler
                                        </button>
                                        <button type="button" className="btn btn-success" onClick={() => { ajoutMachine()}}>Créer
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
                                        <div className={errorModal == "" ? "d-none" : "alert alert-danger mt-3"} role="alert">
                                            {errorModal == "" ? "" : errorModal}
                                        </div>

                                        Etes-vous sur de vouloir supprimer la machine ?

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                id="boutonferme"
                                                data-bs-dismiss="modal">Annuler
                                        </button>
                                        <button type="button" className="btn btn-danger"
                                                onClick={() => { suppressionMachine(infoMachine.id_machine)}}>Supprimer
                                        </button>
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