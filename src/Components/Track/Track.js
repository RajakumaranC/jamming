import React from 'react';
import './Track.css';


export class Track extends React.Component {
    constructor(props){
      super(props);
      this.renderAction = this.renderAction.bind(this);
    }
    renderAction(){
      if(this.props.isRemoval){
        return (<button className="Track-action">-</button>)
      }
      else {
        return (<button className="Track-action">+</button>)
      }

    }

    render() {
        return (<div className="Track">
        <div className="Track-information">
          <h3>track name</h3>
          <p>track artist | track album</p>
        </div>
        {this.renderAction()}
      </div>)
    }

    
}