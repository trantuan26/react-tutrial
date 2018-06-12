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

class EmergencyContact extends React.Component {
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
                emergencyContactName: '',
                emergencyContactRelationship: '',
                emergencyContactPhone: '',
                emergencyContactAddress: '',
            },
            isDisabled: true,
            ContactNameValid: false,
            ContactRelationshipValid: false,
            ContactPhoneValid: false,
            ContactAddressValid: false,
            isRedirect: false,
            isRefesh: false,
            emergencyContactName: '',
            emergencyContactRelationship: '',
            emergencyContactPhone: '',
            emergencyContactAddress: '',
        };
        this.handleContactRelationship = this.handleContactRelationship.bind(this);
        this.handleContactName = this.handleContactName.bind(this);
        this.handleContactPhone = this.handleContactPhone.bind(this);
        this.handleContactAddress = this.handleContactAddress.bind(this);
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
        let {emergencyContactRelationship,
            emergencyContactName,
            emergencyContactPhone,
            emergencyContactAddress} = this.state.user;

        if (emergencyContactName !== undefined) {
            this.setState({
                emergencyContactName: emergencyContactName,
            });
        }
        if (emergencyContactRelationship !== undefined) {
            this.setState({
                emergencyContactRelationship: emergencyContactRelationship,
            });
        }
        if (emergencyContactPhone !== undefined) {
            this.setState({
                emergencyContactPhone: emergencyContactPhone,
            });
        }
        if (emergencyContactAddress !== undefined) {
            this.setState({
                emergencyContactAddress: emergencyContactAddress,
            });
        }
        if (emergencyContactRelationship !== undefined && emergencyContactName !== undefined &&
            emergencyContactPhone !== undefined && emergencyContactAddress !== undefined) {
            this.setState({
                isDisabled: false,
            });
        }
    }

    handleContactRelationship(event) {
        let {emergencyContactRelationship, emergencyContactAddress, emergencyContactPhone} = this.state;
        if (event.target.value.toString().length >= 0) {
            this.setState({
                emergencyContactName: event.target.value,
                ContactRelationshipValid: false,
            });
            if (
                emergencyContactRelationship.toString().length >= 0 ||
                emergencyContactAddress.toString().length >= 0 ||
                emergencyContactPhone.toString().length >= 0
            ) {
                this.setState({
                    isDisabled: false,
                });
            }
        } else {
            this.setState({
                ContactRelationshipValid: true,
                isDisabled: true
            });
        }
    }


    handleContactName(event) {
        let {emergencyContactName, emergencyContactPhone, emergencyContactAddress} = this.state;
        if (event.target.value.toString().length >= 0) {
            this.setState({
                emergencyContactRelationship: event.target.value,
                ContactNameValid: false,
            });
            if (emergencyContactName.toString().length >= 0 ||
                emergencyContactAddress.toString().length >= 0 ||
                emergencyContactPhone.toString().length >= 0
            ) {
                this.setState({
                    isDisabled: false,
                });
            }
        } else {
            this.setState({
                ContactNameValid: true,
            });
        }
    }

    handleContactPhone(event) {
        let {emergencyContactName, emergencyContactRelationship, emergencyContactAddress} = this.state;
        if (event.target.value.toString().length >= 0) {
            this.setState({
                emergencyContactPhone: event.target.value,
                ContactPhoneValid: false,
            });
            if (emergencyContactName.toString().length >= 0 ||
                emergencyContactAddress.toString().length >= 0 ||
                emergencyContactRelationship.toString().length >= 0
            ) {
                this.setState({
                    isDisabled: false,
                });
            }
        } else {
            this.setState({
                ContactPhoneValid: true,
            });
        }
    }

    handleContactAddress(event) {
        let {emergencyContactName, emergencyContactRelationship, emergencyContactPhone} = this.state;
        if (event.target.value.toString().length >= 0) {
            this.setState({
                emergencyContactAddress: event.target.value,
                ContactAddressValid: false,
            });
            if (emergencyContactName.toString().length >= 0 ||
                emergencyContactPhone.toString().length >= 0 ||
                emergencyContactRelationship.toString().length >= 0
            ) {
                this.setState({
                    isDisabled: false,
                });
            }
        } else {
            this.setState({
                ContactAddressValid: true,
            });
        }
    }

    handleSubmit() {
        let {isDisabled,
            emergencyContactRelationship,
            emergencyContactName,
            emergencyContactPhone,
            emergencyContactAddress} = this.state;
        const {id} = this.state.useraccount;
        if (
            isDisabled ||
            emergencyContactName.toString().length < 1 ||
            emergencyContactRelationship.toString().length < 1 ||
            emergencyContactPhone.toString().length < 1 ||
            emergencyContactAddress.toString().length < 1
        ) {

            if (emergencyContactName.toString().length < 1) {
                this.setState({
                    ContactRelationshipValid: true,
                    isDisabled: true,
                });
            }
            if (emergencyContactRelationship.toString().length < 1) {
                this.setState({
                    ContactNameValid: true,
                    isDisabled: true,
                });
            }
            if (emergencyContactPhone.toString().length < 1) {
                this.setState({
                    ContactPhoneValid: true,
                    isDisabled: true,
                });
            }
            if (emergencyContactAddress.toString().length < 1) {
                this.setState({
                    ContactAddressValid: true,
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
                    'emergencyContactName': emergencyContactName,
                    'emergencyContactRelationship': emergencyContactRelationship,
                    'emergencyContactPhone': emergencyContactPhone,
                    'emergencyContactAddress': emergencyContactAddress,
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
                {this.state.isRefesh ? (<Redirect to="/doccuments/emergency-contact"/>) : ""}
                <div style={{marginTop: "4em"}} className="profile-doccument">
                    <Container>
                        <div>
                            <h1>Thông tin liên hệ khẩn cấp
                            </h1>
                            <p> Trong trường hợp khẩn cấp, Grab sẽ liên lạc với người có thông tin bên dưới.</p>
                        </div>
                        <div className="indentily-number">
                            <p>Tên người liên lạc khẩn cấp<span className="warning">*</span></p>
                            <input type="text" value={this.state.user.emergencyContactName}
                                   onChange={this.handleContactRelationship} className="card-number"
                                   name="CardNumber" placeholder="Nguyễn văn A"/>
                        </div>
                        <Collapse isOpen={this.state.ContactRelationshipValid}>
                            <p> Không được rỗng </p>
                        </Collapse>

                        <div className="indentily-number">
                            <p>Quan hệ <span className="warning">*</span></p>
                            <input type="text" value={this.state.user.emergencyContactRelationship}
                                   onChange={this.handleContactName} className="card-number"
                                   name="CardNumber" placeholder="Cha"/>
                        </div>
                        <Collapse isOpen={this.state.ContactNameValid}>
                            <p> Không được rỗng </p>
                        </Collapse>

                        <div className="indentily-number">
                            <p>Điện thoại <span className="warning">*</span></p>
                            <input type="text" value={this.state.user.emergencyContactPhone}
                                   onChange={this.handleContactPhone} className="card-number"
                                   name="CardNumber" placeholder="0977779999"/>
                        </div>
                        <Collapse isOpen={this.state.ContactPhoneValid}>
                            <p> Không được rỗng </p>
                        </Collapse>
                        <div className="indentily-number">
                            <p>Địa chỉ <span className="warning">*</span></p>
                            <input type="text" value={this.state.user.emergencyContactAddress}
                                   onChange={this.handleContactAddress} className="card-number"
                                   name="CardNumber" placeholder="65 Lý Tự Trọng, Bến Nghé, Quận 1, Hồ Chí Minh"/>
                        </div>
                        <Collapse isOpen={this.state.ContactAddressValid}>
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

export default EmergencyContact;
