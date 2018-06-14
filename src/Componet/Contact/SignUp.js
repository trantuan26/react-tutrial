import React from 'react';
import {
    Redirect
} from "react-router-dom";
import './SingUp.css';
import {Button, Card, CardBody, CardTitle, Row, Col, CardText, Collapse, Container} from 'mdbreact';
import {ToastContainer, toast} from 'react-toastify';
import IntlTelInput from 'react-intl-tel-input';
import libphonenumber from '../../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import '../../pages/alerts.css';
import ReCAPTCHA from 'react-grecaptcha';
import Axios from 'axios';

import Api from '../../utils/api';
import {setInSession} from '../../utils/sessionStorage';

import passwordValidator from 'password-validator';
const checkPass = new passwordValidator();
// Add properties to it
checkPass
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().symbols()                                 // Must have symbols
    .has().not().spaces();

class SimpleSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            city: '',
            fullname: '',
            phone: '',
            countryData: '',
            email: '',
            password: '',
            typeDrive: 0,
            referral: '0',
            referralCode: '',
            arrayTypeDrive: [],
            arrayTypeReferral: [],
            fullnameValid: false,
            phoneValid: false,
            emailValid: false,
            typeDriveValid: false,
            referralValid: false,
            passwordValid: false,
            isDisabled: true,
            isRegister: false,
        };

        this.expiredCallback = this.expiredCallback.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeFullname = this.handleChangeFullname.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeReferral = this.handleChangeReferral.bind(this);
        this.handleChangeReferralCode = this.handleChangeReferralCode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkValid = this.checkValid.bind(this);
    }

    async componentWillMount() {
        await Axios.get(Api.TYPEDRIVE)
            .then(response => {
                if (response.status === 200) {
                    this.setState({arrayTypeDrive: response.data});
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        await Axios.get(Api.REFERRAL)
            .then(response => {
                if (response.status === 200) {
                    this.setState({arrayTypeReferral: response.data});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleChangeReferralCode(event) {
        this.setState({referralCode: event.target.value});
    }

    handleChangeReferral(event) {
        this.setState({referral: event.target.value});
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    handleChangeFullname(event) {
        this.setState({fullname: event.target.value});
    }

    handleChangePhone(status, value, countryData, number, id) {
        console.log(status, value, countryData, number, id);
        if (status) {
            this.setState({phone: value, countryData: countryData.dialCode});
        } else {
            this.setState({phone: ''});
        }
        console.log(this.state.phone);
    };

    handleChangeCity(event) {
        this.setState({city: event.target.value});
    }

    handleChangeType(event) {

        this.setState({typeDrive: event.target.value});
    }


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

    checkValid() {
        const {
            fullname,
            phone,
            email,
            password,
            typeDrive,
            referral
        } = this.state;

        if (!checkPass.validate(password)) {
            this.setState({passwordValid: true});
        } else {
            this.setState({passwordValid: false});
        }

        if (fullname === null || fullname.length < 7) {
            this.setState({fullnameValid: true});
        } else {
            this.setState({fullnameValid: false});
        }

        if (phone === null || phone.length < 7 || phone.length > 11 || !parseInt(phone, 10)) {
            this.setState({phoneValid: true});
        } else {
            this.setState({phoneValid: false});
        }

        if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({emailValid: true});
        } else {
            this.setState({emailValid: false});
            // let a = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            // if (a[2] !== "gmail.") {
            //     this.setState({emailValid: true});
            // }
        }

        if (typeDrive === null || typeDrive.length < 1) {
            this.setState({typeDriveValid: true});
        } else {
            this.setState({typeDriveValid: false});
        }

        if (referral === null || referral.length < 2) {
            this.setState({referralValid: true});
        } else {
            this.setState({referralValid: false});
        }
    }

    async handleSubmit() {
        await this.checkValid();
        const {countryData, password, city, fullname, phone, email, typeDrive, referral, referralCode, fullnameValid, phoneValid, emailValid, typeDriveValid, referralValid, isDisabled, passwordValid} = await this.state;
        if (passwordValid || fullnameValid || phoneValid || emailValid || typeDriveValid || referralValid || isDisabled) {
            toast.warn('Vui lòng kiểm tra giá trị nhập');
        } else {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');


            const config = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    fullName: fullname,
                    cityDrive: city,
                    email: email,
                    password: password,
                    countryCode: countryData,
                    phone: parseInt(phone, 10),
                    typeDrive: typeDrive,
                    referral: referral,
                    referralCode: referralCode,
                }),
            };
            fetch(Api.REGISTER, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    switch (responseJson.value) {
                        case 0:
                            toast.success('Đăng ký thành công');
                            setInSession("phone", parseInt(phone, 10));
                            setTimeout(function () {
                                this.setState({isRegister: true});
                            }.bind(this), 2000);

                            break;
                        case 1:
                            toast.warn('Mật khẩu không đúng qui định');
                            this.setState({passwordValid: true});
                            break;
                            case 2:
                            toast.warn('Email đã được sử dụng');
                            this.setState({emailValid: true});
                            break;
                        case 3:
                            toast.warn('Số điện thoại đã được sử dụng');
                            this.setState({emailValid: true});
                            break;
                        default:
                            toast.warn('Lỗi trong quá trình đăng ký');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.warn('Lỗi trong quá trình đăng ký');
                });
        }
    }


    render() {
        return (

            <div className="signup-container" style={{marginTop: "4em"}}>
                <Container>
                    <Row className="d-flex">
                        <Col md="7" lg="7">
                            {this.state.isRegister ? (<Redirect to="/verify" />) : ""}
                        </Col>
                        <Col md="5" lg="5" className="ml-lg-0">
                            <Card style={{maxWidth: '400px'}} className="signup-card margin_top_16">
                                <CardBody>
                                    <CardTitle> Đăng ký OR-TRANS ngay!</CardTitle>
                                    <CardText>Vui lòng điền thông tin đầy đủ và chính xác để Grab có thể liên hệ bạn
                                        sớm nhất.</CardText>
                                    <Row className="d-flex">
                                        <select name="city" value={this.state.city} onChange={this.handleChangeCity}
                                                className="form-control select-country"
                                                id="exampleFormControlSelect1">
                                            <option value="">Thành phố hoạt động</option>
                                            <option value="hcm">Hồ Chí Minh</option>
                                        </select>
                                    </Row>
                                    <Row className="d-flex margin_top_16">
                                        <input type="text" value={this.state.fullname} placeholder="Họ và Tên"
                                               name="fullname"
                                               onChange={this.handleChangeFullname}
                                        />
                                    </Row>
                                    <Collapse isOpen={this.state.fullnameValid}>
                                        <p>Vui lòng nhập đầy đủ họ tên</p>
                                    </Collapse>

                                    <Row className="d-flex margin_top_16">
                                        <IntlTelInput
                                            onPhoneNumberChange={this.handleChangePhone}
                                            onPhoneNumberBlur={this.handleChangePhone}
                                            preferredCountries={['vn']}
                                            onlyCountries={['vn', 'us']}
                                            onSelectFlag={null}
                                            nationalMode={false}
                                            separateDialCode={true}
                                            fieldId={'telphone'}
                                            style={{width: "100%", border: '1px solid #D0D0D0', borderRadius: "5px"}}
                                            utilsScript={libphonenumber}/>
                                    </Row>

                                    <Collapse isOpen={this.state.phoneValid}>
                                        <p>Vui lòng nhập số điện thoại </p>
                                    </Collapse>

                                    <Row className="d-flex margin_top_16">
                                        <input type="email" id="inputemail"
                                               placeholder="Địa chỉ email(Gmail)" name="email"
                                               onChange={this.handleChangeEmail}
                                               value={this.state.email}
                                        />
                                    </Row>
                                    <Collapse isOpen={this.state.emailValid}>
                                        <p>Vui lòng nhập đúng tài khoản gmail</p>
                                    </Collapse>


                                    <Row className="d-flex margin_top_16">
                                        <input type="password" value={this.state.password}
                                               placeholder="Mật khẩu" name="password"
                                               onChange={this.handleChangePassword}
                                        />
                                    </Row>
                                    <Collapse isOpen={this.state.passwordValid}>
                                        <p>Vui lòng nhập Mật khẩu phải có ít nhất 8 ký tự, có
                                            số, chữ hoa, chữ thường, ký tự đặc biệt</p>
                                    </Collapse>

                                    <Row className="d-flex margin_top_16">
                                        <select name="typeDrive" value={this.state.typeDrive}
                                                onChange={this.handleChangeType}
                                                className="form-control select-country">
                                            <option value="0">Type Drive</option>
                                            {
                                                this.state.arrayTypeDrive.map((item) => {
                                                    return (
                                                        <option key={item.typeId}
                                                                value={item.typeId}>{item.typeName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </Row>
                                    <Row className="d-flex margin_top_16">
                                        <select name="referral" value={this.state.referral}
                                                onChange={this.handleChangeReferral}
                                                className="form-control select-country">
                                            <option value="0">Nguồn giới thiệu</option>
                                            {
                                                this.state.arrayTypeReferral.map((item) => {
                                                    return (
                                                        <option key={item.typeId}
                                                                value={item.typeId}>{item.typeName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </Row>
                                    <Collapse isOpen={this.state.typeDriveValid}>
                                        <p> Vui lòng chọn một đối tượng </p>
                                    </Collapse>

                                    <Row className="d-flex margin_top_16">
                                        <input type="text"
                                               placeholder="Code giới thiệu( nếu có)" name="referral_code"
                                               onChange={this.handleChangeReferralCode}
                                               value={this.state.referralCode}
                                        />
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
                                        <p>Khi tiếp tục, tôi đồng ý Grab được phép thu thập, sử dụng và tiết lộ
                                            thông tin được tôi cung cấp theo <a
                                                href="http://localhost/privacy"> Chính sách Bảo mật </a>mà tôi đã
                                            đọc và hiểu.</p>
                                    </Row>
                                    <Row className="d-flex margin_top_16">
                                        <Button className="btn-verify" id="mySubmit" type="submit"
                                                disabled={this.state.isDisabled}
                                                onClick={this.handleSubmit}
                                        >ĐĂNG KÝ</Button>
                                    </Row>

                                </CardBody>
                            </Card>
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
