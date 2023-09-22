import React from "react";
import { Link as CustomLink } from "react-router-dom";
import styled from "styled-components";

const Link = ({ children, ...props }) => {
  return <StyleLink {...props}>{children}</StyleLink>;
};

export const StyleLink = styled(CustomLink)`
  color: inherit;
  text-decoration: none;
`;

export default Link;
