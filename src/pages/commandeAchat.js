import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from "../components/navbar.js";
import React, { useEffect, useState } from "react";
import {getGammeAll, getGammeByType, getGammeByName, getoneGamme, getGammeByFourn} from '../model/gamme.js'
import {
    getCommandeAll,
    getOneCommande,
    getCommandeByStatut,
    getCommandeById,
    getLigneByCommande,
    modifCommande,
    suppCommande,
    creaCommande,
    creaLigne,
    suppLigne
} from '../model/commande.js'
import {getFournAll} from "../model/fournisseur";
import{generatePDF, generateCSVFacture} from "../pages/services"


export function CommandeAchat(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [commandes, setCommandes] = useState("");
    const [fourns, setFourns] = useState("");
    const [gammes, setGammes] = useState("");
    const [infoCommande, setInfoCommande] = useState("");
    const [infoGamme, setInfoGamme] = useState("");
    const [lignes, setLignes] = useState("");


    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [errorModal, setErrorModal] = useState("");

    const [inputChangeStatut, setInputChangeStatut] = useState('');
    const [inputChangeId, setInputChangeId] = useState('');

    const [inputStatut, setInputStatut] = useState('');
    const [inputDatePrev, setInputDatePrev] = useState('');
    const [inputDateReel, setInputDateReel] = useState('');

    const [inputDatePrevCrea, setInputDatePrevCrea] = useState('');
    const [inputFournCrea, setInputFournCrea] = useState('');

    const [inputIdGamme, setInputIdGamme] = useState('');
    const [inputPrix, setInputPrix] = useState('');
    const [inputQte, setInputQte] = useState('');

    const isNumeric = (value) => {
        return /^-?\d+([.,]\d+)?$/.test(value);
    };

    const handleChangeStatut = (event) => {

        if(event.target.value != ""){
            GetAllByStatut(event.target.value)
            setInputChangeStatut(event.target.value);
            setInputChangeId("");
        }
        else{
            GetAllCommande()
            setInputChangeStatut(event.target.value);
        }



    };
    const handleChangeId = (event) => {

        if(event.target.value != ""){
            GetById(event.target.value)
            setInputChangeStatut("");
            setInputChangeId(event.target.value);
        }
        else{
            GetAllCommande()
            setInputChangeId(event.target.value);
        }

    };

    const handleStatut = (event) => {
        if(inputStatut != "En cours"){
            if(event.target.value == "En cours"){
                setError("Votre commande à déjà été commandé ou soldé vous ne pouvez revenir en arrière. ")
            }else{
                setInputStatut(event.target.value);
                setError("")
            }
        }else{
            if( lignes.length == 0 ){
                setError("Vous ne pouvez pas passer une commande sans produit.")
            }else{
                setInputStatut(event.target.value);
                setError("")
            }

        }


    };
    const handleDatePrev = (event) => {
        setInputDatePrev(event.target.value);
    };
    const handleDateReel = (event) => {
        setInputDateReel(event.target.value);
    };
    const handleDatePrevCrea = (event) => {
        setInputDatePrevCrea(event.target.value);
    };
    const handleFournCrea = (event) => {
        setInputFournCrea(event.target.value);
    };
    const handleIdGamme = (event) => {
        setInputIdGamme(event.target.value);
        GetInfoGamme(event.target.value)
    };
    const handlePrix = (event) => {
        setInputPrix(event.target.value);

    };

    const handleQte = (event) => {
       setInputQte(event.target.value);
    };



    const GetAllCommande = async () => {

        try {
            const data = await getCommandeAll();
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                console.log(" je regarde dans mon poste" + data)
                setCommandes(data);
                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    useEffect(() => {
        GetAllCommande();
        GetAllFourn();
    }, [user.id_user])

    const GetAllByStatut = async (statut) => {

        try {
            const data = await getCommandeByStatut(statut);
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                console.log(" je regarde dans mon poste" + data)
                setCommandes(data);
                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };
    const GetById = async (id) => {

        try {
            const data = await getCommandeById(id);
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                console.log(" je regardeeeeeeeeeeeeeeeeeeeeee" + data)
                setCommandes(data);
                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    const GetInfoCommande = async (id) => {
        console.log("jedemande a changer")
        var lignes = []
        try {
            const data = await getOneCommande(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                console.log(" je regarde dans ma commandee" + data)
                lignes = await getGamme(data.id_fourn);
                setInfoCommande(data);

                setInputStatut(data.statut)
                setInputDatePrev(data.dateLivPrev)
                if(data.dateLivReel == null){
                    setInputDateReel("")
                }else{
                    setInputDateReel(data.dateLivReel)
                }

                setError("")
                setSuccess("" )

            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

        try {
            const data = await getLigneByCommande(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                setError("Récupération d'information sur le compte impossible." )
            }
            else{
                console.log(" je regarde dans mes lignes commande" + data)
                setLignes(data);
                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }
        if(lignes.length == 0){
            setError("Le fournisseur n'a pas de produits à vous livrer. Changer de fournisseur sur la page Gamme.")
        }

    };

    const suppMachine = async (id) => {
        try {
            const data = await suppCommande(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                setError("Impossible de supprimer la machine." )
            }
            else{
                var closeModalBtn = document.getElementById("btnclosemodalPoste");
                closeModalBtn.click();

                setError("" )
                setSuccess("" )
                setInfoCommande("")
                GetAllCommande("")

            }
        } catch (error) {
            console.error("Erreur lors de la suppression de commande :", error);
            setError("Erreur lors de la suppression de commande" )
        }

    };

    const modificationCommande = async () => {

        if( inputStatut != "" && inputDatePrev != ""  ) {
            try {
                var data = ""
                if(inputDateReel == ""){
                     data = await modifCommande(infoCommande.id_commande, inputStatut, inputDatePrev, null, infoCommande.id_fourn);
                }else{
                    data = await modifCommande(infoCommande.id_commande, inputStatut, inputDatePrev, inputDateReel, infoCommande.id_fourn);
                }

                if(data == "400"){
                    setError("Il y a eu une erreur sur la modification du poste." )
                }
                else{
                    setError("" )
                    await GetInfoCommande(infoCommande.id_commande)
                    await GetAllCommande()

                    setSuccess("Modification enregistrée")

                }
            } catch (error) {
                setError("Il y a eu une erreur sur la modification de la commande." )
            }
        }
        else{
            setError("Le champ statut et date livraison prévue  doivent être renseignés." )
        }


    };

    const GetAllFourn = async () => {

        try {
            const data = await getFournAll();
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                setFourns(data);
                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de fournisseur :", error);
        }

    };

    const ajoutCommande = async () => {

        if( inputDatePrevCrea != "" && inputFournCrea != ""){
            try {
                const random =  Math.floor(Math.random() * 1000000);
                const matricule = "COM" + random + "U" + user.id_user
                const data = await creaCommande("En cours", inputDatePrevCrea, null, inputFournCrea, matricule);
                if(data == "400"){
                    console.log("data/error : ", data.status);
                    setErrorModal("Nom de poste déjà utilisé." )
                }
                else{

                    // Ferme la modal
                    var closeModalBtn = document.getElementById("btnclosemodalPosteAjout");
                    closeModalBtn.click();
                    setErrorModal("" );

                    setInputDatePrevCrea("")
                    setInputFournCrea("")
                    await GetAllCommande();
                    setSuccess("Commande crée")

                }
            } catch (error) {
                console.error("Erreur lors de la recherche de poste :", error);
            }
        }
        else{
            setErrorModal("Vous devez remplir tous les champs." )
        }


    };

    const getGamme = async (id) => {

        try {
            const  data = await getGammeByFourn(id);

            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                setGammes(data);
                return data

            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }
    };

    const GetInfoGamme = async (id) => {
        try {
            const data = await getoneGamme(id);
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                //console.log(" je regarde dans mon poste" + data)
                setInfoGamme(data);
                inputPrix(data.prix)
            }
        } catch (error) {
            setError("Erreur récupération info de gamme.")
            console.error("Erreur lors de la recherche de gamme :", error);
        }
    };

    const AjoutLigne = async () => {

        if( inputQte != "" && inputPrix != "" && inputIdGamme != ""){
            if(isNumeric(inputQte) && isNumeric(inputPrix)){
                try {
                    const prix = (inputPrix * inputQte).toFixed(2)
                    const data = await creaLigne(infoGamme.libelle,inputQte,prix, inputPrix, inputIdGamme, infoCommande.id_commande);
                    if(data == "400"){
                        //console.log("data/error : ", data.status);
                        setErrorModal("Nom de poste déjà utilisé." )
                    }
                    else{

                        // Ferme la modal
                        var closeModalBtn = document.getElementById("btnclosemodalInListeCrea");
                        closeModalBtn.click();
                        setErrorModal("" );

                        setInputQte("")
                        setInputPrix("")
                        setInputIdGamme("")
                        await GetInfoCommande(infoCommande.id_commande);

                    }
                } catch (error) {
                    console.error("Erreur lors de l'ajout de ligne' :", error);
                }
            }else{
                setErrorModal("Les champs prix et quantité doivent être numérique" )
            }

        }
        else{
            setErrorModal("Vous devez remplir tous les champs" )
        }
    }

    const SuppressionLigne = async (id) => {

        try {
            const data = await suppLigne(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                setError("Impossible de supprimer la ligne" )
            }
            else{

                // Ferme la modal
                var closeModalBtn = document.getElementById("btnclosemodal" + id);
                closeModalBtn.click();
                setErrorModal("" );

                await GetInfoCommande(infoCommande.id_commande);

            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de ligne' :", error);
        }

    }

    const ExportPdf = () =>{
        // Exemple d'utilisation
        const livrerPar = infoCommande.nom;
        const livrerLe = inputDatePrev;
        const lignesDeCommande = [];
        const total = 0

        lignes.map((ligne, cpt)=>{
            lignesDeCommande.push({ produit: ligne.libelle, quantite: ligne.qte, prixUnitaire: ligne.prix_unitaire})
        })
        generatePDF("A", "Commande Achat : " + infoCommande.matricule, livrerPar, livrerLe, lignesDeCommande);

    }

    return (<>
            <NavBar login={user.login} droit={user.droit} />
            <div className="container-fluid d-flex flex-row">

                <div className="tableauPoste border-end">

                    <table className="table table-hover table-fixed">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" className="fixed-td" >Type</th>
                            <th scope="col" className="fixed-td">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="fixed-td">
                                <input type="text" id="rechercheGammeNom" className="form-control rechercheInput"
                                    aria-describedby="passwordHelpInline"
                                    value={inputChangeId} onChange={handleChangeId}  >

                                </input></td>
                            <td className="fixed-td2" >
                                <input type="text" id="rechercheGammeNom" className="form-control rechercheInput"
                                       aria-describedby="passwordHelpInline"
                                       value={inputChangeStatut} onChange={handleChangeStatut}  ></input>
                            </td>
                            <td className="fixed-td3">

                            </td >

                        </tr>
                        {commandes.length > 0 && commandes.map((commande, cpt) => {
                            return (
                                <tr onClick={() => {GetInfoCommande(commande.id_commande) }}>
                                    <th scope="row">{commande.matricule}</th>
                                    <td >{commande.statut}</td>
                                    <td >{commande.dateLivPrev}</td>
                                </tr>

                            )

                        })}

                        </tbody>
                    </table>
                </div>
                <div className="posteTravailInfo d-flex flex-row">
                    <div className="InformationPoste">
                        <div >
                            <h2> Commande </h2>

                            <div  className={infoCommande == "" ? "information d-none" : "information"}>
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
                                                   value={infoCommande.id_commande == undefined ? "" : infoCommande.id_commande }
                                                   disabled></input>
                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6"
                                                   className="col-form-label">Matricule </label>
                                        </div>

                                        <div className="col-auto">
                                            <input type="text" id="idPoste" className="form-control"
                                                   aria-describedby="passwordHelpInline"
                                                   value={infoCommande.id_commande == undefined ? "" : infoCommande.matricule }
                                                   disabled></input>
                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label">Statut </label>
                                        </div>

                                        <div className="col-auto">
                                            <select
                                                className="form-select form-control"
                                                aria-label="Default select example"
                                                value={inputStatut} onChange={handleStatut}
                                            >
                                                <option value="">Sélectionner un statut</option>
                                                <option value="En cours">En cours</option>
                                                <option value="Commandé">Commandé</option>
                                                <option value="Soldé">Soldé</option>

                                            </select>

                                        </div>
                                    </div>


                                </div>
                                <div className="d-flex flex-row">

                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6"
                                                   className="col-form-label">Fournisseur </label>
                                        </div>

                                        <div className="col-auto">
                                            <input type="text" id="idPoste" className="form-control"
                                                   aria-describedby="passwordHelpInline"
                                                   value={infoCommande.nom}
                                                   disabled></input>
                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label">Date livraison prévue </label>
                                        </div>

                                        <div className="col-auto">
                                            <input type="date" id="rechercheGammeNom" className="form-control rechercheInput"
                                                   aria-describedby="passwordHelpInline"
                                                   value={inputDatePrev} onChange={handleDatePrev}  ></input>

                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label">Date livraison réel </label>
                                        </div>

                                        <div className="col-auto">
                                            <input type="date" id="rechercheGammeNom" className="form-control rechercheInput"
                                                   aria-describedby="passwordHelpInline"
                                                   value={inputDateReel} onChange={handleDateReel}  ></input>
                                        </div>
                                    </div>


                                </div>


                            </div>
                        </div>
                        <div className={infoCommande == "" ? " d-none" : "mt-3"}>
                            <h2>Lignes commande</h2>
                            <table className="table table-striped information">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Produit</th>
                                    <th scope="col">Quantité</th>
                                    <th scope="col">Prix unitaire</th>
                                    <th scope="col">Prix</th>
                                    <th scope="col" className="tab3pts">
                                        <p className='hoverColor ajoutTab' data-bs-toggle="modal"
                                           data-bs-target="#ajoutInListe"  >
                                            <FontAwesomeIcon icon="fa-solid fa-plus" />
                                        </p>
                                    </th>

                                </tr>
                                </thead>
                                <tbody>
                                {lignes.length > 0 && lignes.map((ligne, cpt) => {
                                    return (
                                        <tr className="align-middle">

                                            <th scope="row"> {cpt +1 }</th>
                                            <td>{ligne.libelle}</td>
                                            <td>{ligne.qte}</td>
                                            <td>{ligne.prix_unitaire}</td>
                                            <td>{ligne.prix}</td>

                                            <td>
                                                <p data-bs-toggle="dropdown" aria-expanded="false" className="pt-3">
                                                    <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical"
                                                                     className="icone3pts" size="lg" />

                                                </p>

                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" data-bs-toggle="modal" href=""
                                                           data-bs-target={"#supp" + ligne.id_ligne}>Supprimer</a>
                                                    </li>

                                                </ul>


                                                <div className="modal fade" id={"supp" + ligne.id_ligne}
                                                     tabIndex="-1" aria-labelledby="exampleModalLabel"
                                                     aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h1 className="modal-title fs-5"
                                                                    id="exampleModalLabel">Suppression</h1>
                                                                <button type="button" className="btn-close"
                                                                        id={"btnclosemodal" + ligne.id_ligne}
                                                                        data-bs-dismiss="modal"
                                                                        aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                Etes-vous sur de vouloir supprimer la ligne ?

                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary"
                                                                        id={"boutonferme" + ligne.id_ligne}
                                                                        data-bs-dismiss="modal">Annuler
                                                                </button>
                                                                <button type="button" className="btn btn-danger"
                                                                        onClick={() => {
                                                                            SuppressionLigne(ligne.id_ligne)
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
                                                <div className="col-auto creationText">
                                                    <label htmlFor="inputPassword6"
                                                           className="col-form-label">Produit </label>
                                                </div>

                                                <div className="col-auto">
                                                    <select
                                                        className="form-select form-control"
                                                        aria-label="Default select example"
                                                        onChange={handleIdGamme}
                                                        value={inputIdGamme} // Définir la valeur sélectionnée
                                                    >
                                                        <option >Sélectionner un produit </option>
                                                        {gammes.length > 0 && gammes.map((gamme, cpt) => {
                                                            return (
                                                                <option value={gamme.id_gamme}>{gamme.libelle}</option>
                                                            )

                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row g-3 align-items-center m-2">
                                                <div className="col-auto creationText">
                                                    <label htmlFor="inputPassword6"
                                                           className="col-form-label">Quantité </label>
                                                </div>

                                                <div className="col-auto">
                                                    <input type="text" id="idPoste" className="form-control"
                                                           aria-describedby="passwordHelpInline"
                                                           onChange={handleQte}
                                                           value={inputQte} ></input>
                                                </div>
                                            </div>
                                            <div className="row g-3 align-items-center m-2">
                                                <div className="col-auto creationText">
                                                    <label htmlFor="inputPassword6"
                                                           className="col-form-label">Prix </label>
                                                </div>

                                                <div className="col-auto">
                                                    <input type="text" id="idPoste" className="form-control"
                                                           aria-describedby="passwordHelpInline"
                                                           onChange={handlePrix}
                                                           value={inputPrix} ></input>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                    data-bs-dismiss="modal">Annuler
                                            </button>
                                            <button type="button" className="btn btn-success"
                                                    onClick={() => {
                                                        AjoutLigne()
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
                            <FontAwesomeIcon icon="fa-solid fa-floppy-disk " className="hoverColor" size="2xl" onClick={() => { modificationCommande()}} />
                        </div>
                        <div className="text-center mt-4">
                            <FontAwesomeIcon icon="fa-solid fa-x" className="hoverColor" size="2xl" onClick={() => {GetInfoCommande(infoCommande.id_commande) }} />
                        </div>

                        <div className="text-center mt-4">
                            <p className="dropdown-item" data-bs-toggle="modal" data-bs-target="#suppPoste">
                                <FontAwesomeIcon icon="fa-solid fa-trash " className="hoverColor" size="2xl" />
                            </p>
                        </div>
                        <div className="text-center mt-4">
                            <FontAwesomeIcon icon="fa-solid fa-file-pdf" className="hoverColor" size="2xl" onClick={() => { ExportPdf() }} />
                        </div>

                        <div className="modal fade" id="ajoutPoste"
                             tabIndex="-1" aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5"
                                            id="exampleModalLabel">Création Commande</h1>
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
                                                <label htmlFor="inputPassword6" className="col-form-label">Fournisseur  </label>
                                            </div>

                                            <div className="col-auto ">
                                                <select
                                                    className="form-select form-control"
                                                    aria-label="Default select example"
                                                    onChange={handleFournCrea}
                                                    value={inputFournCrea}
                                                >
                                                    <option value="">Sélectionner un responsable</option>
                                                    {fourns.length > 0 && fourns.map((fourn, cpt) => {
                                                        return (
                                                            <option value={fourn.id_fourn}>{fourn.nom}</option>
                                                        )

                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row g-3 align-items-center m-2">
                                            <div className="col-auto ">
                                                <label htmlFor="inputPassword6" className="col-form-label">Date Livraison Prévue  </label>
                                            </div>

                                            <div className="col-auto ">
                                                <input type="date" id="rechercheGammeNom" className="form-control rechercheInput"
                                                       aria-describedby="passwordHelpInline"
                                                       value={inputDatePrevCrea} onChange={handleDatePrevCrea}  ></input>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-footer ">
                                        <button type="button" className="btn btn-secondary"
                                                id="boutonferme"
                                                data-bs-dismiss="modal">Annuler
                                        </button>
                                        <button type="button" className="btn btn-success" onClick={() => { ajoutCommande() }}>Créer
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
                                        Etes-vous sur de vouloir supprimer la commande ?

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                id="boutonferme"
                                                data-bs-dismiss="modal">Annuler
                                        </button>
                                        <button type="button" className="btn btn-danger"
                                                onClick={() => { suppMachine(infoCommande.id_commande) }}>Supprimer
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