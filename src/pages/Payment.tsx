import React, {useState} from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { PayPalButton , PaypalOptions ,PayPalButtonProps } from 'react-paypal-button-v2'
import Loading from '../components/Loading'
import ErrorWindow from '../components/ErrorWindow';
import WarningWindow from '../components/WarningWindows';

import CartCardMoreDetails from '../components/CartCardMoreDetails';

import { decrypt } from '../utils/decrypt';

import { ICart, IPayment, IPaymentApi, IState } from '../models/interface';
import "../sass/pages/payment.scss";

interface IProps {
    product:ICart | null,
    payments:IPaymentApi[]
}

const Payment:React.FC<IProps> = (props) => {
    const [ warning , setWarning ] = useState<string | null>('Por favor no pague este paypal , solo es de demostración | Please do not pay this paypal, it is only for demonstration');
    const [ error , setError ] = useState<string | null>(null);
    const [ loading , setLoading ] = useState<boolean>(false);
    const history = useHistory()

    if(props.payments.length === 0 || !props.product || loading) return <Loading />;

    const generatePropsPaypalOptions = ():PaypalOptions => {

        const payment:IPayment = decrypt(props.payments[0] , process.env.CRYPTO_SECRET);

        const config:PaypalOptions = {
            clientId: payment.data.clientID,
            intent: 'capture',
            currency: "USD"
        }

        return config;
    }
    const handleSuccess = (details:any , data:any):void => {
        console.log(data , details);

        history.push('/checkout/success');
    }
    const handleErrorOrCancel = ():void => {
        setError('A error ocurred!!');
    }
    return (
        <section className="product-payment">
            {error && <ErrorWindow message={error} callback={() => setError(null)} />}
            {warning && <WarningWindow message={warning} cb={() => setWarning(null)} />}
            <h2 className="product-payment__title">Checkout</h2>
            <section className="product-payment-product">
                <CartCardMoreDetails {...props.product} />
                <p className="product-payment-product__direction">Direction : {props.product.address.toUpperCase()}</p>
            </section>
            <h4 className="product-payment__subtitle">Payment with Paypal</h4>
            <section className="product-payment-method">
                <PayPalButton
                    options={generatePropsPaypalOptions()} 
                    style={{layout:"vertical" , shape:'rect'}} 
                    amount={`${props.product.price}`}
                    onSuccess={handleSuccess}
                    onError={handleErrorOrCancel}
                />
            </section>
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    product: state.product,
    payments: state.payments
})
const mapDispatchToProps = {

};

export default connect( mapStateToProps , mapDispatchToProps )(Payment)
