import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import styles from "../../styles/cartpage.module.scss";
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
import { CartIcon } from "../styled/Icons";
import { styleConfig } from "../styled/config";
import BarGraph from "../BarGraph";

const GraphContainers = styled.div`
  margin-top: 1em;
  display: flex;
`;

const EmptyCartLabel = styled(ContainerLayoutColumn)`
  align-items: center;
  margin-top: 15em;
`;

const numberToStrHash = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten",
};

export const CartProducts = () => {
  const { cartContextState, dispatch } = useContext(CartContext);
  const { products } = cartContextState;
  const [productsArray, setProductsArray] = useState([]);

  const [avgPricesForGraph, setAvgPricesForGraph] = useState([]);
  const [productRatings, setProductRatings] = useState([]);

  useEffect(() => {
    const length = Object.keys(products).length;
    // If there is no product in crrent context,
    // will try to fetch from database
    if (length === 0) {
      fetchProducsFormCartDb();
    } else {
      generateProductArray(products);
    }
  }, [products]);

  const fetchProducsFormCartDb = () => {
    indexedDbService.getAll(DbConfig.DB_STORE_NAME).onsuccess = (event) => {
      const res = event.target.result;
      if (res.length > 0) {
        res.map((product) =>
          dispatch({ type: CART_ACTIONS.SET_PRODUCT, payload: { product } })
        );
      }
    };
  };

  const onProducRemove = (product) => {
    const resp = removeProductFromCartDatabase(product.id);
    resp.onsuccess = (event) => {
      dispatch({
        type: CART_ACTIONS.REMOVE_PRODUCT,
        payload: { productId: product.id },
      });
      setTimeout(() => {
        generateProductArray(products);
      });
    };

    resp.onerror = (event) => {
      console.log(event.target.error);
    }
  };

  const generateProductArray = (products) => {
    let newArray = [];
    Object.keys(products).forEach((key) => {
      newArray.push(products[key]);
    });
    setProductsArray(newArray);
  };

  const getAvaragePrice = (offers) => {
    let totalPrice = 0;
    totalPrice = offers.reduce((acc, current) => {
      return acc + current.price;
    }, 0);

    return totalPrice / offers.length;
  };

  useEffect(() => {
    let avgPriceArray = [];
    let ratingsArray = [];
    if (productsArray.length > 0) {
      productsArray.map((prod) => {
        avgPriceArray.push(getAvaragePrice(prod.offerData.offers));
        ratingsArray.push(prod.rating);
      });
      setAvgPricesForGraph(avgPriceArray);
      setProductRatings(ratingsArray);
    }
  }, [productsArray]);

  const getDigitStirng = () => {
    return numberToStrHash[Object.keys(products).length];
  };

  return (
    <ContainerLayoutColumn>
      {productsArray.length > 0 && (
        <React.Fragment>
          <ContainerLayoutColumn>
            <div className={styles.cartSubHeading}>
              You compare this {getDigitStirng()} items
            </div>
            <div style={{ marginTop: "2em" }}>
              <Products
                allProducts={productsArray}
                onProdRemoved={(products) => onProducRemove(products)}
              />
            </div>
          </ContainerLayoutColumn>
          <GraphContainers>
            <ContainerLayoutRow>
              <BarGraph
                label="Avg. Price"
                elements={avgPricesForGraph}
                color={styleConfig.barGraphColorOne}
              />
            </ContainerLayoutRow>
            <ContainerLayoutRow style={{ marginLeft: "1em" }}>
              <BarGraph
                label="Product Rating"
                elements={productRatings}
                color={styleConfig.barGraphColorTwo}
              />
            </ContainerLayoutRow>
          </GraphContainers>
        </React.Fragment>
      )}
      {productsArray.length === 0 && (
        <EmptyCartLabel alignment="center">
          <CartIcon height={100} />
          <div style={{ marginTop: "1em" }}>
            No Products are there in the cart Now, please add to compare
          </div>
        </EmptyCartLabel>
      )}
    </ContainerLayoutColumn>
  );
};
