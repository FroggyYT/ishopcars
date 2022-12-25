import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import "./global.scss"

import Home from "./Pages/Home.jsx";
import Inventory from "./Pages/Inventory.jsx";
import Admin from "./Pages/Admin.jsx";
import Car from "./Pages/Car.jsx";
import Edit from "./Pages/Edit.jsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/inventory" element={<Inventory />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="/car/:vin" element={<Car />}></Route>
                <Route path="/edit/:vin" element={<Edit />}></Route>
            </Routes>
        </>
    )
}

export default App
