import React from 'react';
import  * as styling from './StyleEffects/_Shell';

console.log("colors", styling.colors)
class Shell extends React.Component{

  render(){


let colors = styling.colors;
let shell = styling.shell;
console.log(colors, "colors")
console.log(colors, "shell")

shell.base.height= this.props.sizes.totalHeight;
shell.base.width= this.props.sizes.totalWidth;


    return(
      <div style={shell.base}>

        <div style = {shell.header}>
          <div>header</div>
        </div>

        <div style={shell.content.base}>
          <div style={shell.content.oneOne}>
              <div>Square</div>
          </div>

          <div style={shell.content.onetwo}>
              <div>Square</div>
          </div>

          <div style={shell.content.oneThree}>
              <div>Square</div>
          </div>
          <div style={shell.content.twoOne}>
              <div>Square</div>
          </div>
          <div style={shell.content.twoTwo}>
              <div>Square</div>
          </div>
          <div style={shell.content.twoThree}>
              <div>Square</div>
          </div>

        </div>

        <div style={shell.footer}>
          <div>footer</div>
        </div>

      </div>
  )
  }
}
export default Shell;
