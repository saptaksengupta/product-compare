import React, { createContext, useReducer } from 'react';
import { ProductReducer } from '../reducers/ProductReducer';


export const ProductContext = createContext();

const ProductContextProvider = (props) => {

    const initialState = {
        products: []
    }

    const [productContextState, dispatch] = useReducer(ProductReducer, initialState);
    return (
        <ProductContext.Provider value={{productContextState, dispatch}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;