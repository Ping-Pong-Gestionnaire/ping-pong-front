import {GammeAdministration} from "./gamme";
import {Route} from "react-router-dom";
import React from "react";


export function PieceVPage(props) {

    return (
        <GammeAdministration  user={props.user} type="VEN" titre="Pièce Vendable" />
    )


}