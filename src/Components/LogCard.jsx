import React, { useState, useEffect } from 'react'

const LogCard = ({ ip, data }) => {
    const aliasChanged = (e) => {
        const newAlias = e.target.value;

        fetch(`/changeAlias?password=${localStorage.getItem("adminPassword")}&ip=${encodeURIComponent(ip)}&newAlias=${encodeURIComponent(newAlias)}`);
    } 

    const notesChanged = (e) => {
        const newNotes = e.target.value;

        fetch(`/changeNotes?password=${localStorage.getItem("adminPassword")}&ip=${encodeURIComponent(ip)}&newNotes=${encodeURIComponent(newNotes)}`);
    }

    return (
        <div className="log-card">
            <input type="text" name="alias" id="alias" onChange={aliasChanged} defaultValue={data.alias || "Click to add alias"}/>
            <div className="ip">{ip}</div>
            <textarea name="notes" id="notes" onChange={notesChanged} defaultValue={data.notes || "Click to add notes"}></textarea>
            <textarea readOnly name="requests" id="requests" value={data.requests.reverse().join("\n\n")}></textarea>
        </div>
    )
}

export default LogCard