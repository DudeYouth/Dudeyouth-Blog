import ReactDOM from  "react-dom";
import React from "react";
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {Router,Route,IndexRoute,routes} from "react-router";
import App from "../component/app.js";
import Apps from "../component/_app.js";
import Index from "../component/index.js";
import Blog from "../component/blog.js";
import Mood from "../component/mood.js";
import Qa from "../component/qa.js";
import Createtheme from "../component/createtheme.js";
import Themeinfo from "../component/themeinfo.js";
import Board from "../component/board.js";
import Login from "../component/login.js";
import Register from "../component/register.js";
import EditUserMsg from "../component/editusermsg.js";
import Mymsg from "../component/mymsg.js";
import CreateThmem from "../component/createtheme.js";
import config from "../public/js/config.js";
import cookie from "../public/js/cookie.js";
var history=createBrowserHistory();
config.ajax.use("success",function(data){
    if(data.status===500){
        cookie.delete("name");
        cookie.delete("uid");
        alert(data.title);
        history.replaceState(null,"/login");
        return true;
    }
})
ReactDOM.render(
    <Router history={history}  >
        <Route path="/" component={App} >
            <IndexRoute component={Index}/>
            <Route path="index" component={Index} />
            <Route path="blog" component={Blog} />
            <Route path="mood" component={Mood} />
            <Route path="qa" component={Qa} />
            <Route path="createtheme" component={Createtheme} />
            <Route path="themeinfo" component={Themeinfo} />
            <Route path="board" component={Board} />
            <Route path="editusermsg" component={EditUserMsg} />
            <Route path="mymsg" component={Mymsg} />
            <Route path="createThmem" component={CreateThmem} />
        </Route>
        <Route path="/" component={Apps}>
            <IndexRoute component={Register}/>
            <Route path="login" component={Login} />
            <Route path="register" component={Register} />
        </Route>
    </Router>,
    document.getElementById("container")
)
