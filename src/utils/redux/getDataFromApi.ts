import { GET } from '../API';

import { getCookie } from '../getCookie';

//actions

import { store } from '../../index';
import { setCarts } from '../../redux/actions'



export const getDataFromAPI = async ():Promise<void> => {

    const token:string = getCookie('token');

    const [carts] = await GET('carts');

    store.dispatch(setCarts(carts));
}