import React, {Component} from 'react';
import './Crud.css';
import '../App.css';
import ProductItem from './CrudItem';
import ProductAdd from './CrudAdd';
const products = [
    {
        name:'ipad',
        price:'200'
    },
    {
        name:'iphone',
        price:'650'
    }
];

localStorage.setItem('products', JSON.stringify(products));


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
        let products = this.getProducts();
     this.setState({products});
    }

    getProducts(){
       return JSON.parse(localStorage.getItem('products'));
    }

    onDelete(name){
        let products = this.state.products;
        let filteredProducts = products.filter(product =>{
           return product.name !== name;
        });

        this.setState({products: filteredProducts});
    }

    onAdd(name, price){
        let products = this.state.products;

        products.push({
            name,
            price
        })

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
