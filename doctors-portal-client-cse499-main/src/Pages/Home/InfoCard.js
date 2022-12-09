import React from 'react';

const InfoCard = ({img, cardTitle, bgClass, text}) => {
    return (
        <div>
            <div className={`card lg:card-side shadow-xl bg-accent ${bgClass}`}>
                <figure className="pl-5"><img src={img} alt="Album"/></figure>

                <div className="card-body text-white">
                    <h2 className="card-title">{cardTitle}</h2>
                    <p>{text}</p>
                    <div className="card-actions justify-end">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;