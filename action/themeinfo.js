import config from "../public/js/config.js";
let {
    _App,
    ajax
} = config;
export function submitReply(state, data) {
    return (dispatch) => {
        ajax({
            type: "get",
            url: _App("users/reply"),
            data: data,
            success: function(data) {
                if(data.status==200){
                    dispatch(data);
                }
            }
        })
    }
}
export function ThemeInfo(state, data) {
    return (dispatch) => {
        ajax({
            type: "get",
            url: _App("default/themeinfo"),
            data: data,
            success: function(data) {
                dispatch(data)
            }
        })
    }
}
export function getReply(state, data) {
    return (dispatch) => {
        ajax({
            type: "get",
            url: _App("default/getreply"),
            data: data,
            success: function(data) {
                dispatch(data)
            }
        })
    }
}
export function like(state, callbackObj) {
    return (dispatch) => {
        ajax({
            type: "get",
            url: _App("user/like"),
            success: function(data) {
                if(data.status===200){
                    callbackObj.success();
                }else{
                    callbackObj.fail();
                }
            }
        })
    }
}
export function a(state, data) {
    return data;
}