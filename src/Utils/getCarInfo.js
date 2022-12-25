const getCarInfo = async (vin) => {
    const response = await fetch(`/carInfo?vin=${encodeURIComponent(vin)}`);
    const data = await response.json();
    return data;
}

export default getCarInfo;