import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import quote from '../../assets/icons/quote.svg'
import Footer from '../Shared/Footer';
import Review from './Review';

const Testimonials = () => {

    const [allReviews, setAllReviews] = useState([]);
    

    useEffect(()=> {
        fetch("http://localhost:5000/review")
        .then(res => res.json())
        .then(data => setAllReviews(data.slice(0,6)))
    },[])

    
    return (
        <section className="my-28">
            <div className="flex justify-between">
                <div>
                    <h4 className="text-xl text-primary font-bold">Testimonials</h4>
                    <h2 className="text-3xl">What our patients say</h2>
                </div>

                <div className="flex justify-between">
                <img className=" w-28 lg:w-48" src={quote} alt="" />
                    <Link to="/review"><button className="btn btn-active btn-link">See All Reviews</button></Link>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    allReviews.map(reviews => <Review key={reviews._id} reviews={reviews} ></Review>)
                }
            </div>
            <Footer></Footer>
        </section>
    );
};
export default Testimonials;
