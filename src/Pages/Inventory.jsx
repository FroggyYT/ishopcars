import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// Component Imports
import Navbar from "../Components/Navbar.jsx"
import Footer from "../Components/Footer.jsx"
import CarDisplay from "../Components/CarDisplay.jsx"

// Util Imports
import getCarVins from "../Utils/getCarVins.js";
import pages from "../Utils/pages.js";
import getImages from "../Utils/getImages.js"
import getCarInfo from "../Utils/getCarInfo.js";

// Icon Imports
import { HiSwitchVertical } from "react-icons/hi";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";


const carsPerPage = 12;


const sorts = {
    priceLowest: (a, b) => ((+a.price) - (+b.price)),
    priceHighest: (a, b) => ((+b.price) - (+a.price)),
    oldest: (a, b) => ((+a.year) - (+b.year)),
    newest: (a, b) => ((+b.year) - (+a.year)),
    vinInverted: (a, b) => (b.vin.charCodeAt() - a.vin.charCodeAt()),
    mileageLowest: (a, b) => ((+a.mileage) - (+b.mileage)),
    mileageHighest: (a, b) => ((+b.mileage) - (+a.mileage))
}

const Inventory = () => {
    const [vins, setVins] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(+(searchParams.get("page")) || 1);

    const [cars, setCars] = useState([]);
    const [shownCars, setShownCars] = useState([]);

    const [sort, setSort] = useState(searchParams.get("sort") || "newest");

    useEffect(async () => {
        const _vins = await getCarVins();
        setVins(_vins);
    }, []);

    useEffect(() => {
        setSearchParams({ page: page, sort: sort });
    }, [page]);

    useEffect(() => {
        setSearchParams({ page: page, sort: sort });
    }, [sort]);

    useEffect(() => {
        let sortedCars = cars.sort(sorts[sort]);
        setShownCars(pages.getPage(page, sortedCars, carsPerPage));
    }, [cars, sort, page]);

    useEffect(async () => {
        setCars([]);

        vins.forEach(async (vin, index) => {
            const images = await getImages(vin);
            const carData = await getCarInfo(vin);

            const car = {
                price: carData.price,
                year: carData.year,
                vin: vin,
                images: images,
                mileage: carData.mileage
            }

            setCars(cars => [...cars, car]);
        });
    }, [vins]);

    const canIncrement = () => {
        return page < pages.getPageCount(vins, carsPerPage);
    }

    const canDecrement = () => {
        return page > 1;
    }

    const incrementPage = () => {
        if (canIncrement()) {
            setPage(page + 1);
        }
    }

    const decrementPage = () => {
        if (canDecrement()) {
            setPage(page - 1);
        }
    }

    return (
        <>
            <header>
                <Navbar />
            </header>

            <main className="inventory-main">
                <div className="sidebar">

                </div>
                <div className="main">
                    <div className="top">
                        <div className="page-text">
                            <button onClick={decrementPage} disabled={!canDecrement()} className="arrow prev">
                                <MdArrowBackIosNew />
                            </button>
                            <div className="text">Page: {page} of {pages.getPageCount(vins, carsPerPage)} ({vins.length} results)</div>
                            <button onClick={incrementPage} disabled={!canIncrement()} className="arrow next">
                                <MdArrowForwardIos />
                            </button>
                        </div>

                        <div className="sort">
                            <div className="icon">
                                <HiSwitchVertical />
                            </div>
                            <div className="input">
                                <label htmlFor="sort">Sort By</label>
                                <select onChange={(e) => setSort(e.target.value)} name="sort" id="sort" defaultValue={sort}>
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="priceLowest">Lowest Price</option>
                                    <option value="priceHighest">Highest Price</option>
                                    <option value="mileageLowest">Lowest Mileage</option>
                                    <option value="mileageHighest">Highest Mileage</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <CarDisplay cars={shownCars}/>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default Inventory;