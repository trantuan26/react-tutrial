import React from 'react';
import {
    Redirect
} from "react-router-dom";
import {Container, Button, Collapse} from 'mdbreact';
import {ToastContainer, toast} from 'react-toastify';

import Api from '../../utils/api';
import {getFromStorage, setInStorage} from "../../utils/storage";
import Config from "../../utils/config";
import './Profile.css';

class DeviceInformation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            useraccount: {
                id: '',
                token: '',
                activeType: '',
            },
            user: {
                phone: '',
                deviceInformationModel: '',
                deviceInformationIMEI: '',
            },
            isDisabled: true,
            PlateNumberValid: false,
            SerialNumberValid: false,
            isRedirect: false,
            isRefesh: false,
            deviceInformationModel: '',
            deviceInformationIMEI: '',
        };
        this.handleIdentityLogSerialNumber = this.handleIdentityLogSerialNumber.bind(this);
        this.handleIdentityLogPlateNumber = this.handleIdentityLogPlateNumber.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillMount() {
        let a = getFromStorage(Config.USER);
        if (a) {
            this.setState({useraccount: a});
        }

        let b = getFromStorage(Config.USERINFO);
        if (b) {
            this.setState({user: b});
        }
    }

    componentDidMount() {
        let {deviceInformationIMEI, deviceInformationModel} = this.state.user;

        if (deviceInformationModel !== undefined) {
            this.setState({
                deviceInformationModel: deviceInformationModel,
            });
        }
        if (deviceInformationIMEI !== undefined) {
            this.setState({
                deviceInformationIMEI: deviceInformationIMEI,
            });
        }
        if (deviceInformationIMEI !== undefined && deviceInformationModel !== undefined) {
            this.setState({
                isDisabled: false,
            });
        }
    }

    handleIdentityLogSerialNumber(event) {
        let {deviceInformationIMEI} = this.state;
        if (event.target.value.toString().length >= 0) {
            this.setState({
                deviceInformationModel: event.target.value,
                SerialNumberValid: false,
            });
            if (deviceInformationIMEI.toString().length >= 10) {
                this.setState({
                    isDisabled: false,
                });
            }
        } else {
            this.setState({
                SerialNumberValid: true,
                isDisabled: true
            });
        }
    }


    handleIdentityLogPlateNumber(event) {
        let {deviceInformationModel} = this.state;
        if (event.target.value.toString().length >= 10) {
            this.setState({
                deviceInformationIMEI: event.target.value,
                PlateNumberValid: false,
            });
            if (deviceInformationModel.toString().length >= 0) {
                this.setState({
                    isDisabled: false,
                });
            }
        } else {
            this.setState({
                PlateNumberValid: true,
            });
        }
    }

    handleSubmit() {
        let {isDisabled, deviceInformationIMEI, deviceInformationModel} = this.state;
        const {id} = this.state.useraccount;
        if (
            isDisabled ||
            deviceInformationModel.toString().length < 1 ||
            deviceInformationIMEI.toString().length < 10
        ) {

            if (deviceInformationModel.toString().length < 1) {
                this.setState({
                    SerialNumberValid: true,
                    isDisabled: true,
                });
            }
            if (deviceInformationIMEI.toString().length < 10) {
                this.setState({
                    PlateNumberValid: true,
                    isDisabled: true,
                });
            }
        } else {
            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + this.state.useraccount.token);
            headers.append('Content-Type', 'application/json');
            const config = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    'deviceInformationModel': deviceInformationModel,
                    'deviceInformationIMEI': deviceInformationIMEI,
                    'id': id,
                }),
            };
            fetch(Api.PROFILE_DOC, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.value === true) {
                        setInStorage(Config.USERINFO, responseJson.response);
                        toast.success('Cập nhật thành công');
                        this.setState({user: responseJson.response});

                        setTimeout(function () {
                            this.setState({isRedirect: true});
                        }.bind(this), 2000);


                    } else {
                        toast.success('Cập nhật thất bại vui lòng kiểm tra giá trị nhập');
                        this.setState({isRefesh: true})
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }


    render() {
        return (
            <div>
                {this.state.isRedirect ? (<Redirect to="/update-user-acount"/>) : ""}
                {this.state.isRefesh ? (<Redirect to="/doccuments/device-information"/>) : ""}
                <div style={{marginTop: "4em"}} className="profile-doccument">
                    <Container>
                        <div>
                            <div className="list">
                                <div className="list-item">Hướng dẫn tìm số IMEI cho máy di động: nhập *#06# và nhấn Gọi
                                    trên điện thoại để thấy hiển thị số IMEI
                                </div>
                            </div>
                        </div>
                        <div className="indentily-number">
                            <p>Nhãn hiệu điện thoại <span className="warning">*</span></p>
                            <input type="text" value={this.state.user.deviceInformationModel}
                                   onChange={this.handleIdentityLogSerialNumber} className="card-number"
                                   name="CardNumber"/>
                        </div>
                        <Collapse isOpen={this.state.SerialNumberValid}>
                            <p> Không được rỗng </p>
                        </Collapse>

                        <div className="indentily-number">
                            <p>Số IMEI <span className="warning">*</span></p>
                            <input type="text" value={this.state.user.deviceInformationIMEI}
                                   onChange={this.handleIdentityLogPlateNumber} className="card-number"
                                   name="CardNumber"/>
                        </div>
                        <Collapse isOpen={this.state.PlateNumberValid}>
                            <p> Không được rỗng </p>
                        </Collapse>
                        <div className="indentily-submit">
                            <Button className="submit" id="mySubmit" type="submit"
                                    disabled={this.state.isDisabled} onClick={this.handleSubmit}
                            >Tiếp tục</Button>
                        </div>

                    </Container>
                    <ToastContainer
                        hideProgressBar={true}
                        newestOnTop={true}
                        autoClose={5000}
                    />
                </div>
            </div>
        );
    }
}

export default DeviceInformation;
