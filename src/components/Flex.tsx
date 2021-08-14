import { FC } from 'react';
import * as React from 'react';
import styled from "styled-components";
import IContainerProps from "./baseContainer";

interface FlexProps extends IContainerProps {
    direction?: string;
    wrap?: string;
}

const StyledFlex = styled.div<FlexProps>`
  display: ${props => props.display || 'flex'};
  justify-content: ${props => props.jc || 'flex-start'};
  align-items: ${props => props.ai|| 'flex-start'};
  align-content: ${props => props.ac|| 'flex-start'};
  flex-direction: ${props => props.direction || 'row'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  width: ${props => props.w || 'auto'};
  height: ${props => props.h || 'auto'};
  max-width: ${props => props.maxw || 'auto'};
  max-height: ${props => props.maxh || 'auto'};
  min-width: ${props => props.minw || 'auto'};
  min-height: ${props => props.minh || 'auto'};
`;

const Flex: FC<FlexProps> = ({type, children, ...props}) => {
    return <StyledFlex as={type} {...props}>{children}</StyledFlex>;
};

export default Flex;