import { TAction } from "./tuples";

export interface IApiResponse {
    error: null | string;
    data: any;
}
export interface ICart {
    _id: string,
    name: string,
    image: string ,
    description: string,
    mark: 'Susuki' | 'Toyota' | 'Chevrolet' | 'Tunland',
    price: number,
    creationYear: number,
    owner: string,
    bussinessName: string,
    address: string,
    stock: number,
    features: {
        doors: number,
        capacity: number,
        typeTransmission: 'Automatic' | 'Mecanic',
        typeCart: 'Hatchback' | 'Sedan' | 'SUV' | 'Pickup',
        typeFuel: 'Petrol' | 'GNV' | 'Gas',
        cc: number,
        year: number
    },
    timeUsed: number
}
export interface IPayment {
    _id:string;
    method:string,
    data:any;
    dataEncrypt:string;
    image:string;
}
export interface IPaymentApi{
    _id:string;
    data:string;
}
export interface IAction {
    type: TAction,
    payload: any
}
export interface IState {
    carts:ICart[];
    product:ICart | null;
    payments: IPaymentApi[];
    user:null | IUser;
}
export interface IUser {
    username:string;
    _id?:string
    fullName:string;
    email:string;
    cart: Array<any>;
    rentedCarts: Array<IOrder>;
    rentalCarts: Array<IOrder>;
}
export interface IOrder extends ICart {
    order_Id:string;   
    details_Id:string;
    facturation_email:string;
    start_time:string;
    finish_time:string; 
}