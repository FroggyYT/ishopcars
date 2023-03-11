import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

// Util Imports
import getCarInfo from "../Utils/getCarInfo.js";

// Icon Imports
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

const CarCard = ({ images, vin }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const [carData, setCarData] = useState(undefined);

    useEffect(async () => {
        const car = await getCarInfo(vin);
        setCarData(car);
    }, []);

    const nextImage = () => {
        if (currentImage < images.length - 1) {
            setCurrentImage(currentImage + 1);
        } else {
            setCurrentImage(0);
        }
    }

    const prevImage = () => {
        if (currentImage > 0) {
            setCurrentImage(currentImage - 1);
        } else {
            setCurrentImage(images.length - 1);
        }
    }

    const dotClick = (e) => {
        setCurrentImage(e.target.dataset.index);
    }

    return (
        <div className="car-card">
            <div className="image-container">
                <button className="prev arrow" onClick={prevImage}>
                    <MdArrowBackIosNew />
                </button>
                <div className="images">
                    {images.map((image, index) => {
                        return (
                            <Link to={`/car/${carData?.vin}`}><div className={`image ${index === currentImage ? "active" : ""}`} key={index}>
                                <img src={image} />
                            </div></Link>
                        )
                    })}
                </div>
                <button className="next arrow" onClick={nextImage}>
                    <MdArrowForwardIos />
                </button>

                <div className="dot-count-container">
                    {images.map((image, index) => {
                        return (
                            <div onClick={dotClick} data-index={index} className={`dot ${index === currentImage ? "active" : ""}`} key={index}></div>
                        )
                    })}
                </div>
            </div>

            <div className="info-container">
                    {carData ? (
                        <>
                            <h1 className="title"><Link to={`/car/${carData.vin}`}>{carData.year} {carData.make} {carData.model}</Link></h1>
                            <div className="info">
                                <div className="left">
                                    <h3 className="miles">{(+carData.mileage).toLocaleString()} miles</h3>
                                    <h4 className="stocknumber">Stock #: {carData.stockNumber}</h4>
                                </div>
                                <div className="right">
                                    <h2 className="price">{`$${(+carData.price).toLocaleString()}`}</h2>
                                </div>
                            </div>
                        </>
                    ) : (
                        <h1>Loading...</h1>
                    )}
            </div> 
        </div>
    )
}

export default CarCard