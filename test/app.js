webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _reactDom = __webpack_require__(1);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _react = __webpack_require__(147);

	var _react2 = _interopRequireDefault(_react);

	var _publicJsSmRedux = __webpack_require__(159);

	var _publicJsSmRedux2 = _interopRequireDefault(_publicJsSmRedux);

	var Test01 = (function (_Component) {
	  _inherits(Test01, _Component);

	  function Test01() {
	    _classCallCheck(this, Test01);

	    _get(Object.getPrototypeOf(Test01.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Test01, [{
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement(
	        "h1",
	        null,
	        this.props.context
	      );
	    }
	  }]);

	  return Test01;
	})(_publicJsSmRedux2["default"]);

	var Test02 = (function (_Component2) {
	  _inherits(Test02, _Component2);

	  function Test02() {
	    _classCallCheck(this, Test02);

	    _get(Object.getPrototypeOf(Test02.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Test02, [{
	    key: "clickHandler",
	    value: function clickHandler() {
	      this.dispatch({
	        test01: {
	          context: "holle huangqiying"
	        }
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement(
	        "h1",
	        { onClick: this.clickHandler.bind(this) },
	        this.props.context
	      );
	    }
	  }]);

	  return Test02;
	})(_publicJsSmRedux2["default"]);

	var Main = (function (_Component3) {
	  _inherits(Main, _Component3);

	  function Main() {
	    _classCallCheck(this, Main);

	    _get(Object.getPrototypeOf(Main.prototype), "constructor", this).apply(this, arguments);
	  }

	  _createClass(Main, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.dispatch({
	        test01: {
	          context: "huangqiying"
	        },
	        test02: {
	          context: "holle word"
	        }
	      });
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement(
	        "div",
	        null,
	        _react2["default"].createElement(Test01, this.props.test01),
	        _react2["default"].createElement(Test02, this.props.test02)
	      );
	    }
	  }]);

	  return Main;
	})(_publicJsSmRedux2["default"]);

	var Newmain = (0, _publicJsSmRedux.connect)(Main);
	_reactDom2["default"].render(_react2["default"].createElement(Newmain, null), document.getElementById("container"));

/***/ },

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	exports.connect = connect;
	exports.bindAction = bindAction;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(147);

	var _react2 = _interopRequireDefault(_react);

	var objHash = (function () {
		var hash = 0;
		return {
			addHash: function addHash(data) {
				var keys = Object.keys(data);
				var obj = null;
				for (var i = 0; i < keys.length; i++) {
					obj = data[keys[i]];
					if (typeof isObject(obj)) {
						Object.defineProperty(obj, "hash", {
							'enumerable': false,
							'configurable': false,
							'writable': false,
							'value': hash
						});
						hash++;
					}
					if (obj instanceof Array || typeof obj === "function") {
						obj.hash = hash;
					}
				}
			},
			compare: function compare(props, nextprops) {
				var keys = Object.keys(props);
				var value = null;
				var nextValue = null;
				if (!props || !nextprops || !keys.length) {
					return true;
				}
				for (var i = 0; i < keys.length; i++) {
					value = props[keys[i]];
					nextValue = nextprops[keys[i]] || {};
					if (typeof value === "object" || typeof value === "function") {
						if (!value.hash || !nextValue.hash || value.hash !== nextValue.hash) {
							return true;
						}
					} else {
						if (value != nextValue) {
							return true;
						}
					}
				}
				return false;
			}
		};
	})();
	var extendFun = {};

	var NewComponent = (function (_Component) {
		_inherits(NewComponent, _Component);

		function NewComponent(props) {
			_classCallCheck(this, NewComponent);

			_get(Object.getPrototypeOf(NewComponent.prototype), "constructor", this).call(this, props);
			this.init();
		}

		_createClass(NewComponent, [{
			key: "init",
			value: function init() {
				this.actions = extendFun.actions || {};
				if (!extendFun.dispatch) {
					console.warn("dispatch已失效！");
				}
				this.dispatch = extendFun.dispatch || this.setState;
			}
		}, {
			key: "shouldComponentUpdate",
			value: function shouldComponentUpdate(nextprops) {
				return objHash.compare(this.props, nextprops);
			}
		}]);

		return NewComponent;
	})(_react.Component);

	exports["default"] = NewComponent;

	function connect(App, actions) {
		var getState = null;
		extendFun.dispatch = getState = function () {
			throw new Error("组件还没初始化");
		};

		var Main = (function (_Component2) {
			_inherits(Main, _Component2);

			function Main(props) {
				var _this = this;

				_classCallCheck(this, Main);

				_get(Object.getPrototypeOf(Main.prototype), "constructor", this).call(this, props);
				extendFun.dispatch = function (data) {
					objHash.addHash(data);
					_this.setState(Object.assign({}, _this.state, data));
				};
				getState = function () {
					return this.state;
				};
				extendFun.actions = bindAction(actions, extendFun.dispatch, getState || {});
			}

			_createClass(Main, [{
				key: "render",
				value: function render() {
					return _react2["default"].createElement(
						"div",
						null,
						(0, _react.createElement)(App, Object.assign({}, this.props, this.state))
					);
				}
			}]);

			return Main;
		})(_react.Component);

		return Main;
	}

	function bindActionCreators(action, dispatch, getState) {
		if (typeof action === "function") {
			return function () {
				[].unshift.call(arguments, getState());
				var newState = action.apply(null, arguments);
				if (typeof newState === "function") {
					newState(dispatch);
				} else if (isObject(newState)) {
					dispatch(newState);
				} else {
					throw new Error("action方法返回值只能是函数或者对象");
				}
			};
		}
	}

	function bindAction(actions, dispatch, getState) {
		var newActions = {};
		if (isObject(actions)) {
			var keys = Object.keys(actions);
			keys.forEach(function (value) {
				newActions[value] = bindActionCreators(actions[value], dispatch, getState);
			});
			return newActions;
		} else if (actions) {
			throw new Error("actions必须是对象");
		}
	}

	//检测是否是一个对象
	var isObject = function isObject(data) {
		if (Object.prototype.toString.call(data) == "[object Object]") {
			return true;
		} else {
			return false;
		}
	};

/***/ }

});