import React from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loading from '../components/Loading';
import WarningWindow from '../components/WarningWindows';
import ErrorWindow from '../components/ErrorWindow';

import { decrypt } from '../utils/decrypt';
import { PATCH } from '../utils/API';
import { getCookie } from '../utils/getCookie';

import { IPayment, IPaymentApi, IState } from '../models/interface';

import "../sass/pages/payment-detail.scss";
import { useState } from 'react';

interface IProps {
    payments: IPaymentApi[]
}

const PaymentDetail:React.FC<IProps> = (props) => {
    const [ warning , setWarning ] = useState<null | string>(null);
    const [ error , setError ] = useState<null | string>(null);
    const [ loading , setLoading ] = useState<boolean>(false);
    const [cb , setCb] = useState<() => any>(() => null); 
    const [dates , setDates] = useState<any>({});
    const params = useParams<{id:string}>();

    const data:IPaymentApi = props.payments.find(p => p._id === params.id);

    if(props.payments.length === 0 || loading) {
        return <Loading></Loading>
    }
    
    const payment:IPayment = decrypt(data , process.env.CRYPTO_SECRET);
    const features:any = payment.data;

    const generateInformation = ():Array<string> => {
        let values:Array<string> = [];
        for(const prop in features) {
            values.push(prop)
        }
        return values;
    }
    const handleChange = (e:any , prop:string):void => {
        const value:string = e.target.value;

        setDates({
            ...dates,
            [prop] : value
        });
    }
    const handleSubmit = ():void => {
        setWarning('Are you secure?');

        const afterCb = async ():Promise<void> => {
            setWarning(null);
            setLoading(true);

            const token:string = getCookie('token');

            const { _id , dataEncrypt , ...body } = payment;
            
            const [res , err] = await PATCH('payments' , {
                ...body,
                data: {
                    ...body.data,
                    ...dates
                }
            } , token , _id)

            console.log({
                ...body,
                data: dates
            })
            if(err) {
                setError('Internal Server Error 500')
                setLoading(false);
                return null
            }

            document.location.href = document.location.href;
            
        }

        setCb(() => afterCb)
    }

    return (
        <section className="payment-detail">
            {error && <ErrorWindow message={error} callback={() => setError(null)} />}
            {warning && <WarningWindow message={warning} cb={cb} />}
            <h2 className="payment-detail__title">Payment Method {payment.method.toUpperCase()}</h2>
            <img src={payment.image} alt={payment.method}/>
            <h5 className="payment-detail__section-title">Information: </h5>
            <section className="payment-detail-contain">
                {generateInformation().map(prop => <div className="payment-detail-contain-prop" key={prop}>
                    <div className="payment-detail-contain-prop__key"><p>{prop.toUpperCase()}</p></div>
                    <input 
                        type="text" 
                        id={prop} 
                        value={dates[prop] !== undefined?  dates[prop] : features[prop]} 
                        onInput={(e) => handleChange( e , prop )} 
                        name="propietyName" 
                        className="payment-detail-contain-prop__input"
                    />
                </div>)}
                <button type="button" className="payment-detail-contain__button" onClick={handleSubmit} >Update</button>
            </section>
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    payments: state.payments
})

export default connect( mapStateToProps , null )(PaymentDetail)
