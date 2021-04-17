import CartsMock from '../../__mocks__/cartsMock';
import { setCarts , setPayments , setProduct , login , log_out } from '../../redux/actions';

import { IAction, IPayment, IUser } from '../../models/interface';
import { TAction } from '../../models/tuples';

describe('ACTIONS' , () => {
    const generateReturnActions = (type:TAction , payload:any):IAction => ({
        type,
        payload
    }) 
    test('set carts' , () => {
        expect(setCarts(CartsMock)).toEqual(generateReturnActions('SET_CARTS' , CartsMock))
    })
    test('set Payments' , () => {
        const paymentMock:IPayment[] = [
            {_id:'ID' , method:'Payment' , data: null , dataEncrypt: 'ENCRYPT', image: "asdasd" }
        ]
        expect(setPayments(paymentMock)).toEqual(generateReturnActions('SET_PAYMENTS' , paymentMock ))
    })
    test('set Product' , () => {
        expect(setProduct(CartsMock[0])).toEqual(generateReturnActions('SET_PRODUCT' , CartsMock[0]));
    })
    test('log in' , () => {
        const userMock:IUser = {
            _id: "ID",
            fullName: "Full Name Example",
            username: "Username Example",
            email: "CORREO EXAMPLE",
            cart: [],
            rentalCarts:[],
            rentedCarts:[]
        }
        expect(login(userMock)).toEqual(generateReturnActions('LOG_IN' , userMock ) );
    })
    test('logOut' , () => {
        expect(log_out()).toEqual(generateReturnActions('LOG_OUT' , null))
    })
});