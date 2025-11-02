import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo and Description */}
        <div className="footer-section about">
          <h2 className="footer-logo">LegalEase</h2>
          <p>
            Providing accessible legal services and resources to help you
            understand and protect your rights.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/rights">Know Your Rights</Link></li>
            <li><Link to="/emergency">Emergency Legal Help</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/queries">Queries</Link></li>
          </ul>
        </div>

        {/* Legal Areas */}
        <div className="footer-section legal-areas">
          <h3>Legal Areas</h3>
          <ul>
            <li>Family Law</li>
            <li>Criminal Defense</li>
            <li>Personal Injury</li>
            <li>Employment Law</li>
            <li>Real Estate</li>
            <li>Immigration</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <ul>
            <li><FaPhoneAlt /> 1-800-LEGAL-HELP</li>
            <li><FaEnvelope /> info@legalease.com</li>
            <li><FaMapMarkerAlt /> 123 Justice Ave, Legal City</li>
            <li><FaClock /> 24/7 Emergency Support</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          © 2024 LegalEase. All rights reserved. | 
          <Link to="/privacy"> Privacy Policy</Link> | 
          <Link to="/terms"> Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
