import React,{Component} from "react";
import ReactDOM from "react-dom";
import { Menu, Icon ,Col,Row,Tabs,Button,Pagination} from 'antd';
import {connect} from "../public/js/sm-redux.js";
import * as actions from "../action/mymsg.js";
import {MenuBox} from "./common.js";
import {Link} from "react-router";
const TabPane = Tabs.TabPane;
const msgcol={
    span:8,
}
const labcol={
    span:6
}
const concol={
    span:18
}
class List extends Component{
    render(){
		return 	<Row>
			<div className="theme-list" style={{borderBottom:"1px solid #e3e3e3"}}>
				<h2 className="theme-title">
					<Link to="/themeinfo" query={{tid:this.props.tid}}>
						<span className="theme-title-text">{this.props.title}</span>
					</Link>
				</h2>
				<Col span={21}>
					<div className="theme-content">
						<p style={{textIndent:"2em"}}>{this.props.content.substr(0,150)}</p>
						<div className="theme-msg">
							<span style={{color:"#aaa"}}>{this.props.time}</span>&nbsp;&nbsp;&nbsp;
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
class Tab extends Component{
    componentDidMount(){
        this.props.actions.getTheme({
            activeKey:1,
        })
    }
    renderThemeList(){
       return  this.props.theme&&this.props.theme.map((value,key)=>{
            return <List key={key} {...value} />
        }) 
    }
	changePage(page){
        this.props.actions.getTheme({
            activeKey:this.props.activeKey,
            p:page
        })
	}
	renderPage(){
		if(this.props.sum>this.props.number){
			return <Pagination defaultCurrent={1} current={parseInt(this.props.p)||1} pageSize={this.props.number} total={this.props.sum} onChange={this.changePage.bind(this)}/>;
		}
	}
    renderTabs(){
       return  this.props.tabs&&this.props.tabs.map((value,key)=>{
                if(value.typeid==this.props.activeKey){
                    return <TabPane tab={value.name} key={value.typeid} >
                                <Link to="createtheme" query={{typeid:value.typeid}}><Button>{"发表"+value.name}</Button></Link>
                                {this.renderThemeList()}
                                {this.renderPage()}
                            </TabPane>
                }else{
                    return <TabPane tab={value.name} key={value.typeid} >
                                <Link to="createtheme" query={{typeid:value.typeid }}><Button>{"发表"+value.name}</Button></Link>
                          </TabPane>
                }   
        })       
    }
    onChangeTabs(key){
        this.props.actions.getTheme({
            activeKey:key,
        })
    }
    render(){
        return  <Tabs defaultActiveKey="1" activeKey={this.props.activeKey||1} onChange={this.onChangeTabs.bind(this)}>
                    {this.renderTabs()}
                </Tabs>
    }
}
class Content extends Component{
	componentDidMount(){
        this.props.actions.getmsg();
    }
	render(){
		return <Row>
			<Col span={18} offset={3}>
                <div className="block clear">
                    <Col span={17}>
                        <p className="block-title">
                            <span>{this.props.username}</span>
                            <small className="block-title-tip">{this.props.remark&&this.props.remark.substr(0,25)}...</small>
                        </p>
                        <div className="msg-simple clear">
                            <Col span={3} className="msg-user-head">
                                <img src="images/1.gif" />
                            </Col>
                            <Col className="msg-main" span={18}>
                                <p>广东 湛江&nbsp;&nbsp;男&nbsp;&nbsp;恋爱中</p>
                                <p>{this.props.position}</p>
                                <p><Link to="editusermsg">编辑</Link></p>
                            </Col>
                        </div>
                        <div>
                            <p className="block-title" style={{marginTop:"20px"}}>详细信息</p>
                            <div className="menu" style={{paddingTop:"5px"}}>
                                <div className="clear">
                                    <div className="content-cell clear">
                                        <Col {...msgcol}><Col {...labcol}><span className="label">姓名</span></Col><Col {...concol}><span className="block-title-tip">{this.props.name}</span></Col></Col>
                                        <Col {...msgcol}><Col {...labcol}><span className="label">昵称</span></Col><Col {...concol}><span className="block-title-tip">{this.props.username}</span></Col></Col>
                                        <Col {...msgcol}><Col {...labcol}><span className="label">性别</span></Col><Col {...concol}><span className="block-title-tip">{this.props.sex}</span></Col></Col>
                    
                                    </div>
                                    <div className="content-cell clear">
                                        <Col {...msgcol}><Col {...labcol}><span className="label">城市</span></Col><Col {...concol}><span className="block-title-tip">广东 湛江</span></Col></Col>
                                        <Col {...msgcol}><Col {...labcol}><span className="label">职位</span></Col><Col {...concol}><span className="block-title-tip">{this.props.position}</span></Col></Col>
                                        <Col {...msgcol}><Col {...labcol}><span className="label">email</span></Col><Col {...concol}><span className="block-title-tip">{this.props.email}</span></Col></Col>
                                    </div>
                                    <div className="content-cell clear">
                                        <Col {...msgcol}><Col {...labcol}><span className="label">手机号码</span></Col><Col {...concol}><span className="block-title-tip">{this.props.phone}</span></Col></Col>
                                        <Col {...msgcol}><Col {...labcol}><span className="label">QQ</span></Col><Col {...concol}><span className="block-title-tip">{this.props.qq}</span></Col></Col>
                                    </div>
                                </div>
                                <p className="label" style={{padding:"5px 0"}}>介绍自己</p>
                                <p className="content-cell">{this.props.remark}</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={7}>
                        <MenuBox titleName="最近访问记录" {...this.props}/>
                    </Col>
                </div>
                <div className="block">
                    <Tab {...this.props}/>
                </div>
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
