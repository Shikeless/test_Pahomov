import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getIsAuthorized } from "../../modules/Auth";
import { verRequest } from "../../modules/Auth/actions";

const MapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state)
});

const MapDispatchToProps = {
  verRequest
};

class PrivateRoute extends Component {
  componentDidMount() {
    this.props.verRequest();
  }

  renderRoute = routeProps => {
    const { isAuthorized, component: RouteComponent } = this.props;
    return isAuthorized ? (
      <RouteComponent {...routeProps} />
    ) : (
      <Redirect to="/login" />
    );
  };

  render() {
    const { component, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(PrivateRoute);
