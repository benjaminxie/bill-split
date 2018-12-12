import React, { Component } from 'react';

class HideableContainer extends Component {
   state = {
      hiding: true
   };

   render() {
      if (this.state.hiding) {
         return (
            <button
               className="btn-outline-secondary btn-lg"
               onClick={this.handleTogglingHide}
            >
               {this.props.text}
            </button>
         );
      } else {
         return (
            <div>
               {this.props.children}
               <button
                  className="btn-primary btn-lg"
                  onClick={this.handleTogglingHide}
               >
                  Cancel
               </button>
            </div>
         );
      }
   }

   handleTogglingHide = () => {
      const { hiding } = this.state;
      console.log({ hiding });
      this.setState({
         hiding: !hiding
      });
   };
}

export default HideableContainer;
