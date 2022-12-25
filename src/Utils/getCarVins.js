const getCarVins = async () => {
    const response = await fetch("/carVins");
    const data = await response.json();
    return data;
}

export default getCarVins;