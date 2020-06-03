import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class CategoryList extends Component {

  state = {
    categories:[]
  }

  getCategoryList = () => {
    fetch('http://localhost:3000/categories')
      .then(res => res.json())
      .then(data => this.setState({
        categories:data
     }))
  }

  componentDidMount(){
    this.getCategoryList();
  }

  render() {

    return (
      <div>
        <h5 className='mb-3 ml-1'>
          {this.props.info.title}
        </h5>

        <ListGroup>
          {
            this.state.categories.map(category => (
              <ListGroupItem 
                active = { category.id === this.props.currentCategory}
                key={category.id} 
                onClick={() => this.props.getCategory(category.id)}>
                {category.categoryName}
              </ListGroupItem>
            ))
          }          
        </ListGroup>

      </div>
    )
  }
}
