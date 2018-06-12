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


class VehicleInsurance extends React.Component {
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
                vehicleInsuranceFront:'',
                vehicleInsuranceBehind: '',
                vehicleInsuranceDate: '',
            },
            vehicleInsuranceDate: moment(),
            isDisabled: true,
            PlateNumberValid: false,
            SerialNumberValid: false,
            isRedirect: false,
            isRefesh: false,
            drivingLicenseNumber: '',
            drivingLicenseClass: '',
        };

        this.handlevehicleInsuranceFront = this.handlevehicleInsuranceFront.bind(this);
        this.handlevehicleInsuranceBehind = this.handlevehicleInsuranceBehind.bind(this);
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
        let {vehicleInsuranceDate} = this.state.user;
        if (vehicleInsuranceDate !== undefined){
            this.setState({
                vehicleInsuranceDate: moment(vehicleInsuranceDate),
            });
        }
        if (vehicleInsuranceDate !== undefined) {
            this.setState({
                isDisabled:false ,
            });
        }
    }


    handleChangeDate(date) {
        if (date !== undefined) {
            this.setState({
                vehicleInsuranceDate: date,
                isDisabled:false ,
            });
        }
    }

    handleSubmit() {
        let {isDisabled, vehicleInsuranceDate} = this.state;
        const {id} = this.state.useraccount;
        if (
            isDisabled ||
            !vehicleInsuranceDate.isValid() || vehicleInsuranceDate < moment()
        ) {
            if (!vehicleInsuranceDate.isValid() || vehicleInsuranceDate < moment()) {
                toast.warn('Vui lòng chọn ngày đúng');
            }
        } else {
            const headers = new Headers();
            headers.append('Authorization', 'Bearer ' + this.state.useraccount.token);
            headers.append('Content-Type', 'application/json');


            const config = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    'vehicleInsuranceDate': vehicleInsuranceDate,
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
                        let {vehicleInsuranceFront, vehicleInsuranceBehind} = this.state.user;
                        if (vehicleInsuranceFront!== undefined && vehicleInsuranceBehind !== undefined) {
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



    handlevehicleInsuranceFront(ev) {
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
            data.append('expression', 'vehicleInsuranceFront');

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

    handlevehicleInsuranceBehind(ev) {
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
        data.append('expression', 'vehicleInsuranceBehind');
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
                {this.state.isRefesh ? (<Redirect to="/doccuments/vehicle-insurance" />) : ""}
                <div style={{marginTop: "4em"}} className="profile-doccument">
                    <Container>
                        <div className="profile-title">
                            <h2>Bảo hiểm xe(Mặt trước)<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputFront = ref;
                                }} type="file" onChange={this.handlevehicleInsuranceFront} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.vehicleInsuranceFront !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.vehicleInsuranceFront}
                                         alt="avatar"/>
                                }
                                {
                                    this.state.user.vehicleInsuranceFront === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh </p>
                            </div>

                        </div>
                        <div className="profile-title">
                            <h2>Bảo hiểm xe(Mặt sau)<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputBehind = ref;
                                }} type="file" onChange={this.handlevehicleInsuranceBehind} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.vehicleInsuranceBehind !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.vehicleInsuranceBehind}
                                         alt="avatar"/>
                                }
                                {
                                    this.state.user.vehicleInsuranceBehind === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh </p>
                            </div>

                        </div>
                        <div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">văn bản còn hiệu lực, chưa hết hạn.</div>
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
                            <p>Ngày hết hạn <span className="warning">*</span></p>
                            <div>
                                <DatePicker
                                    selected={this.state.vehicleInsuranceDate}
                                    onChange={this.handleChangeDate}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="DD/MM/YYYY"
                                />
                            </div>
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

export default VehicleInsurance;
