import React from 'react';
import Relay from 'react-relay';

//utils
import TokenGenerator from 'uuid-token-generator';
let tokgen = new TokenGenerator(); //for generating keys, tokgen.generate()
//

import InputContainer from "./ContentInput";
import CreateInformationMutation from '../../mutations/CreateInformationMutation';
import TopNav from './TopNav.js';
import InformationContainer from './InfoContainer.js';
import Box from './SideSlider.js';
import Plaine from './Plaine';
import Title from './Title';


class Base extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activeInformationId: null,
      categorySelected: "all",
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      beenToHome : false
    };
    this._handleMutationSubmit = this._handleMutationSubmit.bind(this);
    this._handleInfoSelect = this._handleInfoSelect.bind(this);
    this._filterInformation = this._filterInformation.bind(this);
    this._setCategory = this._setCategory.bind(this);
    this._handleResize = this._handleResize.bind(this);
    this._generateSizes = this._generateSizes.bind(this);


  }

  _generateSizes(){

      let menuListSize = this.props.app.menu.edges.length + 2;
      let {information} = this.props.app;
      let numberOfInformation = information.edges.length;

      let totalW = this.state.windowWidth;
      let totalH = this.state.windowHeight;
      let sizes = {};
      let sideMenuSizesConfig = {
        height: 1,
        width: .2
      }

      let plaineSize = {
        inactive:{
          height: (totalH * sideMenuSizesConfig.height),
          width: ( (totalW * sideMenuSizesConfig.width) / menuListSize )
        },
        active: {
          height: (totalH * sideMenuSizesConfig.height),
          width: (totalW * (1 - sideMenuSizesConfig.width))
        }
      }
      sizes.plaineSize = plaineSize;
//information sizes

      let availiableInfoSize = {
          height: plaineSize.height,
          width: plaineSize.active.width
        }
        sizes.availiableInfoSize= availiableInfoSize;
// numberOfInformation
      let infoConfig = {
        active:{
          width: 1,
          height: 1
        },
        bigInactive:{
          width: .666,
          height: .666
        },
        normalInactive:{
          width: .333,
          height: .333
        }
      }
      let infoContainersSize = {
        active:{
          width: (availiableInfoSize.width * infoConfig.active),
          height: (availiableInfoSize.height * infoConfig.active)
        },
        inactive:{
          big:{
            width: (availiableInfoSize.width * infoConfig.bigInactive),
            height: (availiableInfoSize.height * infoConfig.bigInactive)
          },
          normal:{
            width: (availiableInfoSize.width * infoConfig.normalInactive),
            height: (availiableInfoSize.height * infoConfig.normalInactive)
          }
        }
      }

      sizes.infoContainersSize = infoContainersSize;


      return sizes;
  }


  _handleResize(e){
      this.setState({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
       })
  }

  _handleInfoSelect(e){
    if(this.state.activeInformationId == null){
      return this.setState({activeInformationId: e})
    }
    this.setState({activeInformationId: null})
  }

  componentDidMount(){
    window.addEventListener('resize', this._handleResize);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this._handleResize)
  }

  _filterInformation(item){

    if(this.state.categorySelected == "all"){
      if(this.state.activeInformationId == null){
            return item
      }
      if(this.state.activeInformationId == item.node.id){
            return item
        }
    }

    if(this.state.categorySelected != "all"){
      if(this.state.categorySelected == item.node.typeOfContent){
        if(this.state.activeInformationId == null){
              return item
        }
        if(this.state.activeInformationId == item.node.id){
              return item
          }
        }
      }

    }

  _setCategory(category){
    this.setState({categorySelected: category });
  }


  _handleMutationSubmit( input, relayMutationExt ){
    input.app = this.props.app;
    let mutation = new relayMutationExt(input);
      let onFail = (t) =>{
        const err = t.getError()
        console.error(err, "eeeroor")
      }
      let onSuccess = () =>{
        console.log("success");
      }
    Relay.Store.applyUpdate(mutation, {onFail, onSuccess})
  }

render(){

  let {app} = this.props;
  let {information} = this.props.app;
  let sizes =  this._generateSizes();

  return (


      <div>
        <Plaine
          sizes={sizes.plaineSize}
          app ={app}
          selectedView={this._setCategory}
          categorySelected = {this.state.categorySelected}>

      <div className="baseInfoContain" >
        <div>
          <Title styles={sizes.availiableInfoSize}/>

        </div>
        {information.edges.filter(this._filterInformation).map( ({node}) => (

            <InformationContainer
            sizes={sizes.infoContainersSize}
            key={tokgen.generate()}
            activator= {this._handleInfoSelect}
            information={node}
            activeInformationId = {this.state.activeInformationId}
            />) )}

        </div>
        </Plaine>
      </div>

  )

  }
}

//app eq to factions
Base = Relay.createContainer(Base, {
  initialVariables:{
    limit:100
  },
  fragments:{
    app: () => Relay.QL`
    fragment on App{
      id,
      information(first: $limit){
          edges{
            cursor,
            node{
              id,typeOfContent
              ${InformationContainer.getFragment('information')}
            }
          }
        },
        menu(first: $limit){
            edges{
              cursor,
              node{
                id
              }
            }
          },
        ${Plaine.getFragment('app')}
        ${CreateInformationMutation.getFragment('app')},
      }`
  }
})

export default Base;
