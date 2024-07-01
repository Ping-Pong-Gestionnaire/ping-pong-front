import React, { useState, useEffect } from 'react';
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
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function Browser() {

    const [user, setUser] = useState();
    useEffect(() => {
        sessionStorage.getItem("user") == null ?
            sessionStorage.setItem("langue", [user]) : setUser(sessionStorage.getItem("user"));
    })

    const initUser = (user) => {

        sessionStorage.setItem('user', JSON.stringify(user));
        var obj = JSON.parse(sessionStorage.user);
        setUser(obj)

        console.log("dans le browser " + user.login)
    };


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
                    <Route path='/login' element={<LoginPage user={user} setUser={initUser}  />} />
                </Routes>
            </BrowserRouter>
        </>
    )

}