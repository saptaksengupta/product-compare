import React, { useState, useContext } from "react";
import styles from "../../styles/homepage.module.css";

import { StyledInput, StyledIputContainer } from "../styled/input";
import { DefaultButton } from "../styled/Buttons";

import { apiService } from "../../shared/ApiService";
import { ProductContext } from "../../context/ProductContext";
import { PRODUCT_ACTIONS } from "../../reducers/ProductReducer";

const Searchbar = () => {

  const [searchQ, setSearchQ] = useState('');
  const {dispatch} = useContext(ProductContext);
  const onSearchQKeyUp = (e) => {
    const qValue = e.target.value.trim();
    setSearchQ(qValue);
  }

  const onSearchClicked = () => {
    if (!searchQ) {
      return false;
    }
    apiService.getProducts({query: searchQ}).then((resp) => {
          dispatch({type: PRODUCT_ACTIONS.FLUSH_PRODUCTS, payload: []});
          if (resp.length > 0) {
            resp.map(product => dispatch({type: PRODUCT_ACTIONS.SET_PRODUCT, payload: {product}}));
          }
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <div className={styles.searchbarHeading}>Search for a product</div>
      <div className={styles.searchForm}>
        <StyledIputContainer>
          <StyledInput onKeyUp={(e) => onSearchQKeyUp(e)} placeholder="Books" />
        </StyledIputContainer>
        <DefaultButton  className={styles.searchBtn} primary onClick={(e) => {onSearchClicked(e)}}>Search</DefaultButton>
      </div>
    </div>
  );
};

export default Searchbar;
