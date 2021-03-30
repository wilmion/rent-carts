import axios from 'axios';
import { IApiResponse } from '../models/interface'
const API = 'https://rent-carts.herokuapp.com/api';

export const GET = async (component:string , id?:string , querys?:string , token?:string ):Promise<[any, string | null]> => {

    let data:any = null;
    let error: null | string = null;
    const URL = `${API}/${component}${id !== '' && id? `/${id}`:''}${querys !== '' &&  querys? `?${querys}`: ''}`;

    if(token) {
        const { data:dt } = await axios.get<IApiResponse>( URL , {
            headers: { Authorization: `${token}` }
        });
            
        data = dt.data;
        error = dt.error;
    }else {
        const { data:dt } = await axios.get<IApiResponse>(URL);
            
        data = dt.data;
        error = dt.error;
    }

    return [data , error];
}