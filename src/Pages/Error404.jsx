import React, { useState, useEffect } from 'react'

// Component Imports
import Navbar from "../Components/Navbar.jsx"
import Footer from "../Components/Footer.jsx"

const Error404 = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>

            <main className="error404-main">
                <center>
                    <h1>ERROR 404</h1>
                    <h2>Page Not Found!</h2>
                </center>
            </main>

            <Footer />
        </>
    )
}

export default Error404