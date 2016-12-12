import React,{Component,createElement} from "react";
import {Nav} from "./common.js";
import {connect} from "../public/js/sm-redux.js";

export default class App extends Component{
  render() {
    return (
      <div>
        <Nav {...this.props}/>
        {this.props.children}
      </div>
    );
  }
}
