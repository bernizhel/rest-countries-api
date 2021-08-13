import styled, {keyframes} from "styled-components";

const ldsSpinnerAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

function generateStyles(): string {
    let styles = '';
    for (let i = 0; i <= 11; i++) {
        styles += `
            &:nth-child(${i + 1}) {
              transform: rotate(${i * 30}deg);
              animation-delay: ${((-11 + i) / 10).toFixed(1)}s;
            }
        `;
    }
    return styles;
}

const StyledLoader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  justify-self: center;
  align-self: center;

  & div {
    transform-origin: 40px 40px;
    animation: ${ldsSpinnerAnimation} 1.2s linear infinite;

    &:after {
      content: " ";
      display: block;
      position: absolute;
      top: 3px;
      left: 37px;
      width: 6px;
      height: 18px;
      border-radius: 20%;
      background: ${props => props.theme.text};
    }
    
    ${generateStyles()}
  }
`;

const Loader = () => {
    return (
        <StyledLoader>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
        </StyledLoader>
    );
};

export default Loader;