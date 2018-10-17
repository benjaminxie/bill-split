import React, { Component } from 'react';
import ItemWrapper from './itemWrapper';

class Receipt extends Component {
   render() {
      const { items } = this.props;
      return (
         <div
            className="card-body"
            style={{ height: '70%', overflowY: 'scroll' }}
         >
            {this.renderItemWrappers(items)}
         </div>
      );
   }

   renderItemWrappers(items) {
      return items.map(item => {
         const { id, quantity, name, unitPrice } = item;
         return (
            <ItemWrapper
               key={id}
               quantity={quantity}
               name={name}
               unitPrice={unitPrice}
            />
         );
      });
   }
}

export default Receipt;
