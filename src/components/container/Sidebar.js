import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../../styles/sidebar.module.css";
import { styleConfig } from "../styled/config";
import styled from "styled-components";

import {
  ContainerLayoutColumn,
  ContainerLayoutRow,
} from "../styled/CommonUtils";
import { HamburgerIcon, TachometerIcon, Boxheart } from "../styled/Icons";

const SidebarContainer = styled(ContainerLayoutColumn)`
  border-right: 1px solid;
  border-color: ${styleConfig.defaultBirderColor};
  min-height: 100%;
  justify-content: flex-start;
  padding: 0 0.5em;
`;

const SidebarHeader = styled(ContainerLayoutRow)`
  border-bottom: 1px solid; 
  border-color: ${styleConfig.defaultBirderColor};
`;

const BrandName = styled.div`
  flex: 1;
  padding: 1em;
  cursor: pointer;
`;

const DrawerIcon = styled.div`
  padding: 1em;
`;

const ListSubHeadings = styled.ul`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 160%;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #78909C;
`;

const ListItem = styled.li`
  display: flex;
  padding: 1em;
  align-items:center;
  border-radius: 8px;
  &:hover{
    background: #F6F6FF;
    color: ${styleConfig.primaryColor};
  }
`;
 
const Sidebar = () => {

  const history = useHistory();

  const goToHomePage = ( ) => {
    history.push('/')
  }

  return (
    <SidebarContainer>
      <SidebarHeader>
        <BrandName onClick={(e) => goToHomePage()}>BOLOO</BrandName>
        <DrawerIcon>
          <HamburgerIcon />
        </DrawerIcon>
      </SidebarHeader>
      <ContainerLayoutColumn>
        <ListSubHeadings>My Store</ListSubHeadings>
        <ListItem>
          <div style={{margin: '0 1em'}}>
            <TachometerIcon />
          </div>
          <div className={styles.listItemName}>Item Name</div>
        </ListItem>
        <ListItem>
          <div style={{margin: '0 1em'}}>
            <Boxheart />
          </div>
          <div className={styles.listItemName}>Item Name</div>
        </ListItem>
        <ListItem>
          <div style={{margin: '0 1em'}}>
            <TachometerIcon />
          </div>
          <div className={styles.listItemName}>Item Name</div>
        </ListItem>
        <ListItem>
          <div style={{margin: '0 1em'}}>
            <Boxheart />
          </div>
          <div className={styles.listItemName}>Item Name</div>
        </ListItem>
      </ContainerLayoutColumn>

      {/* duplicating now, as it's a static design */}

      <ContainerLayoutColumn>
        <ListSubHeadings>Research Products</ListSubHeadings>
        <ListItem>
          <div style={{margin: '0 1em'}}>
            <TachometerIcon />
          </div>
          <div className={styles.listItemName}>Item Name</div>
        </ListItem>
        <ListItem>
          <div style={{margin: '0 1em'}}>
            <Boxheart />
          </div>
          <div className={styles.listItemName}>Item Name</div>
        </ListItem>
        <ListItem>
          <div style={{margin: '0 1em'}}>
            <TachometerIcon />
          </div>
          <div className={styles.listItemName}>Item Name</div>
        </ListItem>
        <ListItem>
          <div style={{margin: '0 1em'}}>
            <Boxheart />
          </div>
          <div className={styles.listItemName}>Item Name</div>
        </ListItem>
      </ContainerLayoutColumn>

      <ContainerLayoutColumn>
        <ListSubHeadings>Learn</ListSubHeadings>
        <ListItem>
          <div style={{margin: '0 1em'}}>
            <TachometerIcon />
          </div>
          <div className={styles.listItemName}>Item Name</div>
        </ListItem>
        <ListItem>
          <div style={{margin: '0 1em'}}>
            <Boxheart />
          </div>
          <div className={styles.listItemName}>Item Name</div>
        </ListItem>
      </ContainerLayoutColumn>

      <ContainerLayoutColumn>
        <ListSubHeadings>Settings</ListSubHeadings>
        <ListItem>
          <div style={{margin: '0 1em'}}>
            <TachometerIcon />
          </div>
          <div className={styles.listItemName}>Item Name</div>
        </ListItem>
        <ListItem>
          <div style={{margin: '0 1em'}}>
            <Boxheart />
          </div>
          <div className={styles.listItemName}>Item Name</div>
        </ListItem>
      </ContainerLayoutColumn>
    </SidebarContainer>
  );
};

export default Sidebar;
