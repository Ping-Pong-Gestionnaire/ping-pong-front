import {GammeAdministration} from "./gamme";
import {Route} from "react-router-dom";
import React from "react";


export function MatierePPage(props) {

    return (
            <GammeAdministration  user={props.user} type="PRE" titre="Matière première" />
        )


}