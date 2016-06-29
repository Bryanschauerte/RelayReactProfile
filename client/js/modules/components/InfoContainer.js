import React from 'react';
import Relay from 'react-relay';
import {resonsiveStyleObject, colors} from './StyleEffects/responsiveStyleObject';
import Information from './Information'

class InformationContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {isHovering: false, isLoaded: false};
    this.mouseEntered = this.mouseEntered.bind(this);
    this.mouseLeft = this.mouseLeft.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleStyle = this._handleStyle.bind(this);

  }
  _handleClick(e){
    e.preventDefault();
    console.log(this.props.information.id, "this props")
    this.props.activator(this.props.information.id);
  }

  _handleStyle(){
    let {information} = this.props;
    let type = this.props.information.typeOfContent;
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

    let {information} = this.props;
    const noShow = {display:"none"};
    const show = {display: "flex"};
    let singleItemShown = (this.props.activeInformationId != null);
    let singleStyle = resonsiveStyleObject.infoContainer.singleShown;


    return (

<div style={singleItemShown ? singleStyle : null} className= "infoContainerOuter">

      <div className="infoContainer"
        style={this._handleStyle()}
        onMouseEnter={this.mouseEntered}
        onMouseLeave={this.mouseLeft}
        onClick={this._handleClick}>

        <div className="imagePlaceholder" style={singleItemShown ? singleStyle.image : null}>
<div><Information {...information} styles = {this.state.isHovering? show: noShow} /></div>
          <div>
            <h1>{information.title}</h1>
            <h3>{information.header}</h3>


            <div style={this.state.isHovering? show: noShow}>
              <p>{information.typeOfContent}</p>
              <p>{information.content}</p>
            </div>
          </div>

        </div>


      </div>
    </div>)
  }
}
InformationContainer = Relay.createContainer(InformationContainer, {
  fragments:{
    information: () => Relay.QL`
      fragment on Information{
        title,id, typeOfContent, header, content
      }`
  }
})
export default InformationContainer;
