import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router'

import { addToCart } from '../redux/actions';

import { FaUserAlt , FaExchangeAlt , FaCarAlt } from 'react-icons/fa';
import { GiCarDoor , GiChatBubble, GiFuelTank } from 'react-icons/gi';
import { AiOutlineShop } from 'react-icons/ai';
import { ImLocation } from 'react-icons/im'
import Loading from '../components/Loading';
import ErrorWindow from '../components/ErrorWindow';

import { IAction, ICart, IState } from '../models/interface'

import "../sass/pages/cart.scss";
import { useHistory } from 'react-router-dom';

interface IProps {
    carts:ICart[],
    cart:ICart[];
    user:null | string;
    addToCart: (payload:ICart) => IAction;
}

const Cart:React.FC<IProps> = (props) => {
    const [ error , setError ] = useState<null | string>('')
    const [ cb , setCb ] = useState<() => any>(() => null)
    const history = useHistory();
    const params = useParams<{id:string}>()
    const cart : null | ICart = props.carts.find(c => c._id === params.id);

    if(!cart) {
        return <Loading />
    }
    
    const handleSubmit = ():void | null => {
        const isExist = props.cart.find(i => i._id === cart._id);
        if(!props.user){
            const f = () => history.push('/login');
            setCb(() => f);
            setError('You are not logged in')
            return null;
        }
        if(isExist) {
            const f = () => setError('');
            setCb(() => f);
            setError('The car is in the shopping cart.')
            return null;
        }
        props.addToCart(cart);
    }
    return (
        <section className="cart-detail">
            {error !== '' && <ErrorWindow message={error} callback={cb} />}
            <img src={cart.image} alt={cart.name} />
            <p className="cart-detail__mark">{cart.mark}</p>
            <div className="cart-detail-title">
                <h3 className="cart-detail-title__title">{cart.name}</h3>
                <h5 className="cart-detail-title__year">{cart.creationYear}</h5>
            </div>
            <h4 className="cart-detail__price">${cart.price}/<small>day</small></h4>
            <section className="cart-detail-features">
                <section className="cart-detail-features-file">
                    <div className="cart-detail-features-file-item">
                        <FaUserAlt className="cart-detail-features-file-item__icon" />
                        <p className="cart-detail-features-file-item__value">{cart.features.capacity} X Person</p>
                    </div>    
                    <div className="cart-detail-features-file-item">
                        <GiCarDoor className="cart-detail-features-file-item__icon" />
                        <p className="cart-detail-features-file-item__value">{cart.features.doors} X Door</p>
                    </div>   
                    <div className="cart-detail-features-file-item">
                        <p className="cart-detail-features-file-item__value">{cart.features.cc}cc</p>
                    </div>   
                </section>
                <section className="cart-detail-features-file">
                    <div className="cart-detail-features-file-item">
                        <FaExchangeAlt className="cart-detail-features-file-item__icon" />
                        <p className="cart-detail-features-file-item__value">{cart.features.typeTransmission}</p>
                    </div>    
                    <div className="cart-detail-features-file-item">
                        <p className="cart-detail-features-file-item__value">{cart.features.typeCart}</p>
                    </div>   
                </section>
                <section className="cart-detail-features-file">
                    <div className="cart-detail-features-file-item">
                        <GiFuelTank className="cart-detail-features-file-item__icon" />
                        <p className="cart-detail-features-file-item__value">{cart.features.typeFuel}</p>
                    </div>    
                    <div className="cart-detail-features-file-item">
                        <FaCarAlt className="cart-detail-features-file-item__icon" />
                        <p className="cart-detail-features-file-item__value">{cart.features.year}</p>
                    </div>     
                </section>
            </section>
            <section className="cart-detail-desc">
                <h3 className="cart-detail-desc__title">Car Description</h3>
                <div className="cart-detail-desc-content">
                    <p className="cart-detail-desc-content__content">{cart.description}</p>
                </div>
            </section>
            <section className="cart-detail-details">
                <div className="cart-detail-details-header">
                    <h3 className="cart-detail-details-header__title">Other Details</h3>
                    <div className="cart-detail-details-header__line"/>
                </div>
                <section className="cart-detail-details-body">
                    <div className="cart-detail-details-body-item">
                        <FaUserAlt className="cart-detail-details-body-item__icon" />
                        <p className="cart-detail-details-body-item__prev">Owner: </p>
                        <p className="cart-detail-details-body-item__post">{cart.owner}</p>
                    </div>
                    <div className="cart-detail-details-body-item">
                        <AiOutlineShop className="cart-detail-details-body-item__icon" />
                        <p className="cart-detail-details-body-item__prev">Bussiness name: </p>
                        <p className="cart-detail-details-body-item__post">{cart.bussinessName}</p>
                    </div>
                    <div className="cart-detail-details-body-item">
                        <ImLocation className="cart-detail-details-body-item__icon" />
                        <p className="cart-detail-details-body-item__prev">Address: </p>
                        <p className="cart-detail-details-body-item__post">{cart.address}</p>
                    </div>
                </section>
            </section>
            <button className="cart-detail__submit" onClick={handleSubmit} >BOOK NOW</button>
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    carts: state.carts,
    cart: state.cart,
    user:state.user
})
const mapDispatchToProps = {
    addToCart
}

export default connect(mapStateToProps , mapDispatchToProps)(Cart)
