import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from "../components/navbar.js";
import React, { useEffect, useState } from "react";
import {
    getOperationAll,
    getOperationByName,
    getGetOneOperation,
    suppOperation,
    modifOperation,
    creaOperation
} from '../model/operation.js'
import {getALlMachine, getOneMachine, modifMachine, suppMachine} from "../model/machine";
import {getAllPoste} from "../model/poste";
import {creaRealisation} from "../model/realisation";


export function OperationAdministration(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [operations, setOperations] = useState("");
    const [infoOperation, setInfoOperation] = useState("");
    const [machines, setMachines] = useState("");
    const [postes, setPostes] = useState("");

    const [error, setError] = useState("");
    const [errorModal, setErrorModal] = useState("");

    const [inputChangeNom, setInputChangeNom] = useState('');

    const [inputLibelle, setInputLibelle] = useState('');
    const [inputTempsRea, setInputTempsRea] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [inputIdMachine, setInputIdMachine] = useState('');
    const [inputIdPoste, setInputIdPoste] = useState('');

    const [inputLibelleCrea, setInputLibelleCrea] = useState('');
    const [inputTempsReaCrea, setInputTempsReaCrea] = useState('');
    const [inputDescriptionCrea, setInputDescriptionCrea] = useState('');
    const [inputIdMachineCrea, setInputIdMachineCrea] = useState('');
    const [inputIdPosteCrea, setInputIdPosteCrea] = useState('');

    const [inputTempsReaRea, setInputTempsReaRea] = useState('');
    const [inputDateRea, setInputDateRea] = useState('');
    const [inputIdMachineRea, setInputIdMachineRea] = useState('');
    const [inputIdPosteRea, setInputIdPosteRea] = useState('');

    const handleChangeNom = (event) => {

        if(  event.target.value == ""){
            GetAllOperation()
        }else{
            GetOperationByN(event.target.value)
        }
        setInputChangeNom(event.target.value);
    };

    const isNumeric = (value) => {
        return /^-?\d+(\.\d+)?$/.test(value);
    };

    const handleLibelle = (event) => {
        setInputLibelle(event.target.value);
    };
    const handleTempsRea = (event) => {
        if(event.target.value != ""){
            if (isNumeric(event.target.value)) {
                setInputTempsRea(event.target.value);
                setError("")
            }
            else {
                setError("Le champ Temps Réalisation doit être numérique.")
            }
        }else{
            setInputTempsRea(event.target.value);
        }

    };
    const handleDescription = (event) => {
        setInputDescription(event.target.value);
    };
    const handleIdMachine = (event) => {
        setInputIdMachine(event.target.value);
    };
    const handleIdPoste = (event) => {
        setInputIdPoste(event.target.value);
    };

    const handleLibelleCrea = (event) => {
        setInputLibelleCrea(event.target.value);
    };
    const handleTempsReaCrea = (event) => {
        if(event.target.value != ""){
            if (isNumeric(event.target.value)) {
                setInputTempsReaCrea(event.target.value);
                setErrorModal("")
            }
            else {
                setErrorModal("Le champ Temps Réalisation doit être numérique.")
            }
        }else{
            setInputTempsReaCrea(event.target.value);
        }

    };
    const handleDescriptionCrea = (event) => {
        setInputDescriptionCrea(event.target.value);
    };
    const handleIdMachineCrea = (event) => {
        setInputIdMachineCrea(event.target.value);
        if(event.target.value != ""){
            GetInfoMachine(event.target.value)
        }

    };
    const handleIdDateRea = (event) => {
        setInputDateRea(event.target.value)
    };
    const handleTempsReaRea = (event) => {
        if(event.target.value != ""){
            if (isNumeric(event.target.value)) {
                setInputTempsReaRea(event.target.value);
                setErrorModal("")
            }
            else {
                setErrorModal("Le champ Temps Réalisation doit être numérique.")
            }
        }else{
            setInputTempsReaRea(event.target.value);
        }

    };
    const handleIdPosteRea = (event) => {
       setInputIdPosteRea(event.target.value)
    };
    const handleIdMachineRea = (event) => {
        setInputIdMachineRea(event.target.value)
    };


    const GetAllOperation = async () => {

        try {
            const data = await getOperationAll();
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                console.log(" je regarde dans mon poste" + data)
                setOperations(data);
                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    useEffect(() => {
        GetAllOperation();
        GetMachineAll()
        GetAllPoste()
    }, [user.id_user])

    const GetOperationByN = async (name) => {

        try {
            const data = await getOperationByName(name);
            if (data == "400") {
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                //console.log(" je regarde dans mon poste" + data)
                setOperations(data);
                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    // affichage -------------------------------------------------------------------------------------------------------

    const GetInfoOperation = async (id) => {
        console.log("jedemande a changer")
        try {
            const data = await getGetOneOperation(id);
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                //console.log(" je regarde dans mon poste" + data)
                setInfoOperation(data);
                setInputLibelle(data.libelle)
                setInputTempsRea(data.tempsRea)
                setInputDescription(data.description)
                setInputIdMachine(data.id_machine)
                setInputIdPoste(data.id_poste)

                setInputTempsReaRea(data.tempsRea)
                setInputIdMachineRea(data.id_machine)
                setInputIdPosteRea(data.id_poste)
                setInputDateRea("")

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

        // si il y a un local storage on l'enleve
        // if (param_IdMachine !== undefined) {
        //     localStorage.removeItem('idOperation');
        // }

    };

    // Info pour les inputs machine et poste -------------------------------------------------------------------------------------------------------
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
                setInputIdPosteCrea(data.id_poste)

                setError("");
                setErrorModal("");
            }
        } catch (error) {
            setErrorModal("Erreur récupération info de gamme.")
            console.error("Erreur lors de la recherche de machine :", error);
        }
    };

    // CRUD Opération -------------------------------------------------------------------------------------------------------

    const suppressionOperation = async (id) => {

        try {
            const data = await suppOperation(id);
            if (data == "400") {
                console.log("data/error : ", data.status);
                setErrorModal("Impossible de supprimer l'opération")
            }
            else {
                var id_btn = "btnclosemodalPoste"
                // Ferme la modal
                var closeModalBtn = document.getElementById(id_btn);
                closeModalBtn.click();

                setError("");
                setErrorModal("");
                setInfoOperation("");

                GetAllOperation();

            }
        } catch (error) {
            console.error("Erreur lors de la suppression de poste :", error);
        }

    };

    const modificationOperation = async () => {

        // vérification
        if (inputLibelle != "" && inputDescription  != "" && inputIdMachine  != "" && inputIdPoste  != "" && inputTempsRea  != "") {

            try {

                const data = await modifOperation(infoOperation.id_operation, inputLibelle , inputTempsRea , inputDescription , inputIdMachine , inputIdPoste  );
                if (data == "400") {
                    setError("Il y a eu une erreur sur la modification de la machine.")
                } else {
                    setError("")
                    GetInfoOperation(infoOperation.id_operation)
                    GetAllOperation()

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

    const ajoutOperation = async () => {

        if (inputLibelleCrea != "" && inputDescriptionCrea != "" && inputIdMachineCrea != "" && inputIdPosteCrea != "" && inputTempsReaCrea != "" +inputIdPosteCrea != "" ) {
            try {
                const data = await creaOperation( inputLibelleCrea, inputTempsReaCrea, inputDescriptionCrea, inputIdMachineCrea, inputIdPosteCrea );
                if (data == "400") {
                    console.log("data/error : ", data.status);
                    setErrorModal("Nom d'operation déjà utilisé.")
                }
                else {

                    // Ferme la modal
                    var closeModalBtn = document.getElementById("btnclosemodalPosteAjout");
                    closeModalBtn.click();
                    setErrorModal("");
                    GetAllOperation();

                }
            } catch (error) {
                console.error("Erreur lors de l'ajout d'opération :", error);
            }
        }
        else {
            setErrorModal("Vous devez remplir tous les champs.")
        }

    };

    // Ajout Réalisation -------------------------------------------------------------------------------------------------------
    const ajoutRealisation = async () => {

        if (inputDateRea != "" && inputIdMachineRea != "" && inputIdPosteRea!= "" && inputTempsReaRea != ""  ) {
            try {
                const data = await creaRealisation( inputTempsReaRea, inputDateRea, inputIdMachineRea, inputIdPosteRea, infoOperation.id_operation, user.id_user );
                if (data == "400") {
                    console.log("data/error : ", data.status);
                    setErrorModal("Un problème est parvenu lors de l'enregistrement de la réalisation.")
                }
                else {

                    // Ferme la modal
                    var closeModalBtn = document.getElementById("btnclosemodalPosteAjoutRea");
                    closeModalBtn.click();
                    setErrorModal("");

                }
            } catch (error) {
                console.error("Erreur lors de l'ajout d'opération :", error);
            }
        }
        else {
            setErrorModal("Vous devez remplir tous les champs.")
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
                            <th scope="col" className="fixed-td" >Opération</th>
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
                        {operations.length > 0 && operations.map((operation, cpt) => {
                            return (
                                <tr onClick={() => {GetInfoOperation(operation.id_operation) }}>
                                    <th scope="row">{operation.id_operation}</th>
                                    <td >{operation.libelle}</td>
                                </tr>

                            )

                        })}

                        </tbody>
                    </table>
                </div>
                <div className="posteTravailInfo d-flex flex-row">
                    <div className="InformationPoste">
                        <div >
                            <h2> Opération </h2>

                            <div  className={infoOperation == "" ? "information d-none" : "information"}>
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
                                                   value={infoOperation.id_operation == undefined ? "" : infoOperation.id_operation}
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
                                <h4 className="mt-4"> Information </h4>
                                <div className="d-flex flex-row">

                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6"
                                                   className="col-form-label">Temps de réalisation (min)</label>
                                        </div>

                                        <div className="col-auto">
                                            <input type="text" id="idPoste" className="form-control"
                                                   aria-describedby="passwordHelpInline"
                                                   value={inputTempsRea} onChange={handleTempsRea}
                                                   ></input>
                                        </div>

                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label">Machine </label>
                                        </div>

                                        <div className="col-auto">
                                            <select
                                                className="form-select form-control"
                                                aria-label="Default select example"
                                                onChange={handleIdMachine}
                                                value={inputIdMachine} // Définir la valeur sélectionnée
                                            >

                                                {machines.length > 0 && machines.map((machine, cpt) => {
                                                    return (
                                                        <option value={machine.id_machine}>{machine.nom}</option>
                                                    )

                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label">Poste </label>
                                        </div>

                                        <div className="col-auto">
                                            <select
                                                className="form-select form-control"
                                                aria-label="Default select example"
                                                onChange={handleIdPoste}
                                                value={inputIdPoste} // Définir la valeur sélectionnée
                                            >

                                                {postes.length > 0 && postes.map((poste, cpt) => {
                                                    return (
                                                        <option value={poste.id_poste}>{poste.nom} </option>
                                                    )

                                                })}
                                            </select>
                                        </div>
                                    </div>


                                </div>
                                <div className="d-flex flex-column">

                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6"
                                                   className="col-form-label">Description :</label>
                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto textAreaContainer">
                                            <textarea className="form-control" id="exampleFormControlTextarea1"
                                                      rows="3" value={inputDescription} onChange={handleDescription}>

                                            </textarea>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>

                    <div  className={infoOperation == "" ? "d-none" : "actionPoste d-flex flex-column"}>
                        <div className="text-center mt-4">
                            <p className="dropdown-item" data-bs-toggle="modal" data-bs-target="#ajoutPoste">
                                <FontAwesomeIcon icon="fa-solid fa-plus " className="hoverColor" size="2xl" />
                            </p>
                        </div>
                        <div className="text-center mt-4">
                            <FontAwesomeIcon icon="fa-solid fa-floppy-disk " className="hoverColor" size="2xl" onClick={() => { modificationOperation()}} />
                        </div>
                        <div className="text-center mt-4">
                            <FontAwesomeIcon icon="fa-solid fa-x" className="hoverColor" size="2xl" onClick={() => { GetInfoOperation(infoOperation.id_operation)}} />
                        </div>

                        <div className="text-center mt-4">
                            <p className="dropdown-item" data-bs-toggle="modal" data-bs-target="#suppPoste">
                                <FontAwesomeIcon icon="fa-solid fa-trash " className="hoverColor" size="2xl" />
                            </p>
                        </div>
                        <div className="text-center mt-4">
                            <p className="dropdown-item" data-bs-toggle="modal" data-bs-target="#ajoutOperation">
                                <FontAwesomeIcon icon="fa-solid fa-screwdriver-wrench" className="hoverColor" size="2xl" />
                            </p>

                        </div>


                        <div className="modal fade" id="ajoutPoste"
                             tabIndex="-1" aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5"
                                            id="exampleModalLabel">Création opération</h1>
                                        <button type="button" className="btn-close"
                                                id="btnclosemodalPosteAjout"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className={errorModal == "" ? "d-none" : "alert alert-danger mt-3"} role="alert">
                                            {errorModal == "" ? "" : errorModal}
                                        </div>
                                        <div className="row g-3 align-items-center m-2 ">
                                            <div className="col-auto creationTextOp">
                                                <label htmlFor="inputPassword6" className="col-form-label">Libellé </label>
                                            </div>

                                            <div className="col-auto creationTextOp">
                                                <input type="text" id="nomPoste" className="form-control"
                                                       aria-describedby="passwordHelpInline"
                                                       value={inputLibelleCrea} onChange={handleLibelleCrea}
                                                ></input>
                                            </div>
                                        </div>
                                        <div className="row g-3 align-items-center m-2 ">
                                            <div className="col-auto">
                                                <label htmlFor="inputPassword6"
                                                       className="col-form-label">Temps de réalisation (min)</label>
                                            </div>

                                            <div className="col-auto">
                                                <input type="text" id="idPoste" className="form-control"
                                                       aria-describedby="passwordHelpInline"
                                                       value={inputTempsReaCrea} onChange={handleTempsReaCrea}
                                                ></input>
                                            </div>

                                        </div>
                                        <div className="row g-3 align-items-center m-2">
                                            <div className="col-auto creationTextOp">
                                                <label htmlFor="inputPassword6" className="col-form-label">Machine </label>
                                            </div>

                                            <div className="col-auto creationTextOp">
                                                <select
                                                    className="form-select form-control"
                                                    aria-label="Default select example"
                                                    onChange={handleIdMachineCrea}
                                                    value={inputIdMachineCrea} // Définir la valeur sélectionnée
                                                >
                                                    <option value="">Sélectionner une machine</option>
                                                    {machines.length > 0 && machines.map((machine, cpt) => {
                                                        return (
                                                            <option value={machine.id_machine}>{machine.nom}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">

                                            <div className="row g-3 align-items-center m-2">
                                                <div className="col-auto">
                                                    <label htmlFor="inputPassword6"
                                                           className="col-form-label">Description :</label>
                                                </div>
                                            </div>
                                            <div className="row g-3 align-items-center m-2">
                                                <div className="col-auto textAreaContainerCrea">
                                            <textarea className="form-control" id="exampleFormControlTextarea1"
                                                      rows="3" value={inputDescriptionCrea} onChange={handleDescriptionCrea}>

                                            </textarea>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                id="boutonferme"
                                                data-bs-dismiss="modal">Annuler
                                        </button>
                                        <button type="button" className="btn btn-success" onClick={() => {
                                            ajoutOperation()
                                        }}>Créer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="ajoutOperation"
                             tabIndex="-1" aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5"
                                            id="exampleModalLabel">Réalisation</h1>
                                        <button type="button" className="btn-close"
                                                id="btnclosemodalPosteAjoutRea"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className={errorModal == "" ? "d-none" : "alert alert-danger mt-3"} role="alert">
                                            {errorModal == "" ? "" : errorModal}
                                        </div>
                                        <div className="row g-3 align-items-center m-2 ">
                                            <div className="col-auto creationTextOp">
                                                <label htmlFor="inputPassword6" className="col-form-label">Libellé </label>
                                            </div>

                                            <div className="col-auto creationTextOp">
                                                <input type="date" id="nomPoste" className="form-control"
                                                       aria-describedby="passwordHelpInline"
                                                       value={inputDateRea} onChange={handleIdDateRea}
                                                ></input>
                                            </div>
                                        </div>
                                        <div className="row g-3 align-items-center m-2 ">
                                            <div className="col-auto">
                                                <label htmlFor="inputPassword6"
                                                       className="col-form-label">Temps de réalisation (min)</label>
                                            </div>

                                            <div className="col-auto">
                                                <input type="text" id="idPoste" className="form-control"
                                                       aria-describedby="passwordHelpInline"
                                                       value={inputTempsReaRea} onChange={handleTempsReaRea}
                                                ></input>
                                            </div>

                                        </div>
                                        <div className="row g-3 align-items-center m-2">
                                            <div className="col-auto creationTextOp">
                                                <label htmlFor="inputPassword6" className="col-form-label">Machine </label>
                                            </div>

                                            <div className="col-auto creationTextOp">
                                                <select
                                                    className="form-select form-control"
                                                    aria-label="Default select example"
                                                    onChange={handleIdMachineRea}
                                                    value={inputIdMachineRea} // Définir la valeur sélectionnée
                                                >
                                                    <option value="">Sélectionner une machine</option>
                                                    {machines.length > 0 && machines.map((machine, cpt) => {
                                                        return (
                                                            <option value={machine.id_machine}>{machine.nom}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row g-3 align-items-center m-2">
                                            <div className="col-auto creationTextOp">
                                                <label htmlFor="inputPassword6" className="col-form-label">Poste </label>
                                            </div>

                                            <div className="col-auto creationTextOp">
                                                <select
                                                    className="form-select form-control"
                                                    aria-label="Default select example"
                                                    onChange={handleIdPosteRea}
                                                    value={inputIdPosteRea} // Définir la valeur sélectionnée
                                                >
                                                    <option value="">Sélectionner une machine</option>
                                                    {postes.length > 0 && postes.map((poste, cpt) => {
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
                                                id="boutonferme"
                                                data-bs-dismiss="modal">Annuler
                                        </button>
                                        <button type="button" className="btn btn-success" onClick={() => {
                                            ajoutRealisation()
                                        }}>Réaliser
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
                                        Etes-vous sur de vouloir supprimer l'opération' ?

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                id="boutonferme"
                                                data-bs-dismiss="modal">Annuler
                                        </button>
                                        <button type="button" className="btn btn-danger"
                                                onClick={() => {suppressionOperation(infoOperation.id_operation) }}>Supprimer
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