import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import {AuthorizationStatus} from "../../constants"
import {Operation} from "../../operations";

class PrivateRoute extends PureComponent {

    // componentDidMount() {
    //     const {checkAuth} = this.props;
    //     checkAuth();
    // }

    render() {
        const {path, render, authorizationStatus} = this.props;
        console.log(authorizationStatus);
        return <Route
            path={path}
            exact
            render={() => {
                return (
                    authorizationStatus === AuthorizationStatus.AUTH
                        ? render()
                        : <Redirect to="/login"/>
                );
            }}
        />;
    }
}

const mapStateToProps = state => ({
    authorizationStatus: state.authorizationStatus
});

// const mapDispatchToProps = (dispatch) => ({
//     checkAuth: () => {
//         dispatch(Operation.checkAuth());
//     }
// });

export {PrivateRoute};

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(PrivateRoute);
