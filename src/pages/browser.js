import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { LoginPage } from './login.js';
import { TableauDeBord } from './tableauDeBord.js';
import { InformationP } from './informationP.js';
import { PosteTravail } from './posteTravail.js';
import { GammeAdministration } from './gamme.js';
import { MachineAdministration } from './machine_Ad.js';
import { OperationAdministration } from './operation_Ad.js';
import { MatierePPage } from './matiereP.js';
import { PieceIntePage } from './pieceInter.js';
import { PieceVPage } from './pieceVen.js';
import { RealisationPage } from './realisation.js';
import { HistoriquePage } from './historique.js';
import { Fournisseur } from './fournisseur.js';
import { CommandeAchat } from './commandeAchat.js';
import { Facture } from './facture.js';
import { Utilisateur } from './utilisateur.js';
import { PieceAchPage } from './pieceAchete.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Browser() {

    const [user, setUser] = useState();
    useEffect(() => {
        sessionStorage.getItem("user") == null ?
            sessionStorage.setItem("user", [user]) : setUser(sessionStorage.getItem("user"));
    })

    const initUser = (user) => {

        sessionStorage.setItem('user', JSON.stringify(user));
        var obj = JSON.parse(sessionStorage.user);
        setUser(obj)

        console.log("dans le browser " + user.login)
    };


    // gestion du token
    const [token, setToken] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("token") !== null) {
            setToken(sessionStorage.getItem("token"));
        }
    }, []);


    // Fonction pour obtenir le token depuis le sessionStorage
     function getToken() {
        const token = sessionStorage.getItem('token');

        if (token && isTokenValid(token)) {
            console.log("mon token est valide")
            return token;
        }else{
            sessionStorage.removeItem('token');
            console.log("mon token est pas valide")
            return null;
        }

    }

    // Fonction pour vérifier si le token est valide
    function isTokenValid(token) {
        try {
            const { exp } = jwtDecode(token);
            if (Date.now() >= exp * 15000) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    const useAuth = () => {
        useEffect(() => {
            const token = getToken();

            if (window.location.pathname === '/login') {
                return;
            }

            if (!token) {
                window.location.href = '/login';
            }
            console.log("ma gestion de tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
        }, []);
    };

    useAuth();




    return (<>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<TableauDeBord  user={user}/>} />
                    <Route path='/infomationP' element={<InformationP  user={user}/>} />
                    <Route path='/posteTravail' element={<PosteTravail  user={user}/>} />
                    <Route path='/gammeAdministration' element={<GammeAdministration  user={user}/>} />
                    <Route path='/machineAdministration' element={<MachineAdministration  user={user}/>} />
                    <Route path='/operationAdministration' element={<OperationAdministration  user={user}/>} />
                    <Route path='/matiereP' element={<MatierePPage  user={user}/>} />
                    <Route path='/pieceInter' element={<PieceIntePage  user={user}/>} />
                    <Route path='/pieceVendable' element={<PieceVPage  user={user}/>} />
                    <Route path='/realisation' element={<RealisationPage  user={user}/>} />
                    <Route path='/historique' element={<HistoriquePage  user={user}/>} />
                    <Route path='/fournisseur' element={<Fournisseur  user={user}/>} />
                    <Route path='/commandeAchat' element={<CommandeAchat  user={user}/>} />
                    <Route path='/factures' element={<Facture  user={user}/>} />
                    <Route path='/utilisateur' element={<Utilisateur  user={user}/>} />
                    <Route path='/pieceachete' element={<PieceAchPage  user={user}/>} />
                    <Route path='/login' element={<LoginPage user={user} setUser={initUser}  />} />
                </Routes>
            </BrowserRouter>
        </>
    )

}