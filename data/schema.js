import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInterfaceType,
  GraphQLEnumType,
  GraphQLScalarType


} from 'graphql';

import {
  globalIdField,
  mutationWithClientMutationId,
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
  connectionFromArray,
  nodeDefinitions,
  cursorForObjectInConnection
} from 'graphql-relay'


let Schema = ()=> {

//moch db

class App{};
class Preferences {};
class Information{};
class Menu{}
var app = new App();
app.id = '1';
var informationContainer = [];

(function(){
  var information;
  for ( var i =0; i < 10; i++){
    information = new Information();
    information.id = `${i*4}`;
    information.title = "title number" + i;
    information.header = "title header";
    if(i%2 == 0){
      information.typeOfContent = 'Blog';
    }
    if(i%3 == 0){
      information.typeOfContent = 'Demos';
    }
    if (!information.typeOfContent){
      information.typeOfContent = 'Past Projects'
    }
    information.content = "Hello, there meow. Im hungry. I wish I had more mounatin dew";
    informationContainer.push(information);
  }
})()

var preferences  = new Preferences();
preferences.id = "2";
preferences.whatToShow = "all";

function printer(x){
  console.log(x);
}
app.info = informationContainer;
app.preferences = preferences;
let menu = new Menu();
let menuContainer =[]
var x =[
   {id:10000, label: "About", hint: "Learn about me and this site"},
   {id:20000, label:"Demos", hint:"See some nifty React/React-native/Angular components and how to make them!"},
   {id:30000, label:"Past Projects", hint:"Between my full time job and bedtime, I scrapped out a few projects"},
   {id:40000, label:"Blog", hint:"Rants, raves and trying to be helpful"}]
x.forEach( item => menuContainer.push( {id: item.id, label: item.label, hint: item.hint} ))

app.menu = menuContainer;
console.log(app.menu, "mmenenenenkajdhkadjhfkajsdhfkjasdhfkj")
//InfoId, typeOfContent, title, header, content
function createInfo (typeOfContent, title, header, content){
  var id = ((app.info.length) + 1) *4;
  var item ={};
  item.id = id;
  item.title = title;
  item.header = header;
  item.content = content;
  item.typeOfContent = typeOfContent;
  console.log(item, "new itmeeeee");
  app.info.push(item);
  return item;
}
function getMenu(){
  return app.menu;
}



function retrieveInformation(what){
  return typeOfContent[what];
}
function checkUserPreferences(id){
  return app.preferences.whatToShow;
}
function getPreferences(id){
  return app.preferences.find(pref => pref.id === id)
}
function changePref(x){
  app.preferences.whatToShow = x;
  return app.preferences;
}
function getInformationById(id){
  return app.info.find(info => info.id === id)
}
function getMenuItemById(id){
  return app.menu.find( item => item.id === itemId)
}
function getApp(a){
  console.log(a, "getApp")
  return app;
}
function getInformation(){
  return app.info;
}
//end

let {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'App') {
      return getApp();
    } else if (type === 'Preferences') {
      return getPreferences(id);

    } else if (type === 'Information') {
          return getInformationById(id);
      } else if (type === 'MenuItem'){
        return getMenuItemById(id);
      } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof App) {
      return appType;
    } else if (obj instanceof Preferences)  {
      return preferencesType;
    }else if (obj instanceof Information)  {
      return informationType;
    }
    else if (obj instanceof MenuItem)  {
      return menuItemType;
    }
    else {
      return null;
    }
  }
);


const menuItemType = new GraphQLObjectType({
  name: "MenuItem",
  description: "part of the menu",
  fields: () => ({

    id:{
      type: new GraphQLNonNull(GraphQLID),
      resolve: (obj) => obj.id
    },
    label: {
      description: "what the user will see",
      type: GraphQLString
    },
    hint: {
      description: "what the user will see on hover",
      type: GraphQLString
    }
  }),
  interfaces: [nodeInterface]
})


const informationType = new GraphQLObjectType({
  name: "Information",
  description: "the info to show",
  fields: () => ({
    id:{
      type: new GraphQLNonNull(GraphQLID),
      resolve: (obj) => obj.id
    },
    typeOfContent: {
      type: GraphQLString,
      description: "what type of content is in this object"


    },
    title:{
      type: GraphQLString,
      description: "what the title is"
    },
    header:{
      type: GraphQLString,
      description: "the header content"

    },
    content:{
      type: GraphQLString,
      description: "the main content"
      // ,
      // resolve: (information)=> information.content
    }
  }),
  interfaces: [nodeInterface]
})

const PreferencesType = new GraphQLObjectType({
  name: "Preferences",
  description: "the users Preferences",
  fields: () =>({
    id: globalIdField('Preferences'),
    whatToShow: {
      description: "the type of item the user wants to see",
      type: GraphQLString
    }
  })
})


var {connectionType: informationConnection, edgeType: InformationEdge,} = connectionDefinitions({name: 'Information', nodeType: informationType});
var {connectionType: menuConnection, edgeType: MenuEdge,} = connectionDefinitions({name: 'MenuItem', nodeType: menuItemType});

const appType= new GraphQLObjectType({
  name: 'App',
  description: "the base, top layer for the profile",
  fields:()=>({
    id: globalIdField('App'),
    information: {
      type: informationConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(app.info, args)
    },
    preferences: {
      type: GraphQLString,
      description: "the preferences of the app",
      resolve:() => app.preferences.whatToShow
    },
    menu: {
      type: menuConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(app.menu, args)
    },
  }),
  interfaces:[nodeInterface]
})

  const QueryType = new GraphQLObjectType({
    name:'Query',
    description: "tis is a root qurey",
    fields:()=>({
        app: {
          type: appType,
          resolve: () => app,
        },
        node:nodeField
    })
  })

const ChangePrefSchemaMutation = mutationWithClientMutationId({
  name:"ChangePreferance",
  inputFields:{
    newPhrase: {
      type: new GraphQLNonNull(GraphQLString)
    },
    id:{
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  outputFields:{
    preferences:{
      type: PreferencesType,
      resolve:({targetId})=> {
        console.log("out hit");
        getPreferences(targetId)
      }
    }
  },
  mutateAndGetPayload:{
    resolve:({newPhrase, id}) =>{
      console.log("pay hit");
      const targetId = fromGlobalId(id).id;
      return changePref(newPhrase);
    }
  }
})

  const CreateInformationMutation = mutationWithClientMutationId({
    name: "AddInformation",
    inputFields: {

        typeOfContent:{type: new GraphQLNonNull(GraphQLString)},
        title:{ type: new GraphQLNonNull(GraphQLString)},
        header:{type: new GraphQLNonNull(GraphQLString)},
        content:{type: new GraphQLNonNull(GraphQLString)}

    },
    outputFields: {//create an info and return it
      newInformationEdge: {
        type: InformationEdge,
        resolve: (obj)=>{
          console.log("line 232", obj);
          return {
            cursor: cursorForObjectInConnection(
            getInformation(), obj),
            node: obj
          };

        }
      }



  },
  mutateAndGetPayload: ({typeOfContent, content, title, header}) => {//parsedinput,
    const newInfo = createInfo(typeOfContent, title, header, content);
    console.log(newInfo, "new infor from mutate and get payload");
    return newInfo;

}
  })

  const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      AddInformation: CreateInformationMutation,
      ChangeThePref: ChangePrefSchemaMutation
    })
  });


  let schema = new GraphQLSchema({
    query: QueryType,
    mutation: mutationType
})

  return schema;
}
export default Schema;
