import React, {Component} from 'react';
import {getFromStorage, removeStorage} from '../../utils/storage';
import {removeSession} from '../../utils/sessionStorage';
import Config from '../../utils/config';
import {
    Redirect
} from "react-router-dom";
import {Container, Row, Col, Button} from 'mdbreact';
import './Contact.css';

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
            isLogout: false,
        }

        this.submitLogout = this.submitLogout.bind(this);
    }

    submitLogout() {
        removeStorage(Config.USER);
        removeStorage(Config.USERINFO);
        removeSession(Config.PHONE);
        window.location.reload();
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
    componentDidMount() {
        if (this.state.user.phone ==="") {
            setTimeout(function () {
                this.setState({isLogout: true})
            }.bind(this), 1000);
        }
    }


    render() {
        return (

            <div style={{marginTop: "4em"}}>
                <Container className="contact-container">
                    {this.state.isLogout ? (<Redirect to="/signin"/>) : ""}
                    <Row>
                        <Col md="10" className="mx-auto mt-4">
                            <h2>Phone: {this.state.user.phone}</h2>
                        </Col>
                    </Row>

                    <Row className="d-flex">
                        <Col md="10" className="mx-auto mt-4">
                            <p> Bấm vào <a href="/update-user-acount" className="btn-verify"> đây </a> Cập nhật biểu mẫu
                                để chính thức trở thành thành viên OR-TRANS </p>
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
            </div>

        );
    }
}

export default Contact;
