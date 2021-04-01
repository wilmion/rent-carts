import { IAction, ICart, IUser } from "../models/interface";

export const setCarts = (payload:ICart[]):IAction => ({
    type: 'SET_CARTS',
    payload
});
export const addToCart = (payload:ICart):IAction => ({
    type: 'ADD_TO_CART',
    payload
});
export const login = (payload:IUser):IAction => ({
    type: 'LOG_IN', 
    payload
})