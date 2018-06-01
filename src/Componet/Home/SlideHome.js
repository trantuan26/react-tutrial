import React, { Component } from 'react';

import { Button, Carousel, div,  CarouselInner, CarouselItem, CarouselIndicators, CarouselIndicator, View, Mask } from 'mdbreact';
import './SlideHome.css'
class CarouselPage extends Component {

  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.state = {
      activeItem: 1,
        interval:10000,
      length: 4
    };
  }

  next() {
    let nextItem = this.state.activeItem + 1;
    if(nextItem > this.state.length) {
      this.setState({ activeItem: 1 });
    } else {
      this.setState({ activeItem: nextItem });
    }
  }

  prev() {
    let prevItem = this.state.activeItem - 1;
    if(prevItem < 1) {
      this.setState({ activeItem: this.state.length });
    } else {
      this.setState({ activeItem: prevItem });
    }
  }

  goToIndex(item) {
    if (this.state.activeItem !== item) {
      this.setState({
        activeItem: item
      });
    }
  }

  render(){

    const { activeItem } = this.state;

    return(
      <div>
        <Carousel 
          activeItem={this.state.activeItem}
          next={this.next}
          className="z-depth-1">
          <CarouselInner>
            <CarouselItem itemId="1">
              <View>
                <img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg" alt="First slide" />
                <Mask overlay="black-light"></Mask>
              </View>
              <div className="carousel-caption-custom">
                <h1 >Light mask</h1>
                <p>First text</p>
                  <Button  color="warning">Warning</Button>
              </div>
            </CarouselItem>
            <CarouselItem itemId="2">
              <View>
                <img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(99).jpg" alt="Second slide" />
                <Mask overlay="black-strong"></Mask>
              </View>
              <div className="carousel-caption-custom">
                <h1 >Strong mask</h1>
                <p>Second text</p>
                  <Button  color="warning">Warning</Button>
              </div>
            </CarouselItem>
            <CarouselItem itemId="3">
              <View>
                <img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(17).jpg" alt="Third slide" />
                <Mask overlay="black-slight"></Mask>
              </View>
              <div className="carousel-caption-custom">
                <h1 >Slight mask</h1>
                <p>Third text</p>
                  <Button  color="warning">Warning</Button>
              </div>
            </CarouselItem>
            <CarouselItem itemId="4">
              <View>
                <img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20%28143%29.jpg" alt="Mattonit's item" />
                <Mask overlay="black-light"></Mask>
              </View>
              <div className="carousel-caption-custom">
                <h1 >Sopot Beach</h1>
                <p>Taken june 21th by @mattonit</p>
                  <Button  color="warning">Warning</Button>
              </div>
            </CarouselItem>
          </CarouselInner>
          {/*<CarouselControl direction="prev" role="button" onClick={() => { this.prev(); }} />*/}
          {/*<CarouselControl direction="next" role="button" onClick={() => { this.next(); }} />*/}
          <CarouselIndicators>
            <CarouselIndicator active={activeItem === 1 ? true : false} onClick={() => { this.goToIndex(1); }}></CarouselIndicator>
            <CarouselIndicator active={activeItem === 2 ? true : false} onClick={() => { this.goToIndex(2); }}></CarouselIndicator>
            <CarouselIndicator active={activeItem === 3 ? true : false} onClick={() => { this.goToIndex(3); }}></CarouselIndicator>
            <CarouselIndicator active={activeItem === 4 ? true : false} onClick={() => { this.goToIndex(4); }}></CarouselIndicator>
          </CarouselIndicators>
        </Carousel>
      </div>
    );
  }
}

export default CarouselPage;