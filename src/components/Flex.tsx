import React, {FC} from 'react';
import styled from "styled-components";

interface FlexProps {
    align?: string;
    justify?: string;
    display?: string;
    direction?: string;
    wrap?: string;
    w?: string;
    maxw?: string;
    minw?: string;
    h?: string;
    maxh?: string;
    minh?: string;
    type?: 'div' | 'nav' | 'section' | 'main' | 'header';
    children?: React.ReactChild | React.ReactNode;
}

const StyledFlex = styled.div<FlexProps>`
  display: ${props => props.display || 'flex'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'flex-start'};
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