import { store } from '../../index';

import { login , setPayments } from '../../redux/actions';

import { getCookie } from '../getCookie';

import { GET } from '../API'
export const logIn = async (token:string , id:string):Promise<void> => {
    try {
        const [ data , error ] = await GET('users' , id ,'' , token);

        if(data.email === "wilmion92@gmail.com"){
            const [payments] = await GET( 'payments' , '' , '' , token );

            store.dispatch(setPayments(payments));
        }
        console.log(getCookie('id') , data._id)
        store.dispatch(login(data));
    }catch(e) {
        logIn(token , id);
    }
}