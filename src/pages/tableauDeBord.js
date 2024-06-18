import React, { useState, useEffect } from 'react';
import NavBar from "../components/navbar.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {connexionApi , GetAllUser, getPost} from '../model/user.js'

export function TableauDeBord(props) {

    var user = ""
    if (sessionStorage.getItem("user") != null) {
        user = JSON.parse(sessionStorage.user);
    }
    return (<>
            <div className="container-md">

                {user.login}

            </div>

        </>
    );
}

