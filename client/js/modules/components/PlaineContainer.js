import React from 'react';
import Relay from 'react-relay';
import Plaine from './Plaine';


import TokenGenerator from 'uuid-token-generator';
let tokgen = new TokenGenerator(); //for generating keys, tokgen.generate()

import styling from "./StyleEffects/_Plaine";

 class PlaineContainer extends React.Component{
   constructor(props){
     super(props);
     this.state= {
       activePlaine: "About"
     };
     this._handleClick = this._handleClick.bind(this);
     this._handleStyle = this._handleClick.bind(this);
   }

_handleClick(x){
  console.log(x, "clicked")
this.setState({activePlaine: x})
}

_handleStyle(itemLabel){
  let containerStyle = styling.container(this.props.sizes.plaineSize)
  console.log(containerStyle)
return this.state.activePlaine == itemLabel? containerStyle.active : containerStyle.inactive;

}


render(){
  let {app} = this.props;
  console.log(this.props);
  return (

<div>
  {app.menu.edges.map( ({node}) => {

    return (
      <Plaine
        onClick={this._handleClick.bind(this, node.label)}
        key={tokgen.generate()}
        titleInfo= {node.label}
        app= {app}
        style={this._handleStyle.bind(node.label)}
        sizes={this.props.sizes}/>
    )
  })}
</div>
)
}
        }

PlaineContainer = Relay.createContainer(PlaineContainer, {
  initialVariables:{
    limit:100
  },
  fragments:{
    app: () => Relay.QL`
      fragment on App{
        id,

        menu (first: $limit){
        edges{
          cursor,
          node{
            id, label, hint
          }
        }
      },
${Plaine.getFragment('app')}

      }`
  }
})

export default PlaineContainer;
