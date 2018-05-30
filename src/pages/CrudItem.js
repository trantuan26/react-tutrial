import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../App.css';
const propTypes = {
    name: PropTypes.string.isRequired,
    onClicked: PropTypes.func,
    price: PropTypes.any
};

class ProductItem extends Component {
    constructor(props){
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(){
       const { name, onDelete } = this.props;
       onDelete(name);
    }

    render() {
        const { price, name } = this.props;
        return (
            <div >
                    <span>
                        {name}
                    </span>
                    {' | '}
                    <span>
                        {price}
                    </span>

                <button onClick={this.onDelete}>Delete</button>
            </div>
        );
    }
}

ProductItem.propTypes = propTypes;
export default ProductItem;
