import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import mapping from '../others/addoreditproductsmap';

import { ICart, IState } from '../models/interface';

import "../sass/pages/add-or-edit-product.scss";

interface IProps {
    cars:ICart[];
}

const AddOrEditProduct:React.FC<IProps> = (props) => {
    const params = useParams<{id:string}>()
    const car:ICart | undefined = props.cars.find(c => c._id === params.id);

    return (
        <section className="product-AddOrEdit">
            <h2 className="product-AddOrEdit__title">Add / Edit Car</h2>
            <form className="product-AddOrEdit-form">
                {mapping.map(o => {
                    if(o.type === "input"){
                        return (
                            <label key={o.prop} htmlFor={o.prop} className="product-AddOrEdit-form-label">
                                <span className="product-AddOrEdit-form-label__title">{o.title}</span>
                                <input type={o.input} name={o.prop} className="product-AddOrEdit-form-label__input" id={o.prop} />
                            </label>
                        )
                    }
                    if(o.type === "select") {
                        return (
                            <label key={o.prop} htmlFor={o.prop} className="product-AddOrEdit-form-label">
                                <h4 className="product-AddOrEdit-form-label__title">{o.title}</h4>
                                <select name={o.prop} className="product-AddOrEdit-form-label__input" id={o.prop}>
                                    <option value="any" defaultValue={0} >Select Option</option>
                                    {o.options.map(op => <option value={op}>{op.toUpperCase()}</option> )}
                                </select>
                            </label>
                        )
                    }
                    return (
                        <label key={o.prop} htmlFor={o.prop} className="product-AddOrEdit-form-label">
                            <h4 className="product-AddOrEdit-form-label__title">{o.title}</h4>
                            <textarea name={o.prop} id={o.prop} cols={30} rows={10} ></textarea>
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
