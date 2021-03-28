import React, { useState , useEffect } from 'react';
import axios from 'axios'
import { IApiResponse } from '../models/interface'

const API = 'https://rent-carts.herokuapp.com/api';
let resData:any = null;
export const useGet = (component:string , initialState:any , id?:string , querys?:string , token?:string ):[any , React.Dispatch<any> , any , null | string] => {
    const [ data , setData ] = useState<any>(initialState)

    
    let error: null | string = null;

    useEffect(() => {
        const URL = `${API}/${component}${id !== '' && id? `/${id}`:''}${querys !== '' &&  querys? `?${querys}`: ''}`;
        
        const GET = async () => {
            const res = await axios.get<IApiResponse>(URL);
            
            resData = res.data.data;
            error = res.data.error;
            setData(res.data.data);
        }
        const GET_BY_TOKEN = async () => {
            const res = await axios.get<IApiResponse>( URL , {
                headers: { Authorization: `${token}` }
            });
            
            resData = res.data.data;
            error = res.data.error;
            setData(res.data.data);
        }
        if(token) {
            GET_BY_TOKEN();
        }else {
            GET();
        }
        
    } , []);

    return [
        data , 
        setData,
        resData,
        error
    ];
}