import React from 'react';

const Review = ({reviews}) => {
    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <div className="card-body">

                <h3 className=" text-xl">{reviews?.review}</h3>
                <div className="flex items-center">
                <div className="avatar">
                <div className="w-16 rounded-full ring ring-info ring-offset-base-100 ring-offset-2 mr-5">
                    <img src={reviews?.photoUrl} alt=""/>
                </div>
                </div>
                    <small className="text-base text-teal-500">{reviews?.user}</small>
                </div>
            </div>
            </div>
    );
};

export default Review;