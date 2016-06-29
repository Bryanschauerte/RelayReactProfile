import React from 'react';

class Information extends React.Component {

render(){
  const noShow = {display:"none"};
  const show = {display: "flex"};

      return (
      <div>
      <h1>{this.props.title}</h1>
      <h1  style={this.props.styles }>oooodoskodfodsifo</h1>

    </div>)
    }
}
export default Information;
