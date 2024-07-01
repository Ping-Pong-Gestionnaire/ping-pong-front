import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from "../components/navbar.js";
import React, { useEffect, useState } from "react";
import { getfournByName, getOnefourn, getFournAll, creaFourn, modifFourn, suppFourn} from '../model/fournisseur.js'



export function Fournisseur(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [fourns, setFourns] = useState("");
    const [infoFourn, setInfoFourn] = useState("");
    const [infoGamme, setInfoGamme] = useState("");
    const [infoPoste, setInfoPoste] = useState("");
    const [machines, setMachines] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [errorModal, setErrorModal] = useState("");

    const [inputChangeNom, setInputChangeNom] = useState('');

    const [inputNom, setInputNom] = useState('');
    const [inputTel, setInputTel] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputNomCrea, setInputNomCrea] = useState('');
    const [inputTelCrea, setInputTelCrea] = useState('');
    const [inputEmailCrea, setInputEmailCrea] = useState('');

    const isNumeric = (value) => {
        return /^-?\d+(\.\d+)?$/.test(value);
    };
    const handleChangeNom = (event) => {
        setInputChangeNom(event.target.value);
        if(event.target.value === ""){
            GetAllFourn()
        }else{
            GetFournByName(event.target.value)
        }
    };

    const handleNom = (event) => {
        setInputNom(event.target.value);
        setError("")
    };
    const handleTel = (event) => {
        if(event.target.value == ""){
            setInputTel(event.target.value);
        }else{
            if(isNumeric(event.target.value)){
                setInputTel(event.target.value);
                setError("")
            }
            else{
                setError("Le champ télephone doit être numérique.")
            }
        }

    };
    const handleEmail = (event) => {
        setInputEmail(event.target.value);
        setError("")
    };

    const handleNomCrea = (event) => {
        setInputNomCrea(event.target.value);
        setErrorModal("")
    };
    const handleTelCrea = (event) => {
        if(event.target.value == ""){
            setInputTelCrea(event.target.value);
        }else{
            if(isNumeric(event.target.value)){
                setInputTelCrea(event.target.value);
                setError("")
            }
            else{
                setErrorModal("Le champ télephone doit être numérique.")
            }
        }

    };
    const handleEmailCrea = (event) => {
        setInputEmailCrea(event.target.value);
        setErrorModal("")
    };


    const GetAllFourn = async () => {

        try {
            const data = await getFournAll();
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                console.log(" je regarde dans mon poste" + data)
                setFourns(data);
                setError("")
                setSuccess("")

            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    useEffect(() => {
        GetAllFourn();
    }, [user.id_user])

    const GetFournByName = async ( name) => {

        try {
            const data = await getfournByName(name);
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                console.log(" je regarde dans mon poste" + data)
                setFourns(data);
                setError("")
                setSuccess("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    const GetInfoFourn = async (id) => {
        console.log("jedemande a changer")
        try {
            const data = await getOnefourn(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                console.log(" je regarde dans mon poste" + data)

                setInfoFourn(data);
                setInputNom(data.nom)
                setInputTel(data.tel)
                setInputEmail(data.email)

                //setInputNom(data.nom)
                setError("" )
                setSuccess("")

            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }


    };

    const suppFournisseur = async (id) => {

        try {
            const data = await suppFourn(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                setError("Impossible de supprimer le poste." )
            }
            else{
                // Ferme la modal
                var closeModalBtn = document.getElementById("btnclosemodalPoste");
                closeModalBtn.click();

                setError("" )
                setSuccess("")
                setInfoFourn("")
                GetAllFourn()


            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };
    const modificationFourn = async (id) => {

        if(  inputNom != "" ) {
            try {
                const data = await modifFourn(id, inputNom, inputTel, inputEmail);
                if(data == "400"){
                    setError("Il y a eu une erreur sur la modification du fournisseur." )
                }
                else{
                    setError("" )
                    await GetInfoFourn(infoFourn.id_fourn)
                   await  GetAllFourn()

                    setSuccess("Modifications enregistrées")
                }
            } catch (error) {
                setError("Il y a eu une erreur sur la modification du fournisseur" )
            }
        }
        else{
            setError("Le nom du fournisseur doit être renseigné" )
        }

    };

    const ajoutFourn = async () => {

        if( inputNomCrea != ""){
            try {
                const data = await creaFourn(inputNomCrea, inputTelCrea, inputEmailCrea);
                if(data == "400"){
                    console.log("data/error : ", data.status);
                    setErrorModal("Nom de fournisseur déjà utilisé." )
                }
                else{

                    // Ferme la modal
                    var closeModalBtn = document.getElementById("btnclosemodalPosteAjout");
                    closeModalBtn.click();

                    setErrorModal("" );
                    setError("")
                    await GetAllFourn()
                    setSuccess("Fournisseur " + inputNomCrea + " cré")

                    setInputEmailCrea("")
                    setInputTelCrea("")
                    setInputNomCrea("")

                }
            } catch (error) {
                console.error("Erreur lors de l'ajout de fournisseur' :", error);
            }
        }
        else{
            setErrorModal("Vous devez remplir le nom du fournisseur" )
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
                            <th scope="col" className="fixed-td" >Fournisseur</th>
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
                        {fourns.length > 0 && fourns.map((fourn, cpt) => {
                            return (
                                <tr onClick={() => { GetInfoFourn(fourn.id_fourn) }}>
                                    <th scope="row">{fourn.id_fourn}</th>
                                    <td >{fourn.nom}</td>
                                </tr>

                            )

                        })}

                        </tbody>
                    </table>
                </div>
                <div className="posteTravailInfo d-flex flex-row">
                    <div className="InformationPoste">
                        <div >
                            <h2> Fournisseur </h2>

                            <div  className={infoFourn == "" ? "information d-none" : "information"}>
                                <div className={error == "" ? "d-none" : "alert alert-danger mt-3"} role="alert">
                                    {error == "" ? "" : error}
                                </div>
                                <div className={success == "" ? "d-none" : "alert alert-success mt-3"} role="alert">
                                    {success == "" ? "" : success}
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
                                                   value={infoFourn.id_fourn == undefined ? "" : infoFourn.id_fourn}
                                                   disabled></input>
                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label">Nom </label>
                                        </div>

                                        <div className="col-auto">
                                            <input type="text" id="nomPoste" className="form-control"
                                                   aria-describedby="passwordHelpInline"
                                                   value={inputNom} onChange={handleNom}
                                            ></input>
                                        </div>
                                    </div>


                                </div>

                                <h4 className="mt-4">Information</h4>
                                <div className="d-flex flex-row">

                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6"
                                                   className="col-form-label">Téléphone </label>
                                        </div>

                                        <div className="col-auto">
                                            <input type="text" id="idPoste" className="form-control"
                                                   aria-describedby="passwordHelpInline"
                                                   value={inputTel} onChange={handleTel}
                                                   ></input>
                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label">Email </label>
                                        </div>

                                        <div className="col-auto">
                                            <input type="email" id="nomPoste" className="form-control"
                                                   aria-describedby="passwordHelpInline"
                                                   value={inputEmail} onChange={handleEmail}
                                            ></input>
                                        </div>
                                    </div>


                                </div>


                            </div>
                        </div>


                    </div>

                    <div  className={infoFourn == "" ? " d-none" : "actionPoste d-flex flex-column"}>
                        <div className="text-center mt-4">
                            <p className="dropdown-item" data-bs-toggle="modal" data-bs-target="#ajoutPoste">
                                <FontAwesomeIcon icon="fa-solid fa-plus " className="hoverColor" size="2xl" />
                            </p>
                        </div>
                        <div className="text-center mt-4">
                            <FontAwesomeIcon icon="fa-solid fa-floppy-disk " className="hoverColor" size="2xl" onClick={() => { modificationFourn(infoFourn.id_fourn) }} />
                        </div>
                        <div className="text-center mt-4">
                            <FontAwesomeIcon icon="fa-solid fa-x" className="hoverColor" size="2xl" onClick={() => { GetInfoFourn(infoFourn.id_fourn)}} />
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
                                            id="exampleModalLabel">Création Fournisseur</h1>
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
                                                <label htmlFor="inputPassword6" className="col-form-label">Nom  </label>
                                            </div>

                                            <div className="col-auto ">
                                                <input type="text" id="nomPosteAjout" className="form-control"
                                                       aria-describedby="passwordHelpInline"
                                                       value={inputNomCrea} onChange={handleNomCrea}
                                                ></input>
                                            </div>
                                        </div>
                                        <div className="row g-3 align-items-center m-2">
                                            <div className="col-auto creationText">
                                                <label htmlFor="inputPassword6" className="col-form-label">Tel </label>
                                            </div>

                                            <div className="col-auto ">
                                                <input type="text" id="nomPosteAjout" className="form-control"
                                                       aria-describedby="passwordHelpInline"
                                                       value={inputTelCrea} onChange={handleTelCrea}
                                                ></input>
                                            </div>
                                        </div>
                                        <div className="row g-3 align-items-center m-2">
                                            <div className="col-auto creationText">
                                                <label htmlFor="inputPassword6" className="col-form-label">Email: </label>
                                            </div>

                                            <div className="col-auto ">
                                                <input type="text" id="nomPosteAjout" className="form-control"
                                                       aria-describedby="passwordHelpInline"
                                                       value={inputEmailCrea} onChange={handleEmailCrea}
                                                ></input>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                id="boutonferme"
                                                data-bs-dismiss="modal">Annuler
                                        </button>
                                        <button type="button" className="btn btn-success" onClick={() => { ajoutFourn()}}>Créer
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
                                        Etes-vous sur de vouloir supprimer le fournisseur ?

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                id="boutonferme"
                                                data-bs-dismiss="modal">Annuler
                                        </button>
                                        <button type="button" className="btn btn-danger"
                                                onClick={() => { suppFournisseur(infoFourn.id_fourn)}}>Supprimer
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