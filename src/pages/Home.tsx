import React , { useState } from 'react';
import { FaFilter } from 'react-icons/fa'
import { useGet } from '../hooks/apiConsumer'
import searchValues from '../utils/searchValues';
import { cycleElement } from '../utils/cycleElement';

//components

import Filter from '../components/Filter';
import CartCard from '../components/cartCard';
import Loading from '../components/Loading';

import { ICart } from '../models/interface'

import "../sass/pages/home.scss";
const Home:React.FC = () => {
    const [ showFilters , setShowFilters ] = useState<boolean>(false);

    const [response , setResponse , res , error ] = useGet('carts' , [] , '' , 'limit=4');

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
        searchValues(res , element.value , 'name' , (values) => {
            setResponse(values);
        })
    }

    return (
        <>
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
                {res !== '' && !error?  (<article className="home-recomend-products">
                        {response.length === 0 && <p className="home-recomend-products__notResults">Not Results...</p> }
                        {response.map(c => <CartCard {...c} key={c._id} />)}
                    </article>) : <Loading/>}
            </section>
        </>
    )
}

export default Home;