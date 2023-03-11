import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

// Component Imports
import Navbar from "../Components/Navbar.jsx"
import Footer from "../Components/Footer.jsx"
import ImageUpload from "../Components/ImageUpload.jsx";

// Util Imports
import getCarInfo from '../Utils/getCarInfo.js';
import getImages from '../Utils/getImages.js';
import imageURLToFile from '../Utils/imageURLToFile.js';

const Edit = () => {
    const { vin } = useParams();

    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState(undefined);

    const [oldImages, setOldImages] = useState([]);

    const [carData, setCarData] = useState({});

    const [removedImages, setRemovedImages] = useState([]);

    useEffect(async () => {
        const car = await getCarInfo(vin);
        setCarData(car);
    }, []);

    useEffect(async () => {
        setOldImages([]);

        const imgs = await getImages(vin);
        setOldImages(imgs);
    }, []);

    const removeImage = (e) => {
        const index = e.target.dataset.index;
        const srcIndex = e.target.dataset.srcindex;

        const newImages = oldImages.filter((image, i) => i !== parseInt(index));
        setOldImages(newImages);

        setRemovedImages(removed => [...removed, srcIndex]);
    }

    return (
        <>
            <header>
                <Navbar />
            </header>

            <main className="edit-main">
                <div className="new-car-form-wrapper">
                    <form className="new-car-form" action="/editCar" method="POST" encType="multipart/form-data">
                        <h1>Editing: {vin}</h1>
                        <div className="inputs">
                            <label htmlFor="make">Make</label>
                            <input defaultValue={carData.make} type="text" name="make" id="make" />

                            <label htmlFor="model">Model</label>
                            <input defaultValue={carData.model} type="text" name="model" id="model" />

                            <label htmlFor="year">Year</label>
                            <input defaultValue={carData.year} type="text" name="year" id="year" />

                            <label htmlFor="price">Price</label>
                            <input defaultValue={carData.price} type="number" name="price" id="price" />

                            <label htmlFor="mileage">Mileage</label>
                            <input defaultValue={carData.mileage} type="number" name="mileage" id="mileage" />

                            <label htmlFor="color">Color</label>
                            <input defaultValue={carData.color} type="text" name="color" id="color" />

                            <label htmlFor="transmission">Transmission</label>
                            <input defaultValue={carData.transmission} type="text" name="transmission" id="transmission" />

                            <label htmlFor="fuelType">Fuel Type</label>
                            <input defaultValue={carData.fuelType} type="text" name="fuelType" id="fuelType" />

                            <label htmlFor="stockNumber">Stock Number</label>
                            <input defaultValue={carData.stockNumber} type="text" name="stockNumber" id="stockNumber" />

                            <label htmlFor="engine">Engine</label>
                            <input defaultValue={carData.engine} type="text" name="engine" id="engine" />

                            <label htmlFor="drivetype">Drive Type</label>
                            <input defaultValue={carData.drivetype} type="text" name="drivetype" id="drivetype" />

                            <label htmlFor="interior">Interior</label>
                            <input defaultValue={carData.interior} type="text" name="interior" id="interior" />

                            <label htmlFor="fueleconomycity">Fuel Economy: City</label>
                            <input defaultValue={carData.fueleconomycity} type="text" name="fueleconomycity" id="fueleconomycity" />

                            <label htmlFor="fueleconomyhighway">Fuel Economy: Highway</label>
                            <input defaultValue={carData.fueleconomyhighway} type="text" name="fueleconomyhighway" id="fueleconomyhighway" />

                            <label htmlFor="description">Description</label>
                            <textarea defaultValue={carData.description} name="description" id="description" cols="30" rows="10"></textarea>

                            <input type="hidden" name="password" id="password" defaultValue={localStorage.getItem("adminPassword")} />
                            <input type="hidden" defaultValue={Date.now()} name="timestamp" id="timestamp" />
                            <input type="hidden" name="vin" id="vin" defaultValue={vin} />

                            <input type="hidden" name="removedImages" id="removedImages" defaultValue={removedImages} />

                            <label htmlFor="images">Upload New Images</label>
                            <ImageUpload setImages={setImages} setImageFiles={setImageFiles}/>
                        </div>

                        {images?.length > 0 ? <h2>New Images</h2> : <></>}
                        <div className="image-gallery">
                            {images.map((image, index) => {
                                return (
                                    <div className="image" key={index}>
                                        <img src={image} />
                                    </div>
                                )
                            })}
                        </div>

                        <h2>Current Images</h2>
                        <p>Click on an image to remove it</p>

                        <div className="image-gallery">
                            {oldImages.map((image, index) => {
                                const srcIndex = +(image.split("&index=")[1]);

                                return (
                                    <div className="image" key={index}>
                                        <img onClick={removeImage} data-srcindex={srcIndex} data-index={index} src={image} />
                                    </div>
                                )
                            })}
                        </div>

                        

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default Edit