import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import "./global.scss"

import Home from "./Pages/Home.jsx";
import Inventory from "./Pages/Inventory.jsx";
import Admin from "./Pages/Admin.jsx";
import Car from "./Pages/Car.jsx";
import Edit from "./Pages/Edit.jsx";

import Error404 from "./Pages/Error404.jsx";

const RedirectToInventory = () => {
    window.location.href = "/inventory";
}

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/car/:vin" element={<Car />} />
            <Route path="/edit/:vin" element={<Edit />} />

            <Route path="/newCar" element={<RedirectToInventory />} />
            <Route path="/editCar" element={<RedirectToInventory />} />

            <Route path="*" element={<Error404 />} />
        </Routes>
    )
}

export default App
