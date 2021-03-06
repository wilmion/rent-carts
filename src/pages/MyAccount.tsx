import React, {useState} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { log_out , login } from '../redux/actions';

import { AiFillEdit } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import ErrorWindow from '../components/ErrorWindow';
import Loading from '../components/Loading';
import CarCardDetails from '../components/CartCardMoreDetails';

import { PATCH , POST } from '../utils/API';
import { getCookie } from '../utils/getCookie';

import { IAction, IState, IUser } from '../models/interface';

import "../sass/pages/myAccount.scss";


interface IProps {
    user: null | IUser,
    log_out: () => IAction,
    login: (payload:IUser) => IAction
}

const MyAccount:React.FC<IProps> = (props) => {

    const { user } = props;
    const history = useHistory();
    if(!user) {
        return <Loading />
    }
    const [data , setData] = useState<Array<any>>([
        {
            key: 'Email',
            value: user.email,
            edit: false,
        },
        {
            key: 'Password',
            value: 'Actualizar contraseña',
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
    const [ loading , setLoading ] = useState<boolean>(false);
    const [ error , setError ] = useState<string | null>(null)

    const showEdit = (index:number):void => {
        let options = data;

        options[index].edit = !options[index].edit;

        setData([...options]);

        let key:string;

        switch(data[index].key) {
            case 'Email':
                key = 'email';
                break;
            case 'Password':
                key = 'password';
                break;
            case 'Username':
                key = 'username';
                break;
            case 'Full Name':
                key = 'fullName';
                break;
            default: 
                key = 'email';
                break;
        }

        if(!options[index].edit) {
            updateDates(index , key)
        }
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
    const updateDates = async (i:number , key:string):Promise<void | null> => {

        setLoading(true)

        const updateUser:any = {
            [key] : data[i].value
        }

        const token:string = getCookie('token');
        const id:string = getCookie('id');

        const [ dataApi , errorApi ] = await PATCH('users' , updateUser , token , id )

        if(errorApi) {
            setError('Invalid data')
            data[i].value = user[key];
            setLoading(false)
            return null;
        }

        

        if(key === 'password') {
            const [ dataAuth , errorAuth ] = await POST('auth' , { email:user.email , password: data[i].value } , 'NO TOKEN');
            document.cookie = `token=${dataAuth.token}`;
            document.cookie = `id=${dataAuth.id}`;

            if(errorAuth){
                setError('No auth!')
                setLoading(false)
                return null;
            }

            setLoading(false)
            return null;
        }

        props.login({
            ...user,
            [key]: data[i].value
        });

        setLoading(false)
    }

    const encrypt = (value:string):string => {
        const chars:number = value.length;
        let pass:string = '';

        for(let i = 0 ; i < chars ; i++) {
            pass += '*';
        }

        return pass;

    }

    if(loading) {
        return <Loading />
    }

    console.log(user.rentedCarts)

    return (
        <section className="my-profile">
            {error && <ErrorWindow message={error} callback={() => setError(null)} />}
            <section className="my-profile-header">
                <button className="my-profile-header__logOut" onClick={handleLogOut} >Log Out</button>
                { user.email === 'wilmion92@gmail.com' ? <button className="my-profile-header__admin" onClick={() => history.push('/admin/products')} >Admin</button> : <div></div> }
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
                        <p className="my-profile-table-file__value">{c.key === 'Password'? encrypt(c.value) : c.value}</p> }
                        
                    </article>  
                )}
                    
            </section>
            <h3 className="my-profile__section">Rented Carts</h3>
            <section className="my-profile-rentedContain">
                {user.rentedCarts.map(car => (
                    <section className="my-profile-rentedContain-item">
                        <CarCardDetails {...car} />
                        <section className="my-profile-rentedContain-item-info">
                            <p className="my-profile-rentedContain-item-info__id">Order Id : <br/> {car.order_Id}</p>
                            <p className="my-profile-rentedContain-item-info__paragraph">Owner : <br/> {car.owner}</p>
                            <p className="my-profile-rentedContain-item-info__paragraph">Email : <br/> {car.facturation_email}</p>
                            <p className="my-profile-rentedContain-item-info__paragraph">Start Time : <br/>  {car.start_time}</p>
                            <p className="my-profile-rentedContain-item-info__paragraph">Finish Time : <br/> {car.finish_time}</p>
                        </section>
                    </section>
                ))}
                {user.rentedCarts.length === 0 && <h5 className="my-profile-not-results">Not Results!</h5>}
            </section>
            <h3 className="my-profile__section">Rental Carts</h3>
            <section className="my-profile-rentalContain">

                {user.rentalCarts.map(c => (
                    <section className="my-profile-rentalContain-item">
                        <CarCardDetails {...c} />
                        <p className="my-profile-rentalContain-item__finish">Finish : {c.finish_time}</p>
                    </section>
                ))}
                {user.rentalCarts.length === 0 && <h5 className="my-profile-not-results">Not Results!</h5>}
            </section>
            
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    user:state.user
})
const mapDispatchToProps = {
    log_out,
    login
}

export default connect(mapStateToProps , mapDispatchToProps )(MyAccount)
