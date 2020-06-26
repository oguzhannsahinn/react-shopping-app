import React, { Component } from 'react'
import {Table} from 'reactstrap'
export default class CartList extends Component {
  renderCart() {
    return(
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Id</th>
            <th>Product Name</th>
            <th>Unit Price</th>
            <th>Units in Stock</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.cart.map(item => (
              <tr key={item.cartItem.product.id}>
                <td>{item.cartItem.product.id}</td>
                <td>{item.cartItem.product.categoryId}</td>
                <td>{item.cartItem.product.productName}</td>
                <td>{item.cartItem.product.unitPrice}</td>
                <td>{item.cartItem.product.unitsInStock}</td>
                <td>{item.cartItem.quantity}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => this.props.cartListDeleteItem(item.cartItem.product)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    )
  }
  render() {
    return (
      <div>
        {this.renderCart()}
      </div>
    )
  }
}
