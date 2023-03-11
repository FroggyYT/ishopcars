import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Component Imports
import CarCard from "./CarCard.jsx"

const CarDisplay = ({ cars }) => {
    return (
        <>
            {cars.length > 0 ? (
                <div className="car-display">
                    {cars.map(({ vin, images }) => {
                        return <CarCard key={vin} vin={vin} images={images} />
                    })}
                </div>
            ) : (
                <div className="no-results">
                    <h1 style={{color:"white"}}>No Results</h1>
                </div>
            )}
        </>
    )
}

export default CarDisplay;