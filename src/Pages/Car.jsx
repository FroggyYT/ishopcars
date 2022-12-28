import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import Navbar from "../Components/Navbar.jsx"
import Footer from "../Components/Footer.jsx"

import getImages from '../Utils/getImages.js'

import isAdmin from '../Utils/isAdmin.js'

const Car = () => {
    const { vin } = useParams();

    const [car, setCar] = useState({});
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);

    const [admin, setAdmin] = useState(false);

    useEffect(async () => {
        const res = await fetch(`/carInfo?vin=${vin}`);
        const data = await res.json();
        setCar(data);
    }, []);

    useEffect(async () => {
        const data = await getImages(vin);
        setImages(data);
    }, [setImages]);

    useEffect(async () => {
        const data = await isAdmin();
        setAdmin(data);
    }, [setAdmin]);

    const setImage = (e) => {
        setCurrentImage(e.target.dataset.index);
    }

    const editCar = () => {
        window.location.href = `/edit/${vin}`;
    }

    const deleteCar = async () => {
        const DELETE_CONFIRM = prompt("Are you sure you want to delete this car? Type 'DELETE' to confirm") == "DELETE";

        if (DELETE_CONFIRM) {
            const res = await fetch(`/deleteCar?vin=${vin}&password=${localStorage.getItem("adminPassword")}`, {
                method: "DELETE"
            });
            const data = await res.text();

            alert(data);
            if (res.status == 200) window.location.href = "/";
        }
    }

    return (
        <>
            <header>
                <Navbar />
            </header>

            <main className="car-main">
                {car && (
                    <>
                        <section className="main">
                            <h1>{car.year} {car.make} {car.model}</h1>
                            <h2>{`$${(+car.price).toLocaleString()}`}</h2>
                        </section>

                        <section className="info">
                            <div className="image-container">
                                <img src={images[currentImage]} alt={car.make} />

                                <div className="images">
                                    {images.map((image, index) => (
                                        <img className={index == currentImage ? "active" : ""} onClick={setImage} data-index={index} src={image} alt={car.make} key={index} />
                                    ))}
                                </div>
                            </div>

                            <div className="info-container">
                                {admin && (
                                    <>
                                        <div className="admin">
                                            <button onClick={editCar}>Edit</button>
                                            <button onClick={deleteCar}>Delete</button>
                                        </div>
                                        <br />
                                    </>
                                )}

                                <div className="quick-info">
                                    <div className="info-item">Mileage</div>
                                    <div className="info-item">{(+car.mileage).toLocaleString()}</div>

                                    <div className="info-item">VIN</div>
                                    <div className="info-item">{car.vin}</div>

                                    <div className="info-item">Color</div>
                                    <div className="info-item">{car.color}</div>

                                    <div className="info-item">Transmission</div>
                                    <div className="info-item">{car.transmission}</div>

                                    <div className="info-item">Engine</div>
                                    <div className="info-item">{car.engine}</div>

                                    <div className="info-item">Drive Type</div>
                                    <div className="info-item">{car.drivetype}</div>

                                    <div className="info-item">Fuel Type</div>
                                    <div className="info-item">{car.fuelType}</div>

                                    <div className="info-item">Fuel Economy City/Hwy</div>
                                    <div className="info-item">{car.fueleconomycity} / {car.fueleconomyhighway}</div>

                                    <div className="info-item">Interior Color</div>
                                    <div className="info-item">{car.interior}</div>
                                </div>

                                <div className="description">
                                    <h3>Description</h3>
                                    <p>{car.description}</p>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </main>

            <Footer />
        </>
    )
}

export default Car