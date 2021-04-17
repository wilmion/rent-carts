import CartMock from '../../__mocks__/cartsMock';
import { reducer } from '../../redux/reducers';
import initialState from '../../initialState';
import { setCarts , setPayments , setProduct , login , log_out } from '../../redux/actions';
import { IPayment, IUser } from '../../models/interface';

describe('REDUCERS' , () => {
    test('Set Cars' , () => {
        expect(reducer(initialState , setCarts(CartMock))).toEqual({...initialState , carts:CartMock});
    })
    test('Set Payments' , () => {
        const paymentMock:IPayment[] = [
            {_id:'ID' , method:'Payment' , data: null , dataEncrypt: 'ENCRYPT', image: "asdasd" }
        ]

        expect(reducer(initialState , setPayments(paymentMock))).toEqual({...initialState , payments: paymentMock })
    })
    test('Set Product' , () => {
        expect(reducer(initialState , setProduct(CartMock[0]))).toEqual({...initialState , product: CartMock[0]})
    })
    test('login' , () => {
        const userMock:IUser = {
            _id: "ID",
            fullName: "Full Name Example",
            username: "Username Example",
            email: "CORREO EXAMPLE",
            cart: [],
            rentalCarts:[],
            rentedCarts:[]
        }

        expect(reducer(initialState , login(userMock))).toEqual({...initialState , user: userMock })
    })
    test('log out' , () => {
        expect(reducer(initialState , log_out())).toEqual({...initialState , user: null})
    })
})