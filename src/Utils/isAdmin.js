const isAdmin = async () => {
    const response = await fetch(`/verifyAdmin?password=${encodeURIComponent(localStorage.getItem("adminPassword"))}`);
    const data = await response.json();
    return data.isAdmin;
}

export default isAdmin;