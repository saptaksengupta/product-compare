import React from "react";
import Searchbar from "../components/container/Searchbar";
import { HomeProducts } from "../components/container/HomeProducts";

import ProductContextProvider from "../context/ProductContext";
import { ContainerLayoutColumn } from "../components/styled/CommonUtils";

// import CartContextProvider from "../context/CartContext";

const HomePage = () => {
  return (
    <ContainerLayoutColumn>
      <ProductContextProvider>
        <Searchbar />
        <HomeProducts />
      </ProductContextProvider>
    </ContainerLayoutColumn>
  );
};

export default HomePage;
