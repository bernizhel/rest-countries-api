import styled from "styled-components";
import {FC} from "react";
import {IErrorComponentProps, IFormattedInfoProps} from "./errorTypes";
import Flex from "../components/Flex";

const StyledComponent = styled.span`
  color: indianred;
`;

const FormattedStack: FC<IFormattedInfoProps> = ({stack}) => {
    const matches = stack.matchAll(/(at )(\w+)( \(.+\))/g);
    if (matches) {
        return (
            <ol>
                {[...matches].map(match => (
                    <li key={match.index}>{match[1]}<StyledComponent>{match[2]}</StyledComponent>{match[3]}</li>
                ))}
            </ol>
        );
    } else {
        return <pre>[[NO INFO]]</pre>;
    }
}

const StyledError = styled.div`
  text-align: center;
  padding: 2rem;

  h2, p {
    margin-bottom: 25px;
  }

  details[open] summary:before {
    content: '-';
  }

  details {
    word-break: break-all;

    & summary {
      cursor: pointer;
      list-style: none;

      &::-webkit-details-marker {
        display: none;
      }

      &::before {
        content: '+';
        display: inline-block;
        border: 1px solid ${props => props.theme.text};
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }
    }

    & ol {
      list-style: none;
      counter-reset: stack;

      & li {
        counter-increment: stack;
        margin-top: 15px;

        &::before {
          content: counter(stack) ')';
          margin-right: 10px;
          font-size: 0.8125rem;
          color: ${props => props.theme.text};
        }
      }
    }
  }
`;

const Error: FC<IErrorComponentProps> = ({error, stack}) => {
    return (
        <Flex jc={'center'} w={'100%'}>
            <StyledError>
                <h2>Something went wrong while getting data.</h2>
                <p>{error?.name} - {error?.message}</p>
                <details>
                    <summary>Details</summary>
                    <FormattedStack stack={stack}/>
                </details>
            </StyledError>
        </Flex>
    )
}

export default Error