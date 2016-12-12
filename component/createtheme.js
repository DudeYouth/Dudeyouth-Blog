import React,{Component} from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,Col,Row,Select} from 'antd';
import {connect} from "../public/js/sm-redux.js";
import * as actions from "../action/createtheme.js";
import {MenuBox} from "./common.js";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option=Select.Option;
class CreateTheme extends Component{
	componentDidMount(){
		this.props.actions.LabelList();
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.actions.createtheme(Object.assign(this.props.form.getFieldsValue(),this.selectValue,{typeid:this.props.location.query.typeid}),this.props.history);
	}
	renderlabel(){
		return this.props.labels&&this.props.labels.map((item,key)=>{
			return <Option key={item.lid}>{item.name}</Option>
		})
	}
	selecthandler(value){
		this.selectValue={
			label:value,
		}
	}
	render(){
	    const { getFieldProps } = this.props.form;
	    const formItemLayout = {
	      labelCol: { span: 3 },
	      wrapperCol: { span: 19 },
	    };
		return <Row>
			<Col span={18} offset={3}>
				<Col span={17}>
					<div className="container msg-box clear">
						<h2 className="msg-title">发表文章</h2>
						<Form horizontal >
					        <FormItem
					          {...formItemLayout}
					          label="标题：">
					         <Input type="text" {...getFieldProps('title')} placeholder="" />
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="内容："
					          help="随便写点什么">
					          <Input type="textarea" {...getFieldProps('content')} placeholder="随便写" rows={8}/>
					        </FormItem>
					        <FormItem {...formItemLayout}
					          label="选择标签："
					          >
								<Select multiple
								    style={{ width: '100%' }}
								     onChange={this.selecthandler.bind(this)} >
										{this.renderlabel()}
								</Select>
					        </FormItem>
					        <FormItem wrapperCol={{ span: 16, offset: 3 }} style={{ marginTop: 24 }}>
					          <Button type="default" htmlType="submit" onClick={this.handleSubmit.bind(this)}>发表文章</Button>
					        </FormItem>
				      </Form>
				    </div>
				</Col>
				<Col span={7}>
					<div className="menu">
						<MenuBox titleName="温馨提示"/>
					</div>
				</Col>
			</Col>
		</Row>
	}
}
var NewEditUserMsg = Form.create()(CreateTheme);
export class Main extends Component{
  render(){
    return <div>
      <NewEditUserMsg {...this.props}/>
    </div>
  }
}
export default connect(Main,actions);
