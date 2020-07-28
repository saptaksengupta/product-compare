import indexedDbService from "../database/IndexedDatabse";
import DbConfig from "../database/DbConfig";

export const CART_ACTIONS = {
    SET_PRODUCT: 'SET_PRODUCT',
    FLUSH_PRODUCTS: 'FLUSH_PRODUCTS',
    REMOVE_PRODUCT: 'REMOVE_PRODUCT'
}

export const CartReducer = (state, action) => {
    switch (action.type) {
        case CART_ACTIONS.SET_PRODUCT:
            const {product} = action.payload
            const newState = {
                ...state,
                products: {...state.products, [product.id]: product}
            };
            return newState;
        case CART_ACTIONS.FLUSH_PRODUCTS: 
            return {
                ...state,
                products: []
            }
        case CART_ACTIONS.REMOVE_PRODUCT:
            return {
                ...state,
                products: removeByProductId(state.products, action.payload.productId)
            }
        default:
            return state;
    }
};

const removeByProductId = (products, productId) => {
    delete products[productId];
    return products;
}

export const addProductToCartDatabase = (product) => {
    return indexedDbService.insertRow(DbConfig.DB_STORE_NAME, product);
}

export const removeProductFromCartDatabase = (productId) => {
    return indexedDbService.deleteRow(DbConfig.DB_STORE_NAME, productId);
}
