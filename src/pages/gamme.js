import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from "../components/navbar.js";
import React, { useEffect, useState } from "react";
import {
    getGammeAll,
    getGammeByType,
    getGammeByNameAndType,
    getoneGamme,
    getGammeByName,
    suppGamme,
    modifGamme,
    creaGamme,
    getOpérationByListeOp,
    getOperationByListeOp,
    suppListeOp,
    getOpNotInListeOp,
    creaListeOp
} from '../model/gamme.js'
import { getAllUser } from '../model/user.js'
import { suppPosteMachine } from '../model/machine.js'


export function GammeAdministration(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [gammes, setGammes] = useState("");
    const [infoGamme, setInfoGamme] = useState("");
    const [users, setUsers] = useState("");
    const [listeOperation, setListeOp] = useState("");
    const [operations, setOperations] = useState("");

    const [error, setError] = useState("");
    const [errorModal, setErrorModal] = useState("");

    const [inputChangeNom, setInputChangeNom] = useState('');
    const [inputChangeType, setInputChangeType] = useState('');

    const [inputLibelle, setInputLibelle] = useState('');
    const [inputType, setInputType] = useState('');
    const [inputPrix, setInputPrix] = useState('');
    const [inputQte, setInputQte] = useState('');
    const [inputRes, setInputRes] = useState('');

    const [inputLibelleCrea, setInputLibelleCrea] = useState('');
    const [inputTypeCrea, setInputTypeCrea] = useState('');
    const [inputPrixCrea, setInputPrixCrea] = useState('');
    const [inputQteCrea, setInputQteCrea] = useState('');
    const [inputResCrea, setInputResCrea] = useState('');
    const [inputListeOp, setInputListeOp] = useState('');

    // actualisation des inputs
    const isNumeric = (value) => {
        return /^-?\d+(\.\d+)?$/.test(value);
    };

    const handleLibelle = (event) => {
        setInputLibelle(event.target.value);
    };
    const handleLibelleCrea = (event) => {
        setInputLibelleCrea(event.target.value);
    };
    const handleType = (event) => {
        setInputType(event.target.value);
    };
    const handleTypeCrea = (event) => {
        console.log(event.target.value)
        setInputTypeCrea(event.target.value);
    };
    const handlePrix = (event) => {
        if (isNumeric(event.target.value)) {
            setInputPrix(event.target.value);
            setError("")
        }
        else {
            setError("Le champ prix doit être numérique.")
        }
    };
    const handlePrixCrea = (event) => {
        console.log("je chanhge")
        if(event.target.value != ""){
            if (isNumeric(event.target.value)) {
                console.log(isNumeric(event.target.value))
                setInputPrixCrea(event.target.value);
                setErrorModal("")
            }
            else {
                console.log("tu n'a pas le droit")
                setErrorModal("Le champ prix doit être numérique.")
            }
        }else{
            setInputPrixCrea(event.target.value);
        }

    };
    const handleQte = (event) => {

        if(event.target.value != ""){
            if (isNumeric(event.target.value)) {
                setInputQte(event.target.value);
                setError("")
            }
            else {
                setError("Le champ quantité doit être numérique.")
            }
        }else{
            setInputQte(event.target.value);
        }

    };
    const handleQteCrea = (event) => {

        if (isNumeric(event.target.value)) {
            setInputQteCrea(event.target.value);
            setErrorModal("")
        }
        else {
            setErrorModal("Le champ quantité doit être numérique.")
        }
    };
    const handleRes = (event) => {
        setInputRes(event.target.value);
    };
    const handleResCrea = (event) => {
        setInputResCrea(event.target.value);
    };
    const handleListeOpCrea = (event) => {
        console.log(event.target.value)
        setInputListeOp(event.target.value);
    };

    // reste du code
    const GetUsers = async () => {

        try {
            const data = await getAllUser();
            if (data == "400") {
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                //console.log(" je regarde dans mon poste" + data)
                setUsers(data);
                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };
    const GetGammeByN = async (name) => {

        try {
            const data = await getGammeByName(name);
            if (data == "400") {
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                //console.log(" je regarde dans mon poste" + data)
                setGammes(data);
                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };
    const GetGammeByT = async (type) => {

        try {
            const data = await getGammeByType(type);

            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                console.log(" je suis dans la recherche par type" + data)
                setGammes(data);
                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };
    const GetGammeByNandT = async (name, type) => {

        try {
            const data = await getGammeByNameAndType(name, type);
            if (data == "400") {
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                console.log(" je regarde dans mon poste" + data)
                setGammes(data);
                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    const GetAllGamme = async () => {

        if(props.type != undefined){
            GetGammeByT(props.type);
            setInputTypeCrea(props.type)
        }
        else{
            try {
                const  data = await getGammeAll();

                if (data == "400") {
                    console.log("data/error : ", data.status);
                    //setError("Récupération d'information sur le compte impossible." )
                }
                else {
                    setGammes(data);
                    setError("")
                }
            } catch (error) {
                console.error("Erreur lors de la recherche de poste :", error);
            }
        }


    };

    useEffect(() => {
        GetAllGamme();
        GetUsers();
    }, [user.id_user])

    const handleChangeNom = (event) => {
        const newValue = event.target.value;
        setInputChangeNom(newValue);

        // route à appeler
        if (newValue === "" && inputChangeType === "") {
            GetAllGamme();
        }
        else {
            // type remplis et ca supprimer
            if (newValue === "" && inputChangeType !== "") {
                GetGammeByT(inputChangeType);
            }
            // type vide
            if (newValue !== "" && inputChangeType === "") {
                // si on vient d'une page stock alors on doit forcée la recherche avec un type
                if(props.type == undefined){
                    GetGammeByN(newValue);
                }
                else{
                    GetGammeByNandT(newValue, props.type)
                }

            }
            // tous les deux remplis
            if (newValue !== "" && inputChangeType !== "") {
                GetGammeByNandT(newValue, inputChangeType);
            }
        }
    };
    const handleChangeType = (event) => {
        const newValue = event.target.value;
        setInputChangeType(newValue);

        // route à appeler
        if (newValue === "" && inputChangeNom === "") {
            GetAllGamme();
        }
        else {
            // nom remplis et ca supprimer
            if (newValue === "" && inputChangeNom !== "") {
                GetGammeByN(inputChangeNom);
            }
            // nom vide
            if (newValue !== "" && inputChangeNom === "") {
                GetGammeByT(newValue);
            }
            // tous les deux remplis
            if (newValue !== "" && inputChangeNom !== "") {
                GetGammeByNandT(newValue, inputChangeNom);
            }
        }
    };

    const opérationByListeOp = async (id) => {
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

    // récupération des données de getOpNotInListeOp
    const getOpNotInListe = async (id) => {

        try {
            const data = await getOpNotInListeOp(id);
            if (data == "400") {
                console.log("data/error : ", data.status);
                setError("Impossible de récupérer les opérations.")
            }
            else {
                setListeOp(data);

                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de liste d'opération :", error);
        }
    };

    const GetInfoGamme = async (id) => {
        //console.log("jedemande a changer")
        try {
            const data = await getoneGamme(id);
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                //console.log(" je regarde dans mon poste" + data)
                setInfoGamme(data);
                setInputLibelle(data.libelle)
                setInputType(data.type)
                setInputPrix(data.prix)
                setInputPrix(data.prix)
                setInputQte(data.qte)
                setInputRes(data.id_user)

                setInputListeOp("")


                getOpNotInListe(data.id_gamme)

                //setInputNom(data.nom)
                setError("")
                opérationByListeOp(data.id_gamme)
            }
        } catch (error) {
            setError("Erreur récupération info de gamme.")
            console.error("Erreur lors de la recherche de gamme :", error);
        }
    };

    const suppressionGamme = async (id) => {

        try {
            const data = await suppGamme(id);
            if (data == "400") {
                console.log("data/error : ", data.status);
                setError("Impossible de supprimer la gamme.")
            }
            else {
                var id_btn = "btnclosemodalGamme"
                // Ferme la modal
                var closeModalBtn = document.getElementById(id_btn);
                closeModalBtn.click();

                setError("");
                setInfoGamme("");
                GetAllGamme();

            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    const modificationGamme = async () => {

        // vérification
        if (inputLibelle != "" && inputPrix != "" && inputType != "" && inputQte != "" && inputRes != "") {

            try {
                const data = await modifGamme(infoGamme.id_gamme, inputLibelle, inputPrix, inputType, inputQte, inputRes);
                if (data == "400") {
                    setError("Il y a eu une erreur sur la modification du poste.")
                } else {
                    setError("")
                    GetInfoGamme(infoGamme.id_gamme)
                    GetAllGamme()

                }
            } catch (error) {
                setError("Il y a eu une erreur sur la modification du poste.")
            }
        }
        else {
            setError("Tous les champs doivent être renseignés.")
        }
    };

    const ajoutGamme = async () => {
       // console.log(inputPrixCrea + inputTypeCrea + inputQteCrea + inputResCrea)

        if (inputLibelleCrea != "" && inputResCrea != "") {
            try {
                const data = await creaGamme(inputLibelleCrea, inputPrixCrea, inputTypeCrea, inputQteCrea, inputResCrea);
                if (data == "400") {
                    console.log("data/error : ", data.status);
                    setErrorModal("Nom de poste déjà utilisé.")
                }
                else {

                    // Ferme la modal
                    var closeModalBtn = document.getElementById("btnclosemodalPosteAjout");
                    closeModalBtn.click();
                    setErrorModal("");
                    setInfoGamme("");

                    setInputTypeCrea("")
                    setInputLibelleCrea("")
                    setInputPrixCrea("")
                    setInputQteCrea("")
                    GetAllGamme();

                }
            } catch (error) {
                console.error("Erreur lors de la recherche de poste :", error);
            }
        }
        else {
            setErrorModal("Vous devez remplir tous les champs.")
        }

    };

    const suppressionListeOp = async (id) => {
        try {
            const data = await suppListeOp(id, infoGamme.id_gamme);
            if (data == "400") {
                console.log("data/error : ", data.status);
                setError("Impossible de supprimer l'opération.")
            }
            else {
                var id_btn = "btnclosemodalGamme"
                // Ferme la modal
                const btnclose = document.getElementById("btnclosemodal" + id);
                btnclose.click();

                setError("");
                GetInfoGamme(infoGamme.id_gamme)

            }
        } catch (error) {
            console.error("Erreur lors de la recherche d'opération :", error);
        }

    };
    const ajoutListeOp = async () => {
        if(inputListeOp === "" ){
            setErrorModal("Vous devez sélectionner une opération")
        }else{
            console.log(inputListeOp + " " + infoGamme.id_gamme)
            try {
                const data = await creaListeOp(inputListeOp, infoGamme.id_gamme);
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
                    GetInfoGamme(infoGamme.id_gamme)

                }
            } catch (error) {
                console.error("Erreur lors de la recherche d'opération :", error);
            }
        }


    };



    return (<>
        <NavBar login={user.login} droit={user.droit} />
        <div className="container-fluid d-flex flex-row">

            <div className="tableauPoste border-end">

                <table className="table table-hover table-fixed">
                    <thead>
                        <tr>
                            <th scope="col" className="fixed-td">#</th>
                            <th scope="col" className="fixed-td2" >Gamme</th>

                            <th scope="col" className={props.type == undefined ? "fixed-td3" : "d-none"}>Type</th>
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
                            <td  className={props.type == undefined ? "fixed-td3" : "d-none"}>
                                <input type="text" id="rechercheGammeNom" className="form-control rechercheInput"
                                    aria-describedby="passwordHelpInline"
                                    value={inputChangeType} onChange={handleChangeType}  ></input>
                            </td >

                        </tr>
                        {gammes.length > 0 && gammes.map((gamme, cpt) => {
                            return (
                                <tr onClick={() => { GetInfoGamme(gamme.id_gamme) }}>
                                    <th scope="row">{gamme.id_gamme}</th>
                                    <td >{gamme.libelle}</td>
                                    <td className={props.type == undefined ? "" : "d-none"} >{gamme.type}</td>

                                </tr>

                            )

                        })}

                    </tbody>
                </table>
            </div>
            <div className="posteTravailInfo d-flex flex-row">
                <div className="InformationPoste">
                    <div>
                        <h2> {props.type == undefined ? "Gamme" : props.titre} </h2>

                        <div className={infoGamme == "" ? "information d-none" : "information"}>
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
                                            value={infoGamme.id_gamme == undefined ? "" : infoGamme.id_gamme}
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
                                            value={inputLibelle} onChange={handleLibelle} ></input>
                                    </div>
                                </div>



                            </div>
                            <h4 className="mt-4"> Information </h4>
                            <div className="d-flex flex-row">

                                <div className="row g-3 align-items-center m-2">
                                    <div className="col-auto">
                                        <label htmlFor="inputPassword6"
                                            className="col-form-label">Type </label>
                                    </div>

                                    <div className="col-auto">
                                        <select
                                            className="form-select form-control"
                                            aria-label="Default select example"
                                            onChange={handleType}
                                            value={inputType} // Définir la valeur sélectionnée
                                        >

                                            <option value="VEN" >VEN</option>
                                            <option value="INT">INT</option>
                                            <option value="PRE">PRE</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row g-3 align-items-center m-2">
                                    <div className="col-auto">
                                        <label htmlFor="inputPassword6"
                                            className="col-form-label">Prix </label>
                                    </div>

                                    <div className="col-auto">
                                        <input type="number" id="idPoste" className="form-control"
                                            aria-describedby="passwordHelpInline"
                                            value={inputPrix} onChange={handlePrix}
                                        ></input>
                                    </div>
                                </div>
                                <div className="row g-3 align-items-center m-2">
                                    <div className="col-auto">
                                        <label htmlFor="inputPassword6"
                                            className="col-form-label">Quantité </label>
                                    </div>

                                    <div className="col-auto">
                                        <input type="number" id="idPoste" className="form-control"
                                            aria-describedby="passwordHelpInline"
                                            value={inputQte} onChange={handleQte}
                                        ></input>
                                    </div>
                                </div>

                            </div>
                            <div className="d-flex flex-row">
                                <div className="row g-3 align-items-center m-2">
                                    <div className="col-auto">
                                        <label htmlFor="inputPassword6"
                                            className="col-form-label">Responsable </label>
                                    </div>

                                    <div className="col-auto">
                                        <select
                                            className="form-select form-control"
                                            aria-label="Default select example"
                                            onChange={handleRes}
                                            value={inputRes} // Définir la valeur sélectionnée
                                        >
                                            <option value="">Sélectionner un responsable</option>
                                            {users.length > 0 && users.map((user, cpt) => {
                                                return (
                                                    <option value={user.id_user}>{user.login}</option>
                                                )

                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                    <div  className={props.type == undefined ? "" : "d-none"}>
                        <div className={infoGamme == "" ? " d-none" : "mt-3"}>
                            <h2>Opération</h2>

                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Opération</th>
                                        <th scope="col">Temps réalisation (minutes) </th>
                                        <th scope="col">Machine </th>
                                        <th scope="col"> Poste</th>
                                        <th scope="col" className="tab3pts">
                                            <p className='hoverColor ajoutTab' data-bs-toggle="modal"
                                                data-bs-target="#ajoutInListe"  >
                                                <FontAwesomeIcon icon="fa-solid fa-plus" />
                                            </p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {operations.length > 0 && operations.map((operation, cpt) => {
                                        return (
                                            <tr className="align-middle">

                                                <th scope="row"> {operation.id_operation}</th>
                                                <td>{operation.libelle}</td>
                                                <td>{operation.tempsRea}</td>
                                                <td>{operation.nommachine}</td>
                                                <td>{operation.nomposte}</td>
                                                <td>
                                                    <p data-bs-toggle="dropdown" aria-expanded="false" className="pt-3">
                                                        <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical"
                                                            className="icone3pts" size="lg" />

                                                    </p>

                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" data-bs-toggle="modal" href=""
                                                            data-bs-target={"#supp" + operation.id_operation}>Supprimer</a>
                                                        </li>
                                                        <li><a className="dropdown-item" href="#">Suivre</a></li>
                                                    </ul>


                                                    <div className="modal fade" id={"supp" + operation.id_operation}
                                                        tabIndex="-1" aria-labelledby="exampleModalLabel"
                                                        aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h1 className="modal-title fs-5"
                                                                        id="exampleModalLabel">Suppression</h1>
                                                                    <button type="button" className="btn-close"
                                                                        id={"btnclosemodal" + operation.id_operation}
                                                                        data-bs-dismiss="modal"
                                                                        aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    Etes-vous sur de vouloir supprimer l'opération de la liste  ?

                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary"
                                                                        id={"boutonferme" + operation.id_operation}
                                                                        data-bs-dismiss="modal">Annuler
                                                                    </button>
                                                                    <button type="button" className="btn btn-danger"
                                                                        onClick={() => {
                                                                            suppressionListeOp(operation.id_operation)
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
                                                id="exampleModalLabel">Ajout opération</h1>
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
                                                        className="col-form-label">Opération </label>
                                                </div>

                                                <div className="col-auto">
                                                    <select
                                                        className="form-select form-control"
                                                        aria-label="Default select example"
                                                        onChange={handleListeOpCrea}
                                                        value={inputListeOp} // Définir la valeur sélectionnée
                                                    >
                                                        <option >Sélectionner une opération </option>
                                                        {listeOperation.length > 0 && listeOperation.map((op, cpt) => {
                                                            return (
                                                                <option value={op.id_operation}>{op.libelle}</option>
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
                                                    ajoutListeOp()
                                                }}>Ajouter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div  className={infoGamme == "" ? " d-none" : "actionPoste d-flex flex-column"}>
                    <div className="text-center mt-4">
                        <p className="dropdown-item" data-bs-toggle="modal" data-bs-target="#ajoutPoste">
                            <FontAwesomeIcon icon="fa-solid fa-plus " className="hoverColor" size="2xl" />
                        </p>
                    </div>
                    <div className="text-center mt-4">
                        <FontAwesomeIcon icon="fa-solid fa-floppy-disk " className="hoverColor" size="2xl" onClick={() => { modificationGamme() }} />
                    </div>
                    <div className="text-center mt-4">
                        <FontAwesomeIcon icon="fa-solid fa-x" className="hoverColor" size="2xl" onClick={() => { GetInfoGamme(infoGamme.id_gamme) }} />
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
                                        id="exampleModalLabel"> Création { props.type == undefined ? "Gamme" : props.titre}</h1>
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
                                        <div className="col-auto creationText">
                                            <label htmlFor="inputPassword6" className="col-form-label">Libellé : </label>
                                        </div>

                                        <div className="col-auto">
                                            <input type="text" id="nomPosteAjout" className="form-control creationSelectRes"
                                                aria-describedby="passwordHelpInline" value={inputLibelleCrea} onChange={handleLibelleCrea}></input>
                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto creationText">
                                            <label htmlFor="inputPassword6"
                                                className="col-form-label">Type </label>
                                        </div>

                                        <div className="col-auto creationText">
                                            <select
                                                className="form-select form-control"
                                                aria-label="Default select example"
                                                onChange={handleTypeCrea}
                                                value={inputTypeCrea} // Définir la valeur sélectionnée
                                            >
                                                <option value={props.type == undefined ? "" : props.type} className={props.type == undefined ? "d-none" : ""}>{props.type}</option>

                                                <option value="VEN" className={props.type == undefined ? "" : "d-none"}>VEN</option>
                                                <option value="INT" className={props.type == undefined ? "" : "d-none"}>INT</option>
                                                <option value="PRE" className={props.type == undefined ? "" : "d-none"}>PRE</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto creationText">
                                            <label htmlFor="inputPassword6"
                                                className="col-form-label">Prix </label>
                                        </div>

                                        <div className="col-auto creationText">
                                            <input type="number" id="idPoste" className="form-control"
                                                aria-describedby="passwordHelpInline"
                                                value={inputPrixCrea} onChange={handlePrixCrea}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto creationText">
                                            <label htmlFor="inputPassword6"
                                                className="col-form-label">Quantité </label>
                                        </div>

                                        <div className="col-auto creationText">
                                            <input type="number" id="idPoste" className="form-control"
                                                aria-describedby="passwordHelpInline"
                                                value={inputQteCrea} onChange={handleQteCrea}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <div className="row g-3 align-items-center m-2">
                                            <div className="col-auto creationText">
                                                <label htmlFor="inputPassword6"
                                                    className="col-form-label">Responsable </label>
                                            </div>

                                            <div className="col-auto creationText">
                                                <select
                                                    className="form-select form-control creationSelectRes"
                                                    aria-label="Default select example"
                                                    onChange={handleResCrea}
                                                    value={inputResCrea} // Définir la valeur sélectionnée
                                                >
                                                    <option value="">Sélectionner un responsable</option>
                                                    {users.length > 0 && users.map((user, cpt) => {
                                                        return (
                                                            <option value={user.id_user}>{user.login}</option>
                                                        )

                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                        id="boutonferme"
                                        data-bs-dismiss="modal">Annuler
                                    </button>
                                    <button type="button" className="btn btn-success" onClick={() => { ajoutGamme() }}>Créer
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
                                        id="btnclosemodalGamme"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Etes-vous sur de vouloir supprimer la gamme ?

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                        id="boutonferme"
                                        data-bs-dismiss="modal">Annuler
                                    </button>
                                    <button type="button" className="btn btn-danger"
                                        onClick={() => { suppressionGamme(infoGamme.id_gamme) }}>Supprimer
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