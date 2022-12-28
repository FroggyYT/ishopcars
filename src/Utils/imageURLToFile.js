const imageURLToFile = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const contentType = response.headers.get("content-type");
    const fileName = url.split("/").pop();
    const file = new File([blob], "image", { type: contentType });
    return file;
}

export default imageURLToFile;