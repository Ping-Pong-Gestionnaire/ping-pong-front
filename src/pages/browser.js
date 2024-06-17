import React, { useState, useEffect } from 'react';
import { LoginPage } from './login.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function Browser() {
    return (<>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<LoginPage  />} />
                </Routes>
            </BrowserRouter>
        </>
    )

}