import React from 'react';
import IntlTelInput from 'react-intl-tel-input';
import libphonenumber from '../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import '../../../node_modules/react-intl-tel-input/dist/main.css';
import './Contact.css';
import {Button, Card, CardBody, CardTitle, Row, Col, Container} from 'mdbreact';
import mainLogo from '../../img/logo.gif';
import ReCAPTCHA from 'react-grecaptcha'


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
    }

    componentWillMount() {
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
        console.log('Done!!!!');
    };

// specifying verify callback function
    verifyCallback(token) {
        console.log(token);
        var url = 'https://www.google.com/recaptcha/api/siteverify';
        var data = {
            secret: '6LfPfVwUAAAAAFs896v-B4rzTILIYqhtSy_wjfbb',
            response: token+"hhhhhhhh",
            remoteip: 'localhost:3000'};

        fetch(url, {
            method: 'POST', // or 'PUT'
            mode: 'no-cors',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res.status))
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

    };

    render() {
        return (
            <Container>
                <Row className="d-flex align-items-center" style={{minHeight: '30rem'}}>
                    <Col md="7" lg="7">
                    </Col>
                    <Col md="5" lg="5" className="ml-lg-0 align-top">
                        <div className="text-center text-md-right signin-padding">
                            <Card style={{maxWidth: '340px'}}>
                                <CardBody className="text-center">
                                    <img className="signin-padding" src={mainLogo} alt="sign in" height="96"/>
                                    <div className='signin-line'>

                                    </div>
                                    <CardTitle>Sign In</CardTitle>
                                    <div className="text-left"
                                         style={{border: '1px solid #D0D0D0', borderRadius: '5px'}}>
                                        <IntlTelInput
                                            onPhoneNumberChange={this.onChangeHandler}
                                            onPhoneNumberBlur={this.onChangeHandler}
                                            preferredCountries={['vn']}
                                            onSelectFlag={null}
                                            nationalMode={false}
                                            separateDialCode={true}
                                            fieldId={'telphone'}
                                            style={{borderBottom: '0px'}}
                                            utilsScript={libphonenumber}/>
                                    </div>
                                    <ReCAPTCHA
                                        sitekey="6LfPfVwUAAAAAODFgOV5Qch0OV7lIBky41Tk1rp7"
                                        callback={this.verifyCallback}
                                        expiredCallback={this.expiredCallback}
                                        locale="en"
                                        className="signin-captcha"
                                    />
                                    <Button className="signin-padding btn-verify" id="mySubmit"
                                            disabled={this.state.isDisabled}
                                    >send code verify</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>

        );
    }
}


export default SimpleSelect;
