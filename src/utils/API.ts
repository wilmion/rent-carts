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
export const POST = async (component:string , body:any , token:string , id?:string):Promise<[any , null | string]> => {
    let data:any = null;
    let error:null | string = null;
    const URL:string = `${API}/${component}${id !== '' && id? `/${id}` : ''}`;

    try {
        const { data:response } = await axios.post<IApiResponse>(URL , body , {
            headers: { Authorization: token }
        });
        data = response.data;
    }catch(e){
        error = e.message;
    }

    return [
        data,
        error
    ]
}