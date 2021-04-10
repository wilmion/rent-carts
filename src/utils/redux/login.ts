import { store } from '../../index';

import { login } from '../../redux/actions';

import { GET } from '../API'
export const logIn = async (token:string , id:string):Promise<void> => {
    try {
        const [ data , error ] = await GET('users' , id ,'' , token);
        
        store.dispatch(login(data));
    }catch(e) {
        logIn(token , id);
    }
}