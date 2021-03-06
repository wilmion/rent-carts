import { IAction, ICart, IPayment, IUser } from "../models/interface";

export const setCarts = (payload:ICart[]):IAction => ({
    type: 'SET_CARTS',
    payload
});
export const setProduct = (payload:ICart):IAction => ({
    type: 'SET_PRODUCT',
    payload
});
export const setPayments = (payload:IPayment[]):IAction => ({
    type: 'SET_PAYMENTS',
    payload
}) 
export const login = (payload:IUser):IAction => ({
    type: 'LOG_IN', 
    payload
})
export const log_out = ():IAction => {
    document.cookie = 'token=';
    document.cookie = 'id=';
    return {
        type: 'LOG_OUT',
        payload: null
    }
}