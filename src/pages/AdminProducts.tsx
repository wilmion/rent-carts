import React,{useState} from 'react';
import { connect } from 'react-redux'

import { Link, useHistory } from 'react-router-dom'
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import Loading from '../components/Loading';
import CartCardMoreDetails from '../components/CartCardMoreDetails';
import WarningWindows from '../components/WarningWindows';
import ErrorWindow from '../components/ErrorWindow';

import searchValues from '../utils/searchValues';
import { DELETE } from '../utils/API';
import { getCookie } from '../utils/getCookie';

import { ICart, IState } from '../models/interface'

import "../sass/pages/admin-products.scss";


interface IProps {
    cars:ICart[]
}

const AdminProducts:React.FC<IProps> = (props) => {

    const [cars , setCars] = useState<ICart[]>(props.cars);
    const [warning , setWarning] = useState<string | null>(null)
    const [ error , setError] = useState<string | null>(null);
    const [loading , setLoading] = useState<boolean>(false);
    const [cb , setCb] = useState<() => any>(() => null);
    const history = useHistory();

    const handleSearch = (e:any):void => {
        const element:HTMLInputElement = e.target;

        const value:string = element.value;

        searchValues(props.cars , value , 'name' , (filtered) => {
            setCars(filtered);
        })
    }

    const handleDelete = (id:string):void => {
        setWarning('Are you a secure?')
        const callBack = async () => {
            setLoading(true);
            setWarning(null);
            
            const token:string = getCookie('token');

            const [ data , error ] = await DELETE('carts' , token , id);
            if(error){
                setError('Internal Server Error');
            }

            setLoading(false); 
        }
        setCb(() => callBack);
    }

    if(loading){
        return <Loading />
    }

    return (
        <section className="admin-products">
            {warning && <WarningWindows message={warning} cb={cb} /> }
            {error && <ErrorWindow message={error} callback={() => setError(null)}  />}
            <section className="admin-products-header">
                <input type="text" className="admin-products-header__search" onInput={handleSearch} placeholder="Find Product" />
                <Link to="/admin/add/newProduct" className="admin-products-header__add">Add Product</Link>
            </section>
            <h2 className="admin-products__title">Products:</h2>
            {cars.map(c => 
                <section className="admin-products-item" key={c._id} >
                    <section className="admin-products-item-portrait">
                        <CartCardMoreDetails {...c} />
                    </section>
                    <section className="admin-products-item-footer">
                        <button className="admin-products-item-footer__button terciary-bc" onClick={() => history.push(`/admin/add/${c._id}`)} >
                            <AiFillEdit className="admin-products-item-footer__button--icon" />
                            <span className="admin-products-item-footer__button--text">Edit</span>
                        </button>
                        <button className="admin-products-item-footer__button primary-bc">
                            <BsFillTrashFill className="admin-products-item-footer__button--icon" />
                            <span className="admin-products-item-footer__button--text" onClick={() => handleDelete(c._id)} >Delete</span>
                        </button>
                    </section>
                </section>
            )}
            
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    cars:state.carts
})

const mapDispacthToProps = {

}

export default connect(mapStateToProps , mapDispacthToProps)(AdminProducts)
