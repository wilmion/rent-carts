import React , { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FaTrash , FaUserSecret } from 'react-icons/fa';
import WarningWindow from '../components/WarningWindows';
import ErrorWindow from '../components/ErrorWindow';
import Loading from '../components/Loading';

import { GET , DELETE } from '../utils/API';
import { getCookie } from '../utils/getCookie';

import { IUser } from '../models/interface';
import "../sass/pages/admin-users.scss";

const AdminUsers:React.FC = () => {
    const [ users , setUsers ] = useState<IUser[]>([])
    const [loading , setLoading] = useState<boolean>(false);
    const [ warning , setWarning ] = useState<null | string>(null);
    const [ error , setError ] = useState<null | string>(null)
    const [cb , setCB] = useState<() => any>(() => null);

    useEffect(() => {
        const fetchD = async () => {
            setLoading(true);
            const token:string = getCookie('token');
            const [res , err] = await GET('users' , '' , '' , token );

            setUsers(res);
            setLoading(false);
        }
        fetchD();
    }, [])

    const handleDelete = ({_id , email}:any):void => {
        setWarning('are you secure');

        const callback = async ():Promise<void> => {
            setWarning(null)
            setLoading(true);

            console.log(_id) //print ID

            const token:string = getCookie('token');

            const [ data , error ] = await DELETE('users' , token , _id);

            setLoading(false);

            if(error) {
                setError('Internal server error')
                return null
            }
            const usersV:IUser[] = users;

            setUsers(usersV.filter(u => u.email !== email));
            
        } 
        setCB(() => callback);
    }   

    if(loading) {
        return <Loading />
    }

    return (
        <section className="admin-users">
            {error && <ErrorWindow message={error} callback={() => setError(null)} />}
            {warning && <WarningWindow message={warning} cb={cb} />}
            <h2 className="admin-users__title">Users:</h2>
            <section className="admin-users-contain">
                {users.map(u => (
                    <article key={u.email} className="admin-users-contain-item">
                        <div className="admin-users-contain-item-body">
                            <section className="admin-users-contain-item-body-info">
                                <div className="admin-users-contain-item-body-info__image">
                                    <FaUserSecret className="admin-users-contain-item-body-info__image--icon" />
                                </div>
                                <p className="admin-users-contain-item-body-info__name">@{u.username}</p>
                            </section>
                            <section className="admin-users-contain-item-body-cars">
                                <h4 className="admin-users-contain-item-body-cars__title">Rented Cars</h4>
                                {u.rentedCarts.length === 0 && <p className="admin-users-contain-item-body-cars__paragrafth">No cars...</p>}
                                {u.rentedCarts.map(( c , i , arr ) => {
                                    if(i === 2) {
                                        return <Link to={`/admin/user/${u._id}`} className="admin-users-contain-item-body-cars__showMore">Show More ({arr.length - 2})...</Link>
                                    }else if(i > 2) {
                                        return '';
                                    }
                                    return (<p className="admin-users-contain-item-body-cars__paragrafth">{c.name}</p>)
                                    
                                })} 
                                <h4 className="admin-users-contain-item-body-cars__title">Rentel Cars</h4>
                                {u.rentalCarts.length === 0 && <p className="admin-users-contain-item-body-cars__paragrafth">No cars...</p>}
                                {u.rentalCarts.length > 0 && <p className="admin-users-contain-item-body-cars__paragrafth">{u.rentalCarts[0].name} , Finish Time: {u.rentalCarts[0].finish_time} </p>}     
                            </section>
                        </div>
                        <button className="admin-users-contain-item__delete">
                            <FaTrash className="admin-users-contain-item__delete--icon" />
                            <span className="admin-users-contain-item__delete--text" onClick={() => handleDelete(u)} >Delete</span>
                        </button>
                    </article>
                ))}        
            </section>
        </section>
    )
}

export default AdminUsers
