export var ajax = (function() {

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

            if (data[key] && data[key] instanceof Object)

            {

                if (skey)

                    arguments.callee(data[key], skey + "['" + key + "']");

                else

                    arguments.callee(data[key], key);

            } else {

                if (keystr) {

                    request.json += (parseInt(key) || key == 0) ? keystr + "[]=" + data[key] + "&" : keystr + "['" + key + "']=" + data[key] + "&";

                } else {

                    request.json += key + "=" + data[key] + "&";

                }

            }


        }

        return request.json.substring(0, request.json.length - 1);

    };

    // ajax接口

    request.ajax = function(obj) {

        var xhr = request.createXHR(),

            url = "",

            data = encodeURI(request.roomdata(obj["data"])); //数据编码

        if (obj["type"] == "get") //get模式请求数据

            obj["url"] + "?" + data;

        xhr.open(obj["type"], obj["url"], obj["async"]);

        xhr.onreadystatechange = function() {

            if (xhr.readyState == 4 && xhr.status == 200)

            {

                obj["success"](xhr.responseText); //成功回调方法

            }

        }

        xhr.setRequestHeader("Content-Type", obj["ContentType"] || "application/x-www-form-urlencoded; charset=utf8"); //设置表头

        obj["type"] == "get" ? xhr.send(null) : xhr.send(data); //post模式请求数据

    }

    return request.ajax;

})()