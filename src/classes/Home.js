import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { } from 'semantic-ui-react';
import api from '../common/api';

// register dataaction - url
api.register('EVENTS', {
  url: 'http://rest.learncode.academy/api/learncode/friends'
});

class Home extends Component {
  componentDidMount() {
    const { loadData } = this.props;
    loadData();
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>

      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (...args) => {
      dispatch(api.fetch("EVENTS", {}, (state, action) => {
        return Object.assign({}, {
          ...state,
          events: action.payload
        });
        // console.log(response);
      }));
      // console.log(args);
    }
  }
}

Home = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));

export default Home;