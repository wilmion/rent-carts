import React , { useState } from 'react'
import { useHistory } from 'react-router'

import { Link } from 'react-router-dom'
import { AiOutlineUser , AiOutlineLock } from 'react-icons/ai'
import { BiRename , BiText } from 'react-icons/bi'
import ErrorWindow from '../components/ErrorWindow';

import { POST } from '../utils/API'

import { visibleHeaderAndFooter } from '../utils/dom/DOM';

import "../sass/pages/auth.scss";

const Register:React.FC = () => {

    const [form , setForm] = useState({username: '' , fullname: '' , email: '' , password: ''})
    const [loading , setLoading] = useState<boolean>(false);
    const [error , setError] = useState<null | string>(null);
    const history = useHistory()

    visibleHeaderAndFooter('none');

    const handleSubmit = async (e:any):Promise<void | null> => {
        e.preventDefault();
        setLoading(true)
        const body:any = {
            email: form.email,
            password: form.password,
            username: form.username,
            fullName: form.fullname,
            rentalCarts: [],
            rentedCarts: [],
            cart: []
        }

        const [ data , error ] = await POST('users/register' , body , 'No Token');
        
        setLoading(false);

        if(error) {
            setError('Account is exist or email invalid');
            return null
        }
        
        
        
        history.push('/login');
    }

    const handleChange = (e:any):void => {
        const element:HTMLInputElement = e.target;
        const { id , value } = element;

        setForm({
            ...form,
            [id]: value
        })
    }

    return (
        <section className="auth">
            {error && <ErrorWindow message={error} callback={() => setError(null)} />}
            <h2 className="auth__title">REGISTER</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label htmlFor="username" className="auth-form-content">
                    <div className="auth-form-content-icon">
                        <BiRename className="auth-form-content-icon__icon" />
                    </div>
                    <input type="text" placeholder="Username" onInput={handleChange} value={form.username} id="username" className="auth-form-content__input" required />
                </label>
                <label htmlFor="fullname" className="auth-form-content">
                    <input type="text" placeholder="FullName" onInput={handleChange} value={form.fullname} id="fullname" className="auth-form-content__input" required />
                    <div className="auth-form-content-icon">
                        <BiText className="auth-form-content-icon__icon" />
                    </div>
                </label>
                <label htmlFor="email" className="auth-form-content">
                    <div className="auth-form-content-icon">
                        <AiOutlineUser className="auth-form-content-icon__icon" />
                    </div>
                    <input type="email" placeholder="Email" className="auth-form-content__input"  onInput={handleChange} value={form.email} id="email" required />
                </label>
                <label htmlFor="password" className="auth-form-content">
                    <input type="password" placeholder="Password" onInput={handleChange} value={form.password} id="password" className="auth-form-content__input" required />
                    <div className="auth-form-content-icon">
                        <AiOutlineLock className="auth-form-content-icon__icon" />
                    </div>
                </label>
                <p className="auth-form__register">You do have an account ? <Link to="/login" className="auth-form__register--link">Sign in here</Link> </p>
                <button type="submit" className="auth-form__button" disabled={loading} >Create Account</button>
            </form>
        </section>
    )
}

export default Register
