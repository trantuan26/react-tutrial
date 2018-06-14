import React from 'react';
import {
    Redirect
} from "react-router-dom";
import IntlTelInput from 'react-intl-tel-input';
import libphonenumber from '../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import '../../../node_modules/react-intl-tel-input/dist/main.css';
import './SingIn.css';
import {Button, Card, CardBody, CardTitle, Row, Col, Container, Collapse} from 'mdbreact';
import {ToastContainer, toast} from 'react-toastify';
import mainLogo from '../../img/logo.gif';
import ReCAPTCHA from 'react-grecaptcha';
import Axios from 'axios';
import Api from "../../utils/api";
import {setInSession} from "../../utils/sessionStorage";
import {getFromStorage, setInStorage} from "../../utils/storage";
import Config from "../../utils/config";


class SimpleSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            countryData: '',
            phone: '',
            password: '',
            isDisabled: true,
            passwordValid: false,
            phoneValid: true,
            isSignin: false,
            isRefesh: false,
            isVerify: false,
        };
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.expiredCallback = this.expiredCallback.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        let b = getFromStorage(Config.USERINFO);
        if (b) {
            this.setState({phone: b.phone});
        }
    }

    componentDidMount() {
        if (this.state.phone!=="") {
            this.setState({isSignin: true});
        }
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    saveInfoUser(token, id) {
        Axios({
            method: 'GET', //you can set what request you want to be
            url: Api.USERACCOUNT + id,
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
            if (response.status === 200) {
                setInStorage(Config.USERINFO, response.data.response);
                toast.success('Vào trang thông tin cá nhân cập nhật hồ sơ');
                window.location.reload();
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    onSubmit() {
        let {
            phone,
            isDisabled,
            password,
        } = this.state;

        //lưu số điện thoại vào session
        setInSession("phone", phone);
        if (phone.length < 5 || isDisabled === true || password.length < 8) {
            if (phone.length < 5) {
                toast.error('nhập số điện thoại không đúng');
            }
            if (password.length < 8) {
                this.setState({passwordValid: true});
            }
        } else {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const config = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    phone: parseInt(phone, 10),
                    password:password,
                }),
            };
            fetch(Api.SIGNIN, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    let{ value, activeType, message, id } = responseJson;
                    console.log(value, activeType, message, id );
                    if (value === 0) {
                        //thông tin đăng nhập
                        setInStorage(Config.USER, {
                            activeType: activeType,
                            token: message,
                            id: id,
                        });
                        //save thong tin nguoi dung
                        this.saveInfoUser(message, id);
                    } else  if (value === 1) {
                        setInSession("phone", parseInt(phone, 10));
                        toast.warn('Tài khoản chưa được xác thực');
                        setTimeout(function () {
                            this.setState({isVerify: true});
                        }.bind(this), 2000);
                    } else  if (value === 2) {
                        toast.warn('Tài khoản không tồn tại, vui lòng đăng ký!');
                        setTimeout(function () {
                            this.setState({isRefesh: true});
                        }.bind(this), 2000);
                    } else {
                        toast.warn('Mật khẩu đúng');
                        setTimeout(function () {
                            this.setState({isRefesh: true});
                        }.bind(this), 2000);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }


    onChangeHandler(status, value, countryData, number, id) {
        if (status) {
            this.setState({phone: value, countryData: countryData});
        } else {
            this.setState({phone: ''});
        }
    };

    // specifying your onload callback function
    expiredCallback() {
        this.setState({isDisabled: true});
    };

    //specifying verify callback function
    //secret: '6LfPfVwUAAAAAFs896v-B4rzTILIYqhtSy_wjfbb',
    verifyCallback(token) {
        Axios.post(Api.CAPTCHA, {
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

            <div className="main-background">
                {this.state.isSignin ? <Redirect to="/contact" /> : ""}
                {this.state.isRefesh ? <Redirect to="/signin" /> : ""}
                {this.state.isVerify ? <Redirect to="/verify" /> : ""}
                <Container style={{marginTop: "4em"}}>
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
                                                onlyCountries={['vn', 'us']}
                                                onSelectFlag={null}
                                                nationalMode={false}
                                                separateDialCode={true}
                                                fieldId={'telphone'}
                                                style={{borderBottom: '0px'}}
                                                utilsScript={libphonenumber}/>
                                        </div>
                                        <div className="d-flex margin_top_16">
                                            <input type="password" value={this.state.password}
                                                   placeholder="password" name="password"
                                                   onChange={this.handleChangePassword}
                                            />
                                        </div>
                                        <Collapse isOpen={this.state.passwordValid}>
                                            <p> nhập mật khẩu không đúng </p>
                                        </Collapse>
                                        <ReCAPTCHA
                                            sitekey="6LfPfVwUAAAAAODFgOV5Qch0OV7lIBky41Tk1rp7"
                                            callback={this.verifyCallback}
                                            expiredCallback={this.expiredCallback}
                                            locale="en"
                                            className="signin-captcha"
                                        />
                                        <Button className="signin-padding btn-verify" id="mySubmit"
                                                disabled={this.state.isDisabled} onClick={this.onSubmit}
                                        >Đăng Nhập</Button>
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
        );
    }
}


export default SimpleSelect;
