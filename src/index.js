import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

const theItems = [
   { id: 0, quantity: 3, name: 'Snot Frogs', unitPrice: 2.0 },
   { id: 1, quantity: 7, name: 'Ham Murders', unitPrice: 2.0 },
   { id: 2, quantity: 5, name: 'Stench Fries', unitPrice: 2.0 },
   { id: 3, quantity: 3, name: 'Snot Frogs', unitPrice: 2.0 },
   { id: 4, quantity: 7, name: 'Ham Murders', unitPrice: 2.0 },
   { id: 5, quantity: 5, name: 'Stench Fries', unitPrice: 2.0 },
   { id: 6, quantity: 3, name: 'Snot Frogs', unitPrice: 2.0 },
   { id: 7, quantity: 7, name: 'Ham Murders', unitPrice: 2.0 },
   { id: 8, quantity: 5, name: 'Stench Fries', unitPrice: 2.0 },
   { id: 9, quantity: 3, name: 'Snot Frogs', unitPrice: 2.0 },
   { id: 10, quantity: 7, name: 'Ham Murders', unitPrice: 2.0 },
   { id: 11, quantity: 5, name: 'Stench Fries', unitPrice: 2.0 },
   { id: 12, quantity: 5, name: 'Stench Fries', unitPrice: 2.0 },
   { id: 13, quantity: 3, name: 'Snot Frogs', unitPrice: 2.0 },
   { id: 14, quantity: 7, name: 'Ham Murders', unitPrice: 2.0 },
   { id: 15, quantity: 5, name: 'Stench Fries', unitPrice: 2.0 },
   { id: 16, quantity: 3, name: 'Snot Frogs', unitPrice: 2.0 },
   { id: 17, quantity: 7, name: 'Ham Murders', unitPrice: 2.0 },
   { id: 18, quantity: 5, name: 'Stench Fries', unitPrice: 2.0 },
   { id: 19, quantity: 3, name: 'Snot Frogs', unitPrice: 2.0 }
];

const receipts = [
   { id: 0, name: 'John', items: [...theItems] },
   { id: 1, name: 'Greg', items: [...theItems] }
];

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
