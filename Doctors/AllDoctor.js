import React from 'react';
import { Link } from 'react-router-dom';

const AllDoctor = ({ doctors }) => {
    const { img, address, degree, designation, name, number, specialty, time, fee } = doctors;
    console.log(doctors)
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10"><img src={img} alt="Album" /></figure>
            <div className="card-body ">
                <h2 className="card-title">{name}</h2>
                <p><span style={{ color: "gray" }}>Degree:</span> {degree}</p>
                <p><span style={{ color: "gray" }}>Designation:</span> {designation}</p>
                <p><span style={{ color: "gray" }}>Specialty:</span> {specialty}</p>
                <p><span style={{ color: "gray" }}>Number:</span> {number}</p>
                <p><span style={{ color: "gray" }}>Fee:</span> {fee} taka</p>
                <p><span style={{ color: "gray" }}>Visiting Hour:</span> {time}</p>
                <p><span style={{ color: "gray" }}>Address:</span> {address}</p>

                <div className="card-actions">
                    <Link to="/appointment"><button className="btn btn-block btn-outline btn-primary">Book</button></Link>
                </div>
            </div>
        </div>
    );
};

export default AllDoctor;