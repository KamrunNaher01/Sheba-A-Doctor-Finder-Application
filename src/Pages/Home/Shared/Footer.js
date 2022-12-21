import React from 'react';

const Footer = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <div>
        <span className="footer-title">Services</span>
        <a className="link link-hover">Teeth Cleaning</a>
        <a className="link link-hover">Cavity Protection</a>
        <a className="link link-hover">Pediatric Dental</a>
        <a className="link link-hover">Oral Surgery</a>
        <a className="link link-hover">Teeth Orthodontics</a>
      </div>

      <div>
        <span className="footer-title">Location</span>
        <div className="avatar">
          <div className="w-96 h-32 rounded">
            <img src="https://i.ibb.co/Cv1M9xN/map.png" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;