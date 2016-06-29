import React from 'react';
import Relay from "react-relay";

class TopNav extends React.Component{
  constructor(props){
    super(props);
    this.state = {about: true, pastProjects: true, blog: true, demos: true};
    this.mouseEntered = this.mouseEntered.bind(this);
    this.mouseLeft = this.mouseLeft.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleStyle = this._handleStyle.bind(this);
  }

  _handleClick(e){
    e.preventDefault();
    this.props.activator(this.props.information.id);
  }

    _handleStyle(){
      let {information} = this.props;
      if(this.props.activeInformationId == null){

        let bgColor = {blog:"red", comp:"blue", project:"green"};
        let stylingObj ={
          display: "flex",
          width: "20em",
          margin: "1% 1% 1% 1%",
          height:"15em",
          opacity: 1,
          backgroundColor: bgColor[this.props.information.typeOfContent],
          border: "2px solid black"
        }
        let preloadStyle ={
          opacity: 0,
          transition: "opacity 1.0s",
          display: "flex",
          width: "20em",
          margin: "1% 1% 1% 1%",
          height:"15em",
          backgroundColor: bgColor[this.props.information.typeOfContent],
          border: "2px solid black"
        }
        return stylingObj;
      }
      if(this.props.activeInformationId == information.id){
        let bgColor = {blog:"red", comp:"blue", project:"green"};
        let stylingObj ={
          display: "flex",
          width: "75%",
          margin: "1% 1% 1% 1%",
          height:"75%",
          opacity: 1,
          backgroundColor: bgColor[this.props.information.typeOfContent],
          border: "2px solid black"
        }
        return stylingObj;
      }

    }
    mouseEntered(event){
      event.preventDefault();
      this.setState({isHovering: true});
    }
    mouseLeft(event){
      event.preventDefault();
      this.setState({isHovering: false});
    }

  componentDidMount(){
    //will be using this for ajax calls for smooth picture rendering
    this.setState({isLoaded: true});
  }

  render(){

    let{menuItem} = this.props;
    let style = {
      base:{
        width:"100%",
        height: "15%"
      },
      dropBtn:{
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "2em",
        fontSize: "1em",
        border: "none",
        cursor: "pointer"
      },
      hovering:{
        backgroundColor: "blue"
      },
      content:{
        display: "none",//change to block
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
        backgroundColor: "#f9f9f9",
        minWidth: "10em"
      },
      links:{
        color: "black",
        padding: "2em 3em",
        textDecoration: "none",
        display: "block"
      }
    }
    return (<li>
      <div class="dropdown">
        <button >{menuItem.label}</button>
        <div style={style.content}>
          <a href="#">link</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </div>
    </li>
    )
  }
}


TopNav = Relay.createContainer(TopNav, {
  fragments:{
    menuItem: () => Relay.QL`
      fragment on MenuItem{

            id, label, hint

      }`
  }
})

export default TopNav;
