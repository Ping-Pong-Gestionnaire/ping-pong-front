import {GammeAdministration} from "./gamme";
import {Route} from "react-router-dom";
import React from "react";


export function PieceIntePage(props) {

    return (
        <GammeAdministration  user={props.user} type="INT" titre="Pièce Intermédiare" />
    )


}