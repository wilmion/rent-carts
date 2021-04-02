import React, {useState} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { log_out } from '../redux/actions';

import { AiFillEdit } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

import { POST } from '../utils/API';

import { IAction, IState, IUser } from '../models/interface';

import "../sass/pages/myAccount.scss";


interface IProps {
    user: null | IUser,
    log_out: () => IAction
}

const MyAccount:React.FC<IProps> = (props) => {

    const { user } = props;
    const history = useHistory();
    if(!user) {
        return <></>;
    }
    const [data , setData] = useState<Array<any>>([
        {
            key: 'Email',
            value: user.email,
            edit: false,
        },
        {
            key: 'Password',
            value: '************',
            edit: false,
        },
        {
            key: 'Username',
            value: user.username ,
            edit: false,
        },
        {
            key: 'Full Name',
            value: user.fullName ,
            edit: false,
        },
    ])

    const showEdit = (index:number):void => {
        let options = data;

        options[index].edit = !options[index].edit;

        setData([...options]);
    }

    const handleChange = (e:any , index:number):void => {
        const element:HTMLInputElement = e.target;

        let options = data;

        options[index].value = element.value;

        setData([...options]);
    }
    const handleLogOut = ():void => {
        props.log_out();
        history.push('/')
    }
    const updateDates = async ():Promise<void> => {

        const updateUser:any = {
            ...user,
            email: data[0].value,
            password: data[1].value,
            fullName: data[2].value,
            username: data[3].value,       
        }

        
    }

    return (
        <section className="my-profile">
            <section className="my-profile-header">
                <button className="my-profile-header__logOut" onClick={handleLogOut} >Log Out</button>
                { user.email === 'wilmion92@gmail.com' ? <button className="my-profile-header__admin">Admin</button> : <div></div> }
            </section>
            <h2 className="my-profile__title"> HI {user.username.toUpperCase()} </h2>

            <FaUserCircle className="my-profile-photo" />

            <h4 className="my-profile__fullname">{user.fullName}</h4>
            <h3 className="my-profile__section">Settings</h3>
            <section className="my-profile-table">
                {data.map(( c , i ) => 
                    <article className="my-profile-table-file" key={c.key} >
                        <div className="my-profile-table-file-icon" onClick={() => showEdit(i)} >
                            <AiFillEdit className="my-profile-table-file-icon__icon" />
                        </div>
                        <p className="my-profile-table-file__key"> {c.key} :</p>
                        { c.edit ? 
                        <input 
                            type="text" 
                            className="my-profile-table-file__value--input"
                            onInput={(e) => handleChange(e , i)} 
                            value={c.value} 
                        /> : 
                        <p className="my-profile-table-file__value">{c.value}</p> }
                        
                    </article>  
                )}
                    
            </section>
            <h3 className="my-profile__section">Rented Carts</h3>
            <h3 className="my-profile__section">Rental Carts</h3>
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    user:state.user
})
const mapDispatchToProps = {
    log_out
}

export default connect(mapStateToProps , mapDispatchToProps )(MyAccount)
