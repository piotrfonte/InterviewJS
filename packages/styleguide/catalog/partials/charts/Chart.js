import React from "react";
import css from "styled-components";
import { shape, number } from "prop-types";

import { color, radius, setType, track } from "../../../utils";

const chartBase = `
  height: 3px;
  margin: 0 1px;
  border-radius: ${radius.a};
  position: relative;
`;

const ChartEl = css.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  & > div:not(:last-child),
  & > div:not(:first-child) {
    flex-basis: 100%;
  }
  & > div:first-child,
  & > div:last-child {
    flex-basis: 45px;
  }
  & > div:first-child {
    text-align: left;
  }
  & > div:last-child {
    text-align: right;
  }
`;

const ChartAnswer = css.div`
  ${setType("x")};
  font-weight: bold;
  letter-spacing: ${track.s};
  text-transform: uppercase;
`;

const ChartBody = css.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ChartNo = css.div`
  ${chartBase};
  background-color: ${color.red};
  flex-basis: ${({ value }) => value}%;
  & > span {
    color: ${color.red};
    right: 0;
    text-align: left;
  }
`;

const ChartYes = css.div`
  ${chartBase};
  background-color: ${color.green};
  flex-basis: ${({ value }) => value}%;
  & > span {
    color: ${color.green};
    left: 0;
    text-align: left;
  }
`;

const ChartVal = css.span`
  ${setType("x")};
  font-weight: bold;
  letter-spacing: ${track.s};
  margin-top: 2px;
  position: absolute;
  top: 100%;
`;

const Chart = props => (
  <ChartEl>
    <ChartAnswer>Yes</ChartAnswer>
    <ChartBody>
      <ChartYes value={props.data.positive}>
        <ChartVal>{props.data.positive}%</ChartVal>
      </ChartYes>
      <ChartNo value={props.data.negative}>
        <ChartVal>{props.data.negative}%</ChartVal>
      </ChartNo>
    </ChartBody>
    <ChartAnswer>No</ChartAnswer>
  </ChartEl>
);

Chart.propTypes = {
  data: shape({
    positive: number.isRequired,
    negative: number.isRequired
  }).isRequired
};

Chart.defaultProps = {};

export default Chart;