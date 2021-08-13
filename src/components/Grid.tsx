import { FC } from 'react';
import * as React from 'react';
import styled from "styled-components";
import IContainerProps from "./IBaseContainer";

interface GridProps extends IContainerProps {
    ji?: string;
    colGap?: string;
    rowGap?: string;
    tr?: string;
    tc?: string;
    gap?: string;
}

const StyledGrid = styled.div<GridProps>`
  display: ${props => props.display || 'grid'};
  justify-content: ${props => props.jc || 'start'};
  align-items: ${props => props.ai || 'start'};
  justify-items: ${props => props.ji || 'start'};
  align-content: ${props => props.ac || 'start'};
  width: ${props => props.w || 'auto'};
  height: ${props => props.h || 'auto'};
  max-width: ${props => props.maxw || 'auto'};
  max-height: ${props => props.maxh || 'auto'};
  min-width: ${props => props.minw || 'auto'};
  min-height: ${props => props.minh || 'auto'};
  grid-template-rows: ${props => props.tr || 'auto'};
  grid-template-columns: ${props => props.tc || 'auto'};
  gap: ${props => props.gap || 'none'};
`;

const Grid: FC<GridProps> = ({type, children, ...props}) => {
    return <StyledGrid as={type} {...props}>{children}</StyledGrid>;
};

export default Grid;