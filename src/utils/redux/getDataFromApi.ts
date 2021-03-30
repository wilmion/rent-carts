import { GET } from '../API';

//actions

import { store } from '../../index';
import { setCarts } from '../../redux/actions'


export const getDataFromAPI = async ():Promise<void> => {
    const [carts] = await GET('carts');
    store.dispatch(setCarts(carts));
}