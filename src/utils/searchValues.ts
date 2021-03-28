const searchValues = ( array:Array<any> , value:string , prop:string , cb:(values:Array<any>) => void ):void => {
    const searchedValues:Array<any> =  array.filter(v => v[prop].toLowerCase().includes(value.toLowerCase()));

    cb(searchedValues);
}

export default searchValues