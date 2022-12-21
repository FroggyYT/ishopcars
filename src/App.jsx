import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import "./global.scss"

import Home from "./Pages/Home.jsx";
import Info from "./Pages/Info.jsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/info" element={<Info />}></Route>
            </Routes>
        </>
    )
}

export default App
