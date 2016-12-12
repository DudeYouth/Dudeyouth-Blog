import config from "../public/js/config.js";
let {
    _App,
    ajax
} = config;
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
export function getTheme(state, param) {
    return (dispatch) => {
        ajax({
            type: "get",
            url: _App("users/gettheme"),
            data: param,
            success: function(data) {
                if (data.status === 200) {
                    data.activeKey=param.activeKey;                    
                    dispatch(data);
                }
            }
        })
    }
}
