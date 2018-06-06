import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'mdbreact';
import "./verify.css";
import { getFromSession } from '../../utils/sessionStorage';
import Axios from "axios/index";
import {ToastContainer, toast} from 'react-toastify';

class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verify: '',
            phone: '',
            code:'',
        }
        this.verifyChange = this.verifyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.submitSendSMS = this.submitSendSMS.bind(this);
    }

    componentWillMount(){
        let phone = getFromSession('phone');
        if (phone) {
            this.setState({phone});
        }
    }

    verifyChange(event) {
        this.setState({verify: event.target.value});
    }

    submitSendSMS() {
        const { phone } = this.state;
        Axios.post('http://localhost/api/auth/sendsms', {
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

    handleSubmit() {

    }

    render() {
        return (
            <Container className="home-container verify-container">
                <Row>
                    <Col md="10" className="mx-auto mt-4">
                        <p>Vui lòng xác thuwcjc số điện thoại bằng cách nhập Mã xác thực (OTP) đã gửi qua SMS đến
                            bạn </p>
                        <p> ******{this.state.phone.substring(this.state.phone.length-4, this.state.phone.length)} </p>
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
                <Row className="d-flex" >
                 <Col md="10" className="mx-auto mt-4">
                    <p>Bấm vào <a style={{color:"blue"}} onClick={this.submitSendSMS}> đây </a>đây để hệ thống gửi lại mã xác thực qua SMS(nếu như bạn chưa nhận được tin nhăn sau 5 phút) </p>
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