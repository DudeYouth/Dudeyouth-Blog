import config from "../public/js/config.js";
let {
    _App,
    ajax
} = config;
export function ImagesList(state,param) {
    return (dispatch) => {
        ajax({
            url: _App("default/load"),
            type: "get",
            data:param,
            success: function(data) {
                dispatch(data)
            }
        })
    }
}