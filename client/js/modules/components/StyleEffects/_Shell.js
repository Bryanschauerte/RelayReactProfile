export const colors= {
  midnight:  "#2f3438",
  snow:         "#F8F8FF",
  dirtySnow:    "#c5c5d3",
  lakeMoss: "#2e8a70",
  oldCandy: "#DDDB98",
  popsicle: "#280f2e",
  summer: "#342e8a",
  cartoonFlesh: "#c8745b",
  health:  "#bb3d56"
}

export const shell={
  base:{
    backgroundColor: colors.midnight
  },
  header:{
    backgroundColor: colors.dirtySnow,
    height: "10%",
    width: "100%"
  },
  content:{
    oneOne:{
      float:"left",
      height: "50%",
      width: "32%",
      backgroundColor: colors.summer
    },
    onetwo:{
      float:"left",
      height: "50%",
      width: "32%",
      backgroundColor: colors.cartoonFlesh
    },
    oneThree:{
      float:"left",
      height: "50%",
      width: "32%",
      backgroundColor: colors.popsicle
    },
    twoOne:{
      float:"left",
      height: "50%",
      width: "32%",
      backgroundColor: colors.oldCandy
    },
    twoTwo:{
      float:"left",
      height: "50%",
      width: "32%",
      backgroundColor: colors.lakeMoss
    },
    twoThree:{
      float:"left",
      height: "50%",
      width: "32%",
      backgroundColor: colors.health
    },
    base:{
      backgroundColor: colors.dirtySnow,
      position: "absolute",
      top: "10%",
      height: "80%",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center"
    }

  },
  footer:{
    position:"absolute",
    top: "90%",
    height:"10%",
    width: "100%",
    float: "left"
  }
}
