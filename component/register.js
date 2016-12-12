import React,{Component} from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,Col,Row } from 'antd';
import {connect} from "../public/js/sm-redux.js";
import cookie from "../public/js/cookie.js";
import {MenuBox} from "./common.js";
import * as actions from "../action/loginorregister.js";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
function noop() {
  return false;
}
class Register extends Component{
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((errors, values) => {
		if (!!errors) {
			console.log('Errors in form!!!');
			return;
		}
		this.props.actions.register(this.props.form.getFieldsValue(),this.props.history,{
			success:function(data){
				cookie.set(data,1)
			}.bind(this)
		});
		});
	}
    checkEmail(rule, value, callback){
		if(typeof callback!="function"){
			return false;
		}
		if (!value) { 
			callback();
		} else {
        	this.props.actions.checkEmail({email:value}, callback);
		}
    }
	checkUserName(rule, value, callback) {
		if(typeof callback!="function"){
			return false;
		}
		if (!value) { 
			callback();
		} else {
			this.props.actions.checkUserName({username:value}, callback);
		}
	}
	checkPass(rule, value, callback) {
		const { validateFields } = this.props.form;
		if (value) {
			validateFields(['rePasswd'], { force: true });
		}
		callback();
	}

	checkPass2(rule, value, callback) {
		const { getFieldValue } = this.props.form;
		if (value && value !== getFieldValue('password')) {
			callback('两次输入密码不一致！');
		} else {
			callback();
		}
	}
	render(){
		const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
		const usernameProps = getFieldProps('username', {
			rules: [
				{ required: true, min: 5, message: '用户名至少为 5 个字符' },
				{ validator: this.checkUserName.bind(this) },
			],
		});
		const emailProps = getFieldProps('email', {
			rules: [
				{ required: true ,type: 'email', message: '请输入正确的邮箱地址' },
				{ validator: this.checkEmail.bind(this) },
			],
		});
		const passwdProps = getFieldProps('password', {
			validate: [
				{
					rules: [
						{ required: true, whitespace: true, message: '请填写密码' ,},
						{ validator: this.checkPass.bind(this) },
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
		const rePasswdProps = getFieldProps('rePasswd', {
			rules: [{
				required: true,
				whitespace: true,
				message: '请再次输入密码',
			}, {
				validator: this.checkPass2.bind(this) ,
			}],
		});
        var UserIcon=(<span style={{padding:"0 4px"}}><Icon type="user" /></span>);
        var PassIcon=(<span style={{padding:"0 4px"}}><Icon type="lock" /></span>);
        var EmailIcon=(<span style={{padding:"0 4px"}}><Icon type="mail" /></span>);
		return <div className="register-block clear">
					<Form horizontal form={this.props.form}>
				        <FormItem  hasFeedback help={isFieldValidating('username') ? '校验中...' : (getFieldError('username') || []).join(',')}>
				         <Input type="text" size="large" {...usernameProps}   placeholder="昵称" addonBefore={UserIcon} onBlur={this.checkUserName.bind(this)}/>
				        </FormItem>
				        <FormItem hasFeedback help={isFieldValidating('email') ? '校验中...' : (getFieldError('email') || []).join(', ')}>
				         <Input type="text" size="large" {...emailProps}   placeholder="邮箱地址" addonBefore={EmailIcon} onBlur={this.checkEmail.bind(this)}/>
				        </FormItem>
				        <FormItem hasFeedback>
				         <Input type="password" size="large" autoComplete="off" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} {...passwdProps}   placeholder="输入密码" addonBefore={PassIcon}/>
				        </FormItem>
				        <FormItem hasFeedback>
				         <Input type="password" size="large" autoComplete="off" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} {...rePasswdProps}  placeholder="确认密码" addonBefore={PassIcon}/>
				        </FormItem>
				        <FormItem style={{ marginTop: 24 }}>
				          <Button type="primary" size="large"  onClick={this.handleSubmit.bind(this) }>注册</Button>
				        </FormItem>
			      </Form>
			    </div>
	}
}
var NewRegister= Form.create()(Register);
export class Main extends Component{
  render(){
    return <div>
		<Col span={6} offset={9}>
			<Col span={18} offset={3}>
				<NewRegister {...this.props}/>
			</Col>
		</Col>
    </div>
  }
}
export default connect(Main,actions);
