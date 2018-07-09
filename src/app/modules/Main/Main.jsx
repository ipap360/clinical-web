import React from 'react';

import { PageWrapper, MainWrapper } from '../../../components';

import Login from '../Login';
import TopBar from '../TopBar';
import SideBar from '../SideBar';

export default (props) => {

    const { children, isSignedIn } = props;

    if (!isSignedIn) return <Login />;

    return (
        <PageWrapper>
            <TopBar />
            <MainWrapper>
                <SideBar />
                <main>
                    {children}
                </main>
            </MainWrapper>
        </PageWrapper>
    );
}