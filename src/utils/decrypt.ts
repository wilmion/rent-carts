import crypto from 'crypto-js';

export const decrypt = (data:any , secret:string):any => {
    const byte = crypto.AES.decrypt( data.data , secret ).toString(crypto.enc.Utf8);
    let dates = JSON.parse(byte);
    
    dates = {
        _id: data._id,
        dataEncrypt: data.data,
        ...dates
    }

    return dates;
}
