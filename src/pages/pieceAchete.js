import {GammeAdministration} from "./gamme";
import {Route} from "react-router-dom";
import React from "react";


export function PieceAchPage(props) {

    return (
        <GammeAdministration  user={props.user} type="ACH" titre="Pièce Acheté" />
    )

}