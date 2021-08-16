import {FC, ReactChild, ReactNode} from 'react';
import styled from "styled-components";
import {fontOptions as fo, mediaSizes as ms} from "../../styles/vars";
import {Link} from 'react-router-dom';
import {fetchCountries, setDetailedCountry} from "./countriesSlice";
import {useAppDispatch} from "../../app/hooks";

const StyledNeighbor = styled.div`
  display: inline-block;
  background-color: ${props => props.theme.elementBackground};
  border: 2px solid ${props => props.theme.border};
  font-weight: ${fo.LIGHT_WEIGHT};
  border-radius: 5px;
  padding: 5px 15px;
  margin: 1px 3px;
  vertical-align: middle;
  a {
    text-decoration: none;
    color: ${props => props.theme.text};
    font-weight: ${fo.LIGHT_WEIGHT};
  }
  @media ${ms.MOBILE} {
    margin: 3px 5px 3px 0;
  }
`;

interface INeighborProps {
    children?: ReactNode | ReactChild;
    name: string;
}

const Neighbor: FC<INeighborProps> = ({name}) => {
    const dispatch = useAppDispatch();
    return (
        <StyledNeighbor>
            <Link to={'/' + name.toLowerCase()} onClick={() => {
                dispatch(setDetailedCountry(name));
                dispatch(fetchCountries());
            }}>
                {name}
            </Link>
        </StyledNeighbor>
    );
};

export default Neighbor;