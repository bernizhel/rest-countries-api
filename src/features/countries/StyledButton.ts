import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${props => props.theme.elementBackground};
  color: ${props => props.theme.text};
  box-shadow: 0 5px 5px ${props => props.theme.border};
  border-radius: 5px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
`;

export default StyledButton;