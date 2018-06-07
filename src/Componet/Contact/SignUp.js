import React from 'react';
import {
    Redirect
} from "react-router-dom";
import './SingUp.css';
import {Button, Card, CardBody, CardTitle, Row, Col, CardText, Collapse, Container} from 'mdbreact';
import {ToastContainer, toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';
import '../../pages/alerts.css';
import ReCAPTCHA from 'react-grecaptcha';
import Axios from 'axios';
import {  setInSession } from '../../utils/sessionStorage';
import Api from '../../utils/api';


class SimpleSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            city: 'hcm',
            fullname: '',
            phone: '',
            address: '',
            typeDrive: 0,
            referral: '0',
            referralCode: '',
            arrayTypeDrive: [],
            arrayTypeReferral: [],
            fullnameValid: false,
            phoneValid: false,
            addressValid: false,
            typeDriveValid: false,
            referralValid: false,
            isDisabled: true,
            isRegister:false,
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.expiredCallback = this.expiredCallback.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeFullname = this.handleChangeFullname.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeReferral = this.handleChangeReferral.bind(this);
        this.handleChangeReferralCode = this.handleChangeReferralCode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkValid = this.checkValid.bind(this);
    }

    async componentWillMount() {
        await Axios.get('http://localhost/api/type_drive')
            .then(response => {
                if (response.status === 200) {
                    this.setState({arrayTypeDrive: response.data});
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        await Axios.get('http://localhost/api/referral')
            .then(response => {
                if (response.status === 200) {
                    this.setState({arrayTypeReferral: response.data});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        return false;
    }


    handleChangeReferralCode(event) {
        this.setState({referralCode: event.target.value});
    }

    handleChangeReferral(event) {
        this.setState({referral: event.target.value});
    }

    handleChangeAddress(event) {
        this.setState({address: event.target.value});
    }

    handleChangeFullname(event) {
        this.setState({fullname: event.target.value});
    }

    handleChangePhone(event) {
        this.setState({phone: event.target.value});
    }

    handleChangeCity(event) {
        this.setState({city: event.target.value});
    }

    handleChangeType(event) {

        this.setState({typeDrive: event.target.value});
    }

    onChangeHandler(status, value, countryData, number, id) {
        if (status) {
            this.setState({phone: number});
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

    checkValid() {
        const {
            fullname,
            phone,
            address,
            typeDrive,
            referral
        } = this.state;

        if (fullname === null || fullname.length < 10) {
            this.setState({fullnameValid: true});
        } else {
            this.setState({fullnameValid: false});
        }

        if (phone === null || phone.length < 7 || phone.length > 11 || !parseInt(phone, 10)) {
            this.setState({phoneValid: true});
        } else {
            this.setState({phoneValid: false});
        }

        if (address === null || address.length < 30) {
            this.setState({addressValid: true});
        } else {
            this.setState({addressValid: false});
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
        const {fullname, phone, address, typeDrive, referral, referralCode, fullnameValid, phoneValid, addressValid, typeDriveValid, referralValid, isDisabled} = await this.state;
        if (fullnameValid || phoneValid || addressValid || typeDriveValid || referralValid || isDisabled) {
            console.log(fullnameValid, phoneValid, addressValid, typeDriveValid, referralValid, isDisabled);
        } else {
            //lưu số điện thoại vào session
            setInSession("phone",phone);
            //localhost/api/auth/register
            Axios.post(Api.REGISTER, {
                fullName: fullname,
                address: address,
                countryCode: 84,
                phone: parseInt(phone, 10),
                roleType: 2, // 1 user, 2 driver, 0 admin
                verifyType: 1, // 0: mail, 1 phone, 2 password
                typeDrive: typeDrive,
                referral: referral,
                referralCode: referralCode,
            })
                .then(response => {
                    if (response.status === 200) {
                        let {value} = response.data;
                        if (value === 7 || value === 5) {
                           this.setState({isRegister:true})
                        }
                        else {
                            toast.warn('Please check value typing');
                        }
                    }
                })
                .catch(function (error) {
                    toast.warn('Please check value typing');
                });
        }
    }


    render() {
        return (
            <div className="signup-container">
                <Container>
                    <Row className="d-flex">
                        <Col md="7" lg="7">
                            {this.state.isRegister ? (<Redirect to="/verify"/>) : ""}
                        </Col>
                        <Col md="5" lg="5" className="ml-lg-0">
                            <Card style={{maxWidth: '400px'}} className="signup-card margin_top_16">
                                <CardBody>
                                    <CardTitle>Drive with OR-TRANS</CardTitle>
                                    <CardText>Enter your basic information to get started</CardText>
                                    <Row className="d-flex">
                                        <select name="city" value={this.state.city} onChange={this.handleChangeCity}
                                                className="form-control select-country" id="exampleFormControlSelect1">
                                            <option value="hcm">Ho Chi Minh</option>
                                            <option value="hni">Ha Noi</option>
                                            <option value="dng">Da Nang</option>
                                            <option value="cto">Can Tho</option>
                                        </select>
                                    </Row>

                                    <Row className="d-flex margin_top_16">
                                        <input type="text" value={this.state.fullname} placeholder="Full name"
                                               name="fullname"
                                               onChange={this.handleChangeFullname}
                                        />
                                    </Row>
                                    <Collapse isOpen={this.state.fullnameValid}>
                                        <p>please! This field is required, must be more than 10 letters </p>
                                    </Collapse>

                                    <Row className="d-flex margin_top_16">
                                        <input type="tel" value={this.state.phone}
                                               placeholder="Mobile Number" name="phone"
                                               onChange={this.handleChangePhone}
                                        />
                                    </Row>
                                    <Collapse isOpen={this.state.phoneValid}>
                                        <p>please! This field is required </p>
                                    </Collapse>

                                    <Row className="d-flex margin_top_16">
                                        <input type="text" id="inputAddress"
                                               placeholder="1234 Main St" name="address"
                                               onChange={this.handleChangeAddress}
                                               value={this.state.address}
                                        />
                                    </Row>
                                    <Collapse isOpen={this.state.addressValid}>
                                        <p>please! This field is required, must be more than 30 letters </p>
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
                                            <option value="0">Referral</option>
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
                                        <p>please! This field is required </p>
                                    </Collapse>

                                    <Row className="d-flex margin_top_16">
                                        <input type="text"
                                               placeholder="referral code" name="referral_code"
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
                                        <p>By proceeding, I agree that Grab can collect, use and disclose the
                                            information
                                            provided by me in accordance with the <a
                                                href="http://localhost/privacy"> Privacy Policy </a>which I have read
                                            and
                                            understand.</p>
                                    </Row>
                                    <Row className="d-flex margin_top_16">
                                        <Button className="btn-verify" id="mySubmit" type="submit"
                                                disabled={this.state.isDisabled} onClick={this.handleSubmit}
                                        >SIGN UP</Button>
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
