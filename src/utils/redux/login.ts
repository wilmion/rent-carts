import { store } from '../../index';

import { login , setPayments } from '../../redux/actions';

import { GET } from '../API'
export const logIn = async (token:string , id:string):Promise<void> => {
    try {
        const [ data , error ] = await GET('users' , id ,'' , token);

        if(data.email === "wilmion92@gmail.com"){
            const [payments] = await GET( 'payments' , '' , '' , token );

            store.dispatch(setPayments(payments));
        }
        store.dispatch(login(data));
    }catch(e) {
        logIn(token , id);
    }
}