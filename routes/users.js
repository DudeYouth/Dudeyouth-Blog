"use strict";
var express = require('express');
var app = express();
var router = express.Router();
var query = require("../conf/db.config.js");
var fs = require("fs");
var iconv = require("iconv-lite");
var md5 = require("md5");
var pageNumber=20;
router.use(function(req, res, next) {
        if (!req.session.uid) {
            res.send({
                status: 500,
                title: "请先登录",
            })
        } else {
            next();
        }
    })
    /* GET users listing. */
router.get("/reply", function(req, res, next) {
    //创建回复
    console.log(`insert into comment values(null,${req.query.tid},${req.session.uid},0,'${req.session.username}','${req.query.content}',now(),0,0,1)`)
    query(`insert into comment values(null,${req.query.tid},${req.session.uid},0,'${req.session.username}','${req.query.content}',now(),0,0,1)`, function(err, data) {
       //更新主题的评论数量
        query(`update theme set comments=comments+1 where tid=${req.query.tid}`,function(){});
        selectReply(req, res,{});
    })
})
router.post("/createtheme", function(req, res, next) {
    var data = JSON.parse(req.body.data);
    //创建主题
    query(`insert into theme values(null,${req.session.uid},${data.typeid},'${data.label?data.label.join(","):0}','${data.title}','${data.content}',now(),0,0,0,1)`, function(err, data) {
        res.send({
            status: 200,
            title: "发布成功",
            tid: data.insertId,
        });
    })
})
router.get("/labellist", function(req, res, next) {
    //查询标签
    query(`select * from label`, function(err, data) {
        res.send({
            labels: data
        });
    })
})
router.post("/editmsg", function(req, res, next) {
    var data = req.body;
    //修改个人信息
    query(`update user set name='${data.name}',phone='${data.phone}',email='${data.email}',remark='${data.remark}',company='${data.company}',position='${data.position}',git='${data.git}',blog='${req.body.blog}',address='${data.address}',createtime=${new Date().getTime()} where uid=${req.session.uid}`, function(err, data) {
        res.send({
            status: 200,
            title: "修改成功",
        })
    });
})
router.get("/getmsg", function(req, res, next) {
    //查询用户的所有主题
    query(`select * from user where uid=${req.session.uid}`, function(err, user) {
        //查询主题分类导航
        query(`select * from class`,function(err,tabs){
            //查询访问记录
            query(`select tid,title from record where uid=${req.session.uid}`,function(err,data){
                var tid=[],title=[],record=[];
                if(data[0]&&data[0].tid){
                    tid=data[0].tid.split(",");
                    title=data[0].title.split(",")
                    !tid[tid.length-1]&&tid.pop();
                    !title[title.length-1]&&title.pop();
                }
                tid.forEach(function(value,key){
                    var obj={
                        tid:value,
                        title:title[key],
                    }
                    record.push(obj);
                })
                //最近访问记录超过10条后进行截取，并更新
                tid.length>10&&query(`update record set tid=${tid.splice(0,9).join(",")+","},title=${title.splice(0,9).join(",")+","} where uid=${req.session.uid}`)
                user[0]&&(user[0].tabs=tabs);
                user[0]&&(user[0].record=record);
                res.send({
                    status: 200,
                    msg: user[0] || {},
                    activeKey:1,
                })
            });
        })
    });
})
router.get("/gettheme", function(req, res, next) {
    var number=(req.query.p&&req.query.p>0)?(req.query.p-1)*pageNumber:0;
    //按照分类查询主题
    query(`select * from theme where typeid=${req.query.activeKey} order by createtime  DESC limit ${number},${pageNumber}`, function(err, theme) {
        query(`select count(tid) as sum from theme where typeid=${req.query.activeKey}`,function(err,data){
            res.send({
                status:200,
                theme: theme,
                sum:data[0]&&data[0].sum||0,
                number:pageNumber,
                p:req.query.p||0,
            })
        })
    });
})
router.get("/like", function(req, res, next) {
    //按照分类查询主题
    query(`select liked from record where uid=${req.session.uid}`, function(err, record) {
        if(record[0].liked){
            res.send({
                status:400,
                title:"已赞"
            })
        }else{
            query(`update record set liked=liked+1 where uid=${req.session.uid}`,function(){})
             res.send({
                status:200,
                title:"点赞成功"
            })           
        }
    });
})
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