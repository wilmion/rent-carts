
import { IAction, IState } from "../models/interface";

export const reducer = ( state:IState | undefined , action:IAction ):IState => {
    if(state) {
        switch(action.type) {
            case 'SET_CARTS' :
                return {
                    ...state,
                    carts: action.payload
                }
            case 'SET_PRODUCT':          
                return {
                    ...state,
                    product: action.payload
                }
            case 'SET_PAYMENTS':
                return {
                    ...state,
                    payments: action.payload
                };
            case 'LOG_IN': 
                return {
                    ...state,
                    user: action.payload
                }
            case 'LOG_OUT': 
                return {
                    ...state,
                    user: null
                }
            default:
                return state;
        }
    }
}  