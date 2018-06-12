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


class IndentilyCard extends React.Component {
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
                identityCardFront: '',
                identityCardBehind: '',
                identityCardNumber: '',
                identityCardDateIssued: '',
            },
            startDate: moment(),
            isDisabled: true,
            CardNumberValid: false,
            isRedirect: false,
            isRefesh: false,
            identityCardNumber: '',
        };

        this.handleIdentityCardFront = this.handleIdentityCardFront.bind(this);
        this.handleIdentityCardBehind = this.handleIdentityCardBehind.bind(this);
        this.handleIdentityCardNumber = this.handleIdentityCardNumber.bind(this);
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
        let {identityCardDateIssued, identityCardNumber} = this.state.user;
        if (identityCardDateIssued !== undefined && identityCardNumber !== undefined) {
            this.setState({startDate: moment(identityCardDateIssued), isDisabled:false ,identityCardNumber:identityCardNumber});
        }
    }

    handleIdentityCardNumber(event) {
        if (event.target.value.toString().length === 9) {
            this.setState({
                identityCardNumber: event.target.value,
                CardNumberValid: false,
                isDisabled: false,
            });
        } else {
            this.setState({
                CardNumberValid: true,
                isDisabled: true,
            });
        }
    }

    handleSubmit() {
        const {isDisabled, startDate, identityCardNumber} = this.state;
        const {id} = this.state.useraccount;
        if (isDisabled || !startDate.isValid() || identityCardNumber.toString().length !== 9) {
            console.log(isDisabled, startDate.isValid(), identityCardNumber)
            if (!startDate.isValid()) {
                toast.warn('Vui lòng chọn ngày đúng');
            }
            if (identityCardNumber.toString().length !== 9) {
                this.setState({
                    CardNumberValid: true,
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
                    'identityCardNumber': identityCardNumber,
                    'identityCardDateIssued': startDate,
                    'id': id,
                }),
            };
            fetch(Api.PROFILE_DOC, config)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.value === true) {
                        setInStorage(Config.USERINFO, responseJson.response);
                        toast.success('Cập nhật thành công');
                        setTimeout(function () {
                            this.setState({user: responseJson.response, isRedirect:true});
                        }.bind(this),2000);

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

    async handleChangeDate(date) {
        if (date !== undefined) {
            await this.setState({
                startDate: date
            });
        }
    }

    handleIdentityCardFront(ev) {
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
            data.append('expression', 'identityCardFront');

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

    handleIdentityCardBehind(ev) {
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
        data.append('expression', 'identityCardBehind');
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
                {this.state.isRefesh ? (<Redirect to="/doccuments/identily-card" />) : ""}
                <div style={{marginTop: "4em"}} className="profile-doccument">
                    <Container>
                        <div className="profile-title">
                            <h2>Chứng Minh Nhân Dân(Mặt trước)<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputFront = ref;
                                }} type="file" onChange={this.handleIdentityCardFront} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.identityCardFront !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.identityCardFront}
                                         alt="avatar"/>
                                }
                                {
                                    this.state.user.identityCardFront === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh </p>
                            </div>

                        </div>
                        <div className="profile-title">
                            <h2>Chứng Minh Nhân Dân(Mặt sau)<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputBehind = ref;
                                }} type="file" onChange={this.handleIdentityCardBehind} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.identityCardBehind !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.identityCardBehind}
                                         alt="avatar"/>
                                }
                                {
                                    this.state.user.identityCardBehind === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh </p>
                            </div>

                        </div>
                        <div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">CMND, chưa hết hạn.</div>
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
                            <p>Số chứng minh nhân <span className="warning">*</span></p>
                            <input type="number" value={this.state.user.identityCardNumber} onChange={this.handleIdentityCardNumber} className="card-number"
                                   name="CardNumber"/>
                        </div>
                        <Collapse isOpen={this.state.CardNumberValid}>
                            <p> Không được rỗng, phải là 9 số </p>
                        </Collapse>
                        <div className="indentily-number">
                            <p>Ngày cấp <span className="warning">*</span></p>
                            <div>
                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChangeDate}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="DD/MM/YYYY"
                                />
                            </div>
                        </div>
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

export default IndentilyCard;
