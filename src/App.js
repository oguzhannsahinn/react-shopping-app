import React, { Component } from 'react';
import Navi from './Navi'
import CategoryList from './CategoryList'
import ProductList from './ProductList'
import { Container, Row, Col } from 'reactstrap'
import alertifyjs from "alertifyjs";
import { Route, Switch } from 'react-router-dom';
import CartList from './CartList'
import NotFound from './NotFound'

export default class App extends Component {

  state = {
    categoryInfo: { title: 'Category List' },
    productInfo: { title: 'Product List' },
    currentCategory: '',
    productList: [],
    cart: []
  }

  //delete from cart list page function
  cartListDeleteItem = (product) => {
    let newCart = this.state.cart;
    newCart = newCart.filter(c => c.cartItem.product.id !== product.id)
    alertifyjs.error(product.productName)
    this.setState({
      cart: newCart
    })
  }
  //delete from cart dropdown function
  deleteItem = (item) => {
    let newCart = this.state.cart;
    newCart = newCart.filter(c => c.cartItem.product.id !== item.cartItem.product.id)
    this.setState({
      cart: newCart
    })
  }

  //add to cart function
  addToCart = (product) => {
    let newCart = this.state.cart;

    var addedItem = newCart.find(c => c.cartItem.product.id === product.id)
    if (addedItem) {
      addedItem.cartItem.quantity++;
    } else {
      newCart.push({
        cartItem: {
          product: product,
          quantity: 1
        }
      })
    }
    alertifyjs.success(product.productName)

    this.setState({
      cart: newCart
    })
  }

  //
  componentDidMount() {
    this.getProductList();
  }

  //get categories from api
  getCategoryList = () => {
    fetch('http://localhost:3000/categories')
      .then(res => res.json())
      .then(data => this.setState({
        categories: data
      }))
  }
  //get clicked category id
  getCategory = (categoryId) => {
    this.setState({
      currentCategory: categoryId
    })
    this.getProductList();
  }

  //get products from api
  getProductList = () => {
    let url = "http://localhost:3000/products"
    if (this.state.currentCategory !== '') {
      url += "?categoryId=" + this.state.currentCategory
    }
    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({
        productList: data
      }))
  }

  render() {
    return (
      <Container>
        <Navi cart={this.state.cart} deleteItem={this.deleteItem} />
        <hr />
        <Row>

          <Col xs='3'>
            <CategoryList getCategory={this.getCategory} currentCategory={this.state.currentCategory} info={this.state.categoryInfo} />
          </Col>

          <Col xs='9'>
            <Switch>
              <Route exact path='/' render = { props => (
                  <ProductList 
                    {...props}
                    productList = {this.state.productList}
                    addToCart = {this.addToCart}
                    currentCategory = {this.state.currentCategory}
                    info = {this.state.productInfo}
                  />
                )} 
              />
              <Route exact path='/cart' render = { props => (
                  <CartList 
                    {...props}
                    cart = {this.state.cart}
                    removeFromCart = {this.removeFromCart}
                    cartListDeleteItem = {this.cartListDeleteItem}
                  />
                )} 
              />
              <Route component={NotFound} />
            </Switch>
          </Col>

        </Row>
      </Container>
    );
  }
}
