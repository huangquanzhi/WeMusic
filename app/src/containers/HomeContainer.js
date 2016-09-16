import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const propTypes = {};


class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <h3>qwe</h3>
        <h1>Hello 2</h1>
      </main>
    )
  }
}

HomeContainer.propTypes = propTypes;


function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);