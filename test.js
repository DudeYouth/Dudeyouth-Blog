import ReactDom from "react-dom";
import React from "react";
import Component,{connect} from "./public/js/sm-redux";
class Test01 extends Component{
  render(){
    return <h1>{this.props.context}</h1>;
  }
}
class Test02 extends Component{
  clickHandler(){
    this.dispatch({
       test01:{
        context:"holle huangqiying",
       }
    })
  }
  render(){
    return <h1 onClick={this.clickHandler.bind(this)}>{this.props.context}</h1>;
  }
}
class Main extends Component{
  componentDidMount(){
     this.dispatch({
         test01:{
          context:"huangqiying",
         },
         test02:{
          context:"holle word"
         }
      })
  }
  render(){
    return <div>
      <Test01 {...this.props.test01}/>
      <Test02 {...this.props.test02}/>
    </div>;
  }
}
 let Newmain=connect(Main);
 ReactDom.render(
    <Newmain />,
    document.getElementById("container")
  )