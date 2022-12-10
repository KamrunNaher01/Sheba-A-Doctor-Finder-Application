import React from 'react';
import doctor from '../../assets/images/doctor.png'
import appointment from '../../assets/images/appointment.png'
import PrimaryButton from '../Shared/PrimaryButton';
import { Link } from 'react-router-dom';
const MakeAppointment = () => {
  return (
    <section style={{
      background: `url(${appointment})`
    }} className="flex justify-center items-center">
      <div className="flex-1 hidden lg:block">
        <img className="mt-[-150px]" src={doctor} alt="" />
      </div>

      <div className="flex-1 px-5">
        <h3 className="text-xl text-info font-bold">Appointment</h3>
        <h2 className="text-3xl py-5 text-white">Make an appointment today</h2>
        <p className="text-white pb-5">OVER 100 MULTI-DISCIPLINARY SPECIALISTS
          State of the art technology and expertise combined with the support of our friendly staff, we strive each day to be the top healthcare provider, not only in Bangladesh but within the Asia-Pacific region.</p>
        <Link to="/appointment"><PrimaryButton>Get Started</PrimaryButton></Link>
      </div>
    </section>
  );
};

export default MakeAppointment;