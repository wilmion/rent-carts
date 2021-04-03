import React from 'react';
import { connect } from 'react-redux'

import { ICart, IState } from '../models/interface'

interface IProps {
    cars:ICart[]
}

const Admin:React.FC<IProps> = (props) => {
    return (
        <div>
            <h1>Admin Works!</h1>
        </div>
    )
}

const mapStateToProps = (state:IState) => ({
    cars:state.carts
})

const mapDispacthToProps = {

}

export default connect(mapStateToProps , mapDispacthToProps)(Admin)
