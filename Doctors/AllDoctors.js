import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../Shared/Loading';
import AllDoctor from './AllDoctor';

const AllDoctors = () => {
    const { data: doctors, isLoading, refetch } = useQuery(['doctors'], () => fetch('http://localhost:5000/doctor')
    .then(res => res.json()));
    console.log(doctors)
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
                {
                    doctors.map(doctors => <AllDoctor doctors={doctors} ></AllDoctor>)
                }
            </div>
        </div>
    );
};

export default AllDoctors;