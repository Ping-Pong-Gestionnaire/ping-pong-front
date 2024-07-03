import {GammeAdministration} from "./gamme";
import {Route} from "react-router-dom";
import NavBar from "../components/navbar";
import React, { useEffect, useState } from "react";
import {getOperationByListeOp} from "../model/gamme";
import {getALlMachine, getListePoste, getOneMachine} from "../model/machine";
import {getAllPoste} from "../model/poste";
import {getGetOneOperation} from "../model/operation";
import {creaRealisation} from "../model/realisation";


export function RealisationPage(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const isNumeric = (value) => {
        return /^-?\d+(\.\d+)?$/.test(value);
    };

    const [idGamme, setIdGamme] = useState("");
    const [operations, setOperations] = useState("");
    const [machines, setMachines] = useState("");
    const [postes, setPostes] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [inputTempsRea, setInputTempsRea] = useState('');
    const [inputDate, setInputDate] = useState('');
    const [inputIdMachine, setInputIdMachine] = useState('');
    const [inputIdPoste, setInputIdPoste] = useState('');

    const handleIdDate = (event) => {
        setInputDate(event.target.value)
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
    const handleIdPoste = (event) => {
        setInputIdPoste(event.target.value)
    };
    const handleIdMachine = (event) => {
        setInputIdMachine(event.target.value)
        if(event.target.value){
            GetPosteByM(event.target.value)
        }
    };

    // récuperation de l'id gamme
    useEffect(() => {
        const param_IdGamme =  localStorage.getItem('idGamme');
        if (param_IdGamme !== undefined) {
            setIdGamme(param_IdGamme)
        }
        getAllOperation(param_IdGamme);
        GetMachineAll();
        GetAllPoste();
    }, [localStorage]);

    const GetPosteByM =async (id) => {
        console.log("mon id" + id)
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
    }

    const getAllOperation= async (id) => {
        console.log("jedemande a changer")
        try {
            const data = await getOperationByListeOp(id);
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                console.log(" je regarde dans mon poste" + data)
                setOperations(data);

                //setInputNom(data.nom)
                setError("")
            }
        } catch (error) {
            setError("Erreur récupération info de gamme.")
            console.error("Erreur lors de la recherche de gamme :", error);
        }
    };

    //information sur les machines et poste
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
                setInputTempsRea(data.tempsRea)
                setInputIdMachine(data.id_machine)
                setInputIdPoste(data.id_poste)
                setInputDate("")

                if(data.id_poste != null){
                    setInputIdPoste(data.id_poste)
                }else{
                    setInputIdPoste("null")
                }

                setError("");
                setSuccess("");

            }
        } catch (error) {
            setError("Erreur récupération info de gamme.")
            console.error("Erreur lors de la recherche de machine :", error);
        }

    };

    // Ajout Réalisation -------------------------------------------------------------------------------------------------------
    const ajoutRealisation = async (id_operation) => {

        console.log("je rentre dans ma fct")
        if (inputDate != "" && inputIdMachine != "" && inputIdPoste!= "" && inputTempsRea != ""  ) {
            try {
                const data = await creaRealisation( inputTempsRea, inputDate, inputIdMachine, inputIdPoste, id_operation, user.id_user );
                if (data == "400") {
                    console.log("data/error : ", data.status);
                    setError("Un problème est parvenu lors de l'enregistrement de la réalisation.")
                }
                else {

                    setError("");
                    setSuccess("Opération enregistré");

                }
            } catch (error) {
                console.error("Erreur lors de l'ajout d'opération :", error);
            }
        }
        else {
            setError("Vous devez remplir tous les champs.")
        }

    };


    return (<>
        <NavBar login={user.login} droit={user.droit} />
        <div className="container-fluid d-flex flex-row">

            <div className="posteTravailInfo d-flex flex-row">
                <div className="InformationPoste">
                    <div>
                        <h2> Enregistrement des opérations :</h2>

                        <div className="information">

                            <div className={error == "" ? "d-none" : "alert alert-danger mt-3"} role="alert">
                                {error == "" ? "" : error}
                            </div>
                            <div className={success == "" ? "d-none" : "alert alert-success mt-3"} role="alert">
                                {success == "" ? "" : success}
                            </div>

                            <div className="accordion" id="accordionExample">

                                {operations.length > 0 && operations.map((operation, cpt) => {
                                    return (
                                        <div className="accordion-item" >
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed" type="button"
                                                        data-bs-toggle="collapse" data-bs-target={"#collapse" + operation.id_operation}
                                                        aria-expanded="false" aria-controls={"collapse" + operation.id_operation} onClick={() => {GetInfoOperation(operation.id_operation) }}>
                                                    {operation.libelle}
                                                </button>
                                            </h2>
                                            <div id={"collapse" + operation.id_operation} className="accordion-collapse collapse"
                                                 data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <strong>{operation.description}</strong>

                                                    <div className="d-flex flex-row flex-wrap">
                                                        <div className="row g-3 align-items-center m-2 ">
                                                            <div className="col-auto creationTextOp">
                                                                <label htmlFor="inputPassword6" className="col-form-label">Date </label>
                                                            </div>

                                                            <div className="col-auto creationTextOp">
                                                                <input type="date" id="nomPoste" className="form-control"
                                                                       aria-describedby="passwordHelpInline"
                                                                       value={inputDate} onChange={handleIdDate}
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
                                                                       value={inputTempsRea} onChange={handleTempsRea}
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
                                                                    onChange={handleIdMachine}
                                                                    value={inputIdMachine} // Définir la valeur sélectionnée
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
                                                                    onChange={handleIdPoste}
                                                                    value={inputIdPoste} // Définir la valeur sélectionnée
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
                                                        <div className="row g-3 align-items-center m-2">
                                                            <button type="button" className="btn btn-success" onClick={() => {
                                                                ajoutRealisation(operation.id_operation)
                                                            }}>Réaliser
                                                            </button>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                )

                                })}
                                {operations.length == 0  ? "Cette gamme n'a pas d'opération." : ""}


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        </>
    )


}