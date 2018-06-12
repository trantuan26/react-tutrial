import React, {Component} from 'react';
import {Collapse, Container, Row, Col} from 'mdbreact';

class CollapsePage extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onClick1 = this.onClick1.bind(this);
        this.onClick2 = this.onClick2.bind(this);
        this.onClick3 = this.onClick3.bind(this);

        this.state = {
            collapse: false,
            accordion: 1
        };
    }

    toggle() {
        this.setState({collapse: !this.state.collapse});
    }

    onClick1() {
        let state = '';

        if (this.state.accordion !== 1) {
            state = 1;
        } else {
            state = false;
        }

        this.setState({
            accordion: state
        });
    }

    onClick2() {
        let state = '';

        if (this.state.accordion !== 2) {
            state = 2;
        } else {
            state = false;
        }

        this.setState({
            accordion: state
        });
    }

    onClick3() {
        let state = '';

        if (this.state.accordion !== 3) {
            state = 3;
        } else {
            state = false;
        }

        this.setState({
            accordion: state
        });
    }

    render() {
        return (
            <div style={{marginTop: "4em"}}>
                <Container className="home-container">
                    <Row>
                        <Col md="10" className="mx-auto mt-4">
                            <h1 className="text-center">Grab Privacy Policy</h1>
                            <div>
                                <div>
                                    <h3 color="primary" onClick={this.onClick1}
                                        style={{marginBottom: '1rem'}}>Collection of
                                        Personal Data</h3>
                                </div>
                                <Collapse isOpen={this.state.accordion === 1}>
                                    “Personal Data” means information about you, from which you are identifiable,
                                    including
                                    but not limited to your name, nationality, address, telephone number, fax number,
                                    bank
                                    details, credit card details, gender, resident status, financial background,
                                    personal
                                    interests, email address, your occupation, your photo, any information about you
                                    which
                                    you have provided to Grab Group in registration forms, application forms or any
                                    other
                                    similar forms and/or any information about you that has been or may be collected,
                                    stored, used and/or processed by Grab Group from time to time and includes sensitive
                                    personal data such as your identification card number, driving licence number, birth
                                    certificate number, passport number, race, ethnic origin, date of birth, marital
                                    status,
                                    education background, and data relating to health, religious or other similar
                                    beliefs.
                                    If you are a service provider, we may also collect telematics data (such as your
                                    speed,
                                    acceleration, and braking data).

                                    The provision of your Personal Data is voluntary. However, if you do not provide
                                    Grab
                                    Group your Personal Data, Grab Group will not be able to process your Personal Data
                                    for
                                    the Purposes and Additional Purposes outlined below and may cause Grab Group to be
                                    unable to provide services or products to or accept payments from you.

                                    If you are an agent, vendor, supplier or service provider, provision of your
                                    Personal
                                    Data is mandatory and failure to provide your Personal Data, may be a breach of laws
                                    or
                                    regulatory requirements, and may cause Grab Group to be unable to engage you to
                                    provide
                                    services or products or issue payments to you for products or services provided.

                                    In addition to the Personal Data you provide to Grab Group directly, Grab Group may
                                    collect your Personal Data from publicly available sources or from third parties,
                                    for
                                    example:
                                </Collapse>

                                <div>
                                    <h3 color="primary" onClick={this.onClick2} style={{marginBottom: '1rem'}}>Purposes
                                        of
                                        Processing</h3>
                                </div>
                                <Collapse isOpen={this.state.accordion === 2}>
                                    Grab Group may use and process your Personal Data for business and transportation,
                                    delivery and logistics (including food and beverage) and payment and financial
                                    services
                                    activities of Grab Group which shall include, without limitation the following
                                    (“Purposes”):
                                    Where you are a customer of the services provided by Grab Group:

                                    to perform the Grab Group’s obligations in respect of any contract entered into with
                                    you;
                                    to provide you with any service you have requested;
                                    to process your subscriptions and to deliver the services to you;
                                    where you have requested to download and use the Grab or Grab Driver App, or any
                                    other
                                    Grab Group application, to process your request, to deliver the App to you and to
                                    provide you a license for the use of the App;
                                    to process and manage your rewards and loyalty points;
                                    to process your participation in any events, activities, focus groups, research
                                    studies,
                                    contests, promotions, polls, surveys or any productions;
                                    to process, manage or verify your application for subscription with the Grab Group
                                    and
                                    to provide you the benefits offered to subscribers;
                                    to validate your bookings and process payments relating to any products or services
                                    you
                                    have requested;
                                    to understand and analyse our sales as well as your needs and preferences;
                                    to develop, enhance and provide products and services to meet your needs;
                                    to process exchanges or product returns;
                                    to use Cookies to enhance our processes, advertising, notifications, authentication,
                                    security and compliance, analytics and preference management.
                                    Where you are an agent, vendor, supplier, partner, contractor or service provider:

                                    for the purposes of engaging you to provide services or products;
                                    to facilitate or enable any checks as may be required by Grab Group in order to
                                    engage
                                    you;
                                    to process payments relating to any products or services you have provided;
                                    to provide personalised feedback to you, so that you are able to identify specific
                                    areas
                                    for improvement;
                                    to assess safety and quality;
                                    to contact you in relation to the provision of your services.
                                </Collapse>

                                <div>
                                    <h3 color="primary" onClick={this.onClick3} style={{marginBottom: '1rem'}}>Marketing
                                        and
                                        promotional purposes</h3>
                                </div>
                                <Collapse isOpen={this.state.accordion === 3}>
                                    Grab Group may also use and process your data for other purposes such as
                                    (“Additional
                                    Purposes”):

                                    To send you alerts, newsletters, updates, mailers, promotional materials, special
                                    privileges, festive greetings from Grab Group, its partners, sponsors or
                                    advertisers;
                                    To notify and invite you to events or activities organized by Grab Group, its
                                    partners,
                                    sponsors or advertisers;
                                    To process your registration to participate in or attend an event or activity and to
                                    communicate with you regarding your attendance at the event or activity;
                                    To share your Personal Data amongst its subsidiaries, associate companies and
                                    jointly
                                    controlled entities as well as with its agent, vendor, supplier, partner, contractor
                                    or
                                    service provider who may communicate with you to market their products, services,
                                    events
                                    or promotions;
                                    by way of post, telephone call, short message service (SMS), online messaging
                                    service,
                                    by hand and/or by email.
                                </Collapse>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default CollapsePage;
