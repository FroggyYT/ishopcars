import React, { useState, useEffect } from 'react'

import { FaFacebook, FaInstagram, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer>
            <div className="top">
                <div className="contact">
                    <div className="phone">
                        <a href="tel:5555555555">
                            <FaPhoneAlt />
                            <p>(555) 555-5555</p>
                        </a>
                    </div>
                    <div className="email">
                        <a href="mailto:test@example.com">
                            <FaEnvelope />
                            <p>test@example.com</p>
                        </a>
                    </div>
                </div>

                <div className="social-links">
                    <a className="logo-link" href="https://www.facebook.com/ishopcars">
                        <FaFacebook />    
                    </a>
                    <a className="logo-link" href="https://www.instagram.com/@ishopcars">
                        <FaInstagram />
                    </a>
                </div>
            </div>
            
            <div className="rights">
                <p>© 2022, All Rights Reserved</p>
                <p>Icons from <a href="https://react-icons.github.io/react-icons/">React Icons</a></p>
            </div>
        </footer>
    )
}

export default Footer