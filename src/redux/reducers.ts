
import { IAction, IState } from "../models/interface";

export const reducer = ( state:IState | undefined , action:IAction ):IState => {
    if(state) {
        switch(action.type) {
            case 'SET_CARTS' :
                return {
                    ...state,
                    carts: action.payload
                }
            case 'ADD_TO_CART':

                const isExist = state.cart.find(c => c._id === action.payload._id);

                if(isExist) {
                    return state;
                }
                
                return {
                    ...state,
                    cart: [...state.cart , action.payload]
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