import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import Navbar from "../Components/Navbar.jsx"

const Edit = () => {
    const { vin } = useParams();

    return (
        <>
            <header>
                <Navbar />
            </header>

            <main className="edit-main">
                Editing: {vin}
            </main>

            <footer>

            </footer>
        </>
    )
}

export default Edit