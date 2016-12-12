import React,{Component} from "react";
import ReactDOM from "react-dom";
import { Menu, Icon ,Col,Row,Form,Input,Button} from 'antd';
import {connect} from "../public/js/sm-redux.js";
import * as actions from "../action/themeinfo.js";
import {MenuBox,ReplyInput} from "./common.js";
import cookie from "../public/js/cookie.js";
class Content extends Component{
	constructor(props){
		super(props);
		this.userid=cookie.get("uid");
	}
	componentDidMount(){
			this.props.actions.ThemeInfo({
				tid:this.props.location.query.tid,
			})
	}
	replyHandler(content){
		this.props.actions.submitReply({
			tid:this.props.location.query.tid,
			uid:this.userid,
			content:content,
		});
	}
	render(){
		return <Row>
			<Col span={18} offset={3}>
				<Col span={17}>
					<div className="theme-info">
						<h1 className="theme-title">{this.props.title}</h1>
						<div className="theme-msg">
							<span>发布时间：{this.props.time}</span>&nbsp;&nbsp;&nbsp;
							<span>作者：{this.props.author}</span>&nbsp;&nbsp;&nbsp;
							<span>阅读：{this.props.read}</span>
						</div>
						<p className="theme-content">{this.props.content}</p>
						
						<ReplyInput {...this.props} label="评论" replyHandler={this.replyHandler.bind(this)}/>
					</div>
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

export class Main extends Component{
  render(){
    return <div>
      <Content {...this.props}/>
    </div>
  }
}
export default connect(Main,actions);
