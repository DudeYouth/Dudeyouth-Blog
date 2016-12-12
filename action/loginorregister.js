import config from "../public/js/config.js";
let {
    _App,
    ajax
} = config;
export function login(state, data, history, callbackObj) {
    return (dispatch) => {
        ajax({
            type: "post",
            url: _App("default/login"),
            data: data,
            success: function(data) {
                if (data.status === 200) {
                    callbackObj.success(data.user);
                    history.replaceState(null, "/");
                } else {
                    callbackObj.fail();
                }
            }
        })
    }
}
export function register(state, data, history, callbackObj) {
    return (dispatch) => {
        ajax({
            type: "post",
            url: _App("default/register"),
            data: data,
            success: function(data) {
                if (data.status === 200) {
                    callbackObj.success(data.user);
                    history.replaceState(null, "/");
                } else {
                    dispatch(data);
                }
            }
        })
    }
}
export function checkUserName(state, data, callback) {
    return (dispatch) => {
        ajax({
            type: "post",
            url: _App("default/checkUserName"),
            data: data,
            success: function(data) {
                if (data.status === 400) {
                    callback && callback([new Error("该用户名已经被注册！")]);
                } else {
                    callback && callback();
                }
            }
        })
    }
}
export function checkEmail(state, data, callback) {
    return (dispatch) => {
        ajax({
            type: "post",
            url: _App("default/checkEmail"),
            data: data,
            success: function(data) {
                if (data.status === 400) {
                    callback && callback([new Error("该邮箱已经被使用！")]);
                } else {
                    callback && callback();
                }
            }
        })
    }
}
export function editmsg(state, data, history, callbackObj) {
    return (dispatch) => {
        ajax({
            type: "post",
            url: _App("users/editmsg"),
            data: data,
            success: function(data) {
                if (data.status === 200) {
                    history.replaceState(null, "mymsg");
                }
            }
        })
    }
}

export function getmsg(state, data, history, callbackObj) {
    return (dispatch) => {
        ajax({
            type: "get",
            url: _App("users/getmsg"),
            data: data,
            success: function(data) {
                if (data.status === 200) {
                    dispatch(data.msg);
                }
            }
        })
    }
}