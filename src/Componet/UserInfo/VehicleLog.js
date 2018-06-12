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
import picture from '../../img/picture.svg';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';


class VehicleLog extends React.Component {
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
                vehicleLogFront:'',
                vehicleLogBehind: '',
                vehicleLogSerialNumber: '',
                vehicleLogRegistrationDate: '',
                vehicleLogPlateNumber: '',
            },
            vehicleLogRegistrationDate: moment(),
            isDisabled: true,
            PlateNumberValid: false,
            SerialNumberValid: false,
            isRedirect: false,
            isRefesh: false,
            vehicleLogSerialNumber: '',
            vehicleLogPlateNumber: '',
        };

        this.handleIdentityLogFront = this.handleIdentityLogFront.bind(this);
        this.handleIdentityLogBehind = this.handleIdentityLogBehind.bind(this);
        this.handleIdentityLogSerialNumber = this.handleIdentityLogSerialNumber.bind(this);
        this.handleIdentityLogPlateNumber = this.handleIdentityLogPlateNumber.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
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
        let {vehicleLogRegistrationDate, vehicleLogPlateNumber,vehicleLogSerialNumber} = this.state.user;
        if (vehicleLogRegistrationDate !== undefined){
            this.setState({
                vehicleLogRegistrationDate: moment(vehicleLogRegistrationDate),
            });
        }
        if (vehicleLogSerialNumber !== undefined){
            this.setState({
                vehicleLogSerialNumber: vehicleLogSerialNumber,
            });
        }
        if (vehicleLogPlateNumber !== undefined){
            this.setState({
                vehicleLogPlateNumber: vehicleLogPlateNumber,
            });
        }
        if (vehicleLogRegistrationDate !== undefined && vehicleLogPlateNumber !== undefined && vehicleLogSerialNumber !== undefined) {
            this.setState({
                isDisabled:false ,
            });
        }
    }

    handleIdentityLogSerialNumber(event) {
        let {vehicleLogRegistrationDate, vehicleLogPlateNumber} = this.state;
        if (event.target.value.toString().length >= 6) {
            this.setState({
                vehicleLogSerialNumber: event.target.value,
                SerialNumberValid: false,
            });
            if (vehicleLogRegistrationDate.isValid() && vehicleLogPlateNumber.toString().length >= 10 ) {
                this.setState({
                    isDisabled:false ,
                });
            }
        } else {
            this.setState({
                SerialNumberValid: true,
                isDisabled:true
            });
        }
    }

    handleChangeDate(date) {
        if (date !== undefined) {
            this.setState({
                vehicleLogRegistrationDate: date
            });
        }
    }

    handleIdentityLogPlateNumber(event) {
        let {vehicleLogRegistrationDate, vehicleLogSerialNumber} = this.state;
        if (event.target.value.toString().length >= 10) {
            this.setState({
                vehicleLogPlateNumber: event.target.value,
                PlateNumberValid: false,
            });
            if (vehicleLogRegistrationDate.isValid() && vehicleLogSerialNumber.toString().length >= 6 ) {
                this.setState({
                    isDisabled:false ,
                });
            }
        } else {
            this.setState({
                PlateNumberValid: true,
            });
        }
    }

    handleSubmit() {
        let {isDisabled, vehicleLogRegistrationDate, vehicleLogPlateNumber,vehicleLogSerialNumber} = this.state;
        const {id} = this.state.useraccount;
        if (
            isDisabled ||
            !vehicleLogRegistrationDate.isValid() ||
            vehicleLogSerialNumber.toString().length < 6 ||
            vehicleLogPlateNumber.toString().length < 10
        ) {
            if (!vehicleLogRegistrationDate.isValid()) {
                toast.warn('Vui lòng chọn ngày đúng');
            }
            if (vehicleLogSerialNumber.toString().length < 6) {
                this.setState({
                    SerialNumberValid: true,
                    isDisabled: true,
                });
            }
            if (vehicleLogPlateNumber.toString().length < 10) {
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
                    'vehicleLogSerialNumber': vehicleLogSerialNumber,
                    'vehicleLogPlateNumber': vehicleLogPlateNumber,
                    'vehicleLogRegistrationDate': vehicleLogRegistrationDate,
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
                        let {vehicleLogFront, vehicleLogBehind} = this.state.user;
                        if (vehicleLogFront!== undefined && vehicleLogBehind) {
                            setTimeout(function () {
                                this.setState({ isRedirect:true});
                            }.bind(this),2000);
                        }

                    } else {
                        toast.success('Cập nhật thất bại vui lòng kiểm tra giá trị nhập');
                        this.setState({isRefesh:true})
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }



    handleIdentityLogFront(ev) {
        ev.preventDefault();

        if (this.state.useraccount.id === undefined
            || this.state.useraccount.id === ''
            || this.state.user.phone === undefined
            || this.state.user.phone === ''
        ) {
            toast.warn('Vui lòng đăng xuất và đăng nhập lại mới có thể thực hiện công việc này');
        } else {
            const data = new FormData();
            data.append('avatar', this.uploadInputFront.files[0]);
            data.append('id', this.state.useraccount.id);
            data.append('folder', this.state.user.phone);
            data.append('expression', 'vehicleLogFront');

            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + this.state.useraccount.token);
            const config = {
                method: 'POST',
                headers: headers,
                body: data,
            };

            fetch(Api.PROFILE_CARD, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.value === true) {
                        setInStorage(Config.USERINFO, responseJson.response);
                        this.setState({user: responseJson.response})
                    } else {
                        console.error(responseJson);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }

    handleIdentityLogBehind(ev) {
        ev.preventDefault();
        if (this.state.useraccount.id === undefined
            || this.state.useraccount.id === ''
            || this.state.user.phone === undefined
            || this.state.user.phone === ''
        ) {
            toast.warn('Vui lòng đăng xuất và đăng nhập lại mới có thể thực hiện công việc này');
        } else {
        const data = new FormData();
        data.append('avatar', this.uploadInputBehind.files[0]);
        data.append('id', this.state.useraccount.id);
        data.append('expression', 'vehicleLogBehind');
        data.append('folder', this.state.user.phone);

        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.state.useraccount.token);
        const config = {
            method: 'POST',
            headers: headers,
            body: data,
        }
        fetch(Api.PROFILE_CARD, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.value === true) {
                    setInStorage(Config.USERINFO, responseJson.response);
                    this.setState({user: responseJson.response})
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }}


    render() {
        return (
            <div>
                {this.state.isRedirect ? (<Redirect to="/update-user-acount" />) : ""}
                {this.state.isRefesh ? (<Redirect to="/doccuments/identily-log" />) : ""}
                <div style={{marginTop: "4em"}} className="profile-doccument">
                    <Container>
                        <div className="profile-title">
                            <h2>Giấy đăng ký xe(Mặt trước)<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputFront = ref;
                                }} type="file" onChange={this.handleIdentityLogFront} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.vehicleLogFront !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.vehicleLogFront}
                                         alt="avatar"/>
                                }
                                {
                                    this.state.user.vehicleLogFront === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh </p>
                            </div>

                        </div>
                        <div className="profile-title">
                            <h2>Giấy đăng ký xe(Mặt sau)<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputBehind = ref;
                                }} type="file" onChange={this.handleIdentityLogBehind} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.vehicleLogBehind !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.vehicleLogBehind}
                                         alt="avatar"/>
                                }
                                {
                                    this.state.user.vehicleLogBehind === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh </p>
                            </div>

                        </div>
                        <div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">Giấy đăng ký còn hiệu lực, chưa hết hạn.</div>
                            </div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">Chụp ảnh bằng điện thoại, không dùng bản quét.</div>
                            </div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">Hình ảnh rõ nét, không bị mờ.</div>
                            </div>
                        </div>
                        <div className="indentily-number">
                            <p>Số đăng ký xe <span className="warning">*</span></p>
                            <input type="text" value={this.state.user.vehicleLogSerialNumber} onChange={this.handleIdentityLogSerialNumber} className="card-number"
                                   name="CardNumber"/>
                        </div>
                        <Collapse isOpen={this.state.SerialNumberValid}>
                            <p> Không được rỗng, phải lớn hơn 6 số </p>
                        </Collapse>
                        <div className="indentily-number">
                            <p>Ngày cấp <span className="warning">*</span></p>
                            <div>
                                <DatePicker
                                    selected={this.state.vehicleLogRegistrationDate}
                                    onChange={this.handleChangeDate}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="DD/MM/YYYY"
                                />
                            </div>
                        </div>
                        <div className="indentily-number">
                            <p>Biển Số xe <span className="warning">*</span></p>
                            <input type="text" value={this.state.user.vehicleLogPlateNumber} onChange={this.handleIdentityLogPlateNumber} className="card-number"
                                   name="CardNumber"/>
                        </div>
                        <Collapse isOpen={this.state.PlateNumberValid}>
                            <p> Không được rỗng, phải lớn hơn 10 ký tự </p>
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

export default VehicleLog;
