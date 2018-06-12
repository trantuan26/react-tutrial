import React from 'react';
import {Container} from 'mdbreact';
import Api from '../../utils/api';
import {getFromStorage, setInStorage} from "../../utils/storage";
import Config from "../../utils/config";
import './Profile.css';
import boy from '../../img/boy.svg';

class ProfilePicture extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            useraccount: {
                id: '',
                token: '',
                activeType: '',
            },
            user: {
                fullName: '',
                phone: '',
                avatarLink: '',
            }
        };

        this.handleUploadImage = this.handleUploadImage.bind(this);
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

    handleUploadImage(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('avatar', this.uploadInput.files[0]);
        // data.append('filename', this.fileName.value);
        // data.append('id', '5b16b2430568813e28abde83');
        data.append('id', this.state.useraccount.id);

        console.log(this.state.useraccount.id, this.state.useraccount.token);

        const headers = new Headers();
        // headers.append('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTc1MjI3ODU2LCJjcmVhdGVfYXQiOiIyMDE4LTA2LTA1VDE1OjU0OjQzLjE4NloiLCJlbWFpbCI6IiIsIl9pZCI6IjViMTZiMjQzMDU2ODgxM2UyOGFiZGU4MyIsImlhdCI6MTUyODQ3MTM3NX0.WOOsXtfC8TzxnwbHoVH6uMemJozjG2cWMpXZUsi_Hh8');
        headers.append('Authorization', 'Bearer ' + this.state.useraccount.token);
        // headers.append('Accept','application/json');
        // headers.append('Content-Type','multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d');


        const config = {
            method: 'POST',
            headers: headers,
            body: data,
        }
        fetch(Api.PROFILE_PICTRUE, config)
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.value === true) {
                    //let {activeType, create_at, email, fullName, phone, roleType, updated_at, verifyType, _id} = responseJson.response;
                    // console.log(activeType, create_at, email, fullName, phone, roleType, updated_at, verifyType, _id);
                    setInStorage(Config.USERINFO, responseJson.response);
                    this.setState({user: responseJson.response})
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        return (
            <div>
                <div style={{marginTop: "4em"}} className="profile-doccument" >
                    <Container >
                        <div className="profile-title">
                            <h2>Chụp Ảnh Chân Dung <span className="warning">*</span></h2>
                        </div>
                        <div className="form-upload">

                            <div className="upload-container" >
                                <input ref={(ref) => {
                                    this.uploadInput = ref;
                                }} type="file" onChange={this.handleUploadImage} name="file"
                                       accept="image/*;capture=camera"/>
                            </div>

                            <div className="sample_doc">
                                {
                                    this.state.user.avatarLink !== undefined &&
                                    <img  className="img-fluid" style={{maxHeight: "200px"}} src={Api.AVATAR + this.state.user.phone + '/'+this.state.user.avatarLink}  alt="avatar" />
                                }
                                {
                                    this.state.user.avatarLink === undefined &&
                                    <img  className="img-fluid" style={{maxHeight: "200px"}} src={boy}  alt="avatar" />
                                }

                                <p> Bấm để chọn ảnh khác</p>
                            </div>

                        </div>
                        <div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">Hình chụp thẳng trực diện.</div>
                            </div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">Không đội nón, kính râm.</div>
                            </div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">Ảnh rõ nét, không bị mờ.</div>
                            </div>
                            <div className="list">
                                <div className="icon icon-tick"></div>
                                <div className="list-item">Nền trơn, màu trắng hoặc xanh dương.</div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default ProfilePicture;
