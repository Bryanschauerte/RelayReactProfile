import React from 'react';
import Relay from 'react-relay';
import About from './About';


 class Plaine extends React.Component{


_handleClick(x){
  this.props.selectedView(x);
}

_handleStyle(itemLabel){
  let sizes = this.props.sizes;
  let isActive = itemLabel == this.props.categorySelected;


  let inactive ={
    height: sizes.inactive.height,
    float: "left",
    width: sizes.inactive.width,
    backgroundColor: "gray",
    border: "2px solid red",

  }

  let active ={
    height: sizes.active.height,
    float: "left",
    width: sizes.active.width,
    backgroundColor: "gray",
    border: "2px solid blue",
    overflow: "scroll"
  }

  if(itemLabel == "about"){
    return this.props.categorySelected == "about" ? active: inactive
  }
  if(itemLabel == "all"){
    return this.props.categorySelected == "all" ? active: inactive
  }

return  isActive ? active : inactive
}


  render(){

    let {menuItem} = this.props;
    let menuList = this.props.app.menu.edges;
    return (
      <div className="plaineOuter">

        {menuList.map( ({node}, index) => {
        return (
          <div
            className = "plaineItem"
            key = {index}
            onClick={this._handleClick.bind(this, node.label)}
             style={this._handleStyle(node.label)}>
             <p className= "menuLabel">{node.label}</p>
                <div>
                 {node.label == this.props.categorySelected ?
                   this.props.children : null}
               </div>
           </div>
        )
        })
      }
            <div
            className = "plaineItem"
            onClick={this._handleClick.bind(this, "all")}
            style={this._handleStyle("all")}>
              <p>Show All</p>
                <div>
                  {'all' == this.props.categorySelected ?
                    this.props.children : null}
                </div>
              </div>

            </div>  )
          }

        }

Plaine = Relay.createContainer(Plaine, {
  initialVariables:{
    limit:100
  },
  fragments:{
    app: () => Relay.QL`
      fragment on App{
        menu (first: $limit){
        edges{
          cursor,
          node{
            id, label, hint
          }
        }
      }
      }`
  }
})

export default Plaine;
