import React, {FC} from 'react';
import styled from "styled-components";

interface FlexProps {
    align?: string;
    justify?: string;
    display?: string;
    direction?: string;
    wrap?: string;
    w?: string | number;
    h?: string | number;
    bgcolor?: string;
    children?: React.ReactChild | React.ReactNode;
}

const StyledFlex = styled.div<FlexProps>`
  display: ${props => props.display || 'flex'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'flex-start'};
  flex-direction: ${props => props.direction || 'row'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  width: ${props => props.w || '100%'};
  height: ${props => props.h || '100%'};
  background-color: ${props => props.bgcolor || props.theme.background};
`;

const Flex: FC<FlexProps> = ({children, ...props}) => {
    return <StyledFlex {...props}>{children}</StyledFlex>;
};

export default Flex;