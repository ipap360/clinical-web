import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { } from 'semantic-ui-react';

class EditEvent extends Component {
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
      
    }
  }
}

EditEvent = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEvent));

export default EditEvent;