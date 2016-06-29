import React from "react";
import ReactDOM from 'react-dom';
import Base from './client/js/modules/components/Base.jsx';
import Relay from 'react-relay';



class BaseRoute extends Relay.Route {
  static routeName = "BaseRoute";
  static paramDefinitions ={

  };
  static queries = {
    app: (Component, params) => Relay.QL`
        query MainQuery{
          app{
            ${Component.getFragment('app', params)},

          }
        }`


  }
}



BaseRoute.queries = ReactDOM.render(
  <Relay.RootContainer
    Component={Base}
    route={new BaseRoute()}
    renderLoading={function(){return <div><h1>Loading...</h1></div>}}

    />,
   document.getElementById('target'));
