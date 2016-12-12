import React,{Component} from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,Col,Row,message } from 'antd';
import {Link} from "react-router";
import {connect} from "../public/js/sm-redux.js";
import cookie from "../public/js/cookie.js";
import {MenuBox} from "./common.js";
import * as actions from "../action/loginorregister.js";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class Login extends Component{
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {
		if (!!errors) {
			console.log('Errors in form!!!');
			return;
		}
		this.props.actions.login(this.props.form.getFieldsValue(),this.props.history,{
				fail:function(){
					message.error("用户不存在或者密码错误！");
				},
				success:function(data){
					cookie.set(data,1)
				}
			});
		});
	}
	render(){
		const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
		const emailProps = getFieldProps('email', {
			validate: [{
				rules: [
				{ required: true },
				],
				trigger: 'onBlur',
			}, {
				rules: [
				{ type: 'email', message: '请输入正确的邮箱地址' },
				],
				trigger: ['onBlur', 'onChange'],
			}],
		});
		const passwdProps = getFieldProps('password', {
			validate: [
				{
					rules: [
						{ required: true, whitespace: true, message: '请填写密码' ,}
					],
				},
				{
					rules: [
						{ min:8,max:16,message:"密码8-16位字符"},
						{  pattern:/^[a-zA-Z1-9+=-_`~_.'":;']+/,message:"密码不能含有空格与特殊字符"},
					],
					trigger: ['onBlur', 'onChange'],
				}
			]
		});
			var UserIcon=(<span style={{padding:"0 4px"}}><Icon type="user" /></span>);
      var PassIcon=(<span style={{padding:"0 4px"}}><Icon type="lock" /></span>);
			var EmailIcon=(<span style={{padding:"0 4px"}}><Icon type="mail" /></span>);
		return <div className="clear login-block">
					<Form horizontal form={this.props.form}>
				        <FormItem>
				         <Input type="text" size="large" {...emailProps}   placeholder="邮箱" addonBefore={UserIcon} />
				        </FormItem>
				        <FormItem>
				         <Input type="password" size="large" {...passwdProps}    placeholder="密码" addonBefore={PassIcon} />
				        </FormItem>
				        <FormItem style={{ marginTop: 24 }}>
				          <Button type="primary" size="large" onClick={this.handleSubmit.bind(this)}>登录</Button>
				        </FormItem>
			      </Form>
			    </div>
	}
}
var NewLogin = Form.create()(Login);
export class Main extends Component{
  render(){
    return <div>
			<Col span={6} offset={9}>
						<Col span={18} offset={3}>
									<NewLogin {...this.props}/>
						</Col>
			</Col>
    </div>
  }
}
export default connect(Main,actions);
