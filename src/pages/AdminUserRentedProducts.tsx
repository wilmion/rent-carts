import React,{ useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'

import CarCardMoreDetails from '../components/CartCardMoreDetails'
import Loading from '../components/Loading';
import ErrorWindow from '../components/ErrorWindow';

import { GET } from '../utils/API';
import { getCookie } from '../utils/getCookie';

import { IOrder, IUser } from '../models/interface'

import "../sass/pages/admin-rented.scss";

const AdminUserRentedProducts:React.FC = () => {
    const [loading , setLoading] = useState<boolean>(false);
    const [rentedCarts , setRentedCarts] = useState<IOrder[] | null>(null);
    const [error , setError] = useState<null | string>(null)
    const params = useParams<{id:string}>();

    useEffect(() => {
        const getData = async ():Promise<void> => {
            setLoading(true);
            const { id } = params;
            const [ data , err ] = await GET('users' , '' , '' , getCookie('token') );

            if(err){
                setError('Internal server error or you are a not Admin')
                setLoading(false);
                setRentedCarts([])
                return null;
            }
            const user:IUser | undefined = data.find(u => u._id === id);

            if(!user) {
                setLoading(false);
                setError('Invalid ID');
                setRentedCarts([])
                return null
            }

            setRentedCarts(user.rentedCarts);

            setLoading(false);
        }
        getData();
    }, [])

    if(loading || !rentedCarts) {
        return <Loading />
    }

    return (
        <section className="admin-rented">
            {error && <ErrorWindow message={error} callback={() => setError(null)} />}
            <div className="admin-rented-grid">
                {rentedCarts.map(c => (<article className="admin-rented-grid-item" key={c._id}>
                <CarCardMoreDetails {...c} />
                    <p className="admin-rented__paragrahp"> ORDER ID : {c.order_Id}</p>
                    <p className="admin-rented__paragrahp"> OWNER ORDER : {c.owner}</p>
                    <p className="admin-rented__paragrahp"> FINISH TIME : {c.finish_time}</p>
                </article>))}
            </div>       
        </section>
    )
}

export default AdminUserRentedProducts
