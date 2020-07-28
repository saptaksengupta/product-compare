export const PRODUCT_ACTIONS = {
    SET_PRODUCT: 'SET_PRODUCT',
    FLUSH_PRODUCTS: 'FLUSH_PRODUCTS'
}

export const ProductReducer = (state, action) => {
    switch (action.type) {
        case PRODUCT_ACTIONS.SET_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload.product]
            };
        case PRODUCT_ACTIONS.FLUSH_PRODUCTS: 
            return {
                ...state,
                products: []
            }
        default:
            return state;
    }
};
