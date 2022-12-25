import React, { useState, useEffect } from 'react'

import toDataURL from '../Utils/toDataURL';

const ImageUpload = ({ setImages, setImageFiles }) => {
    const imagesUploaded = async (e) => {
        setImages([]);
        setImageFiles([]);

        let images = Array.from(e.target.files);
        
        setImageFiles(e.target.files);

        images.forEach(async (image, index) => {
            const dataURL = await toDataURL(image);
            setImages(images => [...images, dataURL]);
        });

        console.log(e.target.files);
    }

    return (
        <div className="image-uploader">
            <input type="file" name="images" id="images" multiple onChange={imagesUploaded}/>
        </div>
    )
}

export default ImageUpload