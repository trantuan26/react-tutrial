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


class VehicleImage extends React.Component {
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
                vehicleImage1: '',
                vehicleImage2: '',
                vehicleImage3: '',
                vehicleImage4: '',
            },

            isRedirect: false,
            isRefesh: false,

        };

        this.handlevehicleImage1 = this.handlevehicleImage1.bind(this);
        this.handlevehicleImage2 = this.handlevehicleImage2.bind(this);
        this.handlevehicleImage3 = this.handlevehicleImage3.bind(this);
        this.handlevehicleImage4 = this.handlevehicleImage4.bind(this);


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


    handlevehicleImage1(ev) {
        ev.preventDefault();

        if (this.state.useraccount.id === undefined
            || this.state.useraccount.id === ''
            || this.state.user.phone === undefined
            || this.state.user.phone === ''
        ) {
            toast.warn('Vui lòng đăng xuất và đăng nhập lại mới có thể thực hiện công việc này');
        } else {
            const data = new FormData();
            data.append('avatar', this.uploadInputvehicleImage1.files[0]);
            data.append('id', this.state.useraccount.id);
            data.append('folder', this.state.user.phone);
            data.append('expression', 'vehicleImage1');

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

    handlevehicleImage2(ev) {
        ev.preventDefault();

        if (this.state.useraccount.id === undefined
            || this.state.useraccount.id === ''
            || this.state.user.phone === undefined
            || this.state.user.phone === ''
        ) {
            toast.warn('Vui lòng đăng xuất và đăng nhập lại mới có thể thực hiện công việc này');
        } else {
            const data = new FormData();
            data.append('avatar', this.uploadInputvehicleImage2.files[0]);
            data.append('id', this.state.useraccount.id);
            data.append('folder', this.state.user.phone);
            data.append('expression', 'vehicleImage2');

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

    handlevehicleImage3(ev) {
        ev.preventDefault();

        if (this.state.useraccount.id === undefined
            || this.state.useraccount.id === ''
            || this.state.user.phone === undefined
            || this.state.user.phone === ''
        ) {
            toast.warn('Vui lòng đăng xuất và đăng nhập lại mới có thể thực hiện công việc này');
        } else {
            const data = new FormData();
            data.append('avatar', this.uploadInputvehicleImage3.files[0]);
            data.append('id', this.state.useraccount.id);
            data.append('folder', this.state.user.phone);
            data.append('expression', 'vehicleImage3');

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

    handlevehicleImage4(ev) {
        ev.preventDefault();

        if (this.state.useraccount.id === undefined
            || this.state.useraccount.id === ''
            || this.state.user.phone === undefined
            || this.state.user.phone === ''
        ) {
            toast.warn('Vui lòng đăng xuất và đăng nhập lại mới có thể thực hiện công việc này');
        } else {
            const data = new FormData();
            data.append('avatar', this.uploadInputvehicleImage4.files[0]);
            data.append('id', this.state.useraccount.id);
            data.append('folder', this.state.user.phone);
            data.append('expression', 'vehicleImage4');

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
                {this.state.isRefesh ? (<Redirect to="/doccuments/vehicle-image"/>) : ""}
                <div style={{marginTop: "4em"}} className="profile-doccument">
                    <Container>
                        <div className="profile-title">
                            <h2>Hình 1<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputvehicleImage1 = ref;
                                }} type="file" onChange={this.handlevehicleImage1} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.vehicleImage1 !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.vehicleImage1}
                                         alt="avatar"/>
                                }
                                {
                                    this.state.user.vehicleImage1 === undefined &&
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
                                    this.uploadInputvehicleImage2 = ref;
                                }} type="file" onChange={this.handlevehicleImage2} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.vehicleImage2 !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.vehicleImage2}
                                         alt="avatar"/>
                                }
                                {
                                    this.state.user.vehicleImage2 === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh</p>
                            </div>
                        </div>
                        <div className="profile-title">
                            <h2>Hình 3<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputvehicleImage3 = ref;
                                }} type="file" onChange={this.handlevehicleImage3} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.vehicleImage3 !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.vehicleImage3}
                                         alt="avatar"/>
                                }
                                {
                                    this.state.user.vehicleImage3 === undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}} src={picture} alt="avatar"/>
                                }

                                <p> Bấm để chọn ảnh</p>
                            </div>
                        </div>
                        <div className="profile-title">
                            <h2>Hình 4<span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container">
                                <input ref={(ref) => {
                                    this.uploadInputvehicleImage4 = ref;
                                }} type="file" onChange={this.handlevehicleImage4} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.vehicleImage4 !== undefined &&
                                    <img className="img-fluid" style={{maxHeight: "200px"}}
                                         src={Api.AVATAR + this.state.user.phone + '/' + this.state.user.vehicleImage4}
                                         alt="avatar"/>
                                }
                                {
                                    this.state.user.vehicleImage4 === undefined &&
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

export default VehicleImage;
