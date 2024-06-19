import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from "../components/navbar.js";
import React, {useEffect, useState} from "react";
import { getGammeAll, getGammeByType, getGammeByName, getGammeByNameAndType, getoneGamme, suppGamme, modifGamme} from '../model/gamme.js'
import {getAllUser} from '../model/user.js'
import { suppPosteMachine } from '../model/machine.js'


export function GammeAdministration(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [gammes, setGammes] = useState("");
    const [infoGamme, setInfoGamme] = useState("");
    const [users, setUsers] = useState("");

    const [error, setError] = useState("");
    const [errorModal, setErrorModal] = useState("");

    const [inputChangeNom, setInputChangeNom] = useState('');
    const [inputChangeType, setInputChangeType] = useState('');

    const [inputLibelle, setInputLibelle] = useState('');
    const [inputType, setInputType] = useState('');
    const [inputPrix, setInputPrix] = useState('');
    const [inputQte, setInputQte] = useState('');
    const [inputRes, setInputRes] = useState('');

    // actualisation des inputs
    const isNumeric = (value) => {
        return /^-?\d+(\.\d+)?$/.test(value);
    };

    const handleLibelle = (event) => {
        setInputLibelle(event.target.value);
    };
    const handleType = (event) => {
        setInputType(event.target.value);
    };
    const handlePrix = (event) => {
        if(isNumeric(event.target.value)){
            setInputPrix(event.target.value);
            setError("")
        }
        else{
            setError("Le champ prix doit être numérique.")
        }
    };
    const handleQte = (event) => {

        if(isNumeric(event.target.value)){
            setInputQte(event.target.value);
            setError("")
        }
        else{
            setError("Le champ quantité doit être numérique.")
        }


    };
    const handleRes = (event) => {
        setInputRes(event.target.value);
    };


    // reste du code
    const GetUsers = async () => {

        try {
            const data = await getAllUser();
            if(data == "400"){
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                console.log(" je regarde dans mon poste" + data)
                setUsers(data);
                setError("" )
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };
    const GetGammeByN = async (name) => {

        try {
            const data = await getGammeByName(name);
            if(data == "400"){
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                console.log(" je regarde dans mon poste" + data)
                setGammes(data);
                setError("" )
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };
    const GetGammeByT = async (type) => {

        try {
            const data = await getGammeByType(type);
            if(data == "400"){
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                console.log(" je regarde dans mon poste" + data)
                setGammes(data);
                setError("" )
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };
    const GetGammeByNandT = async (name,type) => {

        try {
            const data = await getGammeByNameAndType(name , type);
            if(data == "400"){
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                console.log(" je regarde dans mon poste" + data)
                setGammes(data);
                setError("" )
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    const GetAllGamme = async () => {

        try {
            const data = await getGammeAll();
            if(data == "400"){
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                setGammes(data);
                setError("" )
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
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
        if ( newValue === "" && inputChangeType === ""){
            GetAllGamme();
        }
        else{
            // type remplis et ca supprimer
            if ( newValue === "" && inputChangeType !== "") {
                GetGammeByT(inputChangeType);
            }
            // type vide
            if ( newValue !== "" && inputChangeType === "") {
                GetGammeByN(newValue);
            }
            // tous les deux remplis
            if ( newValue !== "" && inputChangeType !== "") {
                GetGammeByNandT(newValue, inputChangeType);
            }
        }
    };
    const handleChangeType = (event) => {
        const newValue = event.target.value;
        setInputChangeType(newValue);

        // route à appeler
        if ( newValue === "" && inputChangeNom === ""){
            GetAllGamme();
        }
        else{
            // nom remplis et ca supprimer
            if ( newValue === "" && inputChangeNom !== "") {
                GetGammeByN(inputChangeNom);
            }
            // nom vide
            if ( newValue !== "" && inputChangeNom === "") {
                GetGammeByT(newValue);
            }
            // tous les deux remplis
            if ( newValue !== "" && inputChangeNom !== "") {
                GetGammeByNandT(newValue, inputChangeNom);
            }
        }
    };

    const GetInfoGamme = async (id) => {
        console.log("jedemande a changer")
        try {
            const data = await getoneGamme(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                console.log(" je regarde dans mon poste" + data)
                setInfoGamme(data);
                setInputLibelle(data.libelle)
                setInputType(data.type)
                setInputPrix(data.prix)
                setInputPrix(data.prix)
                setInputQte(data.qte)
                setInputRes(data.id_user)

                //setInputNom(data.nom)
                setError("" )
            }
        } catch (error) {
            setError("Erreur récupération info de gamme." )
            console.error("Erreur lors de la recherche de gamme :", error);
        }
    };

    const suppressionGamme = async (id) => {

        try {
            const data = await suppGamme(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                setError("Impossible de supprimer la gamme." )
            }
            else{
                var id_btn = "btnclosemodalGamme"
                // Ferme la modal
                var closeModalBtn = document.getElementById(id_btn);
                closeModalBtn.click();

                setError("" );
                setInfoGamme("");
                GetAllGamme();

            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };


    const modificationGamme = async () => {

        // vérification
        if( inputLibelle != "" && inputPrix != "" && inputType != "" && inputQte != "" && inputRes != "" ) {

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
        else{
            setError("Tous les champs doivent être renseignés." )
        }


    };

  /*
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
               // setInputNom("");
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
                 //   setInputNom("");
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

*/
    return (<>
            <NavBar login={user.login} droit={user.droit} />
            <div className="container-fluid d-flex flex-row">

                <div className="tableauPoste border-end">

                    <table className="table table-hover table-fixed">
                        <thead>
                        <tr>
                            <th scope="col"  className="fixed-td">#</th>
                            <th scope="col" className="fixed-td2" >Gamme</th>
                            <th scope="col" className="fixed-td3">Type</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="fixed-td"></td>
                            <td className="fixed-td2" >
                                <input type="text" id="rechercheGammeNom" className="form-control rechercheInput"
                                       aria-describedby="passwordHelpInline"
                                       value={inputChangeNom}  onChange={handleChangeNom}  ></input>
                            </td>
                            <td className="fixed-td3">
                                <input type="text" id="rechercheGammeNom" className="form-control rechercheInput"
                                        aria-describedby="passwordHelpInline"
                                        value={inputChangeType}  onChange={handleChangeType}  ></input>
                            </td >

                        </tr>
                        {gammes.length > 0 && gammes.map((gamme, cpt) => {
                            return (
                                <tr onClick={() => { GetInfoGamme(gamme.id_gamme) }}>
                                    <th scope="row">{gamme.id_gamme}</th>
                                    <td >{gamme.libelle}</td>
                                    <td >{gamme.type}</td>

                                </tr>

                            )

                        })}

                        </tbody>
                    </table>
                </div>
                <div className="posteTravailInfo d-flex flex-row">
                    <div className="InformationPoste">
                        <div>
                            <h2> Gamme </h2>

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
                                                   value={inputLibelle}  onChange={handleLibelle} ></input>
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
                                                <option value="VEN">VEN</option>
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
                                                   value={inputPrix}  onChange={handlePrix}
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
                                                   value={inputQte}  onChange={handleQte}
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
                        <div className={infoGamme == "" ? " d-none" : "mt-3"}>
                            <h2>Opération</h2>


                        </div>


                    </div>


                    <div className="actionPoste d-flex flex-column">
                        <div className="text-center mt-4">
                            <p className="dropdown-item" data-bs-toggle="modal" data-bs-target="#ajoutPoste">
                                <FontAwesomeIcon icon="fa-solid fa-plus " className="hoverColor" size="2xl"/>
                            </p>
                        </div>
                        <div className="text-center mt-4">
                            <FontAwesomeIcon icon="fa-solid fa-floppy-disk "  className="hoverColor"size="2xl" onClick={() => { modificationGamme() }}/>
                        </div>
                        <div className="text-center mt-4">
                            <FontAwesomeIcon icon="fa-solid fa-x"   className="hoverColor"size="2xl" onClick={() => { GetInfoGamme(infoGamme.id_gamme) }}/>
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
                                        <button type="button" className="btn btn-success" onClick={() => { }}>Créer
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
                                                onClick={() => { suppressionGamme(infoGamme.id_gamme)}}>Supprimer
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