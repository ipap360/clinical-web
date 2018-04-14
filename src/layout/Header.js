import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router';

class Header extends Component {
  render() {
    
    console.log(this);
    console.log(document.cookie);
    // const { pathname } = this.props.location;
    // const { params } = this.props.match;

    return (
      <div />
    )
  }
}

Header = withRouter(Header);
export default Header;
