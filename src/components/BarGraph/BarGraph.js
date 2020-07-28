import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import styles from "./bargraph.module.css";

import { DefaultCard } from "../styled/cards";
import { styleConfig } from "../styled/config";
import {
  ContainerLayoutRow,
  ContainerLayoutColumn,
} from "../styled/CommonUtils";

const StyledGraphContainer = styled(DefaultCard)`
  min-height: 520px;
  width: 100%;
  margin-top: 1em;
  border-radius: 24px;
`;

const GraphLabel = styled(ContainerLayoutRow)`
  font-size: 16px;
  line-height: 19px;
  color: #37474f;
  margin-bottom: 1em;
`;

const StyledYaxisContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 456px;
  font-size: 14px;
  line-height: 16px;
  flex: 1;

  color: #b0bec5;
`;

const GraphBody = styled(ContainerLayoutRow)`
  height: 95%;
  width: 100%;
  padding: 1em 0;
  align-items: flex-end;
`;

const StyledXAxisContainer = styled(ContainerLayoutRow)`
  justify-content: space-around;
`;

const GraphData = styled(ContainerLayoutRow)`
  justify-content: space-around;
  margin-bottom: 1em;
  height: 100%;
  align-items: flex-end;
`;

const Bar = styled(ContainerLayoutRow)`
  width: 8px;
  border-radius: 4px;
  height: ${(props) => props.height};
  background: ${(props) => props.background};
`;

const StyledXAxisLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  font-size: 16px;
  background: #b0bec5;
  border-radius: 4px;
`;

const GRAPH_PLOTING_STEP_RANGE = {
  RANGE_TEN: 10,
  RANGE_FIFTY: 50,
  RANGE_HUNDRED: 100,
  RANGE_FIVE_HUNDRED: 500,
  RANGE_THOUSAND: 1000,
};

const BarGraph = ({ label, elements, color }) => {
  const [xAxisLabels, setXAxisLabels] = useState([]);
  const [lowerBound, setLowerBound] = useState(0);
  const [upperBound, setUpperBound] = useState(lowerBound + 50);

  useEffect(() => {
    const lb = getLowerBoundFromInputs(elements);
    setLowerBound(lb);
    const steps = getStepBasedOnElements(lb);
    setUpperBound(lb + 5 * steps);
    setXAxisLabelUnits(lb, steps);
  }, [elements]);

  const getStepBasedOnElements = (lowerBound) => {
    const maxElement = Math.max.apply(null, elements);
    const diff = maxElement - lowerBound;
    if (diff <= GRAPH_PLOTING_STEP_RANGE.RANGE_TEN) {
      return GRAPH_PLOTING_STEP_RANGE.RANGE_TEN / 5;
    } else if (diff <= GRAPH_PLOTING_STEP_RANGE.RANGE_FIFTY) {
      return GRAPH_PLOTING_STEP_RANGE.RANGE_FIFTY / 5;
    } else if (diff <= GRAPH_PLOTING_STEP_RANGE.RANGE_HUNDRED) {
      return GRAPH_PLOTING_STEP_RANGE.RANGE_HUNDRED / 5;
    } else if (diff <= GRAPH_PLOTING_STEP_RANGE.RANGE_FIVE_HUNDRED) {
      return GRAPH_PLOTING_STEP_RANGE.RANGE_FIVE_HUNDRED / 5;
    } else if (diff <= GRAPH_PLOTING_STEP_RANGE.RANGE_THOUSAND) {
      return GRAPH_PLOTING_STEP_RANGE.RANGE_FIFTY / 5;
    }
  };

  const getLowerBoundFromInputs = (elements) => {
    const minElement = Math.min.apply(null, elements);
    return minElement - (minElement % 50);
  };

  let xArray = [];
  const setXAxisLabelUnits = (currentValue, steps) => {
    if (currentValue < upperBound) {
      setXAxisLabelUnits(currentValue + steps, steps);
    }
    xArray.push(currentValue);
    setXAxisLabels(xArray);
  };

  const xAxisJsxFromUnits = () => {
    return xAxisLabels.map((unit) => {
      return <div>&euro;{unit}</div>;
    });
  };

  const getBarsFromElements = () => {
    return elements.map((elem) => {
      return <Bar height={getDynamicHeight(elem)} background={color} />;
    });
  };

  const getDynamicHeight = (unit) => {
    return `${(unit / upperBound) * 100}%`;
  };

  const getYAxisLabelJsxFromElements = () => {
    return elements.map((elem) => {
      return <StyledXAxisLabel>X</StyledXAxisLabel>;
    });
  };

  return (
    <React.Fragment>
      <div className={styles.graphs}>
        <StyledGraphContainer>
          <GraphLabel>{label}</GraphLabel>
          <GraphBody>
            <ContainerLayoutColumn
              style={{ height: "100%", paddingBottom: "1em" }}
            >
              <StyledYaxisContainer style={{ height: "100%" }}>
                {xAxisJsxFromUnits()}
              </StyledYaxisContainer>
              <div style={{ flex: "0.05" }}></div>
            </ContainerLayoutColumn>
            <ContainerLayoutColumn
              style={{ flex: "1", height: "100%", paddingBottom: "0.3em" }}
            >
              <GraphData>{getBarsFromElements()}</GraphData>
              <StyledXAxisContainer>
                {getYAxisLabelJsxFromElements()}
              </StyledXAxisContainer>
            </ContainerLayoutColumn>
          </GraphBody>
        </StyledGraphContainer>
      </div>
    </React.Fragment>
  );
};

BarGraph.propTypes = {
  label: PropTypes.string.isRequired,
  elements: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
};

export default BarGraph;
