import React from 'react';
import { FaFilter } from 'react-icons/fa'
import { useGet } from '../hooks/apiConsumer'

//components

import Filter from '../components/Filter';
import CartCard from '../components/cartCard';

import { ICart } from '../models/interface'

import "../sass/pages/home.scss";
const Home:React.FC = () => {
    const res = useGet('carts' , []);
    const data:ICart[] = res.data;

    console.log(useGet('users' , {} , '605d22ee72015101da663d12' , '' , 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbG1pb245MkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ5M0tnTC5sMVQ1b1BJY2pXNW1wZk1lWGpsT0FlZ3BNS3ZJaEFsdWpFL0pBNlZHUzhza3VpeSIsImlhdCI6MTYxNjgyMzA4MH0.jqHEaOM1QKAE1oKXryi8RvZQ9JMICWb57ndSIErdzlk'))

    const toogleFilterCc = (e:any):void => {
        const filters:HTMLElement = document.querySelector('.home-filters');

        const element:HTMLElement = e.target;

        const childs:Element[] = [...filters.children]; 

        childs.forEach(e => {
            if(e === element || e === element.parentNode) {
                e.className = "home-filters-filter home-filters-filter--active"
            }else {
                e.className = "home-filters-filter"
            }
        })
    }
    return (
        <>
            <section className="home-actions">
                <div className="home-actions__filters">
                    <FaFilter className="home-actions__filters-icon" />
                </div>
                <input type="text" className="home-actions__search" name="search" id="search"/>
            </section>
            <section className="home-filters">
                {[1000 , 1500 , 1800 , 2400].map(n => (
                    <Filter onclick={toogleFilterCc} title={`${n}cc`} key={n}/>
                ))}
            </section>
            <section className="home-recomend">
                <h2 className="home-recomend__title">Featured Car</h2>
                <article className="home-recomend-products">
                    {
                        data.map(c => <CartCard {...c} key={c._id} />)
                    }
                </article>
            </section>
        </>
    )
}

export default Home;