import React, {Component} from 'react';

import '../App.css';

class ProductAdd extends Component {
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
      e.preventDefault();
      this.props.onAdd(this.nameInput.value,this.priceInput.value);
    }

    render() {
        return (
            <div>
                <h1>Add product</h1>
                <form >
                    <input placeholder="Name"
                        ref={nameInput=>this.nameInput = nameInput}
                    />
                    <input placeholder="Price"
                        ref={priceInput=>this.priceInput = priceInput}
                    />
                    <button onClick={this.onSubmit}> Add </button>
                </form>
                <hr />
            </div>
        );
    }
}


export default ProductAdd;
