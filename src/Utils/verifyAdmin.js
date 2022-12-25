const verifyAdmin = async () => {
    const password = localStorage.getItem("adminPassword") || prompt("Enter the admin password");
    const admin = await verifyPassword(password);
    if (admin) {
        localStorage.setItem("adminPassword", password);
    } else if (localStorage.getItem("adminPassword")) {
        localStorage.removeItem("adminPassword");
        const newAdmin = await verifyAdmin();
        return newAdmin;
    }
    return admin;
}

const verifyPassword = async (password) => {
    const response = await fetch(`/verifyAdmin?password=${encodeURIComponent(password)}`);
    const data = await response.json();
    return data.isAdmin;
}

export default verifyAdmin;