import React from 'react';
import {
    Redirect
} from "react-router-dom";
import IntlTelInput from 'react-intl-tel-input';
import libphonenumber from '../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import '../../../node_modules/react-intl-tel-input/dist/main.css';
import './SingIn.css';
import {Button, Card, CardBody, CardTitle, Row, Col, Container} from 'mdbreact';
import {ToastContainer, toast} from 'react-toastify';
import mainLogo from '../../img/logo.gif';
import ReCAPTCHA from 'react-grecaptcha';
import Axios from 'axios';
import Api from "../../utils/api";
import {setInSession} from "../../utils/sessionStorage";
import FooterMain from '../Footer/Footer';
import NavbarCus from '../Navbar/Navbar';

class SimpleSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            countryData: '',
            phone: '',
            isDisabled: true,
            isRegister: false,
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.expiredCallback = this.expiredCallback.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }


    onSubmit() {
        let {
            phone,
            isDisabled
        } = this.state;


        //lưu số điện thoại vào session
        setInSession("phone", phone);
        if (phone.length < 5 || isDisabled === true) {
            toast.error('phone number not exists. If you have not account, click above to Sign up');
        } else {
            console.log(phone);
            Axios.post(Api.SENDSMS, {
                phone: parseInt(phone, 10),
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log(response.data);
                        toast.success('Hệ thống đã gửi SMS, vui lòng kiểm tra tin nhắn');
                        setTimeout(function () {
                            this.setState({isRegister: true});
                        }.bind(this), 2000);
                    } else {
                        toast.error('phone number not exists. If you have not account, click above to Sign up');
                    }
                })
                .catch(function (error) {
                    toast.warn('Please check value typing');
                });
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        return false;
    }


    onChangeHandler(status, value, countryData, number, id) {
        if (status) {
            this.setState({phone: value, countryData: countryData});
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
        Axios.post('http://localhost/api/captcha', {
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
            <div>
                <NavbarCus/>
                <div className="main-background">
                    {this.state.isRegister ? (<Redirect to="/verify"/>) : ""}
                    <Container  style={{marginTop:"4em"}}>
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
                                                    disabled={this.state.isDisabled} onClick={this.onSubmit}
                                            >send code verify</Button>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                        <ToastContainer
                            hideProgressBar={true}
                            newestOnTop={true}
                            autoClose={5000}
                        />
                    </Container>
                </div>
                <FooterMain/>
            </div>
        );
    }
}


export default SimpleSelect;
