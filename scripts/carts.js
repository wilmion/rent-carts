const axios = require('axios');
const carts = require('./data/index');

const pushDataOnApi = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbG1pb245MkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ5M0tnTC5sMVQ1b1BJY2pXNW1wZk1lWGpsT0FlZ3BNS3ZJaEFsdWpFL0pBNlZHUzhza3VpeSIsImlhdCI6MTYxNjg4MDkyNH0.xaFnAHdxLiVikC803stFVvHnve3fQHrVeoKjTx4klEg';
    carts.forEach(async cart => {
        const id = await axios.post(
            'https://rent-carts.herokuapp.com/api/carts', 
            cart,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        console.info(id.data);
    })
}
pushDataOnApi();
