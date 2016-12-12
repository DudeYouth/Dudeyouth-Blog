import React,{Component} from "react";
import ReactDOM from "react-dom";
import { Menu, Icon ,Col,Row} from 'antd';
import {connect} from "../public/js/sm-redux.js";
import * as actions from "../action/actions.js";
import {Nav,MenuBox,ReplyInput} from "./common.js";
import {Link} from "react-router";
class Content extends Component{
	constructor(props){
		super(props);
		this.props.actions.ImagesList();
	}
	renderList(){
		return this.props.data&&this.props.data.map(function(value,key){
			return <List key={key} {...value}/>
		})
	}
	render(){
		return <Row>
			<Col span={18} offset={3}>
				<Col span={17}>
                    <ReplyInput {...this.props} margin="20" label="留言"/>
					{this.renderList()}
				</Col>
				<Col span={7}>
					<div className="menu">
						<MenuBox titleName="热门文章"/>
						<MenuBox titleName="学无止境" />
					</div>
				</Col>
			</Col>
		</Row>
	}
}
class Babel extends Component{
	render(){

	}
}
class List extends Component{
	render(){
		return 	<Row>
			<div className="theme-list">
				<Col span={4}>
					<div className="theme-image" style={{height:"100px"}}>
						<img src={this.props.img} />
					</div>
				</Col>
				<Col span={20}>
					<div className="theme-content" style={{textIndent:"0em"}}>
                        <h3 className="theme-author">{this.props.author}</h3>
						<p>{this.props.content}</p>
						<div className="theme-msg">
							<span style={{color:"#aaa"}}>{this.props.time}</span>&nbsp;&nbsp;&nbsp;
							<span style={{color:"#aaa"}}>阅读{this.props.read}</span>&nbsp;&nbsp;&nbsp;
							<span style={{color:"#96deca"}}>评论{this.props.comment}</span>&nbsp;&nbsp;&nbsp;
							<span style={{color:"f5b4ba"}}>喜欢{this.props.like}</span>
						</div>
					</div>
				</Col>
			</div>
		</Row>
	}
}
export class Main extends Component{
  render(){
    return <div>
      <Content {...this.props}/>
    </div>
  }
}
export default connect(Main,actions);
