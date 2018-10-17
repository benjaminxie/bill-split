import React, { Component } from 'react';
import ReceiptWrapper from './components/receiptWrapper';
import './App.css';
import HideableContainer from './components/hideableContainer';
import ItemWrapper from './components/itemWrapper';

class App extends Component {
   state = {
      nextReceiptId: 1,
      receiptStates: [
         {
            receiptId: 0,
            nextItemId: 0,
            name: 'Master Receipt',
            items: []
         }
      ]
   };

   input = React.createRef();

   render() {
      const { receiptStates } = this.state;

      return (
         <div>
            {this.renderReceiptWrappers(receiptStates)}
            <HideableContainer text={'add receipt'}>
               <form onSubmit={this.handleAddReceipt}>
                  <input
                     type="text"
                     name="name"
                     placeholder="name"
                     ref={this.input}
                  />
                  <button
                     type="submit"
                     className="btn-outline-secondary btn-lg"
                  >
                     add receipt
                  </button>
               </form>
            </HideableContainer>
         </div>
      );
   }

   renderReceiptWrappers(receiptStates) {
      return receiptStates.map(receipt => {
         const { receiptId, items, name } = receipt;
         return (
            <ReceiptWrapper
               key={receiptId}
               receiptId={receiptId}
               name={name}
               items={items}
               renderItemWrappers={this.renderItemWrappers}
               addItem={this.handleAddItem}
            />
         );
      });
   }

   renderItemWrappers = (items, receiptId) => {
      return items.map(item => {
         const { itemId, quantity, name, unitPrice } = item;
         return (
            <ItemWrapper
               key={itemId}
               parentReceiptId={receiptId}
               itemId={itemId}
               quantity={quantity}
               name={name}
               unitPrice={unitPrice}
               handleQuantityChange={this.handleQuantityChange}
               setItemQuantity={this.setItemQuantity}
               deleteItem={this.handleDeleteItem}
            />
         );
      });
   };

   handleAddReceipt = event => {
      event.preventDefault();

      const receiptId = this.state.nextReceiptId;
      const receiptStates = [...this.state.receiptStates];
      receiptStates.push({
         receiptId,
         nextItemId: 0,
         name: this.input.current.value,
         items: []
      });
      this.setState({ nextReceiptId: receiptId + 1, receiptStates });
      this.input.current.value = '';
   };

   handleAddItem = (receiptId, newItem) => {
      const receiptStates = [...this.state.receiptStates].map(receiptState => {
         if (
            receiptState.receiptId === receiptId ||
            receiptState.receiptId === 0
         ) {
            const newItems = [...receiptState.items];
            const { quantity, name, unitPrice } = newItem;

            newItems.push({
               itemId: receiptState.nextItemId,
               quantity,
               name,
               unitPrice
            });

            return {
               receiptId: receiptState.receiptId,
               nextItemId: receiptState.nextItemId + 1,
               name: receiptState.name,
               items: newItems
            };
         } else {
            return receiptState;
         }
      });

      this.setState({
         receiptStates
      });
   };

   handleQuantityChange = event => {
      console.log('hi');
      console.log(event.target);
   };

   handleDeleteItem = (receiptId, itemId) => {
      const newReceiptStates = [...this.state.receiptStates];
      const receiptToChange = newReceiptStates.find(
         receiptState => receiptState.receiptId === receiptId
      );

      const itemIndex = receiptToChange.items.findIndex(
         item => item.itemId === itemId
      );

      const newItems = receiptToChange.items.slice(0, itemIndex);
      if (receiptToChange.items.length > 1) {
         newItems.push(...receiptToChange.items.slice(itemIndex + 1));
      }
      receiptToChange.items = newItems;

      console.log(newItems);

      this.setState(newReceiptStates);
   };

   setItemQuantity = (receiptId, itemId, newQuantity) => {
      const newReceiptStates = [...this.state.receiptStates];
      const receiptToChange = newReceiptStates.find(
         receiptState => receiptState.receiptId === receiptId
      );

      const itemToChange = receiptToChange.items.find(
         item => item.itemId === itemId
      );

      itemToChange.quantity = newQuantity;

      this.setState(newReceiptStates);
   };
}

export default App;
