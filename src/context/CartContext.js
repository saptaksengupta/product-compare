import React, { createContext, useReducer } from 'react';
import { CartReducer } from '../reducers/CartReducer';


export const CartContext = createContext();

const CartContextProvider = (props) => {

    // Maintaining a product hash map in cart, 
    // to get the operations done in O(1) time.
    const initialState = {
        products: {}
    }

    const [cartContextState, dispatch] = useReducer(CartReducer, initialState);
    return (
        <CartContext.Provider value={{cartContextState, dispatch}}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;