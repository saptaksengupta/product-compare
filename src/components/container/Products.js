import React, { useContext } from "react";
import styled from "styled-components";
import { Product } from "../functional/Product";

import { CartContext } from "../../context/CartContext";
import { CART_ACTIONS, addProductToCartDatabase } from "../../reducers/CartReducer";
import styles from "../../styles/products.module.css";

import { DefaultContainerLayoutGrid } from "../styled/CommonUtils";

const StyledProductListHeadings = styled(DefaultContainerLayoutGrid)`
  width: 100%;
  margin-bottom: 2em;
  font-size: 14px;
  line-height: 17px;
  color: #78909c;
`;

const Products = ({ allProducts, onProdRemoved }) => {
  const { cartContextState, dispatch } = useContext(CartContext);
  const { products } = cartContextState;

  const isInTheCart = (productId) => {
    return productId in products;
  };

  const productListJsx = allProducts.map((product) => (
    <Product
      product={product}
      showRemoveBtn={isInTheCart(product.id)}
      onAddToCart={(productId) => addItemToCart(productId)}
      onRemoveFromCart={(productId) => removeItemFromCart(productId)}
    />
  ));

  const addItemToCart = (product) => {
    const currentLength = Object.keys(products).length;
    if (currentLength < 10) {
      const resp = addProductToCartDatabase(product);
      resp.onsuccess = (resp) => {
        dispatch({ type: CART_ACTIONS.SET_PRODUCT, payload: { product } });
      }
      resp.onerror = (event) => {
        console.log(event.target.error);
      }
    } else {
      alert("not allowed to add.")
    }

  };

  const removeItemFromCart = (product) => {
    if (onProdRemoved) {
      onProdRemoved(product);
    }
  };

  return (
    <div className={styles.productsContainer}>
      <StyledProductListHeadings>
        <div style={{ textAlign: "left" }}>Product information</div>
        <div>Avarage price</div>
        <div>Lowest Price</div>
        <div>Average Rating</div>
        <div>Number of Sellers</div>
        <div>Action</div>
      </StyledProductListHeadings>
      <div className={styles.list}>{productListJsx}</div>
    </div>
  );
};

export default Products;
