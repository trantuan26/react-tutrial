import React from 'react';
import {Container, Row} from 'mdbreact';
import Api from '../../utils/api';
import FooterMain from '../Footer/Footer';
import NavbarCus from '../Navbar/Navbar';
import Axios from "axios/index";

class ProfilePicture extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageURL: '',
        };

        this.handleUploadImage = this.handleUploadImage.bind(this);
    }

    handleUploadImage(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);

        // fetch(Api.PROFILE_PICTRUE, {
        //     method: 'POST',
        //     body: data,
        // })
        Axios.post(Api.PROFILE_PICTRUE, data).then((response) => {
            console.log(response);
            response.json().then((body) => {
                this.setState({imageURL: Api.SERVER + `/${body.file}`});
            });
        });
    }

    render() {
        return (
            <div>
                <NavbarCus/>
                <div style={{marginTop: "4em"}} className="main-doccument">
                    <Container>
                        <Row className="form-upload">
                            <form onSubmit={this.handleUploadImage}>
                                <div>
                                    <input ref={(ref) => {
                                        this.uploadInput = ref;
                                    }} type="file"/>
                                </div>
                                <div>
                                    <input ref={(ref) => {
                                        this.fileName = ref;
                                    }} type="text" placeholder="Enter the desired name of file"/>
                                </div>
                                <br/>
                                <div>
                                    <button type="submit">Upload</button>
                                </div>
                                <img src={this.state.imageURL} alt="img"/>
                            </form>
                        </Row>
                    </Container>
                </div>
                <FooterMain />
            </div>
        );
    }
}

export default ProfilePicture;
