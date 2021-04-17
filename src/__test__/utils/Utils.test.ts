import CarMock from '../../__mocks__/cartsMock';
import { ICart } from '../../models/interface';

//utils

import searchValues from '../../utils/searchValues';


describe('UTILS' , () => {
    test('Obtener valores' , () => {
        let recibido ; 
        searchValues(CarMock , 'Toyota' , 'mark' , (values:ICart[]) => {
            recibido = values[0];
        })

        expect(recibido).toEqual(CarMock[1]);
    })
})