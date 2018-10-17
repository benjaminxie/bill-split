import React, { Component } from 'react';

class ItemWrapper extends Component {
   render() {
      const { name, quantity, unitPrice } = this.props;

      return (
         <div className="card-group">
            <span className="card text-justify">
               <span
                  style={{ display: 'flex', justifyContent: 'space-between' }}
               >
                  <span>{quantity}</span> <span>{name}</span>{' '}
                  <span>${quantity * unitPrice}</span>
               </span>
            </span>
            <span className="card">
               <span className="btn-toolbar">
                  <button
                     className="btn-outline-secondary btn-sm m-1 plus"
                     onClick={this.plusOneQuantity}
                  >
                     +
                  </button>
                  <button
                     className="btn-outline-secondary btn-sm m-1 minus"
                     onClick={this.minusOneQuantity}
                  >
                     -
                  </button>
                  <button
                     className="btn-outline-secondary btn-sm m-1"
                     onClick={this.deleteItem}
                  >
                     delete
                  </button>
               </span>
            </span>
         </div>
      );
   }

   plusOneQuantity = () => {
      const { parentReceiptId, itemId, quantity } = this.props;
      this.props.setItemQuantity(parentReceiptId, itemId, quantity + 1);
   };

   minusOneQuantity = () => {
      const { parentReceiptId, itemId, quantity } = this.props;
      if (quantity === 1) {
         return;
      }
      this.props.setItemQuantity(parentReceiptId, itemId, quantity - 1);
   };

   deleteItem = () => {
      const { parentReceiptId, itemId } = this.props;
      this.props.deleteItem(parentReceiptId, itemId);
   };
}

export default ItemWrapper;
