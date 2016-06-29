import React from 'react';
import {colors} from './responsiveStyleObject';

export default class Title extends React.Component{
  render(){
    let styling = {
      width: this.props.styles.width,
      backgroundColor: colors.moss
    }

    return(
      <div className="titleBox" style={styling}>
        <h1>Welcome!</h1>
      </div>
    )

  }
}
