import React, { Component } from 'react';

class Item extends Component {
   render() {
      const { quantity, name, unitPrice } = this.props;
      return (
         <span style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{quantity}</span> <span>{name}</span>{' '}
            <span>${quantity * unitPrice}</span>
         </span>
      );
   }
}

export default Item;
