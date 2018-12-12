import React, { Component } from 'react';
import HideableContainer from './hideableContainer';

class ReceiptWrapper extends Component {
   state = {
      quantity: 0,
      name: '',
      unitPrice: 0
   };

   render() {
      const { name, items } = this.props;
      return (
         <div
            className="card"
            style={{
               height: '90vh',
               width: '100%'
            }}
         >
            <h3 className="card-title">{name}</h3>
            {this.renderReceiptBody(items)}
            {this.renderSubtotal(items)}
            <HideableContainer text="add item">
               {this.renderAddItemForm()}
            </HideableContainer>
         </div>
      );
   }

   renderReceiptBody(items) {
      return (
         <div
            className="card-body"
            style={{ height: '70%', overflowY: 'scroll' }}
         >
            {this.props.renderItemWrappers(items, this.props.receiptId)}
         </div>
      );
   }

   renderAddItemForm() {
      return (
         <form onSubmit={this.handleAddItem}>
            <input
               type="number"
               name="quantity"
               placeholder="quantity"
               onChange={this.handleChange}
            />
            <input
               type="text"
               name="name"
               placeholder="name"
               onChange={this.handleChange}
            />
            <input
               type="number"
               name="unitPrice"
               placeholder="unit price"
               onChange={this.handleChange}
            />
            <button className="btn-primary btn-sm">add item</button>
         </form>
      );
   }

   renderSubtotal = () => {
      const items = this.props.items;

      const subtotal = items.reduce(
         (acc, item) => acc + item.quantity * item.unitPrice,
         0
      );

      return (
         <div>
            <em>Subtotal: {subtotal}</em>
         </div>
      );
   };

   handleChange = event => {
      const target = event.target;
      const value = this.getValueWithCorrectType(target);
      const name = target.name;

      this.setState({
         [name]: value
      });
   };

   getValueWithCorrectType(target) {
      if (target.type === 'checkbox') {
         return target.checked;
      } else if (target.type === 'number') {
         return Number(target.value);
      } else {
         return target.value;
      }
   }

   handleAddItem = event => {
      event.preventDefault();
      this.props.addItem(this.props.receiptId, this.state);
   };
}

export default ReceiptWrapper;
