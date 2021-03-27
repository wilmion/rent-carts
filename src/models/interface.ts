export interface IApiResponse {
    error: null | string;
    data: any;
}
export interface ICart {
    _id: string,
    name: string,
    image: string ,
    description: string,
    mark: 'Susuki',
    price: number,
    creationYear: number,
    owner: string,
    bussinessName: string,
    address: string,
    stock: number,
    features: {
        doors: number,
        capacity: number,
        typeTransmission: 'Automatic',
        typeCart: 'Hatchback',
        typeFuel: 'Petrol',
        cc: number,
        year: number
    },
    timeUsed: number
}