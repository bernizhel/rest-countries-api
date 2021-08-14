import {Component, ErrorInfo} from 'react'
import {IErrorBoundaryProps, IErrorBoundaryState} from "./errorTypes";
import Error from './Error';

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
            return <Error error={this.state.error} stack={this.state.errorInfo.componentStack}/>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;