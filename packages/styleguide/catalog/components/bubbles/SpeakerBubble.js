import css from "styled-components";
import { shape, string } from "prop-types";

import { radius, skin } from "../../../utils";
import bubbleBase from "./bubbleBase";

const SystemBubble = css.div`
  ${bubbleBase};
  background-color: ${({ theme }) =>
    theme.backg ? theme.backg : skin.speakerBackg};
  color: ${({ theme }) => (theme.color ? theme.color : skin.speakerColor)};
  font-family: ${({ theme }) => (theme.font ? theme.font : skin.font)};
  align-self: flex-start;
  text-align: left;
  &:not(:last-child),
  &:not(:first-child) {
    border-radius: ${radius.m} ${radius.h} ${radius.h} ${radius.m};
  }
  &:first-child {
    border-radius: ${radius.h} ${radius.h} ${radius.h} ${radius.m};
  }
  &:last-child {
    border-radius: ${radius.m} ${radius.h} ${radius.h} ${radius.m};
  }
  &:only-child {
    border-radius: ${radius.h};
  }
`;

SystemBubble.propTypes = {
  theme: shape({
    backg: string,
    color: string,
    font: string
  })
};

SystemBubble.defaultProps = {
  theme: {
    backg: skin.speakerBackg,
    color: skin.speakerColor,
    font: skin.font
  }
};

export default SystemBubble;
