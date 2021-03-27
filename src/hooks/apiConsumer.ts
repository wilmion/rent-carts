import { useState , useEffect } from 'react';
import axios from 'axios'
import { IApiResponse } from '../models/interface'

const API = 'https://rent-carts.herokuapp.com/api';

export const useGet = (component:string , initialState:any , id?:string , querys?:string , token?:string ):IApiResponse => {
    const [ data , setData ] = useState<any>({error:null , data: initialState})

    useEffect(() => {
        const URL = `${API}/${component}${id !== '' && id? `/${id}`:''}${querys !== '' &&  querys? `?${querys}`: ''}`;
        
        const GET = async () => {
            const res = await axios.get(URL);
            setData(res.data);
        }
        const GET_BY_TOKEN = async () => {
            const res = await axios.get( URL , {
                headers: { Authorization: `${token}` }
            });
            setData(res.data);
        }
        if(token) {
            GET_BY_TOKEN();
        }else {
            GET();
        }
        
    } , []);

    return data;
}