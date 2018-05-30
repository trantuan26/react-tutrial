import React, {Component} from 'react';
import './App.css';
import Home from './Componet/Home/Home';
import Routes from './Routes';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            title:'App title',
            name:'AAAAA',
            checked: true,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onClicked = this.onClicked.bind(this);
        this.upDateChecked = this.upDateChecked.bind(this);

    }
    onMouseEnter(){
        // alert('on mouse enter');
    }

    onClicked(){
        this.setState({
            title:'New title',
            name:'BBBB'
        });
    }

    onChange(e){
        e.preventDefault();
        console.log(e);
    }

    onSubmit(e){
        e.preventDefault();
        alert(this.input.value);
    }

    upDateChecked(){
        console.log(this.state.checked);
        this.setState({checked:!this.state.checked});
    }

    render() {
        const list = [
            'Item 1',
            'Item 2',
            'Another item'
        ];
        return (
            <div className="App">

                <Routes />

                <input
                    type="checkbox"
                    onChange={this.upDateChecked}
                    checked={this.state.checked}
                />

                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onChange} ref={input =>this.input = input} />
                </form>

                <Home
                    title={this.state.title}
                    name={this.state.name}
                    onClick={this.onClicked}
                />

                <h1>
                    {
                        list.map(itemt => {
                            return (
                                <div key={itemt} onMouseEnter={this.onMouseEnter}>
                                    {itemt}
                                </div>
                            );
                        })
                    }
                </h1>
            </div>
        );
    }
}

export default App;
