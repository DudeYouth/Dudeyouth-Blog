import React,{Component} from "react";
import ReactDOM from "react-dom";
import { Menu, Icon ,Col,Row,Pagination} from 'antd';
import {connect} from "../public/js/sm-redux.js";
import * as actions from "../action/actions.js";
import {MenuBox,ThemeListBox} from "./common.js";
import {Link} from "react-router";
class Content extends Component{
	render(){
		return <Row>
			<Col span={18} offset={3}>
				<Col span={17}>
					<ThemeListBox {...this.props}/>
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
