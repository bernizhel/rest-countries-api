import React, {useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {decrement, increment, incrementAsync, incrementByAmount, incrementIfOdd, selectCount,} from './counterSlice';
import styled from "styled-components";

interface TextProps {
    counter: number
    children?: React.ReactChild | React.ReactNode
}

const StyledText = styled.div<TextProps>`
  color: ${props => 'indianred' || props.theme.text};
`

const Text: React.FC<TextProps> = (props) => {
    return <StyledText {...props}>{props.counter % 2 ? 'ODD' : 'EVEN'}</StyledText>
}

const StyledButton = styled.button`
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.elementBackground};
`;

const StyledInput = styled.input.attrs(props => ({type: props.type}))`
  color: ${props => props.theme.input ?? props.theme.text};
  background-color: ${props => props.theme.background};
`;


export function Counter() {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    const incrementValue = Number(incrementAmount) || 0;

    return (
        <div>
            <Text counter={count}/>
            <div>
                <StyledButton
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </StyledButton>
                <span>{count}</span>
                <StyledButton
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    +
                </StyledButton>
            </div>
            <div>
                <StyledInput
                    type='text'
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <StyledButton
                    onClick={() => dispatch(incrementByAmount(incrementValue))}
                >
                    Add Amount
                </StyledButton>
                <StyledButton
                    onClick={() => dispatch(incrementAsync(incrementValue))}
                >
                    Add Async
                </StyledButton>
                <StyledButton
                    onClick={() => dispatch(incrementIfOdd(incrementValue))}
                >
                    Add If Odd
                </StyledButton>
            </div>
        </div>
    );
}
