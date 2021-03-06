import React from 'react';
import {
    Redirect
} from "react-router-dom";
import {Container } from 'mdbreact';
import {ToastContainer, toast} from 'react-toastify';

import Api from '../../utils/api';
import {getFromStorage, setInStorage} from "../../utils/storage";
import Config from "../../utils/config";
import './Profile.css';
import picture from '../../img/picture.svg';


class RegistrationBookClearance extends React.Component {
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
                registrationBookClearance1: '',
                registrationBookClearance2: '',
                registrationBookClearance3: '',
            },

            isRedirect: false,
            isRefesh: false,

        };

        this.handleregistrationBookClearance1 = this.handleregistrationBookClearance1.bind(this);
        this.handleregistrationBookClearance2 = this.handleregistrationBookClearance2.bind(this);
        this.handleregistrationBookClearance3 = this.handleregistrationBookClearance3.bind(this);


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


    handleregistrationBookClearance1(ev) {
        ev.preventDefault();

        if (this.state.useraccount.id === undefined
            || this.state.useraccount.id === ''
            || this.state.user.phone === undefined
            || this.state.user.phone === ''
        ) {
            toast.warn('Vui lòng đăng xuất và đăng nhập lại mới có thể thực hiện công việc này');
        } else {
            const data = new FormData();
            data.append('avatar', this.uploadInputregistrationBookClearance1.files[0]);
            data.append('id', this.state.useraccount.id);
            data.append('folder', this.state.user.phone);
            data.append('expression', 'registrationBookClearance1');

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

    handleregistrationBookClearance2(ev) {
        ev.preventDefault();

        if (this.state.useraccount.id === undefined
            || this.state.useraccount.id === ''
            || this.state.user.phone === undefined
            || this.state.user.phone === ''
        ) {
            toast.warn('Vui lòng đăng xuất và đăng nhập lại mới có thể thực hiện công việc này');
        } else {
            const data = new FormData();
            data.append('avatar', this.uploadInputregistrationBookClearance2.files[0]);
            data.append('id', this.state.useraccount.id);
            data.append('folder', this.state.user.phone);
            data.append('expression', 'registrationBookClearance2');

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

    handleregistrationBookClearance3(ev) {
        ev.preventDefault();

        if (this.state.useraccount.id === undefined
            || this.state.useraccount.id === ''
            || this.state.user.phone === undefined
            || this.state.user.phone === ''
        ) {
            toast.warn('Vui lòng đăng xuất và đăng nhập lại mới có thể thực hiện công việc này');
        } else {
            const data = new FormData();
            data.append('avatar', this.uploadInputregistrationBookClearance3.files[0]);
            data.append('id', this.state.useraccount.id);
            data.append('folder', this.state.user.phone);
            data.append('expression', 'registrationBookClearance3');

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


    render() {
        return (
            <div>
                {this.state.isRedirect ? (<Redirect to="/update-user-acount"/>) : ""}
                {this.state.isRefesh ? (<Redirect to="/doccuments/registration-book-clearance"/>) : ""}
                <div style={{marginTop: "4em"}} className="profile-doccument">
                    <Container>
                        <div className="profile-title">
                            <h1>Sổ hộ khẩu (chỉ áp dụng nếu bạn không phải là sinh viên)</h1>
                        </div> <div className="profile-title">
                            <h2>Hình 1<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputregistrationBookClearance1 = ref;
                                }} type="file" onChange={this.handleregistrationBookClearance1} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.registrationBookClearance1 !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.registrationBookClearance1}
                                         alt="avatar"/>
                                }
                                {
                                    this.state.user.registrationBookClearance1 === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh</p>
                            </div>
                        </div>
                        <div className="profile-title">
                            <h2>Hình 2<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputregistrationBookClearance2 = ref;
                                }} type="file" onChange={this.handleregistrationBookClearance2} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.registrationBookClearance2 !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.registrationBookClearance2}
                                         alt="avatar"/>
                                }
                                {
                                    this.state.user.registrationBookClearance2 === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh</p>
                            </div>
                        </div>
                        <div className="profile-title">
                            <h2>Hình 3</h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputregistrationBookClearance3 = ref;
                                }} type="file" onChange={this.handleregistrationBookClearance3} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.registrationBookClearance3 !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.registrationBookClearance3}
                                         alt="avatar"/>
                                }
                                {
                                    this.state.user.registrationBookClearance3 === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh</p>
                            </div>
                        </div>
                        <div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">Chụp ảnh bằng điện thoại, không dùng bản quét.</div>
                            </div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">Hình ảnh rõ nét, không bị mờ.</div>
                            </div>
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

export default RegistrationBookClearance;
