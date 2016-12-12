import React,{Component,createElement} from "react";
var objHash=function(){
	var hash=0;
	return {
		addHash:function(data){
			var keys=Object.keys(data);
			var obj=null;
			for(var i=0;i<keys.length;i++){
				obj=data[keys[i]];
				if(typeof isObject(obj)){
					Object.defineProperty(obj,"hash",{
						'enumerable':false,
						'configurable':false,
						'writable':false,
						'value':hash,
					});
					hash++;
				}
				if(obj instanceof Array||typeof obj==="function"){
					obj.hash=hash;
				}
			}
		},
		compare:function(props,nextprops){
			var keys=Object.keys(props);
			var value=null;
			var nextValue=null;
			if(!props||!nextprops||!keys.length){
				return true;
			}
			for(var i=0;i<keys.length;i++){
				value=props[keys[i]];
				nextValue=nextprops[keys[i]]||{};
				if(typeof value==="object"||typeof value==="function"){
					if(!value.hash||!nextValue.hash||value.hash!==nextValue.hash){
						return true;
					}
				}else{
					if(value!=nextValue){
						return true;
					}
				}
			}
			return false;
		}
	}
}()
var extendFun={};
export default class NewComponent extends Component{
	constructor(props){
		super(props);
		this.init();
	}
	init(){
		this.actions=extendFun.actions||{};
		if(!extendFun.dispatch){
			console.warn("dispatch已失效！");
		}
		this.dispatch=extendFun.dispatch||this.setState;
	}
	shouldComponentUpdate(nextprops){
		return objHash.compare(this.props,nextprops);
	}
}
export function connect(App,actions){
var getState=null;
extendFun.dispatch=getState=function(){
	throw new Error("组件还没初始化");
}
class Main extends Component{
	constructor(props){
		super(props);
		extendFun.dispatch=(data)=>{
			objHash.addHash(data);
			this.setState(Object.assign({},this.state,data));
		}
		getState=function(){
			return this.state;
		}
		extendFun.actions=bindAction(actions,extendFun.dispatch,getState||{});
	}
	render(){
		return <div>
			{createElement(App,Object.assign({},this.props,this.state))}
		</div>
	}
}
return Main;
}
function bindActionCreators(action,dispatch,getState){
	if(typeof action==="function"){
		return function(){
			[].unshift.call(arguments,getState());
			var newState=action.apply(null,arguments);
			if(typeof newState==="function"){
				newState(dispatch)
			}else if(isObject(newState)){
				dispatch(newState);
			}else{
				throw new Error("action方法返回值只能是函数或者对象");
			}
		}
	}
}

export function bindAction(actions,dispatch,getState){
	var newActions={};
	if(isObject(actions)){
		var keys=Object.keys(actions);
		keys.forEach(function(value){
			newActions[value]=bindActionCreators(actions[value],dispatch,getState)
		})
		return newActions;
	}else if(actions){
		throw new Error("actions必须是对象")
	}
}

//检测是否是一个对象
let isObject=(data)=>{
	if(Object.prototype.toString.call(data)=="[object Object]"){
		return true;
	}else{
		return false;
	}
}