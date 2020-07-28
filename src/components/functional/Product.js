import React from "react";
import styles from "../../styles/products.module.css";

import { DefaultCard } from "../styled/cards";
import { DefaultContainerLayoutGrid, ContainerLayoutRow } from "../styled/CommonUtils";
import { DefaultButton } from "../styled/Buttons";

export const Product = ({
  product,
  showRemoveBtn,
  onAddToCart,
  onRemoveFromCart,
}) => {
  const getAvaragePrice = (offers) => {
    let totalPrice = 0;
    totalPrice = offers.reduce((acc, current) => {
      return acc + current.price;
    }, 0);

    return totalPrice / offers.length;
  };

  const getLowestPrice = (offers) => {
    let minPrice = offers[0].price;
    offers.map(offer => {
      if (offer.price < minPrice) {
        minPrice = offer.price;
      }
    })

    return minPrice;
  };

  const getRatingOutOfFive = (rating) => {
    return rating / 10;
  };

  const getProdImageBySize = (images, type) => {
    const imageObj = images.filter((img) => img.key === type);
    return imageObj[0].url;
  }

  return (
    <div className={styles.productCard}>
      <DefaultCard className={styles.productContents}>
        <DefaultContainerLayoutGrid>
          <ContainerLayoutRow>
            <div className={styles.productImageLabel}>
              <img src={getProdImageBySize(product.images, 'XS')} alt="p"/>
            </div>
            <div style={{ textAlign: "left" }}>
              <div className={styles.producProps}>{product.title}</div>
              <div className={styles.producEan}> EAN: {product.ean}</div>
            </div>
          </ContainerLayoutRow>
          <div className={styles.producProps}>
            &euro; {getAvaragePrice(product.offerData.offers)}
          </div>
          <div className={styles.producProps}>&euro;{getLowestPrice(product.offerData.offers)}</div>
          <div className={styles.producProps}>
            {" "}
            {getRatingOutOfFive(product.rating)}/5{" "}
          </div>
          <div className={styles.producProps}>0</div>
          <div>
            {!showRemoveBtn && (
              <DefaultButton
                className={styles.productActionBtn}
                onClick={(e) => onAddToCart(product)}
              >
                Add to cart
              </DefaultButton>
            )}
            {showRemoveBtn && (
              <DefaultButton
                className={styles.productActionBtn}
                onClick={(e) => onRemoveFromCart(product)}
              >
                Remove
              </DefaultButton>
            )}
          </div>
        </DefaultContainerLayoutGrid>
      </DefaultCard>
    </div>
  );
};
