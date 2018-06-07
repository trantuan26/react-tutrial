import React, {Component} from 'react';
import {getFromStorage, removeStorage} from '../../utils/storage';
import { removeSession} from '../../utils/sessionStorage';
import Config from '../../utils/config';
import {
    Redirect
} from "react-router-dom";
import {Container, Row, Col, Button} from 'mdbreact';


class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            isLogout:false,
        }

        this.submitLogout =  this.submitLogout.bind(this);
    }

    submitLogout(){
        removeStorage(Config.USER);
        removeStorage(Config.USERINFO);
        removeSession(Config.PHONE);
        this.setState({isLogout:true})
    }

    componentWillMount() {
        let useraccount = getFromStorage(Config.USER);
        if (useraccount) {
            this.setState({useraccount});
        }

        let user = getFromStorage(Config.USERINFO);
        if (user) {
            this.setState({user});
        }
    }


    render() {
        return (
            <Container className="home-container verify-container">
                {this.state.isLogout ? (<Redirect to="/" />) : ""}
                <Row>
                    <Col md="10" className="mx-auto mt-4">
                        <h2>Phone: {this.state.user.phone}</h2>
                    </Col>
                </Row>

                <Row className="d-flex">
                    <Col md="5" className="mx-auto mt-5">
                        <Button className="btn-verify" id="mySubmit" type="submit"
                                onClick={this.submitLogout}
                        >Logout</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Contact;
