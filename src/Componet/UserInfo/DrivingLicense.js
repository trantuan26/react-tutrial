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


class DrivingLicense extends React.Component {
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
                drivingLicenseFront:'',
                drivingLicenseBehind: '',
                drivingLicenseNumber: '',
                drivingLicenseIssueDate: '',
                drivingLicenseClass: '',
            },
            drivingLicenseIssueDate: moment(),
            isDisabled: true,
            PlateNumberValid: false,
            SerialNumberValid: false,
            isRedirect: false,
            isRefesh: false,
            drivingLicenseNumber: '',
            drivingLicenseClass: '',
        };

        this.handleDrivingLicenseFront = this.handleDrivingLicenseFront.bind(this);
        this.handleDrivingLicenseBehind = this.handleDrivingLicenseBehind.bind(this);
        this.handleDrivingLicenseSerialNumber = this.handleDrivingLicenseSerialNumber.bind(this);
        this.handleDrivingLicensePlateNumber = this.handleDrivingLicensePlateNumber.bind(this);
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
        let {drivingLicenseIssueDate, drivingLicenseClass,drivingLicenseNumber} = this.state.user;
        if (drivingLicenseIssueDate !== undefined){
            this.setState({
                drivingLicenseIssueDate: moment(drivingLicenseIssueDate),
            });
        }
        if (drivingLicenseNumber !== undefined){
            this.setState({
                drivingLicenseNumber: drivingLicenseNumber,
            });
        }
        if (drivingLicenseClass !== undefined){
            this.setState({
                drivingLicenseClass: drivingLicenseClass,
            });
        }
        if (drivingLicenseIssueDate !== undefined && drivingLicenseClass !== undefined && drivingLicenseNumber !== undefined) {
            this.setState({
                isDisabled:false ,
            });
        }
    }

    handleDrivingLicenseSerialNumber(event) {
        let {drivingLicenseIssueDate, drivingLicenseClass} = this.state;
        if (event.target.value.toString().length >= 8) {
            this.setState({
                drivingLicenseNumber: event.target.value,
                SerialNumberValid: false,
            });
            if (drivingLicenseIssueDate.isValid() && drivingLicenseClass.toString().length >= 2 ) {
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
                drivingLicenseIssueDate: date
            });
        }
    }

    handleDrivingLicensePlateNumber(event) {
        let {drivingLicenseIssueDate, drivingLicenseNumber} = this.state;
        if (event.target.value.toString().length >= 2) {
            this.setState({
                drivingLicenseClass: event.target.value,
                PlateNumberValid: false,
            });
            if (drivingLicenseIssueDate.isValid() && drivingLicenseNumber.toString().length >= 8 ) {
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
        let {isDisabled, drivingLicenseIssueDate, drivingLicenseClass,drivingLicenseNumber} = this.state;
        const {id} = this.state.useraccount;
        if (
            isDisabled ||
            !drivingLicenseIssueDate.isValid() ||
            drivingLicenseNumber.toString().length < 8 ||
            drivingLicenseClass.toString().length < 2
        ) {
            if (!drivingLicenseIssueDate.isValid()) {
                toast.warn('Vui lòng chọn ngày đúng');
            }
            if (drivingLicenseNumber.toString().length < 8) {
                this.setState({
                    SerialNumberValid: true,
                    isDisabled: true,
                });
            }
            if (drivingLicenseClass.toString().length < 2) {
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
                    'drivingLicenseNumber': drivingLicenseNumber,
                    'drivingLicenseClass': drivingLicenseClass,
                    'drivingLicenseIssueDate': drivingLicenseIssueDate,
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
                        let {drivingLicenseFront, drivingLicenseBehind} = this.state.user;
                        if (drivingLicenseFront!== undefined && drivingLicenseBehind !== undefined) {
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



    handleDrivingLicenseFront(ev) {
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
            data.append('expression', 'drivingLicenseFront');

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

    handleDrivingLicenseBehind(ev) {
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
        data.append('expression', 'drivingLicenseBehind');
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
                {this.state.isRefesh ? (<Redirect to="/doccuments/vehicle-license" />) : ""}
                <div style={{marginTop: "4em"}} className="profile-doccument">
                    <Container>
                        <div className="profile-title">
                            <h2>Bằng Lái Xe(Mặt trước)<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputFront = ref;
                                }} type="file" onChange={this.handleDrivingLicenseFront} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.drivingLicenseFront !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.drivingLicenseFront}
                                         alt="avatar"/>
                                }
                                {
                                    this.state.user.drivingLicenseFront === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh </p>
                            </div>

                        </div>
                        <div className="profile-title">
                            <h2>Bằng Lái Xe(Mặt sau)<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputBehind = ref;
                                }} type="file" onChange={this.handleDrivingLicenseBehind} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.drivingLicenseBehind !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.drivingLicenseBehind}
                                         alt="avatar"/>
                                }
                                {
                                    this.state.user.drivingLicenseBehind === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh </p>
                            </div>

                        </div>
                        <div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">Giấy phép còn hiệu lực.</div>
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
                            <p>Số Giấy Phép Lái Xe <span className="warning">*</span></p>
                            <input type="text" value={this.state.user.drivingLicenseNumber} onChange={this.handleDrivingLicenseSerialNumber} className="card-number"
                                   name="CardNumber" placeholder="AE990948"/>
                        </div>
                        <Collapse isOpen={this.state.SerialNumberValid}>
                            <p> Không được rỗng, phải lớn hơn bằng 8 ký tự </p>
                        </Collapse>
                        <div className="indentily-number">
                            <p>Ngày cấp <span className="warning">*</span></p>
                            <div>
                                <DatePicker
                                    selected={this.state.drivingLicenseIssueDate}
                                    onChange={this.handleChangeDate}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="DD/MM/YYYY"
                                />
                            </div>
                        </div>
                        <div className="indentily-number">
                            <p>Hạng Bằng Lái <span className="warning">*</span></p>
                            <input type="text" value={this.state.user.drivingLicenseClass} onChange={this.handleDrivingLicensePlateNumber} className="card-number"
                                   name="CardNumber" placeholder="A1" />
                        </div>
                        <Collapse isOpen={this.state.PlateNumberValid}>
                            <p> Không được rỗng, phải lớn hơn 1 ký tự </p>
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

export default DrivingLicense;
