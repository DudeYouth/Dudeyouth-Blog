"use strict";
var express = require('express');
var app = express();
var router = express.Router();
var query = require("../conf/db.config.js");
var md5 = require("md5");
var pageNumber=20;//每页显示的数目--主题
router.get("/", function(req, res, next) {
    res.render("index");
})
router.get("/load", function(req, res, next) {
    //查询所有主题并分页
    var sql=`select t.*,timediff(now(),t.createtime) as time,u.uid,u.avatar,u.username as author,l.lid,l.name as label  from theme t,user u,label l where t.uid=u.uid and t.lid=l.lid`;
   //统计主题总数
   var countsql=`select count(tid) as sum from theme`;
    if(req.query.typeid&&req.query.typeid!=0){
        sql=`${sql} and t.typeid=${req.query.typeid}`;
    }
    var number=(req.query.p&&req.query.p>0)?(req.query.p-1)*pageNumber:0;
    sql=`${sql} order by createtime DESC limit ${number},${pageNumber}`;
    query(sql, function(err, theme) {
        if(req.query.typeid&&req.query.typeid!=0){
            countsql=`${countsql} where typeid=${req.query.typeid}`;
        }
        query(countsql,function(err,data){
            res.send({
                status:200,
                theme: theme,
                sum:data[0]?data[0].sum:0,
                number:pageNumber,
                p:req.query.p,
            })
        })
    });
})
router.get("/themeinfo", function(req, res, next) {
    //查询主题详细信息
    query(`select theme.*,user.uid,user.username as author from theme join user on user.uid=theme.uid and theme.tid=${req.query.tid}`, function(err, data) {
        //更新主题的阅读数量
        query(`update theme set readed=readed+1 where tid=${req.query.tid}`,function(){});
        //更新登录后的最近访问记录
        req.session.uid&&query(`update record set tid=concat('${req.query.tid},',tid),title=concat('${data[0].title},',title) where uid=${req.session.uid} and tid not REGEXP '(^|,)${req.query.tid}(,|$)'`,function(){});
        //查询主题的回复内容
        selectReply(req, res,data[0]);
    });
})
//查询回复内容
router.get("/getreply", function(req, res, next) {
    selectReply(req, res,{});
})
router.post("/login", function(req, res, next) {
    //验证登录
    query(`select * from user where email='${req.body.email}' and password='${md5(req.body.password)}'`, function(err, user) {
        if (user && user.length) {
            addSession(req, user);
            res.send({
                status: 200,
                title: "可以登录",
                user: {
                    username: user[0].username,
                    uid: user[0].uid,
                    avatar: user[0].avatar,
                }
            })
        } else {
            res.send({
                status: 400,
                title: "用户名或密码错误",
            })
        }
    });
})
//验证注册信息
router.post("/register", function(req, res, next) {
    query(`insert into user values(null,'${req.body.username}','','${md5(req.body.password)}','','${req.body.email}','','','','','','',${new Date().getTime()},0,'','images/test.jpg')`, function(err, data) {
        var user={
            uid:data.insertId,
            username:req.body.username,
            avatar:'images/1.gif',
            email:req.body.email,
        }
        addSession(req, user);
        //初始化访问记录
        query(`insert into record values(null,${user[0].uid},'','')`,function(){});
        res.send({
            status: 200,
            title: "注册成功",
            user: user,
        })
    });
})
//验证用户名（唯一）
router.post("/checkUserName", function(req, res, next) {
    query(`select * from user where username='${req.body.username}'`, function(err, data) {
        if (req.session && data.length && (req.session.username == data[0].username)) {
            res.send({
                status: 302,
                title: "原始昵称"
            })
        } else if (data && data.length) {
            res.send({
                status: 400,
                title: "该昵称已经被注册",
            })
        } else {
            res.send({
                status: 200,
                title: "该昵称可以注册",
            })
        }
    });
})
//验证邮箱（唯一）
router.post("/checkEmail", function(req, res, next) {
    query(`select * from user where email='${req.body.email}'`, function(err, data) {
        if (req.session && data.length && (req.session.email == data[0].email)) {
            res.send({
                status: 302,
                title: "原始邮箱"
            })
        } else if (data && data.length) {
            res.send({
                status: 400,
                title: "该邮箱已经被注册",
            })
        } else {
            res.send({
                status: 200,
                title: "该邮箱可以注册",
            })
        }
    });
})
//添加session
function addSession(req, user) {
    req.session.username = user[0].username;
    req.session.email = user[0].email;
    req.session.uid = user[0].uid;
    req.session.avatar = user[0].avatar;
}
function selectReply(req, res,param){
    var number=(req.query.p&&req.query.p>0)?(req.query.p-1)*pageNumber:0;
    //查询主题的回复内容
    query(`select user.avatar,comment.* from comment join user on comment.uid=user.uid and comment.tid=${parseInt(req.query.tid)} order by comment.createtime DESC limit ${number},${pageNumber}`, function(err, comment) {
        query(`select count(cid) as sum from comment where tid=${req.query.tid}`,function(err,data){
            param=Object.assign(param,{
                reply:comment||[],
                status:200,
                sum:data[0]?data[0].sum:0,
                p:req.query.p,
                number:pageNumber
            });
            res.send(param);
        })
    })
}
module.exports = router;