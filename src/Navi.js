import React, { Component } from 'react'
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge
} from 'reactstrap';
import {Link} from 'react-router-dom'

export default class Navi extends Component {

  render() {
    return (
        <Navbar color="light" text="primary" expand="md">
        <NavbarBrand href="/">React Shopping</NavbarBrand>
        <NavbarToggler/>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Cart
              </DropdownToggle>

              <DropdownMenu right>
                <Link className='ml-4' to='cart'>Go To Cart</Link>
                {
                  this.props.cart.map(item => (
                    <DropdownItem key={item.cartItem.product.id}>
                      <Badge className="mr-2" color="danger" onClick={() => this.props.deleteItem(item)}>X</Badge>
                      <span>{item.cartItem.product.productName}</span>
                      <Badge className="ml-2" color="primary">{item.cartItem.quantity}</Badge>
                    </DropdownItem>
                  ))
                }
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
      </Navbar>
    )
  }
}
