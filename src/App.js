import React, { Component } from 'react';
import ReceiptWrapper from './components/receiptWrapper';
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
            {this.renderAddReceiptForm()}
         </div>
      );
   }

   computeMasterReceiptItems = receiptStates => {
      const nameToQuantity = new Map();
      const nameToUnitPrice = new Map();

      for (let receipt of receiptStates) {
         if (receipt.name !== 'Master Receipt') {
            this.tally(receipt, nameToUnitPrice, nameToQuantity);
         }
      }

      const masterReceiptItems = [];
      let itemId = 0;
      for (let name of nameToQuantity.keys()) {
         masterReceiptItems.push({
            itemId: itemId++,
            quantity: nameToQuantity.get(name),
            name: name,
            unitPrice: nameToUnitPrice.get(name)
         });
      }
      return masterReceiptItems;
   };

   tally = (receipt, nameToUnitPrice, nameToQuantity) => {
      // This could be done with a reduce instead
      const { items } = receipt;
      for (let item of items) {
         const { quantity, name, unitPrice } = item;
         if (!nameToUnitPrice.has(name)) {
            nameToUnitPrice.set(name, unitPrice);
         }
         const oldQuantity = nameToQuantity.get(name) || 0;
         nameToQuantity.set(name, oldQuantity + quantity);
      }
   };

   renderReceiptWrappers = receiptStates => {
      return receiptStates.map(receipt => {
         const { receiptId, items, name } = receipt;
         const out = (
            <div>
               <ReceiptWrapper
                  key={receiptId}
                  receiptId={receiptId}
                  name={name}
                  items={items}
                  renderItemWrappers={this.renderItemWrappers}
                  addItem={this.handleAddItem}
               />
            </div>
         );
         return out;
      });
   };

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

   renderAddReceiptForm = () => (
      <HideableContainer text={'add receipt'}>
         <form onSubmit={this.handleAddReceipt}>
            <input
               type="text"
               name="name"
               placeholder="name"
               ref={this.input}
            />
            <button type="submit" className="btn-outline-secondary btn-lg">
               add receipt
            </button>
         </form>
      </HideableContainer>
   );

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
      const receiptStates = this.state.receiptStates.map(receiptState => {
         if (receiptState.receiptId === receiptId) {
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
      if (receiptId !== 0) {
         receiptStates[0].items = this.computeMasterReceiptItems(receiptStates);
      }
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
      newReceiptStates[0].items = this.computeMasterReceiptItems(
         newReceiptStates
      );
      this.setState(newReceiptStates);
   };
}

export default App;
