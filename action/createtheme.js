import config from "../public/js/config.js";
let {
    _App,
    ajax
} = config;
export function LabelList(state) {
    return (dispatch) => {
        ajax({
            type: "get",
            url: _App("users/labellist"),
            success: function(data) {
                dispatch(data);
            }
        })
    }
}
export function createtheme(state, data, history) {
    console.log(data)
    return (dispatch) => {
        ajax({
            type: "post",
            url: _App("users/createtheme"),
            data: JSON.stringify(data),
            success: function(data) {
                if (data.status == 200) {
                    history.replaceState(null, "/themeinfo", {
                        tid: data.tid
                    });
                }
            }
        })
    }
}