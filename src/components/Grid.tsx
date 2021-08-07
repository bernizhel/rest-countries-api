import React, {FC} from 'react';
import styled from "styled-components";

interface GridProps {
    ai?: string;
    ac?: string;
    ji?: string;
    jc?: string;
    colGap?: string;
    rowGap?: string;
    display?: string;
    w?: string;
    maxw?: string;
    minw?: string;
    h?: string;
    maxh?: string;
    minh?: string;
    tr?: string;
    tc?: string;
    gap?: string;
    type?: 'div' | 'nav' | 'section' | 'main' | 'header';
    children?: React.ReactChild | React.ReactNode;
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