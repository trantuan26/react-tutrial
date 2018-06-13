import React from "react";
import {
   Route, Switch
} from "react-router-dom";
import ButtonPage from './pages/ButtonPage';
import CSSPage from './pages/CSSPage';
import TablePage from './pages/TablePage';
import BadgePage from './pages/BadgePage';
import BreadcrumbPage from './pages/BreadcrumbPage';
import FaPage from './pages/FaPage';
import ComponentsPage from './pages/ComponentsPage';
import ModalPage from './pages/ModalPage';
import AdvancedPage from './pages/AdvancedPage';
import ProgressPage from './pages/ProgressPage';
import InputPage from './pages/InputPage';
import MediaPage from './pages/MediaPage';
import JumbotronPage from './pages/JumbotronPage';
import AlertPage from './pages/AlertPage';
import CardsPage from './pages/CardsPage';
import PaginationPage from './pages/PaginationPage';
import PopoverPage from './pages/PopoverPage';
import ListGroupPage from './pages/ListGroupPage';
import CarouselPage from './pages/CarouselPage';
import CollapsePage from './pages/CollapsePage';
import TooltipsPage from './pages/TooltipsPage';
import FooterPage from './pages/FooterPage';
import MasksPage from './pages/MasksPage';
import DropdownPage from './pages/DropdownPage';
import VideoCarouselPage from './pages/VideoCarouselPage';
import HoverPage from './pages/HoverPage';
import FormsPage from './pages/FormsPage';
import ChartsPage from './pages/ChartsPage';
import ScrollBarPage from './pages/ScrollBarPage';
import CRUD from './pages/Crud';

import Home from './Componet/Home/Home';
import About from './Componet/About/About';
import SignUp from './Componet/Contact/SignUp';
import SignIn from './Componet/Contact/SignIn';
import Contact from './Componet/Contact/Contact';
import DocumentPage from './Componet/UserInfo/DocumentPage';
import Privacy from './Componet/Privacy/Privacy';
import Verify from './Componet/Verify/Verify';
import ProfilePicture from './Componet/UserInfo/ProfilePicture';
import IndentilyCard from './Componet/UserInfo/IndentilyCard';
import VehicleImage from './Componet/UserInfo/VehicleImage';
import VehicleLog from './Componet/UserInfo/VehicleLog';
import DrivingLicense from './Componet/UserInfo/DrivingLicense';
import VehicleInsurance from './Componet/UserInfo/VehicleInsurance';
import DeviceInformation from './Componet/UserInfo/DeviceInformation';
import StudentCardClearance from "./Componet/UserInfo/StudentCardClearance";
import RegistrationBookClearance from "./Componet/UserInfo/RegistrationBookClearance";
import CVClearance from "./Componet/UserInfo/CVClearance";
import EmergencyContact from "./Componet/UserInfo/EmergencyContact";




const Routes = () => (
    <Switch>
        <Route exact path='/' strict  component={Home}/>
        <Route path='/about' component={About}/>
        <Route exact path='/contact' strict component={Contact}/>
        <Route exact path='/signup' strict component={SignUp}/>
        <Route exact path='/signin' strict component={SignIn}/>
        <Route path='/example' component={CRUD}/>
        <Route path='/privacy' component={Privacy}/>
        <Route path='/verify' component={Verify}/>
        <Route path='/update-user-acount' component={DocumentPage}/>
        <Route path='/documents/profile-pictrue' component={ProfilePicture}/>
        <Route path='/documents/identily-card' component={IndentilyCard}/>
        <Route path='/documents/vehicle-image' component={VehicleImage}/>
        <Route path='/documents/vehicle-log' component={VehicleLog}/>
        <Route path='/documents/vehicle-license' component={DrivingLicense}/>
        <Route path='/documents/vehicle-insurance' component={VehicleInsurance}/>
        <Route path='/documents/device-information' component={DeviceInformation}/>
        <Route path='/documents/student-card-clearance' component={StudentCardClearance}/>
        <Route path='/documents/registration-book-clearance' component={RegistrationBookClearance}/>
        <Route path='/documents/cv-clearance' component={CVClearance}/>
        <Route path='/documents/emergency-contact' component={EmergencyContact}/>

        <Route exact path='/css' component={CSSPage} />
        <Route exact path='/css/table' component={TablePage} />
        <Route exact path='/components' component={ComponentsPage} />
        <Route path='/components/badge' component={BadgePage} />
        <Route path='/components/breadcrumb' component={BreadcrumbPage} />
        <Route path='/components/media' component={MediaPage} />
        <Route path='/components/input' component={InputPage} />
        <Route path='/components/alert' component={AlertPage} />
        <Route path='/components/dropdown' component={DropdownPage} />
        <Route path='/css/icons' component={FaPage} />
        <Route path='/css/jumbotron' component={JumbotronPage} />
        <Route path='/components/cards' component={CardsPage} />
        <Route path='/components/buttons' component={ButtonPage} />
        <Route path='/components/forms' component={FormsPage} />
        <Route path='/components/progress' component={ProgressPage} />
        <Route path='/components/popover' component={PopoverPage} />
        <Route path='/components/pagination' component={PaginationPage} />
        <Route path='/components/list-group' component={ListGroupPage} />
        <Route path='/components/tooltips' component={TooltipsPage} />
        <Route path='/components/footer' component={FooterPage} />
        <Route exact path='/advanced' component={AdvancedPage} />
        <Route path='/advanced/modal' component={ModalPage} />
        <Route path='/advanced/carousel' component={CarouselPage} />
        <Route path='/advanced/collapse' component={CollapsePage} />
        <Route path='/advanced/videocarousel' component={VideoCarouselPage} />
        <Route path='/css/masks' component={MasksPage} />
        <Route path='/css/hover' component={HoverPage} />
        <Route path='/advanced/videocarousel' component={VideoCarouselPage} />
        <Route path='/advanced/charts' component={ChartsPage} />
        <Route path='/advanced/scrollbar' component={ScrollBarPage} />
        <Route render = { function() {
            return <h1>Not Found</h1>;
        }} />
    </Switch>
);


export default Routes;
