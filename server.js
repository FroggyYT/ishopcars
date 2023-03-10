const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/dist`));

const JSONdb = require("simple-json-db");
const carsDB = new JSONdb("./cars.json");

const ADMIN_PASSWORD = "admin";

// import filesystem
const fs = require("fs");

//import path
const path = require("path");

class Car {
    constructor(make, model, year, price, mileage, vin, color, transmission, fuelType, stockNumber, engine, drivetype, interior, fueleconomycity, fueleconomyhighway, description) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.price = price;
        this.mileage = mileage;
        this.vin = vin;
        this.color = color;
        this.transmission = transmission;
        this.fuelType = fuelType;
        this.stockNumber = stockNumber;
        this.engine = engine;
        this.drivetype = drivetype;
        this.interior = interior;
        this.fueleconomycity = fueleconomycity;
        this.fueleconomyhighway = fueleconomyhighway;
        this.description = description;
    }

    toObject() {
        return {
            make: this.make,
            model: this.model,
            year: this.year,
            price: this.price,
            mileage: this.mileage,
            vin: this.vin,
            color: this.color,
            transmission: this.transmission,
            fuelType: this.fuelType,
            stockNumber: this.stockNumber,
            engine: this.engine,
            drivetype: this.drivetype,
            interior: this.interior,
            fueleconomycity: this.fueleconomycity,
            fueleconomyhighway: this.fueleconomyhighway,
            description: this.description
        }
    }
}

const newCarFromQuery = query => {
    const car = new Car(
        query.make,
        query.model,
        query.year,
        query.price,
        query.mileage,
        query.vin,  
        query.color,
        query.transmission,
        query.fuelType,
        query.stockNumber,
        query.engine,
        query.drivetype,
        query.interior,
        query.fueleconomycity,
        query.fueleconomyhighway,
        query.description
    );
    return car;
};

let lastTimeStamp = Date.now();

const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // if (req.body.timestamp != lastTimeStamp && fs.existsSync(`uploads/${req.body.vin}`)) {
        //     await fs.rmdirSync(`uploads/${req.body.vin}`, { recursive: true }, );
        // }
        // delete folder if exists
        if (req.body.password != ADMIN_PASSWORD) return;

        if (req.body.timestamp != lastTimeStamp && fs.existsSync(`uploads/${req.body.vin}`)) {
            fs.rmdirSync(`uploads/${req.body.vin}`, { recursive: true });
            fs.mkdirSync(`uploads/${req.body.vin}`);
        }

        if (!fs.existsSync(`uploads/${req.body.vin}`)) {
            fs.mkdirSync(`uploads/${req.body.vin}`);
        }

        lastTimeStamp = req.body.timestamp;
        cb(null, `uploads/${req.body.vin}`);
    },
    filename: function (req, file, cb) {
        // cb(null, file.originalname);
        if (req.body.password != ADMIN_PASSWORD) return;
        cb(null, Date.now() + ";;" + file.originalname);
    }
});

// Verify Admin Password
app.use((req, res, next) => {
    req.isAdmin = decodeURIComponent(req.query.password) == ADMIN_PASSWORD;
    next();
});

const upload = multer({ storage: storage });

const editCarUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            if (req.body.password != ADMIN_PASSWORD) return;
            if (!fs.existsSync(`uploads/${req.body.vin}`)) {
                fs.mkdirSync(`uploads/${req.body.vin}`);
            }
    
            lastTimeStamp = req.body.timestamp;
            cb(null, `uploads/${req.body.vin}`);
        },
        filename: function (req, file, cb) {
            // cb(null, file.originalname);
            if (req.body.password != ADMIN_PASSWORD) return;
            cb(null, Date.now() + ";;" + file.originalname);
        }
    })
});

app.get("/verifyAdmin", (req, res) => {
    res.json({isAdmin: req.isAdmin});
});

app.get("/cars", (req, res) => {
    res.json(carsDB.JSON());
});

app.get("/carInfo", (req, res) => {
    res.json(carsDB.get(req.query.vin)); 
});

app.get("/carVins", (req, res) => {
    res.json(Object.keys(carsDB.JSON()));
})

app.post("/newCar", upload.array("images"), (req, res) => {
    if (!req.body || req.body.password != ADMIN_PASSWORD) return res.send("Not Authorized");
    const car = newCarFromQuery(req.body);
    carsDB.set(car.vin, car.toObject());
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.get("/imageCount", (req, res) => {
    res.json({count: fs.readdirSync
        (`uploads/${req.query.vin}`)
        .filter(file => file != ".DS_Store")
        .length});
});

app.get("/image", (req, res) => {
    const index = req.query.index;
    const vin = req.query.vin;

    const files = fs.readdirSync(`uploads/${vin}`).filter(file => file != ".DS_Store");
    const file = files[index];
    const filePath = path.join(__dirname, `uploads/${vin}/${file}`);
    res.sendFile(filePath);
});

app.delete("/deleteCar", (req, res) => {
    if (!req.isAdmin) return res.status(300).send("Not Authorized");
    carsDB.delete(req.query.vin);

    if (fs.existsSync(`uploads/${req.query.vin}`)) {
        fs.rmdirSync(`uploads/${req.query.vin}`, { recursive: true });
    }

    res.status(200).send("Car Deleted");
});

const removeOldCars = (req) => {
    if (req.body.removedImages != null && req.body.removedImages != "") {
        const removedImageIndexes = req.body.removedImages.split(",").map(index => parseInt(index));

        const images = fs.readdirSync(`uploads/${req.body.vin}`);
        for (let i = 0; i < images.length; i++) {
            if (removedImageIndexes.includes(i)) {
                fs.unlinkSync(`uploads/${req.body.vin}/${images[i]}`);
            }
        }
    }
}

app.post("/editCar", editCarUpload.array("images"), (req, res) => {
    if (!req.body || req.body.password != ADMIN_PASSWORD) return res.send("Not Authorized");
    removeOldCars(req);
    const car = newCarFromQuery(req.body);
    carsDB.set(car.vin, car.toObject());
    res.sendFile(`${__dirname}/dist/index.html`);
});


app.get("/adri", (req, res) => {
    res.send(`
        <div style="position:absolute;top:0;left:0;width:100vw;height:100vh;display:grid;place-items:center">
            <center style="font-size:10rem;font-family:arial">balls</center>
        </div>
    `);
});

const reqDB = new JSONdb("./requests.json");

app.get("/changeAlias", (req, res) => {
    if (!req.isAdmin) return;
    const ip = decodeURIComponent(req.query.ip);
    const alias = decodeURIComponent(req.query.newAlias);
    
    let entry = reqDB.get(ip);
    entry.alias = alias;

    reqDB.set(ip, entry);

    res.status(200).send("Changed");
});

app.get("/changeNotes", (req, res) => {
    if (!req.isAdmin) return;
    const ip = decodeURIComponent(req.query.ip);
    const notes = decodeURIComponent(req.query.newNotes);
    
    let entry = reqDB.get(ip);
    entry.notes = notes;

    reqDB.set(ip, entry);

    res.status(200).send("Changed");
});

const logUser = (req) => {
    const date = require("date-and-time");
    const now = new Date();
    const formatted = date.format(now, "MM/DD/YYYY h:mm:ss A");

    let entry = reqDB.get(req.ip) || {
        alias: "",
        notes: "",
        requests: []
    };

    entry.requests.push(`[${formatted}] ${req.url}`);
    reqDB.set(req.ip, entry);
}

app.get("/rawLogs", (req, res) => {
    if (!req.isAdmin) return res.send("Not Authorized");
    res.sendFile(`${__dirname}/requests.json`);
});

// Used for React Router
app.get('*', (req, res) => {
    console.log(`[${req.ip}] ` + "Requesting: " + req.url);
    logUser(req);

    res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost${PORT != 80 ? ":" + PORT : ""}/`);
});

const toFile = (base64) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], "image.png", { type: mime });
};