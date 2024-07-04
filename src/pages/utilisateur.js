import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavBar from "../components/navbar.js";
import React, { useEffect, useState } from "react";
import { getAllPoste, getOnePoste, getMachineByPoste, modifPoste, suppPoste, creaPoste } from '../model/poste.js'
import {getGammeAll, getGammeByType, getGammeByName, creaListeOp} from '../model/gamme.js'
import { suppPosteMachine } from '../model/machine.js'
import {getAllUser, getByName, getUser, modifUser, suppUser, creaUser} from '../model/user.js'
import { getHabilitationByUser , suppHabilitation, creaHabilitation} from '../model/habilitation.js'


export function Utilisateur(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }

    const [users, setUsers] = useState("");
    const [infoUser, setInfoUser] = useState("");
    const [habilitations, setHabilitations] = useState("");
    const [postes, setPostes] = useState("");
    const [infoPoste, setInfoPoste] = useState("");
    const [infoGamme, setInfoGamme] = useState("");
    const [machines, setMachines] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [errorModal, setErrorModal] = useState("");

    const [inputChangeNom, setInputChangeNom] = useState('');

    const [inputLogin, setInputLogin] = useState('');
    const [inputNom, setInputNom] = useState('');
    const [inputPrenom, setInputPrenom] = useState('');
    const [inputDroit, setInputDroit] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputMdp, setInputMdp] = useState('');

    const [inputLoginCrea, setInputLoginCrea] = useState('');
    const [inputDroitCrea, setInputDroitCrea] = useState('');
    const [inputMdpCrea, setInputMdpCrea] = useState('');

    const [inputListePoste, setInputListePoste] = useState('');

    const handleChangeNom = (event) => {
        setInputChangeNom(event.target.value);
        if(event.target.value != ""){
            GetByNameUser(event.target.value);
        }else{
            GetAllUser()
        }
    };
    const handleNom = (event) => {
        setInputNom(event.target.value);
    };
    const handlePrenom = (event) => {
        setInputPrenom(event.target.value);
    };
    const handleLogin = (event) => {
        setInputLogin(event.target.value);
    };
    const handleDroit = (event) => {
        setInputDroit(event.target.value);
    };
    const handleEmail = (event) => {
        setInputEmail(event.target.value);
    };
    const handleMdp = (event) => {
        setInputMdp(event.target.value);
    };
    const handleLoginCRea = (event) => {
        setInputLoginCrea(event.target.value);
    };
    const handleDroitCrea = (event) => {
        setInputDroitCrea(event.target.value);
    };
    const handleMdpCrea = (event) => {
        setInputMdpCrea(event.target.value);
    };
    const handleListePoste = (event) => {
        setInputListePoste(event.target.value);
    };

    const GetAllUser = async () => {

        try {
            const data = await getAllUser();
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                setUsers(data);
                setError("")
                setSuccess("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    useEffect(() => {
        GetAllUser();
        GetAllPoste();
    }, [user.id_user])

    const GetByNameUser = async (login) => {

        try {
            const data = await getByName(login);
            if (data == "400") {
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else {
                setUsers(data);
                setError("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    const GetInfoUser = async (id) => {
        console.log("jedemande a changer")
        try {
            const data = await getUser(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                console.log(" je regarde dans mon poste" + data)
                setInfoUser(data);

                setInputLogin(data.login)

                if(data.nom == null){
                    setInputNom("")
                }else{
                    setInputNom(data.nom)
                }
                if(data.prenom == null){
                    setInputPrenom("")
                }else{
                    setInputPrenom(data.prenom)
                }
                if(data.droit == null){
                    setInputDroit("")
                }else{
                    setInputDroit(data.droit)
                }
                if(data.email == null){
                    setInputEmail("")
                }else{
                    setInputEmail(data.email)
                }

                setInputMdp("")

                setError("" )
                setSuccess("")
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

        try {
            const data = await getHabilitationByUser(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                //setError("Récupération d'information sur le compte impossible." )
            }
            else{
                console.log(" je regarde dans mon poste" + data)
                setHabilitations(data);
                setError("" )
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de poste :", error);
        }

    };

    const suppressionUser = async (id) => {

        try {
            const data = await suppUser(id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                setError("Impossible de supprimer l'utilisateur'." )
            }
            else{
                var closeModalBtn = document.getElementById("btnclosemodalPoste");
                closeModalBtn.click();

                setInfoUser("")
                GetAllUser()
                setError("" )
                setSuccess("")
            }
        } catch (error) {
            console.error("Erreur lors de la supression d'utilisateur :", error);
        }

    };
    const modificationUser = async () => {

        console.log(inputLogin+ " "+ inputNom)
        if( inputLogin != "" && inputNom !="" && inputPrenom !="" && inputDroit !="" && inputEmail!="" ) {
            try {
                const data = await modifUser(infoUser.id_user, inputLogin, inputNom , inputPrenom ,   inputEmail, inputDroit , inputMdp);
                if(data == "400"){
                    setError("Il y a eu une erreur sur la modification du poste" )
                    setSuccess("")
                }
                else{
                    setError("" )
                    await GetInfoUser(infoUser.id_user)
                    await GetAllUser()

                    setSuccess("Modification enregistrée")

                }
            } catch (error) {
                setError("Il y a eu une erreur sur la modification de l'utilisateur" )
                setSuccess("")
                console.log(error)
            }
        }
        else{
            setError("Tous les champs doivent être remplis" )
            setSuccess("")
        }
    };

    const ajoutUser = async () => {


        if( inputLoginCrea != "" && inputDroitCrea !="" && inputMdpCrea !="" ){
            try {
                const data = await creaUser(inputLoginCrea, inputDroitCrea, inputMdpCrea);
                if(data == "400"){
                    console.log("data/error : ", data.status);
                    setErrorModal("Nom de poste déjà utilisé." )
                }
                else{

                    // Ferme la modal
                    var closeModalBtn = document.getElementById("btnclosemodalPosteAjout");
                    closeModalBtn.click();

                    setErrorModal("" );
                    await GetAllUser()
                    setSuccess("Nouvel utilisateur créé")
                }
            } catch (error) {
                console.error("Erreur lors de la recherche de poste :", error);
            }
        }
        else{
            setErrorModal("Vous devez remplir tous les champs." )
        }
    };

    const suppressionHabilitation = async (id) => {

        try {
            const data = await suppHabilitation(user.id_user, id);
            if(data == "400"){
                console.log("data/error : ", data.status);
                setErrorModal("Impossible de supprimer l'habilitation" )
            }
            else{
                var closeModalBtn = document.getElementById("btnclosemodal" + id);
                closeModalBtn.click();

                GetInfoUser(infoUser.id_user)
                setErrorModal("" )
            }
        } catch (error) {
            console.error("Erreur lors de la supression d'utilisateur :", error);
            setErrorModal("Impossible de supprimer l'habilitation" )
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

    const ajoutListeHabilitation = async () => {

        if(inputListePoste === "" ){
            setErrorModal("Vous devez sélectionner un poste")
        }else{
            try {
                const data = await creaHabilitation(infoUser.id_user, inputListePoste);
                if (data == "400") {
                    console.log("data/error : ", data.status);
                    setErrorModal("Ce poste à déjà été attribué")
                }
                else {
                    var id_btn = "btnclosemodalGamme"
                    // Ferme la modal
                    const btnclose = document.getElementById("btnclosemodalInListeCrea" );
                    btnclose.click();

                    setErrorModal("");
                    await GetInfoUser(infoUser.id_user)
                    setInputListePoste("")
                    setErrorModal("")
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
                            <th scope="col">#</th>
                            <th scope="col" className="fixed-td" >Login</th>
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
                        {users.length > 0 && users.map((user, cpt) => {
                            return (
                                <tr onClick={() => { GetInfoUser(user.id_user)}}>
                                    <th scope="row">{user.id_user}</th>
                                    <td >{user.login}</td>
                                </tr>

                            )

                        })}

                        </tbody>
                    </table>
                </div>
                <div className="posteTravailInfo d-flex flex-row">
                    <div className="InformationPoste">
                        <div >
                            <h2> Utilisateur </h2>

                            <div  className={infoUser == "" ? "information d-none" : "information"}>
                                <div className={error == "" ? "d-none" : "alert alert-danger mt-3"} role="alert">
                                    {error == "" ? "" : error}
                                </div>
                                <div className={success == "" ? "d-none" : "alert alert-success mt-3"} role="alert">
                                    {success == "" ? "" : success}
                                </div>


                                <div className="d-flex flex-row">
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label">Identifiant</label>
                                        </div>
                                        <div className="col-auto">
                                            <input type="text" id="inputPassword6" className="form-control"
                                                   aria-describedby="passwordHelpInline"
                                                   value={infoUser.id_user} disabled
                                            ></input>
                                        </div>

                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label">Login</label>
                                        </div>
                                        <div className="col-auto">
                                            <input type="text" id="inputPassword6" className="form-control"
                                                   aria-describedby="passwordHelpInline"
                                                   value={inputLogin} onChange={handleLogin}
                                            ></input>
                                        </div>

                                    </div>

                                </div>

                                <h4 className="mt-4"> Information </h4>
                                <div className="d-flex flex-row">

                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label"> Nom </label>
                                        </div>
                                        <div className="col-auto">
                                            <input type="text" id="inputPassword6" className="form-control"
                                                   aria-describedby="passwordHelpInline"
                                                   value={inputNom} onChange={handleNom}
                                            ></input>
                                        </div>

                                    </div>

                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label" >Prénom</label>
                                        </div>
                                        <div className="col-auto">
                                            <input type="text" id="inputPassword6" className="form-control"
                                                   aria-describedby="passwordHelpInline"
                                                   value={inputPrenom} onChange={handlePrenom}
                                            ></input>
                                        </div>

                                    </div>

                                </div>
                                <div className="d-flex flex-row">
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label">Rôle</label>
                                        </div>
                                        <div className="col-auto">
                                            <select
                                                className="form-select form-control"
                                                aria-label="Default select example"
                                                value={inputDroit} onChange={handleDroit}
                                            >
                                                <option value="">Sélectionner un niveau de droit</option>
                                                <option value="administrateur">Administrateur</option>
                                                <option value="atelier">Atelier</option>
                                                <option value="comptabilité">Comptabilité</option>

                                            </select>
                                        </div>

                                    </div>

                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label"> Email </label>
                                        </div>
                                        <div className="col-auto">
                                            <input type="text" id="inputPassword6" className="form-control"
                                                   aria-describedby="passwordHelpInline"
                                                   value={inputEmail} onChange={handleEmail}
                                            ></input>
                                        </div>

                                    </div>
                                    <div className="row g-3 align-items-center m-2">
                                        <div className="col-auto">
                                            <label htmlFor="inputPassword6" className="col-form-label"> Mot de passe </label>
                                        </div>
                                        <div className="col-auto">
                                            <input type="password" id="inputPassword6" className="form-control"
                                                   aria-describedby="passwordHelpInline"
                                                   value={inputMdp} onChange={handleMdp}
                                            ></input>
                                        </div>

                                    </div>
                                </div>




                            </div>
                        </div>
                       <div className={infoUser == "" ? " d-none" : "mt-3"}>
                            <h2>Habilitation</h2>
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
                                {habilitations.length > 0 && habilitations.map((habilitation, cpt) => {
                                    return (
                                        <tr className="align-middle">

                                            <th scope="row"> {habilitation.id_poste}</th>
                                            <td>{habilitation.nom}</td>
                                            <td>
                                                <p data-bs-toggle="dropdown" aria-expanded="false" className="pt-3">
                                                    <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical"
                                                                     className="icone3pts" size="lg" />

                                                </p>

                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" data-bs-toggle="modal"
                                                           data-bs-target={"#supp" + habilitation.id_poste}>Supprimer</a>
                                                    </li>
                                                </ul>


                                                <div className="modal fade" id={"supp" + habilitation.id_poste}
                                                     tabIndex="-1" aria-labelledby="exampleModalLabel"
                                                     aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h1 className="modal-title fs-5"
                                                                    id="exampleModalLabel">Suppression</h1>
                                                                <button type="button" className="btn-close"
                                                                        id={"btnclosemodal" + habilitation.id_poste}
                                                                        data-bs-dismiss="modal"
                                                                        aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                Etes-vous sur de vouloir supprimer l'habilitation de l'utilisatateur
                                                                ?

                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary"
                                                                        id={"boutonferme" + habilitation.id_poste}
                                                                        data-bs-dismiss="modal">Annuler
                                                                </button>
                                                                <button type="button" className="btn btn-danger"
                                                                        onClick={() => {
                                                                            suppressionHabilitation(habilitation.id_poste)
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
                                                id="exampleModalLabel">Ajout habilitation</h1>
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
                                                           className="col-form-label">Poste </label>
                                                </div>

                                                <div className="col-auto">
                                                    <select
                                                        className="form-select form-control"
                                                        aria-label="Default select example"
                                                        onChange={handleListePoste}
                                                        value={inputListePoste} // Définir la valeur sélectionnée
                                                    >
                                                        <option >Sélectionner une opération </option>
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
                                                    data-bs-dismiss="modal">Annuler
                                            </button>
                                            <button type="button" className="btn btn-success"
                                                    onClick={() => {
                                                        ajoutListeHabilitation()
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
                            <FontAwesomeIcon icon="fa-solid fa-floppy-disk " className="hoverColor" size="2xl" onClick={() => { modificationUser()}} />
                        </div>
                        <div className="text-center mt-4">
                            <FontAwesomeIcon icon="fa-solid fa-x" className="hoverColor" size="2xl" onClick={() => { GetInfoUser(infoUser.id_user)}} />
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
                                            id="exampleModalLabel">Création utilisateur</h1>
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
                                                <label htmlFor="inputPassword6" className="col-form-label"> Login </label>
                                            </div>
                                            <div className="col-auto">
                                                <input type="text" id="inputPassword6" className="form-control"
                                                       aria-describedby="passwordHelpInline"
                                                       value={inputLoginCrea} onChange={handleLoginCRea}
                                                ></input>
                                            </div>

                                        </div>
                                        <div className="row g-3 align-items-center m-2">
                                            <div className="col-auto">
                                                <label htmlFor="inputPassword6" className="col-form-label">Rôle</label>
                                            </div>
                                            <div className="col-auto">
                                                <select
                                                    className="form-select form-control"
                                                    aria-label="Default select example"
                                                    value={inputDroitCrea} onChange={handleDroitCrea}
                                                >
                                                    <option value="">Sélectionner un niveau de droit</option>
                                                    <option value="administrateur">Administrateur</option>
                                                    <option value="atelier">Atelier</option>
                                                    <option value="comptabilité">Comptabilité</option>

                                                </select>
                                            </div>

                                        </div>
                                        <div className="row g-3 align-items-center m-2">
                                            <div className="col-auto">
                                                <label htmlFor="inputPassword6" className="col-form-label"> Mot de passe </label>
                                            </div>
                                            <div className="col-auto">
                                                <input type="password" id="inputPassword6" className="form-control"
                                                       aria-describedby="passwordHelpInline"
                                                       value={inputMdpCrea} onChange={handleMdpCrea}
                                                ></input>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="modal-footer ">
                                        <button type="button" className="btn btn-secondary"
                                                id="boutonferme"
                                                data-bs-dismiss="modal">Annuler
                                        </button>
                                        <button type="button" className="btn btn-success" onClick={() => {ajoutUser() }}>Créer
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
                                        Etes-vous sur de vouloir supprimer l'utilisateur ?

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                id="boutonferme"
                                                data-bs-dismiss="modal">Annuler
                                        </button>
                                        <button type="button" className="btn btn-danger"
                                                onClick={() => { suppressionUser(infoUser.id_user)}}>Supprimer
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