import React, { useState, useEffect, useRef } from 'react'

import verifyAdmin from "../Utils/verifyAdmin.js"

import ImageUpload from "./ImageUpload.jsx"

import toDataURL from '../Utils/toDataURL';

const NewCar = () => {
    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState(undefined);

    return (
        <>
            <div className="new-car-form-wrapper">
                <form className="new-car-form" action="/newCar" method="POST" encType="multipart/form-data">
                    <div className="inputs">
                        <label htmlFor="make">Make</label>
                        <input type="text" name="make" id="make" />

                        <label htmlFor="model">Model</label>
                        <input type="text" name="model" id="model" />

                        <label htmlFor="year">Year</label>
                        <input type="text" name="year" id="year" />

                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price" />

                        <label htmlFor="mileage">Mileage</label>
                        <input type="number" name="mileage" id="mileage" />

                        <label htmlFor="vin">VIN</label>
                        <input type="text" name="vin" id="vin" />

                        <label htmlFor="color">Color</label>
                        <input type="text" name="color" id="color" />

                        <label htmlFor="transmission">Transmission</label>
                        <input type="text" name="transmission" id="transmission" />

                        <label htmlFor="fuelType">Fuel Type</label>
                        <input type="text" name="fuelType" id="fuelType" />

                        <label htmlFor="stockNumber">Stock Number</label>
                        <input type="text" name="stockNumber" id="stockNumber" />

                        <label htmlFor="engine">Engine</label>
                        <input type="text" name="engine" id="engine" />

                        <label htmlFor="drivetype">Drive Type</label>
                        <input type="text" name="drivetype" id="drivetype" />

                        <label htmlFor="interior">Interior</label>
                        <input type="text" name="interior" id="interior" />

                        <label htmlFor="fueleconomycity">Fuel Economy: City</label>
                        <input type="text" name="fueleconomycity" id="fueleconomycity" />

                        <label htmlFor="fueleconomyhighway">Fuel Economy: Highway</label>
                        <input type="text" name="fueleconomyhighway" id="fueleconomyhighway" />

                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" cols="30" rows="10"></textarea>

                        <input type="hidden" name="password" id="password" defaultValue={localStorage.getItem("adminPassword")} />
                        <input type="hidden" defaultValue={Date.now()} name="timestamp" id="timestamp" />

                        <label htmlFor="images">Images</label>
                        <ImageUpload setImages={setImages} setImageFiles={setImageFiles}/>
                    </div>

                    <div className="image-gallery">
                        {images.map((image, index) => {
                            return (
                                <div className="image" key={index}>
                                    <img src={image} />
                                </div>
                            )
                        })}
                    </div>

                    

                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
    )
}

export default NewCar