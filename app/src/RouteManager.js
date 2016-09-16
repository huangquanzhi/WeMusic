import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as routesActionsCreator from './actions/routes';

import HomeContainer from './containers/HomeContainer';

const propTypes = {
  routes: PropTypes.object.isRequired,
  routesActions: PropTypes.object.isRequired,
};

class RouteManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { routes } = this.props;

    let page;
    switch (routes.pageType) {
      case 'home':
        page = <HomeContainer/>;
        break;
      default:
        page = (
          <div>
            <h2>Error: {routes.pageType}</h2>
          </div>
        );
        break;
    }
    return (
      <div>
        <div className="page-container">
          {page}
        </div>
      </div>
    )
  }
}

RouteManager.propTypes = propTypes;

const mapStateToProps = state => ({
  routes: state.routes
});

const mapDispatchToProps = dispatch => ({
  routesActions: bindActionCreators(routesActionsCreator, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouteManager);