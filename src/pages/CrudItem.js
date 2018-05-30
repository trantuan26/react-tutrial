import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const propTypes = {
    name: PropTypes.string.isRequired,
    onClicked: PropTypes.func,
    price: PropTypes.any
};

class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
        };

        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onSubmitEdit = this.onSubmitEdit.bind(this);
    }

    onDelete() {
        const {name, onDelete} = this.props;
        onDelete(name);
    }

    onEdit() {
        this.setState({
            isEdit: true
        });
    }

    onSubmitEdit(e){
        e.preventDefault();
        const {name} = this.props;
        this.props.onSubmitEdit(this.nameInput.value,this.priceInput.value,name);
        this.setState({
            isEdit: false
        });
    }

    render() {
        const {price, name} = this.props;
        return (
            <div>
                {
                    this.state.isEdit ?
                        (
                            <form>
                                <input placeholder="Name"
                                       ref={nameInput => this.nameInput = nameInput}
                                       defaultValue={name}
                                />
                                <input placeholder="Price"
                                       ref={priceInput => this.priceInput = priceInput}
                                       defaultValue={price}
                                />
                                <button onClick={this.onSubmitEdit}> Save </button>
                            </form>
                        )
                        : (
                            <div>
                                <span>{name}</span>
                                {' | '}
                                <span>{price}</span>
                                <button onClick={this.onEdit}>Edit</button>
                                {' | '}
                                <button onClick={this.onDelete}>Delete</button>
                            </div>
                        )
                }


            </div>

        );
    }
}

ProductItem.propTypes = propTypes;
export default ProductItem;
