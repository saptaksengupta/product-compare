import React, { useContext } from "react";
import { ContainerLayoutRow } from "../styled/CommonUtils";
import { useHistory } from "react-router-dom";
import { CartIcon, NotificationIcon, MenuIcon } from "../styled/Icons";
import styled from "styled-components";

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin: 0 0.5em;
  }
`;

const Navbar = () => {
  const history = useHistory();
  const goToCartPage = () => {
    history.push(`/cart`);
  }

  return (
      <ContainerLayoutRow alignment="end">
          <StyledActions onClick={e => goToCartPage()}>
            <CartIcon height="16" width="16" />
            <NotificationIcon height="16" width="16" />
            <MenuIcon height="16" width="16" />
          </StyledActions>
      </ContainerLayoutRow>
  );
};


export default Navbar;