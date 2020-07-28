import React from "react";
import styles from "../styles/cartpage.module.css";

import { ContainerLayoutColumn } from "../components/styled/CommonUtils";
import { CartProducts } from "../components/container/CartProducts";

const CartPage = () => {
  return (
    <div className={styles.cartContainer}>
      <ContainerLayoutColumn alignment="start">
        <div className={styles.cartHeading}>Compare Cart</div>
      </ContainerLayoutColumn>
      <div>
        <CartProducts />
      </div>
    </div>
  );
};

export default CartPage;
