import {FC} from "react";
import {useAppSelector} from "../app/hooks";
import {selectTheme} from "../features/theme/themeSlice";
import styled from "styled-components";

interface IIconProps {
    name: string;
    hasOutline: boolean;
    children?: React.ReactNode | React.ReactChild;
}

export const StyledIcon = styled.div`
  display: block;
`;

const Icon: FC<IIconProps> = ({name, hasOutline}) => {
    const theme = useAppSelector(selectTheme);
    return <ion-icon name={theme === 'light' && hasOutline ? name + '-outline' : name}/>;
}

export default Icon