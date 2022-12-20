import React, { useEffect } from "react";
import auth from "../../firebase.init";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Loading from "../Shared/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

const Login = () => {

    const location = useLocation();

    const navigate = useNavigate();

    let from = location.state?.from?.pathname || "/";

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => {
        signInWithEmailAndPassword(data.email, data.password);
    };

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    // token
    const [token] = useToken(user || gUser);
    useEffect(()=>{
        if(token){
            navigate(from, { replace: true });
        }
    },[token, from, navigate])

    let signInError;
    if(gError || error){
        signInError = <small className="text-center text-red-500">{gError?.message || error.message}</small>
    }

    if(loading || gLoading){
        return <Loading></Loading>
    }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 shadow-xl">
        <div className="card-body">

          <h2 className="text-center text-3xl text-gray-700 font-bold">Login</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="text-gray-600">
            
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
                        message: 'email is required'
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

            <input className="btn btn-block" type="submit" value="Login"/>
        </form>
        <small className="text-gray-800">New to Doctors Portal? <Link className="text-accent"to="/signup">Create New Account</Link></small>

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

export default Login;
