import {Component, ErrorInfo, FC, ReactChild, ReactNode} from 'react'
import styled from "styled-components";

interface IErrorBoundaryProps {
    children?: ReactChild | ReactNode;
}

type IError = Error | undefined;

interface IErrorComponentProps {
    children?: ReactChild | ReactNode;
    error: IError;
    info: ErrorInfo;
}

interface IErrorBoundaryState {
    error?: IError;
    errorInfo?: ErrorInfo;
}

interface IFormattedInfoProps {
    info: string;
}

const StyledComponent = styled.span`
  color: indianred;
`;

const FormattedInfo: FC<IFormattedInfoProps> = ({info}) => {
    const matches = info.matchAll(/(at )(\w+)( \(.+\))/g);
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
    margin: 25px 0;
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

  details[open] summary:before {
    content: '-';
  }
`;

function toTitleCase(str: string): string {
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

const Error: FC<IErrorComponentProps> = ({error, info}) => {
    return (
        <StyledError>
            <h2>Something went wrong while fetching data about<br />
                {toTitleCase(decodeURI(window.location.pathname).slice(1))}
            </h2>
            <p>{error?.name} - {error?.message}</p>
            <details>
                <summary>Details</summary>
                <FormattedInfo info={info.componentStack}/>
            </details>
        </StyledError>
    )
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = {};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({error, errorInfo});
    }

    render() {
        if (this.state.errorInfo) {
            return <Error error={this.state.error} info={this.state.errorInfo}/>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;