import React, {Component} from 'react';
import { Table, Button } from 'reactstrap';

export default class ProducList extends Component {

  render() {    
    return (
      <div>
        <h5>{this.props.info.title}</h5>
        
        <Table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Units in Stock</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
              {
                this.props.productList.map(product => (  
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.productName}</td>
                  <td>{product.quantityPerUnit}</td>
                  <td>{product.unitPrice}</td>
                  <td>{product.unitsInStock}</td>  
                  <td><Button color="primary" onClick={() => this.props.addToCart(product)}>Add</Button></td>
                </tr>
                ))
              }           
          </tbody>

        </Table>
      </div>
    );
  }
}