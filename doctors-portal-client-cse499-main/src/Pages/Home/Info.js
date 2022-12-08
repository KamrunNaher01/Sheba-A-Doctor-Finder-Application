import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../../src/assets/icons/clock.svg'
import marker from '../../../src/assets/icons/marker.svg'
import phone from '../../../src/assets/icons/phone.svg'

const info = () => {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <InfoCard cardTitle="Opening Hours" bgClass="bg-accent" img={clock} text="8 am - 8 pm"></InfoCard>
            <InfoCard cardTitle="Our Location" bgClass="bg-info" img={marker} text="Block - A, Bashundhara R/A, Dhaka"></InfoCard>
            <InfoCard cardTitle="Contact Us" bgClass="bg-accent" img={phone} text="+8801777777777"></InfoCard>
        </div>
    );
};

export default info;