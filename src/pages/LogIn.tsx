import React , { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineUser , AiOutlineLock } from 'react-icons/ai'

import { POST } from '../utils/API'

import "../sass/pages/auth.scss";

const LogIn = () => {

    const handleSubmit = async (e:any):Promise<void | null> => {
        e.preventDefault();
        const form:any = e.target;
        const body = {
            email: form[0].value,
            password: form[1].value
        }

        const [ data , error ] = await POST('auth' , body , 'No Token');

        if(error) {
            console.log(error);
            return null
        }

        console.log(data)

    }

    return (
        <section className="auth">
            <h2 className="auth__title">LOGIN</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label htmlFor="email" className="auth-form-content">
                    <div className="auth-form-content-icon">
                        <AiOutlineUser className="auth-form-content-icon__icon" />
                    </div>
                    <input type="email" placeholder="Email" className="auth-form-content__input" required />
                </label>
                <label htmlFor="password" className="auth-form-content">
                    <input type="password" placeholder="Password" className="auth-form-content__input" required />
                    <div className="auth-form-content-icon">
                        <AiOutlineLock className="auth-form-content-icon__icon" />
                    </div>
                </label>
                <p className="auth-form__forgot">Forgot Passoword?</p>
                <p className="auth-form__register">You do not have an account ? <Link to="/register" className="auth-form__register--link">Sign up here</Link> </p>
                <button type="submit" className="auth-form__button" >Log In</button>
            </form>
        </section>
    )
}

export default LogIn
