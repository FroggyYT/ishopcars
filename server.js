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
        cb(null, Date.now() + ";;" + file.originalname);
    }
});

// Verify Admin Password
app.use((req, res, next) => {
    req.isAdmin = decodeURIComponent(req.query.password) == ADMIN_PASSWORD;
    next();
});

const upload = multer({ storage: storage });

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
    console.log(req.isAdmin);
    if (!req.body || req.body.password != ADMIN_PASSWORD) return res.send("Not Authorized");
    // console.log(req.body);
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





// Used for React Router
app.get('*', (req, res) => {
    console.log(`[${req.ip}] ` + "Requesting: " + req.url);
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