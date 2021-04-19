import React , { useState } from 'react';
import { FaFilter } from 'react-icons/fa'
import searchValues from '../utils/searchValues';
import { cycleElement } from '../utils/cycleElement';

//components

import Filter from '../components/Filter';
import CartCard from '../components/cartCard';
import Loading from '../components/Loading';

import { ICart ,IState } from '../models/interface'
import { connect } from 'react-redux';

import "../sass/pages/home.scss";

let searching:boolean = false;

interface IProps {
    carts:ICart[]
}

const Home:React.FC<IProps> = (props) => {
    const [ showFilters , setShowFilters ] = useState<boolean>(false);

    const [response , setResponse ] = useState<ICart[]>([]);
    const res = props.carts;

    const toogleFilterCc = (e:any):void => {
        cycleElement(
            e.target , 
            '.home-filters' , 
            'home-filters-filter' , 
            'home-filters-filter home-filters-filter--active' , 
            (e) => {
                const actualCC = Number(e.firstChild.textContent.replace('cc' , ''));
                const filteredData:ICart[] = res.filter(v => actualCC <= v.features.cc)
                setResponse(filteredData);
            }
        )
    }

    const toogleSearch = (e:any):void => {
        const element:HTMLInputElement = e.target;
        
        searching = element.value !== '';

        searchValues(res , element.value , 'name' , (values) => {
            setResponse(values);
        })
    }

    const showDatas = ():JSX.Element => {
        let data:ICart[] = []
        if(showFilters || searching ) {
            data = response;
        } else {
            const width:number = window.innerWidth;
            if(width >= 700 && width <= 900) {
                data = [res[0] , res[1] , res[2]];
            }else if(width >= 901 && width <= 1600) {
                data = [res[0] , res[1] , res[2] , res[3]];
            }else if(width >= 1601) {
                data = [res[0] , res[1] , res[2] , res[3] , res[4]];
            }else {
                data = [res[0] , res[1]];
            }
            
        }
        return (<article className="home-recomend-products">
            {data.length === 0 && <p className="home-recomend-products__notResults">Not Results...</p> }
            {data.map(c => <CartCard {...c} key={c._id} />)}
        </article>)
    }

    return (
        <section className="home">
            <section className="home-actions">
                <div className="home-actions__filters" onClick={() => setShowFilters(!showFilters)} >
                    <FaFilter className="home-actions__filters-icon" />
                </div>
                <input type="text" className="home-actions__search" name="search" id="search" onChange={toogleSearch} />
            </section>
            {   showFilters && (
                    <section className="home-filters">
                        {[1000 , 1500 , 1800 , 2400].map(n => (
                            <Filter onclick={toogleFilterCc} title={`${n}cc`} key={n}/>
                        ))}
                    </section>
                )
            }
            <section className="home-recomend">
                <h2 className="home-recomend__title">Featured Car</h2>
                {res && res.length > 0?  showDatas() : <Loading/>}
            </section>
        </section>
    )
}

const mapStateToProps = (state:IState) => ({
    carts: state.carts
})

export default connect(mapStateToProps , null)(Home);