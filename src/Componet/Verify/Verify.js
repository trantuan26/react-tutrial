import React, {Component} from 'react';
import {
    Redirect
} from "react-router-dom";
import {Container, Row, Col, Button} from 'mdbreact';
import "./verify.css";
import {getFromSession} from '../../utils/sessionStorage';
import Api from '../../utils/api';
import Config from '../../utils/config';
import Axios from "axios/index";
import {ToastContainer, toast} from 'react-toastify';
import {setInStorage} from '../../utils/storage';


class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verify: '',
            phone: '',
            code: '',
            isLogin: false,
            isSignIn: false,

        }
        this.verifyChange = this.verifyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitSendSMS = this.submitSendSMS.bind(this);
        this.saveInfoUser = this.saveInfoUser.bind(this);
    }

    componentWillMount() {
        let phone = getFromSession('phone');
        if (phone) {
            this.setState({phone});
        }
    }

    verifyChange(event) {
        this.setState({verify: event.target.value});
    }

    submitSendSMS() {
        const {phone} = this.state;
        if (phone.length < 5 || phone === undefined) {
            toast.error('phone number not exists. If you have account, click below to login');
        } else {
            Axios.post(Api.SENDSMS, {
                phone: parseInt(phone, 10),
            })
                .then(response => {
                    if (response.status === 200) {
                        let {value, code} = response.data;
                        console.log(value, code);
                        toast.success('Hệ thống đã gửi SMS, vui lòng kiểm tra tin nhắn');
                    }
                })
                .catch(function (error) {
                    toast.warn('Please check value typing');
                });
        }
    }

    saveInfoUser(token, id) {

        Axios({
            method: 'get', //you can set what request you want to be
            url: Api.USERACCOUNT + id,
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
            if (response.status === 200) {
                let {activeType, create_at, email, fullName, phone, roleType, updated_at, verifyType, _id} = response.data.response;
                setInStorage(Config.USERINFO, {
                    activeType, create_at, email, fullName, phone, roleType, updated_at, verifyType, _id
                });
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleSubmit() {
        const {phone, verify} = this.state;
        if (phone.length < 6 || phone === undefined) {
            toast.error('phone number not exists. If you have account, click below to login');
        } else {
            Axios.post(Api.VERIFYWEB, {
                phone: parseInt(phone, 10),
                code: verify,
            })
                .then(response => {
                    if (response.status === 200) {
                        let {activeType, message, id} = response.data;
                        //thông tin đăng nhập
                        setInStorage(Config.USER, {
                            activeType: activeType,
                            token: message,
                            id: id,
                        });

                        //save thong tin nguoi dung
                        this.saveInfoUser(message, id);

                        //activeType = 2 dang ký chua dc duyet
                        //activeType = 1 dang ký da được dc duyet
                        if (activeType === 1) {
                            this.setState({isLogin: true});
                        }
                        if (activeType === 2) {
                            this.setState({isSignIn: true});
                        } else {
                            toast.warn('Xác nhận không thành công');
                        }

                    } else {
                        toast.warn('Xác nhận không thành công');
                    }
                })
                .catch(function (error) {
                    toast.warn('Please check value typing');
                });
        }
    }

    render() {
        return (
            <Container className="home-container verify-container">
                {this.state.isLogin ? (<Redirect to="/contact"/>) : ""}
                {this.state.isSignIn ? (<Redirect to="/update-user-acount"/>) : ""}
                <Row>
                    <Col md="10" className="mx-auto mt-4">
                        <p>Vui lòng xác thực số điện thoại bằng cách nhập Mã xác thực (OTP) đã gửi qua SMS đến
                            bạn </p>
                        <p> ******{this.state.phone.substring(this.state.phone.length - 4, this.state.phone.length)} </p>
                    </Col>
                </Row>
                <Row className="d-flex">
                    <Col md="4" className="mx-auto mt-4">
                        <input className="text-center" type="password" value={this.state.verify}
                               placeholder="" name="verify"
                               onChange={this.verifyChange}
                        />
                    </Col>
                </Row>
                <Row className="d-flex">
                    <Col md="5" className="mx-auto mt-5">
                        <Button className="btn-verify" id="mySubmit" type="submit"
                                onClick={this.handleSubmit}
                        >Gửi</Button>
                    </Col>
                </Row>
                <Row className="d-flex">
                    <Col md="10" className="mx-auto mt-4">
                        <p>Bấm vào <a style={{color: "blue"}} onClick={this.submitSendSMS}> đây </a> để hệ thống gửi
                            lại mã xác thực qua SMS(nếu như bạn chưa nhận được tin nhăn sau 5 phút) </p>
                    </Col>
                </Row>

                <Row className="d-flex">
                    <Col md="10" className="mx-auto mt-4">
                        <p>Bấm vào <a style={{color: "blue"}} href="/signin"> đây </a> để đăng nhập (nếu như bạn đã có tài khoản ) </p>
                    </Col>
                </Row>
                <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />
            </Container>
        );
    }
}

export default Verify;
