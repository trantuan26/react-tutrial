import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink} from 'mdbreact';
import {BrowserRouter as Router} from 'react-router-dom';

import Routes from './Routes';
import FooterMain from './Componet/Footer/Footer';
import mainLogo from './img/logo.gif';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/mdb.css';
import './App.css';
import {getFromStorage} from './utils/storage';
import Config from "./utils/config";


class App extends Component {
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
        let useraccount =  getFromStorage(Config.USER);
        if (useraccount) {
            this.setState({useraccount});
        }

        let user =  getFromStorage(Config.USERINFO);
        if (user) {
            this.setState({user});
        }
          if (this.state.user.phone.length>5 ) this.setState({isLogin: true});
          console.log(this.state);
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
        return (
            <Router>
                <div className="flyout">
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
                                <NavItem>
                                    <NavLink to="/css">CSS</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/components">Components</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/advanced">Advanced</NavLink>
                                </NavItem>
                                {
                                    !this.state.isLogin &&   <NavItem>
                                        <NavLink to="/signin">Sign In</NavLink>
                                    </NavItem>
                                }
                                {
                                    !this.state.isLogin &&   <NavItem>
                                        <NavLink to="/signup">Sign Up</NavLink>
                                    </NavItem>
                                }
                                {
                                    this.state.isLogin &&   <NavItem>
                                        <NavLink to="/contact">{this.state.user.fullName.toUpperCase()}</NavLink>
                                    </NavItem>
                                }
                            </NavbarNav>
                        </Collapse>
                    </Navbar>
                    <main style={{marginTop: '4rem'}}>
                        <Routes/>
                    </main>
                    <FooterMain/>
                </div>
            </Router>
        );
    }
}

export default App;
