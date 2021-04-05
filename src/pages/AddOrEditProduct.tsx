import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import Loading from '../components/Loading';
import ErrorWindow from '../components/ErrorWindow';
import WarningWindows from '../components/WarningWindows';

import mapping from '../others/addoreditproductsmap';

import { POST , PATCH } from '../utils/API';
import { getCookie } from '../utils/getCookie';

import { ICart, IState } from '../models/interface';

import "../sass/pages/add-or-edit-product.scss";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

interface IProps {
    cars:ICart[];
}

const AddOrEditProduct:React.FC<IProps> = (props) => {
    if(props.cars.length === 0) {
        return <Loading />
    }
    const params = useParams<{id:string}>()
    const [loading , setLoading] = useState<boolean>(false);
    const [cb , setCB] = useState<() => any>(() => null)
    const [warning , setWarning] = useState<string | null>(null);
    const [error , setError] = useState<string | null>(null);

    const car:ICart | undefined = props.cars.find(c => c._id === params.id);

    const [ form , setForm ] = useState({
        name: car ? car.name : '',
        image: car? car.image : '' ,
        description: car? car.description : '',
        mark: car? car.mark : '',
        price: car? car.price : '' ,
        creationYear: car? car.creationYear : '',
        owner: car? car.owner : '',
        bussinessName: car? car.bussinessName : '',
        address: car? car.address: '',
        doors: car? car.features.doors : '',
        capacity: car? car.features.capacity : '',
        typeTransmission: car? car.features.typeTransmission : '',
        typeCart: car ? car.features.typeCart : '',
        typeFuel: car ? car.features.typeFuel : '',
        cc: car ? car.features.cc : '',
    })

    if(loading) {
        return <Loading />
    }

    const history = useHistory();

    const handleSubmit = (e:any):void => {
        e.preventDefault();
        setWarning('Are you secure?')

        const PostOrCreate = async ():Promise<void> => {
            setWarning(null);
            setLoading(true);

            let body:any = {
                name: form.name,
                image: form.image ,
                description: form.description,
                mark: form.mark,
                price: Number(form.price) ,
                creationYear: Number(form.creationYear),
                owner: form.owner,
                bussinessName: form.bussinessName,
                address: form.address,
                features: {
                    doors: Number(form.doors),
                    capacity: Number(form.capacity),
                    typeTransmission: form.typeTransmission,
                    typeCart: form.typeCart,
                    typeFuel: form.typeFuel,
                    cc: Number(form.cc),
                    year: new Date().getFullYear()
                },
            }
            const token:string = getCookie('token');

            if(params.id === 'newProduct') {
                body.stock = 3;
                body.timeUsed = 0;
                const [data , error] = await POST('carts' , body , token);

                setLoading(false);

                if(error) {
                    setError('Invalid Data or Internal Server Error');
                    return null;
                }
            } else { 
                const [data , error] = await PATCH('carts' , body , token , params.id);

                setLoading(false);

                if(error) {
                    setError('Invalid Data');
                    return null;
                }
            }

            document.location.href = '/admin/products';
        }

        setCB(() => PostOrCreate)
    }

    const handleChange = (e:any) => {
        const element:HTMLInputElement = e.target;
        const value:string = element.value;
        const prop:string = element.name;

        setForm({
            ...form,
            [prop]: value
        })

    }

    return (
        <section className="product-AddOrEdit">
            {error && <ErrorWindow message={error} callback={() => setError(null)} />}
            {warning && <WarningWindows message={warning} cb={cb} />}
            <h2 className="product-AddOrEdit__title">Add / Edit Car</h2>
            <form className="product-AddOrEdit-form" onSubmit={handleSubmit} >
                {mapping.map(o  => {
                    if(o.type === "input"){
                        return (
                            <label key={o.prop} htmlFor={o.prop} className="product-AddOrEdit-form-label">
                                <span className="product-AddOrEdit-form-label__title">{o.title}</span>
                                <input
                                 type={o.input} 
                                 name={o.prop} 
                                 value={form[o.prop]} 
                                 onInput={handleChange}
                                 className="product-AddOrEdit-form-label__input" 
                                 id={o.prop} 
                                 required
                                />
                            </label>
                        )
                    }
                    if(o.type === "select") {
                        return (
                            <label key={o.prop} htmlFor={o.prop} className="product-AddOrEdit-form-label">
                                <h4 className="product-AddOrEdit-form-label__title" >{o.title}</h4>
                                <select
                                 name={o.prop} 
                                 value={form[o.prop]} 
                                 className="product-AddOrEdit-form-label__input" 
                                 onInput={handleChange}
                                 id={o.prop}
                                 required
                                >
                                    <option value="any" defaultValue={0} >Select Option</option>
                                    {o.options.map(op => <option value={op}>{op.toUpperCase()}</option> )}
                                </select>
                            </label>
                        )
                    }
                    return (
                        <label key={o.prop} htmlFor={o.prop} className="product-AddOrEdit-form-label">
                            <h4 className="product-AddOrEdit-form-label__title">{o.title}</h4>
                            <textarea
                             name={o.prop} 
                             id={o.prop} 
                             onInput={handleChange}
                             cols={30} 
                             rows={10} 
                             value={form[o.prop]} 
                             required
                            ></textarea>
                        </label>
                    )
                })}
                <input type="submit" value="Submit" className="product-AddOrEdit-form__submit" />
            </form>
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    cars:state.carts
})

export default connect( mapStateToProps , null)(AddOrEditProduct)
