import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
// import { IntlProvider } from 'react-intl';

import Header from './Header';
import Footer from './Footer';
import Content from './Content';

import { Container, Divider } from 'semantic-ui-react';

const Root = ({ store }) => {
    // const {locale, messages} = store.i18n ||z;
    return (
        // <IntlProvider locale='en' messages={{}}>
        <Provider store={store}>
            <Router>
                <div>
                    {/* <Container> */}
                    <Header />
                    {/* <Divider section /> */}
                    <Content />
                    {/* <Divider section /> */}
                    <Footer />
                </div>
                {/* </Container> */}
            </Router>
        </Provider>
        // </IntlProvider>
    );
}

export default Root;
