import React,{Component} from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,Col,Row } from 'antd';
import {connect} from "../public/js/sm-redux.js";
import {MenuBox} from "./common.js";
import * as check from "../action/loginorregister.js";
import * as mymsg from "../action/mymsg.js";
let actions=Object.assign(mymsg,check);
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class EditUserMsg extends Component{
		componentDidMount(){
			this.props.actions.getmsg();
		}
		handleSubmit(e) {
			e.preventDefault();
			this.props.form.validateFields((errors, values) => {
			if (!!errors) {
				console.log('Errors in form!!!');
				return;
			}
			this.props.actions.editmsg(this.props.form.getFieldsValue(),this.props.history);
			});
		}
    checkEmail(rule, value, callback){
		if(typeof callback!="function"){
			return false;
		}
		if (!value) { 
			callback();
		} else {
        this.props.actions.checkEmail(value, callback);
		}
    }
	checkUserName(rule, value, callback) {
		if(typeof callback!="function"){
			return false;
		}
		if (!value) { 
			callback();
		} else {
			this.props.actions.checkUserName(value, callback);
		}
	}
	render(){
	    const { getFieldProps,isFieldValidating,getFieldError } = this.props.form;
	    const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
		const usernameProps = getFieldProps('username', {
			initialValue:this.props.username,
			rules: [
				{ required: true, min: 5, message: '昵称至少为 5 个字符' },
				{ validator: this.checkUserName.bind(this) },
			],
		});
		const emailProps = getFieldProps('email', {
			initialValue:this.props.email,
			rules: [
				{ required: true ,type: 'email', message: '请输入正确的邮箱地址' },
				{ validator: this.checkEmail.bind(this) },
			],
		});
		return <Row>
			<Col span={18} offset={3}>
				<div className="container msg-box clear">
					<h2 className="msg-title">填写以下信息</h2>
					<Form horizontal form={this.props.form}>
				        <FormItem
				          {...formItemLayout}
				          label="昵称："  help={isFieldValidating('username') ? '校验中...' : (getFieldError('username') || []).join(',')} >
				         <Input type="text"  placeholder="" {...usernameProps} />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="姓名：">
				         <Input type="text"  placeholder="" {...getFieldProps('name',{initialValue:this.props.name||''}) }/>
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="您的性别：">
				          <RadioGroup >
				            <Radio value="male">男的</Radio>
				            <Radio value="female">女的</Radio>
				          </RadioGroup>
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="邮箱："   help={isFieldValidating('email') ? '校验中...' : (getFieldError('email') || []).join(',')}
				          >
				         <Input type="text"  placeholder="" {...emailProps}/>
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="公司：">
				         <Input type="text"  placeholder=""  {...getFieldProps('company',{initialValue:this.props.company||''}) }/>
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="职位：">
				         <Input type="text"  placeholder=""  {...getFieldProps('position',{initialValue:this.props.position||''}) } />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="github地址：">
				         <Input type="text"  placeholder=""   {...getFieldProps('git',{initialValue:this.props.git||''}) }/>
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="博客地址：">
				         <Input type="text"  placeholder=""   {...getFieldProps('blog',{initialValue:this.props.blog||''}) }/>
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="介绍自己："
				          help="随便写点什么">
				          <Input type="textarea" placeholder="随便写"  {...getFieldProps('remark',{initialValue:this.props.remark||''}) } />
				        </FormItem>
				        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
				          <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>确定</Button>
				        </FormItem>
			      </Form>
			    </div>
			</Col>
		</Row>
	}
}
var NewEditUserMsg = Form.create()(EditUserMsg);
export class Main extends Component{
  render(){
    return <div>
      <NewEditUserMsg {...this.props}/>
    </div>
  }
}
export default connect(Main,actions);
