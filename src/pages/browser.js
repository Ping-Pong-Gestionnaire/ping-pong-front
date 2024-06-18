import React, { useState, useEffect } from 'react';
import { LoginPage } from './login.js';
import { TableauDeBord } from './tableauDeBord.js';
import { InformationP } from './informationP.js';
import { PosteTravail } from './posteTravail.js';
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
                    <Route path='/tableaudebord' element={<TableauDeBord  user={user}/>} />
                    <Route path='/infomationP' element={<InformationP  user={user}/>} />
                    <Route path='/posteTravail' element={<PosteTravail  user={user}/>} />
                    <Route path='/login' element={<LoginPage user={user} setUser={initUser}  />} />
                </Routes>
            </BrowserRouter>
        </>
    )

}