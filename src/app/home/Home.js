import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { } from 'semantic-ui-react';

class Home extends Component {
    
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
          Hello Boss
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
    // loadData: (...args) => {
    //   dispatch(api.request("WHOAMI", {}, (state, action) => {
    //     return Object.assign({}, {
    //       ...state,
    //       events: action.payload
    //     });
    //   }));
    // }
  }
}

Home = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));

export default Home;