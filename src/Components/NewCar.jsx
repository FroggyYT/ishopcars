import React, { useState, useEffect, useRef } from 'react'

import verifyAdmin from "../Utils/verifyAdmin.js"

import ImageUpload from "./ImageUpload.jsx"

import toDataURL from '../Utils/toDataURL';

const NewCar = () => {
    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState(undefined);
    const [loadCounter, setLoadCounter] = useState(0);

    const formRef = useRef();
    const imagesRef = useRef();
    const infoRef = useRef();

    const vinRef = useRef();

    const otherVinRef = useRef();

    const uploadFilesToServer = async (e) => {
        // e.preventDefault();
        // if (vinRef.current.value.length < 2) return;

        // formRef.current.submit();
    }

    const submitForm = () => {
    //     console.log("t");
    //     setLoadCounter(a => a + 1);
    //     if (loadCounter+1 > 1) infoRef.current.submit();
    }

    const changeVin = () => {
    //     otherVinRef.current.value = vinRef.current.value;
    }

    // useEffect(() => {
    //     imagesRef.current.files = imageFiles;
    // }, [imageFiles]);

    return (
        <>
            {/* <iframe onLoad={submitForm} className="nodisplay" name="dummy" id="dummy"></iframe>
            <form ref={formRef} action="/uploadImages" method="POST" className="nodisplay" target="dummy" encType="multipart/form-data">
                <input ref={imagesRef} type="file" name="images" id="images" />
                <input ref={otherVinRef} type="text" name="vinn" id="vinn" />
            </form> */}
            <div className="new-car-form-wrapper">
                <form ref={infoRef} className="new-car-form" action="/newCar" method="POST" onSubmit={uploadFilesToServer} encType="multipart/form-data">
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
                        <input onChange={changeVin} ref={vinRef} type="text" name="vin" id="vin" />

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