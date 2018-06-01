import React from 'react';
import './SingUp.css';
import {Button, Card, CardBody, CardTitle, Row, Col, CardText } from 'mdbreact';
import ReCAPTCHA from 'react-grecaptcha';
import Axios from 'axios';


class SimpleSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            ecountryData: '84',
            phone: '975227856',
            isDisabled: true,
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.expiredCallback = this.expiredCallback.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    // Axios.get('http://localhost/tasks')
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        return false;
    }


    onChangeHandler(status, value, countryData, number, id) {
        if (status) {
            this.setState({phone: number});
        } else {
            this.setState({phone: ''});
        }
        console.log(this.state.phone);
    };

    // specifying your onload callback function
    expiredCallback() {
        this.setState({isDisabled: true});
    };

    //specifying verify callback function
    //secret: '6LfPfVwUAAAAAFs896v-B4rzTILIYqhtSy_wjfbb',
    verifyCallback(token) {
        Axios.post('http://localhost/captcha', {
            token: token
        })
            .then(response => {
                if (response.data !== undefined) {
                    this.setState({isDisabled: !response.data});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <div className="signup-container">
                <Row className="d-flex">
                    <Col md="7" lg="7">
                    </Col>
                    <Col md="5" lg="5" className="ml-lg-0">
                        <Card style={{maxWidth: '400px'}} className="signup-card margin_top_16">
                            <CardBody>
                                <CardTitle>Drive with OR-TRANS</CardTitle>
                                <CardText>Enter your basic information to get started</CardText>
                                <Row className="d-flex">
                                    <select value={this.state.value} onChange={this.handleChange}
                                            className="form-control select-country" id="exampleFormControlSelect1">
                                        <option value="hcm">Ho Chi Minh</option>
                                        <option value="hn">Ha Noi</option>
                                        <option value="dn">Da Nang</option>
                                        <option value="ct">Can Tho</option>
                                    </select>
                                </Row>

                                <Row className="d-flex margin_top_16">
                                    <input type="text"  placeholder="First name"/>
                                </Row>

                                <Row className="d-flex margin_top_16">
                                    <input type="text" placeholder="Last name"/>
                                </Row>

                                <Row className="d-flex margin_top_16">
                                    <input  type="text" value=""
                                            placeholder="Mobile Number"
                                    />
                                </Row>

                                <Row className="d-flex margin_top_16">
                                    <input type="text"  id="inputAddress"
                                           placeholder="1234 Main St"/>
                                </Row>
                                <Row className="d-flex margin_top_16">
                                    <select value={this.state.value} onChange={this.handleChange}
                                            className="form-control select-country" id="exampleFormControlSelect1">
                                        <option value="tr">Type Drive</option>
                                        <option value="mt">moto</option>
                                        <option value="dn">car</option>
                                    </select>
                                </Row>
                                <Row className="d-flex margin_top_16">
                                    <ReCAPTCHA
                                        sitekey="6LfPfVwUAAAAAODFgOV5Qch0OV7lIBky41Tk1rp7"
                                        callback={this.verifyCallback}
                                        expiredCallback={this.expiredCallback}
                                        locale="en"
                                    />
                                </Row>
                                <Row className="d-flex margin_top_16">
                                    <p>By proceeding, I agree that Grab can collect, use and disclose the information provided by me in accordance with the <a href="http://localhost:3000/privacy"> Privacy Policy  </a>which I have read and understand.</p>
                                </Row>
                                <Row className="d-flex margin_top_16">
                                    <Button className="btn-verify" id="mySubmit"
                                            disabled={this.state.isDisabled}
                                    >SIGN UP</Button>
                                </Row>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default SimpleSelect;
