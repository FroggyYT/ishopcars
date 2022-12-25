import React, { useState, useEffect } from "react";

import Navbar from "../Components/Navbar.jsx"

import CarDisplay from "../Components/CarDisplay.jsx"

const Inventory = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>

            <main className="inventory-main">
                <div className="sidebar">

                </div>
                <div className="main">
                    <CarDisplay />
                </div>
            </main>

            <footer>

            </footer>
        </>
    )
}

export default Inventory;