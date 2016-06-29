import React from 'react';
import Relay from 'react-relay';
import About from './About';
import Title from './Title';


 class Plaine extends React.Component{


  render(){
console.log(this.props, "from Plaine")
    return (<div>Plaine</div>)
          }

        }

Plaine = Relay.createContainer(Plaine, {
  initialVariables:{
    limit:100
  },
  fragments:{
    app: () => Relay.QL`
      fragment on App{
        information(first: $limit){
            edges{
              cursor,
              node{
                id,typeOfContent, title, header, content
              }
            }
          }
      }`
  }
})

export default Plaine;
