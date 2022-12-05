import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import chair from '../../../src/assets/images/chair.png'
import PrimaryButton from '../Shared/PrimaryButton';
const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen" >
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src="https://i.ibb.co/M7jvxSW/hospital.jpg" alt="" className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                    <h1 className="text-5xl font-bold text-gray-800">Welcome to Worry-free Treatment</h1>
                    <p className="py-6 text-gray-800">The Doctors Portal Institutes are regarded as one of the best heart hospitals in Bangladesh, performing a multitude of treatments and procedures in cardiology and cardiothoracic surgery. The scorecard shows an unmatched record of over 1,96,684 cardiac and cardiothoracic surgeries.</p>
                    <Link to="/appointment"><PrimaryButton>Get STARTed</PrimaryButton></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;