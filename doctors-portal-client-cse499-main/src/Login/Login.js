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

  