import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import Logo from "../Assets/logo-rectangle-trans.png"

import breakpoint from "../Utils/breakpoint.js"

import { BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

import isAdmin from "../Utils/isAdmin.js"

const Navbar = () => {
    const [screenWidth, setScreenWidth] = useState(innerWidth);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        if (breakpoint("mobile")) {
            setIsMobile(true);
            setIsTablet(false);
            setIsDesktop(false);
            return;
        }

        if (breakpoint("tablet")) {
            setIsTablet(true);
            setIsMobile(false);
            setIsDesktop(false);
            return;
        }

        if (breakpoint("desktop")) {
            setIsMobile(false);
            setIsTablet(false);
            setIsDesktop(true);

            closeMenu();

            return;
        }
    }, [screenWidth]);

    useEffect(() => {
        window.onresize = () => {
            setScreenWidth(innerWidth);
        }
    }, []);

    useState(async () => {
        const a = await isAdmin();
        setAdmin(a);
    }, [setAdmin]);

    const openMenu = () => {
        setIsMenuOpen(true);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    return (
        <nav>
            <div className="logo nav-group">
                <Link to="/">
                    <img src={Logo} alt="Website Logo" />
                </Link>
            </div>

            {(isTablet || isMobile) && (
                <div className="menu-toggle-wrapper">
                    <a href="#" className="menu-toggle nav-group" onClick={openMenu}>
                        <BiMenu />
                    </a>
                </div> 
            )}
            <div className={`links nav-group ${isTablet || isMobile ? "menu" : ""}-${(isTablet || isMobile) && isMenuOpen ? "open" : "closed"}`}>
                {(isTablet || isMobile) && (
                    <div className="menu-close-wrapper">
                        <a href="#" className="menu-close nav-group" onClick={closeMenu}>
                            <IoMdClose />
                        </a>
                    </div>
                )}
                <ul className="nav-items">
                    <li className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/inventory">Inventory</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/sell">Sell</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about">About Us</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/info">Info</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact">Contact Us</Link>
                    </li>
                    {admin && (
                        <li className="nav-item">
                            <Link to="/admin">Admin Panel</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar