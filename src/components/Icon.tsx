import {Component} from "react";
import {connect} from 'react-redux';
import styled from "styled-components";
import {RootState} from "../app/store";

export const StyledIcon = styled.div`
  display: block;
`;

interface IIconProps {
    theme: string;
    name: string;
    hasOutline: boolean;
    children?: React.ReactNode | React.ReactChild;
}

class Icon extends Component<IIconProps> {
    shouldComponentUpdate(nextProps: Readonly<IIconProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        return this.props.hasOutline;
    }
    render() {
        return <ion-icon name={this.props.theme === 'light' ? this.props.name + '-outline' : this.props.name}/>;
    }
}

const mapStateToProps = (state: RootState) => ({
    theme: state.theme.mode,
});

export default connect(mapStateToProps)(Icon);