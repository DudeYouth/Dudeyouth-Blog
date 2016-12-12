import React,{Component} from "react";
import {Suggest} from "./common.js";
export default class App extends Component{
  render() {
    return (
        <div>
            <Suggest/>
            {this.props.children}
        </div>
    );
  }
}