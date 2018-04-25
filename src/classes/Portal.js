import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Visibility, Sidebar, Segment, Menu, Grid, Button, Header, Container, Divider, List, Image, Icon } from 'semantic-ui-react';
import TopMenu from './portal/TopMenu';
import FixedMenu from './portal/FixedMenu';
import PortalMenu from './portal/PortalMenu';
import SessionMenu from './portal/SessionMenu';
import './portal/portal.css';
import portalPhoto from '../resources/gloves.jpg';

class Portal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasScrolledEnough: false,
            sidebarOpened: false
        };

    }
    componentDidMount() {
        // const { setScrollPos } = this.props;
        // $(window).on("scroll.portal", (e) => {
        //     setScrollPos(0);
        // });
    }

    componentWillUnmount() {
        // $(window).off("scroll.portal");
        // setScrollPos(0);
    }

    hasScrolledEnough() {
        this.setState({ ...this.state, hasScrolledEnough: true });
    }

    hasNotScrolledEnough() {
        this.setState({ ...this.state, hasScrolledEnough: false });
    }

    handlePusherClick() {

    }

    handleBurgerClick() {

    }

    render() {

        // read scroll position
        const isHidden = true;
        const { hasScrolledEnough, sidebarOpened } = this.state;

        return (
            <Fragment>
                <FixedMenu isVisible={hasScrolledEnough && !sidebarOpened} />
                <Sidebar.Pushable>
                    <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
                        <PortalMenu />
                        <SessionMenu />
                    </Sidebar>
                    <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick} style={{ minHeight: '100vh' }}>
                        <Visibility once={false} onBottomPassed={this.hasScrolledEnough} onBottomPassedReverse={this.hasNotScrolledEnough}>
                            <Segment 
                                inverted 
                                textAlign='center' 
                                className='main-portal-content' 
                                // vertical style={{backgroundImage: `url(${portalPhoto})`}}
                            >
                                <TopMenu burgerHandler={this.handleBurgerClick} />
                                <Container>
                                    <Header as='h1' content='A great moto' inverted />
                                    <Header as='h2' content='Enhance the moto with a line' inverted />
                                    <Button primary size='huge'>
                                        Get Started
                                        <Icon name='right arrow' />
                                    </Button>
                                </Container>
                            </Segment>
                            <Segment className='stripe' vertical>
                                <Grid container stackable verticalAlign='middle'>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <Header as='h3' style={{ fontSize: '2em' }}>We Help Companies and Companions</Header>
                                            <p style={{ fontSize: '1.33em' }}>
                                                We can give your company superpowers to do things that they never thought possible. Let us delight
                                                your customers and empower your needs... through pure data analytics.
            </p>
                                            <Header as='h3' style={{ fontSize: '2em' }}>We Make Bananas That Can Dance</Header>
                                            <p style={{ fontSize: '1.33em' }}>
                                                Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.
            </p>
                                        </Grid.Column>
                                        <Grid.Column floated='right' width={6}>
                                            <Image
                                                bordered
                                                rounded
                                                size='large'
                                                src='/assets/images/wireframe/white-image.png'
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column textAlign='center'>
                                            <Button size='huge'>Check Them Out</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>

                            <Segment style={{ padding: '0em' }} vertical>
                                <Grid celled='internally' columns='equal' stackable>
                                    <Grid.Row textAlign='center'>
                                        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                            <Header as='h3' style={{ fontSize: '2em' }}>"What a Company"</Header>
                                            <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
                                        </Grid.Column>
                                        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                                            <Header as='h3' style={{ fontSize: '2em' }}>"I shouldn't have gone with their competitor."</Header>
                                            <p style={{ fontSize: '1.33em' }}>
                                                <Image avatar src='/assets/images/avatar/large/nan.jpg' />
                                                <b>Nan</b> Chief Fun Officer Acme Toys
            </p>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>

                            <Segment style={{ padding: '8em 0em' }} vertical>
                                <Container text>
                                    <Header as='h3' style={{ fontSize: '2em' }}>Breaking The Grid, Grabs Your Attention</Header>
                                    <p style={{ fontSize: '1.33em' }}>
                                        Instead of focusing on content creation and hard work, we have learned how to master the art of doing
                                        nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic
                                        and worth your attention.
        </p>
                                    <Button as='a' size='large'>Read More</Button>

                                    <Divider
                                        as='h4'
                                        className='header'
                                        horizontal
                                        style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                                    >
                                        <a href='#'>Case Studies</a>
                                    </Divider>

                                    <Header as='h3' style={{ fontSize: '2em' }}>Did We Tell You About Our Bananas?</Header>
                                    <p style={{ fontSize: '1.33em' }}>
                                        Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but it's really
                                        true.
                                        It took years of gene splicing and combinatory DNA research, but our bananas can really dance.
        </p>
                                    <Button as='a' size='large'>I'm Still Quite Interested</Button>
                                </Container>
                            </Segment>

                            <Segment inverted vertical style={{ padding: '5em 0em' }}>
                                <Container>
                                    <Grid divided inverted stackable>
                                        <Grid.Row>
                                            <Grid.Column width={3}>
                                                <Header inverted as='h4' content='About' />
                                                <List link inverted>
                                                    <List.Item as='Link' to='/'>Sitemap</List.Item>
                                                    <List.Item as='Link' to='/'>Blog</List.Item>
                                                    <List.Item as='Link' to='/contact'>Contact Us</List.Item>
                                                </List>
                                            </Grid.Column>
                                            <Grid.Column width={3}>
                                                <Header inverted as='h4' content='Services' />
                                                <List link inverted>
                                                    <List.Item as='Link' to='/faq'>FAQ</List.Item>
                                                    <List.Item as='Link' to='/'>DNA FAQ</List.Item>
                                                    <List.Item as='Link' to='/'>How To Access</List.Item>
                                                    <List.Item as='Link' to='/'>Favorite X-Men</List.Item>
                                                </List>
                                            </Grid.Column>
                                            <Grid.Column width={7}>
                                                <Header as='h4' inverted>Footer Header</Header>
                                                <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Container>
                            </Segment>
                        </Visibility>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Fragment>
        );
    }
}

const mapStateToProps = (state, { match }) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // setScrollPos: (position) => {
        //     dispatch({
        //         "type": 'PAGESCROLL',
        //         "reducer": (state, action) => {
        //             console.log(state, action);
        //             return state;
        //         }
        //     });
        // },
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

Portal = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Portal));

export default Portal;

export const portalReducer = (state = {}, action) => {

    // TODO

    return state;
}