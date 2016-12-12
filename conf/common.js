exports.selectReply=function(req, res,param){
    var number=(req.query.p&&req.query.p>0)?(req.query.p-1)*pageNumber:0;
    //查询主题的回复内容
    query(`select user.avatar,comment.author,comment.content,comment.cid,comment.uid from comment join user on comment.uid=user.uid and comment.tid=${parseInt(req.query.tid)} order by comment.createtime DESC limit ${number},${pageNumber}`, function(err, comment) {
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