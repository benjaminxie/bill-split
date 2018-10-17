import React, { Component } from 'react';

class ExpandableForm extends Component {
   constructor() {
      super();
      this.state = {
         addingItem: false
      };
   }

   render() {
      if (this.state.addingItem) {
         return (
            <form>
               {this.renderInputs()}
               <button
                  className="btn-outline-primary btn-lg"
                  onClick={this.handleSubmit}
               >
                  {this.props.text}
               </button>
            </form>
         );
      } else {
         return (
            <button
               className="btn-outline-secondary btn-lg"
               onClick={this.toggleForm}
            >
               {this.props.text}
            </button>
         );
      }
   }

   handleSubmit = event => {
      event.preventDefault();
      this.props.onSubmit(event);
      this.toggleForm();
   };

   toggleForm = () => {
      const { addingItem } = this.state;
      this.setState({ addingItem: !addingItem });
   };

   renderInputs() {
      const inputs = this.props.inputs;
      let key = 0;
      return inputs.map(input => {
         const { type, name, placeholder } = input;
         return (
            <input
               key={key++}
               type={type}
               name={name}
               placeholder={placeholder}
            />
         );
      });
   }
}

export default ExpandableForm;
