import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function NavBar(props) {

    const navItems = [
        { page: "Home", redirect: "/" },
        { page: "Projects", redirect: "/projects" },
        { page: "Blog", redirect: "/blog" },

    ]

    return (<>
            <header className="">

                <nav className="navbar bg-body-tertiary fixed-top">
                    <div className="container-fluid">

                        <a className="navbar-brand" href="#">
                            <FontAwesomeIcon icon="fa-solid fa-table-tennis-paddle-ball" />
                            {props.login}
                        </a>
                        <a className="navbar-brand infoDroit" href="#" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">{props.droit}</a>


                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar"
                             aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Ping-Pong Gestionnaire</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                        aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">

                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 border-bottom p-2">
                                    <h5> Stock </h5>
                                    <li className="nav-item ms-5">
                                        <a className="nav-link active" aria-current="page" href="/matiereP">Matière première</a>
                                    </li>
                                    <li className="nav-item ms-5">
                                        <a className="nav-link active" aria-current="page" href="/pieceInter">Pièce intermédiare</a>
                                    </li>
                                    <li className="nav-item ms-5">
                                        <a className="nav-link active" aria-current="page" href="#">Pièce vendable</a>
                                    </li>


                                </ul>

                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 border-bottom mt-2">
                                    <h5> Fabrication </h5>
                                    <li className="nav-item ms-5">
                                        <a className="nav-link active" aria-current="page" href="/gammeAdministration">Gamme</a>
                                    </li>
                                    <li className="nav-item ms-5">
                                        <a className="nav-link active" aria-current="page" href="/operationAdministration">Opération</a>
                                    </li>
                                    <li className="nav-item ms-5">
                                        <a className="nav-link active" aria-current="page" href="#">Historique</a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 border-bottom mt-2">
                                    <h5> Administration </h5>
                                    <li className="nav-item ms-5">
                                        <a className="nav-link active" aria-current="page" href="/habilitation">Habilitation</a>
                                    </li>
                                    <li className="nav-item ms-5">
                                        <a className="nav-link active" aria-current="page" href="/posteTravail">Poste de travail</a>
                                    </li>

                                    <li className="nav-item ms-5">
                                        <a className="nav-link active" aria-current="page" href="/machineAdministration">Machine</a>
                                    </li>
                                    <li className="nav-item ms-5">
                                        <a className="nav-link active" aria-current="page" href="/utilisateur">Utilisateur</a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 border-bottom mt-2">
                                    <h5> Mon profil </h5>
                                    <li className="nav-item ms-5">
                                        <a className="nav-link active" aria-current="page" href="/infomationP">Information personnelle</a>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </nav>

            </header >
            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    Some placeholder content for the collapse component. This panel is hidden by default but
                    revealed when the user activates the relevant trigger.
                </div>
            </div>
        </>
    )
}

export default NavBar;