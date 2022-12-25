const getImages = async (vin) => {
    const images = [];

    const imageCount = await getImageCount(vin);

    for (let i = 0; i < imageCount; i++) {
        images.push(getImageURL(vin, i));
    }

    return images;
}

const getImageURL = (vin, index) => {
    return `/image?vin=${encodeURIComponent(vin)}&index=${encodeURIComponent(index)}`;
}

const getImageCount = async (vin) => {
    const response = await fetch(`/imageCount?vin=${encodeURIComponent(vin)}`);
    const data = await response.json();
    return data.count;
}

export default getImages;