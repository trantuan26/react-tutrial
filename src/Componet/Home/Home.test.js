import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name:PropTypes.string.isRequired,
    onClicked:PropTypes.func,
    title:PropTypes.any
};

const defaultProps = {
    name: 'Default name of app'
}

class Home extends Component {
      render() {
        const { title, name, onClick } = this.props;
        return (
            <div className="Component">
                <h1>Title: {title}</h1>
                <h2>Name: {name}</h2>
                <div onClick={onClick}>Click Me</div>
            </div>
        );
    }
}
Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
export default Home;
