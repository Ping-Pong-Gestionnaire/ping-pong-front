import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function NavBar(props) {

    const navItems = [
        { page: "Home", redirect: "/" },
        { page: "Projects", redirect: "/projects" },
        { page: "Blog", redirect: "/blog" },

    ]

    // scroll
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            setScrollPosition(position);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (<>
            <header className="App-header">
                <nav className="navbar navbar-expand-lg  shadow-sm navigation fixed-top ${scrollPosition && 'scrolled'} ">
                    <div class="container-fluid">

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center">
                                {navItems.map((element) => {
                                    return (
                                        < li class="nav - item" >
                                            < a class="nav-link active" href={element.redirect} > {element.page}</a >
                                        </li >
                                    )
                                })}
                            </ul>
                            <form class="d-flex" role="search">
                                <FontAwesomeIcon icon="fa-solid fa-flag" />
                                < FontAwesomeIcon icon="fa-solid fa-moon" size="xl" />

                            </form>
                        </div>
                    </div>
                </nav >

                <div class="espaceNav">

                </div>
            </header >
        </>
    )
}

export default NavBar;