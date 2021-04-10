import { GET } from '../API';

import { getCookie } from '../getCookie';

//actions

import { store } from '../../index';
import { setCarts , setPayments } from '../../redux/actions'



export const getDataFromAPI = async ():Promise<void> => {

    const token:string = getCookie('token');

    const [carts] = await GET('carts');
    const [payments] = await GET( 'payments' , '' , '' , token );

    store.dispatch(setPayments(payments));
    store.dispatch(setCarts(carts));
}