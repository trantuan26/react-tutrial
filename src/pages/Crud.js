import React, {Component} from 'react';
import './Crud.css';
import '../App.css';
import ProductItem from './CrudItem';
import ProductAdd from './CrudAdd';
import { getFromStorage, setInStorage } from '../utils/storage';

class CRUD extends Component {
    constructor(props){
        super(props);
        this.state = {
            products:[]
        }

        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onSubmitEdit = this.onSubmitEdit.bind(this);
    }

    componentWillMount(){
        let products = getFromStorage('products');
        if (products) {
            this.setState({products});
        }
    }




    onDelete(name){
        let products = this.state.products;
        let filteredProducts = products.filter(product =>{
           return product.name !== name;
        });
        setInStorage('products',filteredProducts);
        this.setState({products: filteredProducts});

    }

    onAdd(name, price){
        let products = this.state.products;

        products.push({
            name,
            price
        })
        setInStorage('products',products);
        this.setState({products});
    }

    onSubmitEdit(name, price, key){
        let products = this.state.products;
        products =  products.map(product => {
            if (product.name === key) {
                product.name = name;
                product.price = price;
            }
            return product;
        })
        setInStorage('products',products);
        this.setState({products});
    }

    render() {

        return (
            <div className="CRUD">
                <h1>Products manager</h1>
                <ProductAdd
                    onAdd={this.onAdd}
                />
                {
                    this.state.products.map(product => {
                      return (
                      <ProductItem
                       key={product.name}
                       {...product}
                          onDelete={this.onDelete}
                       onSubmitEdit={this.onSubmitEdit}
                      />
                      );
                    })
                }
            </div>
        );
    }
}

export default CRUD;
