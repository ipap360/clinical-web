import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import api from '../common/api';
import { Breadcrumb, Label, Divider, Image } from 'semantic-ui-react';

class CalendarBody extends Component {
  componentDidMount() {
    // const { loadData } = this.props;
    // loadData();
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div />
    );
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    events: state.events || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (...args) => {
      dispatch(api.fetch('EVENTS', args));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CalendarBody));