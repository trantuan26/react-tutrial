import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink} from 'mdbreact';
import mainLogo from '../../img/logo.gif';
import {getFromStorage} from '../../utils/storage';
import Config from "../../utils/config";


class HomeMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            useraccount: {
                id: '',
                token: '',
                activeType: '',
            },
            user: {
                fullName: '',
                phone: '',
                avatarLink: '',
            },
            isLogin: false,
        };
        this.handleTogglerClick = this.handleTogglerClick.bind(this);
        this.handleNavbarClick = this.handleNavbarClick.bind(this);
    }

    componentWillMount() {
        let a = getFromStorage(Config.USER);
        if (a) {
            this.setState({useraccount: a});
        }
        let b = getFromStorage(Config.USERINFO);
        if (b) {
            this.setState({user: b});
        }
    }

    componentWillReceiveProps() {
        console.log('navbar componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('navbar shouldComponentUpdate');
        return true;
    }

    componentDidMount() {
        let {user, isLogin} = this.state;
        if (user.phone !== '' && !isLogin) {
            this.setState({isLogin: true});
        } else if (user.phone === '' && isLogin) {
            this.setState({isLogin: false});
        }
        console.log('navbar componentDidMount');
    }

    handleTogglerClick() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleNavbarClick() {
        this.setState({
            collapsed: false
        });
    }

    render() {
        console.log('navbar render');
        return (
            <div>
                <Navbar className="nav-main" expand="md" fixed="top" scrolling>
                    <NavbarBrand href="/">
                        <img src={mainLogo} alt="or-trans" height="32"/> OR - TRANS
                    </NavbarBrand>
                    <NavbarToggler onClick={this.handleTogglerClick}/>
                    <Collapse isOpen={this.state.collapsed} navbar>
                        <NavbarNav right onClick={this.handleNavbarClick}>
                            <NavItem>
                                <NavLink to="/">Home</NavLink>
                            </NavItem>
                            {/*<NavItem>*/}
                                {/*<NavLink to="/css">CSS</NavLink>*/}
                            {/*</NavItem>*/}
                            {/*<NavItem>*/}
                                {/*<NavLink to="/components">Components</NavLink>*/}
                            {/*</NavItem>*/}
                            {/*<NavItem>*/}
                                {/*<NavLink to="/advanced">Advanced</NavLink>*/}
                            {/*</NavItem>*/}
                            {
                                !this.state.isLogin && <NavItem>
                                    <NavLink to="/signin">Sign In</NavLink>
                                </NavItem>
                            }
                            {
                                !this.state.isLogin && <NavItem>
                                    <NavLink to="/signup">Sign Up</NavLink>
                                </NavItem>
                            }
                            {
                                this.state.isLogin && <NavItem>
                                    <NavLink to="/contact">{this.state.user.fullName}</NavLink>
                                </NavItem>
                            }
                        </NavbarNav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default HomeMenu;
