import React, { useState, useEffect } from 'react'

import verifyAdmin from "../Utils/verifyAdmin.js"

import NewCar from "../Components/NewCar.jsx"

import Navbar from "../Components/Navbar.jsx"
import Footer from "../Components/Footer.jsx"

const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(async () => {
        const admin = await verifyAdmin();
        setIsAdmin(admin);
    }, []);
    
    return (
        <>
            <header>
                <Navbar />
            </header>
            
            <main className="admin-main">
                {isAdmin ? <NewCar /> : <h1>Not authorizd</h1>}
            </main>

            <Footer />
        </>
    )
}

export default Admin