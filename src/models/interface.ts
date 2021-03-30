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
    mark: 'Susuki' | 'Toyota',
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

export interface IAction {
    type: TAction,
    payload: any
}
export interface IState {
    carts:ICart[];
    cart:ICart[];
    user:null | string
}