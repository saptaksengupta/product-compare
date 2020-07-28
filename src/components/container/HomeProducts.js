import React, { useContext, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";
import {
  CART_ACTIONS,
  removeProductFromCartDatabase,
} from "../../reducers/CartReducer";
import Products from "./Products";
import indexedDbService from "../../database/IndexedDatabse";
import DbConfig from "../../database/DbConfig";

import {
  ContainerLayoutColumn,
  ContainerLayoutRow,
} from "../styled/CommonUtils";
import styled from "styled-components";

const StyledPageHeading = styled(ContainerLayoutRow)`
  margin: 3em 0;
  font-size: 20px;
`;

const EmpryContainer = styled(ContainerLayoutRow)`
  margin-top: 15em;
`;

export const HomeProducts = () => {
  const { productContextState } = useContext(ProductContext);
  const { dispatch } = useContext(CartContext);
  const { products } = productContextState;

  useEffect(() => {
    if (indexedDbService.db) {
      fetchProductsFormCartDb(DbConfig.DB_STORE_NAME);
    }
  }, []);

  const fetchProductsFormCartDb = (storeName) => {
    if (storeName) {
      indexedDbService.getAll(storeName).onsuccess = (event) => {
        const res = event.target.result;
        if (res.length > 0) {
          res.map((product) =>
            dispatch({ type: CART_ACTIONS.SET_PRODUCT, payload: { product } })
          );
        }
      };
    }
  };

  const onProducRemove = (product) => {
    const resp = removeProductFromCartDatabase(product.id);
    resp.onsuccess = (event) => {
      dispatch({
        type: CART_ACTIONS.REMOVE_PRODUCT,
        payload: { productId: product.id },
      });
    };

    resp.onerror = (event) => {
      console.log(event.target.error);
    };
  };

  return (
    <ContainerLayoutColumn>
      <StyledPageHeading style={{ display: "flex" }}>Results</StyledPageHeading>
      {products.length > 0 && (
        <Products
          allProducts={products}
          onProdRemoved={(products) => onProducRemove(products)}
        />
      )}
      {products.length === 0 && (
        <EmpryContainer alignment="center">Search For products.</EmpryContainer>
      )}
    </ContainerLayoutColumn>
  );
};
