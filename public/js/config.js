let root = "http://localhost:3000/";
var useList = {};
var ajax = (function() {

    var request = {};

    // 生成ajax对象

    request.createXHR = function() {

        var xhr = null;

        return function() {

            //惰性方法

            if (xhr)

                return xhr;

            if (window.XMLHttpRequest) {

                return xhr = new XMLHttpRequest();

            } else if (window.ActiveXObject) {

                return xhr = new ActiveXObject();

            }

        };

    }();

    request.json = "";

    // 格式化发送数据

    request.roomdata = function(data, keystr) {

        var skey = keystr || "";

        for (var key in data) {

            if (data[key] && data[key] instanceof Object) {

                if (skey){
                    request.roomdata(data[key], skey + "['" + key + "']");
                }
                else{

                    request.roomdata(data[key], key);
                }
            } else {

                if (keystr) {

                    request.json += (parseInt(key) || key == 0) ?encodeURIComponent(keystr + "["+key+"]")+"=" + encodeURIComponent(data[key]) + "&" : encodeURIComponent(keystr + "[" + key + "]")+"=" + encodeURIComponent(data[key]) + "&";

                } else {

                    request.json += key + "=" +encodeURIComponent( data[key])+ "&";

                }

            }


        }

        return request.json.substring(0, request.json.length - 1);

    };


    // ajax接口
    var _AjaxMain = function() {
        if (!window.fetch) {
            return function(obj) {
                var config = {
                    method: obj["type"] || "get",
                    credentials: 'include',
                    headers: {
                        "Content-Type": obj["Content-Type"] ||
                            "application/x-www-form-urlencoded"
                    },
                }
                if (obj["type"] == "post" && obj["data"]) {
                    Object.assign(config, {
                        body: obj["data"],
                    })
                }
                fetch(obj["url"], config).then((res) => {
                    res.json().then(function(json) {
                        var flag = useList["success"] && useList["success"](json); //执行成功中间件
                        if (flag) { //中间件返回true时，终止执行
                            return false;
                        }
                        obj["success"](json);
                    })
                })
            }
        } else {
            return function(obj) {
                var xhr = request.createXHR();
                xhr.open(obj["type"], obj["url"], obj["async"]);
                xhr.onreadystatechange = function() {

                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var flag = useList["success"] && useList["success"](JSON.parse(xhr.responseText));
                        if (flag) {
                            return false;
                        }
                        obj["success"](JSON.parse(xhr.responseText)); //成功回调方法
                    }

                }

                xhr.setRequestHeader("Content-Type", obj["Content-Type"] ||
                    "application/x-www-form-urlencoded; charset=utf8"); //设置表头

                obj["type"] == "get" ? xhr.send(null) : xhr.send(obj["data"]); //post模式请求数据
            }
        }
    }();

    function _ajax(obj) {
        request.json = "";
        if(typeof obj["data"]=="string"){
            obj["data"]="data="+obj["data"];
        }else{
            obj["data"] = request.roomdata(obj["data"]); //数据格式化
        }
        if (obj["type"] == "get") //get模式请求数据
            obj["url"] += "?" + obj["data"];
        _AjaxMain(obj);
    }
    _ajax.use = (name, callback) => {
        if (typeof callback === "function") {
            useList[name] = callback;
        } else {
            throw new Error("植入的中间件必须是方法！");
        }
    }
    return _ajax;
})();

function getURlParam() {
    var params = window.location.search.substr(1, window.location.search.length).split("&");
    var obj = {};
    !params.length && (params = [params]);
    params.forEach((value) => {
        var arr = value.split("=");
        obj[arr[0]] = arr[1];
    })
    return function(key) {
        return obj[key] || "";
    }
}

function formParam(param) {
    var str = "?";
    for (var key in param) {
        str += key + "=" + param[key] + "&";
    }
    if (str === "?") {
        return "";
    }
    return str.substr(0, str.length - 1);
}
function formdate(date){
   if(!date){
       return "刚刚";
   }
   var arr= date.split(":");
   var year=0,month=0,day=0,hours=0,minute=0,second=0,dated=0;
   if(arr[0]!=="00"){
        (hours=parseInt(arr[0]))&&(day=Math.floor(hours/24))&&(month=Math.floor(day/30))&&(year=Math.floor(month/12));
   }
   minute=parseInt(arr[1]);
   second=parseInt(arr[2]);
   dated=(year&&(year+"年")||month&&(month+"月")||day&&(day+"天")||hours&&(hours+"小时")||minute&&(minute+"分钟")||second&&(second+"秒"));
   return dated+"前";
}
export default {
    _App(url, param) {
            return root + url + formParam(param);
        },
        ajax: ajax,
        formdate:formdate,
}