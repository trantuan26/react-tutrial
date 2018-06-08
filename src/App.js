import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/mdb.css';
import './App.css';

class App extends Component {
     componentWillMount() {
    }

    componentWillReceiveProps() {
        console.log('app componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('app shouldComponentUpdate');
        return true;
    }

    componentDidMount() {
        console.log('app componentDidMount');
    }


    render() {
        console.log('app render');

        return (
            <Router>
                <div className="flyout">

                    <Routes />
                    {/*<FooterMain/>*/}
                </div>
            </Router>
        );
    }
}

export default App;
