import React, { useState, useEffect } from 'react'

import Navbar from "../Components/Navbar.jsx"
import Footer from "../Components/Footer.jsx"

import verifyAdmin from "../Utils/verifyAdmin.js"

import LogCard from "../Components/LogCard.jsx"

const Logs = () => {
    const [logsData, setLogsData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(async () => {
        const admin = await verifyAdmin();
        setIsAdmin(admin);
    }, []);

    useEffect(async () => {
        if (!isAdmin) return;
        
        const response = await fetch(`/rawLogs?password=${localStorage.getItem("adminPassword")}`);
        const data = await response.json()

        setLogsData(data);
    }, [isAdmin]);

    return (
        <>
            <header>
                <Navbar />
            </header>
            
            <main className="logs-main">
                {isAdmin ? (
                    <>
                        {(() => {
                            
                            const keys = Object.keys(logsData);
                            const values = Object.values(logsData);

                            const elements = keys.map((key, index) => {
                                return <LogCard key={key} ip={key} data={values[index]} />
                            });

                            return (
                                <>
                                    {elements}
                                </>
                            )
                        })()}
                    </>
                ) : <h1>Not authorizd</h1>}
            </main>

            <Footer />
        </>
    )
}

export default Logs