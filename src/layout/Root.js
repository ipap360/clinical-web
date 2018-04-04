import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Content from './Content';

import {Container, Divider} from 'semantic-ui-react';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Container>
        <Header />
        {/* <Divider section /> */}
        <Content />
        {/* <Divider section /> */}
        <Footer />
      </Container>
    </Router>
  </Provider>
);

export default Root;
