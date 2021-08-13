import { FC } from "react";
import * as React from "react";
import {useAppSelector} from "../app/hooks";
import {selectTheme} from "../features/theme/themeSlice";
import styled from "styled-components";

export interface IconProps {
    name: string;
    children?: React.ReactNode | React.ReactChild;
}

export const StyledIcon = styled.div`
  display: block;
`;

const Icon: FC<IconProps> = ({name}) => {
    const theme = useAppSelector(selectTheme)
    return <ion-icon name={theme === 'light' ? name + '-outline' : name} />
}

export default Icon