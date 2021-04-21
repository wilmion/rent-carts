import React from 'react'

interface Iprops{
    title:string,
    onclick:(e:any) => void; 
}

const Filter:React.FC<Iprops> = (props) => {

    return (
        <section onClick={props.onclick} className='home-filters-filter' aria-hidden="true" >
            <p className="home-filters-filter__title">{props.title}</p>
        </section>
    )
}

export default Filter;
