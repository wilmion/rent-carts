import React , { useState } from 'react'
import { useHistory } from 'react-router'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { AiOutlineUser , AiOutlineLock } from 'react-icons/ai'
import ErrorWindow from '../components/ErrorWindow';

import { GET, POST } from '../utils/API'
import { getCookie } from '../utils/getCookie'
import { visibleHeaderAndFooter } from '../utils/dom/DOM';

import { login } from '../redux/actions';

import { IAction, IUser } from '../models/interface'

import "../sass/pages/auth.scss";


interface IProps {
    login: (user:IUser) => IAction
}

const LogIn:React.FC<IProps> = ({login}) => {

    const [error , setError] = useState<null | string>(null);
    const [loading , setLoading] = useState<boolean>(false);
    const history = useHistory()

    visibleHeaderAndFooter('none')

    const handleSubmit = async (e:any):Promise<void | null> => {
        e.preventDefault();
        setLoading(true);
        const form:any = e.target;
        const body = {
            email: form[0].value,
            password: form[1].value
        }

        const [ data , error ] = await POST('auth' , body , 'No Token');

        if(error) {
            setError('Verifiqued password or email');
            return null
        }
        
        document.cookie = `token=${data.token}`;
        document.cookie = `id=${data.id}`;

        const cookieToken = getCookie('token');
        const cookieId = getCookie('id');


        const [ dataUser , errorUser ] = await GET('users' , cookieId , '' , cookieToken );

        setLoading(false)

        if(errorUser) {
            setError('A error ocurred!!');
            return null
        }

        login(dataUser);

        visibleHeaderAndFooter('block')
        
        history.push('/');
    }

    return (
        <section className="auth">
            {error && <ErrorWindow message={error} callback={() => setError(null)} />}
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
                <button type="submit" className="auth-form__button" disabled={loading} >Log In</button>
            </form>
        </section>
    )
}

const mapDispatchToProps = {
    login
}

export default connect(null , mapDispatchToProps)(LogIn)
