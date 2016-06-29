import React from "react";
import Relay from "react-relay";

export default class CreateInformationMutation extends Relay.Mutation {

static fragments = {
  app: () =>Relay.QL`
  fragment on App{
    id
  }`
}

  getMutation() {
    return Relay.QL`mutation { AddInformation }`;
  }

  getVariables() {
    return {

      title: this.props.title,
      header: this.props.header,
      content: this.props.content,
      typeOfContent: this.props.typeOfContent
    };
  }

  getFatQuery() {

    return Relay.QL`
      fragment on AddInformationPayload {
    newInformationEdge {

        node{
            title,
            typeOfContent,
            header,
            content
          }
        }
      }`;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'app',
      parentID: this.props.app.id,
      connectionName: 'information',
      edgeName: 'newInformationEdge',
      rangeBehaviors: {
        '': 'append'
      },
    }];
  }

  getOptimisticResponse() {
    return {
      newInformationEdge: {
        node: {
          title:this.props.title,
          id:this.props.id,
          typeOfContent:this.props.typeOfContent,
          header:this.props.header,
          content:this.props.content

        },
      },

    };
  }

}

// example mutation from schema called into graph
// mutation AddInformationMutation($input: AddInformationInput!){
//     AddInformation(input: $input){
//     clientMutationId,
//
//       newInformationEdge{
//         node{
//           typeOfContent,title,header,content
//         }
//       }
//
//   }
//   }
