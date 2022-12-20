import React from 'react';
import { useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Loading from "../Shared/Loading";
import { Link, useNavigate } from "react-router-dom";
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';

const SignUp = () => {

    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(data?.email, data?.password);
        await updateProfile({ displayName:data?.name});
        
    };

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    // token
    const [token] = useToken(user || gUser);
    if(token){
        navigate("/appointment");
    }
    
    

    let signInError;
    if(gError || error || updateError){
        signInError = <small className="text-center text-red-500">{gError?.message || error?.message || updateError?.message}</small>
    }

    if(loading || gLoading || updating){
        return <Loading></Loading>
    }
    return (
        <div className="flex justify-center items-center h-screen">
      <div className="card w-96 shadow-xl">
        <div className="card-body">

          <h2 className="text-center text-3xl text-gray-700 font-bold">Sign Up</h2>
          
        <form onSubmit={handleSubmit(onSubmit)} className="text-gray-600">

            {/* Name */}
        <div className="form-control w-full max-w-xs">
            <label className="label ">
                <span className="label-text text-gray-600">Name</span>
            </label>

            <input type="text" placeholder="Your Name" className="input input-bordered w-full max-w-xs bg-white" 
                {...register("name", {
                    required: {
                        value: true,
                        message: 'Name is required'
                    }
                  })}
            />
            
            <label className="label">
                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors?.name?.message}</span>}
            </label>
        </div>
            
            {/* Email */}
          <div className="form-control w-full max-w-xs">
            <label className="label ">
                <span className="label-text text-gray-600">Email</span>
            </label>

            <input type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs bg-white" 
                {...register("email", {
                    pattern: {
                      value: /^(.+)@(.+)$/,
                      message: 'enter valid email address'
                    },
                    required: {
                        value: true,
                        message: 'Email is required'
                    }
                  })}
            />
            
            <label className="label">
                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors?.email?.message}</span>}
                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors?.email?.message}</span>}
            </label>
          </div>

                  {/* Password */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text text-gray-600">Password</span>
            </label>

            <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs bg-white" 
                {...register("password", {
                    required: {
                        value: true,
                        message: "Password is required"
                    },
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    }
                }
                )}
            />
            
            <label className="label">
                {errors?.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors?.password?.message}</span>}
                {errors?.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors?.password?.message}</span>}
            </label>
         </div>

            <input className="btn btn-block" type="submit" value="Sign Up"/>
        </form>
        <small className="text-gray-800">Already have an account? <Link className="text-accent"to="/login">Please Login</Link></small>

        {signInError}

          <div className="divider">OR</div>

            {/* Google Log in */}
          <div className="card-actions justify-end">
            <button className="btn btn-accent btn-outline btn-block" 
                onClick={() =>signInWithGoogle()}
            >Continue with Google</button>
          </div>

        </div>
      </div>
    </div>
    );
};

export default SignUp;