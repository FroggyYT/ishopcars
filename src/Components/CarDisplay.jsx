import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CarCard from "./CarCard.jsx"

import getImages from "../Utils/getImages.js"
import getCarVins from "../Utils/getCarVins.js";
import getCarInfo from "../Utils/getCarInfo.js";

const sorts = {
    priceLowest: (a, b) => ((+a.price) - (+b.price)),
    priceHighest: (a, b) => ((+b.price) - (+a.price)),
    oldest: (a, b) => ((+a.year) - (+b.year)),
    newest: (a, b) => ((+b.year) - (+a.year)),
    vin: (a, b) => (a.vin.charCodeAt() - b.vin.charCodeAt()),
    vinInverted: (a, b) => (b.vin.charCodeAt() - a.vin.charCodeAt())
}

const CarDisplay = () => {
    const [vins, setVins] = useState([]);
    const [cars, setCars] = useState([]);
    const [sortMethod, setSortMethod] = useState("oldest");

    useEffect(async () => {
        const _vins = await getCarVins();
        setVins(_vins);
    }, []);

    useEffect(async () => {
        setCars([]);

        vins.forEach(async (vin, index) => {
            const images = await getImages(vin);
            const carData = await getCarInfo(vin);

            const car = {
                price: carData.price,
                year: carData.year,
                vin: vin,
                images: images
            }

            setCars(cars => [...cars, car]);
        });
    }, [vins]);

    return (
        <>
            {cars.length > 0 ? (
                <div className="car-display">
                    {cars.sort(sorts[sortMethod]).map(({ vin, images }) => {
                        return <CarCard key={vin} vin={vin} images={images} />
                    })}
                </div>
            ) : <>Loading...</>}
        </>
    )
}

export default CarDisplay;