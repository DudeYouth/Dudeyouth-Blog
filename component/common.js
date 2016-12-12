import React,{Component} from "react";
import ReactDOM from "react-dom";
import { Menu, Icon ,Col,Row,Form,Input,Button,message,Pagination} from 'antd';
import {Link} from 'react-router';
import cookie from "../public/js/cookie.js";
import config from "../public/js/config.js";
import Markdown,{Code} from 'react-markdown';
let {formdate}=config;
export class Suggest extends Component{
    render(){
		return <Row>
					<Col  span={20} offset={2}> 
						<div className="suggest-main clear">
							<Col span={6} offset={9}>
								<div className="suggest-title">
									<h1 className="suggest-title-lg">Dudeyouth Blog</h1>
									<h2>分享技术，进击前端</h2>
								</div>
								<div className="menu-tag">
									<h2 style={{width:"100%"}}><Link to="/login" activeClassName="active" >登录</Link>&nbsp;&nbsp;.&nbsp;&nbsp;<Link to="/register" activeClassName="active" >注册</Link></h2>
								</div>
							</Col>
						</div>
					</Col>
				</Row>
    }
}
export class Nav extends Component{
	loginStatus(){
		if(cookie.get("uid")){
				return <Col span={3} offset={10}>
						<Link to="mymsg">
								<img className="nav-user-head" src="images/1.gif" />
								{cookie.get("username")}
						</Link> 
				</Col>
		}else{
			return <Col span={3} offset={10}>
						<Link to="login">登录</Link> 
				</Col>
		}
	}
  render() {
    return (
      <div>
        <Menu  mode="horizontal">
          <Col span={3}>&nbsp;</Col>
          <Menu.Item key="mail">
            <Link to="/index" >首页</Link>
          </Menu.Item>
          <Menu.Item key="alipay">
         	 <Link to="/blog" query={{typeid:1}}>博文</Link>
          </Menu.Item>
          <Menu.Item key="app">
            <Link to="/mood" query={{typeid:2}}>心情</Link>
          </Menu.Item>
          <Menu.Item key="23">
            <Link to="/qa" query={{typeid:3}}>问答</Link>
          </Menu.Item>
          <Menu.Item key="666">
          <Link to="/board" query={this.state}>	在线聊天</Link>
          </Menu.Item>
					{this.loginStatus()}
        </Menu> 
      </div>
    );
  }
}
export class MenuBox extends Component{
	renderList(){
		return this.props.record&&this.props.record.map((value,key)=>{
			return 	<li className="menu-list" key={key}><Link to="themeinfo" query={{tid:value.tid}} >{value.title}</Link></li>
		})
	}
	render(){
		return <div className="block menu-box">
			<h3 className="menu-title">{this.props.titleName}</h3>
			<ul>
				{this.renderList()}
			</ul>
		</div>
	}
}
class _ReplyInput extends Component{
	constructor(props){
		super(props);
	}
	renderReply(){
		return this.props.reply&&this.props.reply.map((value,item)=>{
			return <Reply clickReplyHanlder={this.clickReplyHanlder.bind(this)} {...value} key={item}/>
		})
	}
	clickReplyHanlder(e){
		const {setFieldsValue,getFieldValue}=this.props.form;
		this.userid=e.target.dataset.uid;
		setFieldsValue({
			"reply":"@"+e.target.dataset.name+" ",
		})
	}
	writeContent(e){
		if(!this.props.form.getFieldsValue().reply){
			message.error("回复内容不能为空！");
			return false;
		}
		this.props.replyHandler(this.props.form.getFieldValue("reply"));
	}
	changePage(page){
		this.props.actions.getReply({
			tid:this.props.location.query.tid,
			p:page,
		})
	}
	renderPage(){
		if(this.props.sum>this.props.number){
			return <Pagination defaultCurrent={1} current={parseInt(this.props.p)||1} pageSize={this.props.number} total={this.props.sum} onChange={this.changePage.bind(this)}/>
		}
	}
	render(){
		const { getFieldProps} = this.props.form;
		const replyProps = getFieldProps('reply', {});
		return <Row>
			<div className="reply" style={{margin:this.props.margin,marginTop:this.props.marginTop}}>
				<Form horizontal>
					<Form.Item label={this.props.label+"："}>
									<Input type="textarea" placeholder="随便写,支持markdown语法！"  rows="5" {...replyProps }    id="replyContent"/>
					</Form.Item>
					<Form.Item>
							<Button type="success" htmlType="submit" onClick={this.writeContent.bind(this)}>{"发表"+this.props.label}</Button>
					</Form.Item>
				</Form>
			</div>
			{this.renderReply()}
			{this.renderPage()}
		</Row>
	}
}
export class Reply extends Component{
	clickLikeHandler(e){
		this.props.actions.like({
			success(){
				e.target.innerText(`喜欢&nbsp;${this.props.liked+1}`);
			},
			fail(){
				alert("您已赞过该评论！");
			}
		})
	}
	render(){
		return <Row>
			<div className="reply-box clear">
				<Col span={3}>
					<div className="reply-head-img">
						<img src={this.props.avatar} />
					</div>
				</Col>
				<Col span={20}>
					<h3 className="reply-title">{this.props.author}</h3>
					<div className="reply-content"><Markdown source={this.props.content} /></div>
					<div className="reply-msg">
						<span>{this.props.time}</span>&nbsp;&nbsp;&nbsp;
						<a href="#replyContent" onClick={this.props.clickReplyHanlder} data-name={this.props.author} data-uid={this.props.uid}>回复&nbsp;{this.props.comments}</a>&nbsp;&nbsp;&nbsp;
						<span  onClick={this.clickLikeHandler.bind()}>喜欢&nbsp;{this.props.liked}</span>&nbsp;&nbsp;&nbsp;
					</div>
				</Col>
			</div>
		</Row>
	}
}
export class ThemeList extends Component{
	render(){
		return 	<Row>
			<div className="theme-list">
				<h2 className="theme-title">
					<Link to="/themeinfo" query={{tid:this.props.tid}}>
						<span className="theme-type">{this.props.label}</span>
						<span className="theme-title-text">{this.props.title}</span>
					</Link>
				</h2>
				<Col span={3}>
					<div className="theme-image">
						<img src={this.props.avatar} />
					</div>
				</Col>
				<Col span={21}>
					<div className="theme-content">
						<p>{this.props.content.substr(0,150)}</p>
						<div className="theme-msg">
							<span style={{color:"#aaa"}}>时间：{formdate(this.props.time)}</span>&nbsp;&nbsp;&nbsp;
							<span style={{color:"#aaa"}}>作者：{this.props.author}</span>&nbsp;&nbsp;&nbsp;
							<span style={{color:"#aaa"}}>阅读&nbsp;{this.props.readed}</span>&nbsp;&nbsp;&nbsp;
							<span style={{color:"#96deca"}}>评论&nbsp;{this.props.comments}</span>&nbsp;&nbsp;&nbsp;
							<span style={{color:"f5b4ba"}}>喜欢&nbsp;{this.props.liked}</span>
						</div>
					</div>
				</Col>
			</div>
		</Row>
	}
}
export var ReplyInput=Form.create()(_ReplyInput)
export class ThemeListBox extends Component{
	componentDidMount(){
			this.props.actions.ImagesList({typeid:this.props.location.query.typeid||0});
	}
	renderList(){
		return this.props.theme&&this.props.theme.map(function(value,key){
			return <ThemeList key={key} {...value}/>
		})
	}
	changePage(page){
		this.props.actions.ImagesList({typeid:this.props.location.query.typeid||0,p:page});
	}
	renderPage(){
		if(this.props.sum>this.props.number){
			return <Pagination defaultCurrent={1} current={parseInt(this.props.p)||1} pageSize={this.props.number} total={this.props.sum} onChange={this.changePage.bind(this)}/>
		}
	}
	render(){
		return  <div>
					{this.renderList()}
					{this.renderPage()}
				</div>
	}
}
