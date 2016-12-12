var express = require('express');
var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'qdm189698281.my3w.com',
  user: 'qdm189698281',
  password: '19940808aa',
  database:'qdm189698281_db', // 前面建的user表位于这个数据库中
  port: 3306
});
var query=function(sql,callback){  
    pool.getConnection(function(err,conn){  
        if(err){  
            callback(err,null,null);  
        }else{  
            conn.query(sql,function(qerr,vals,fields){  
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(qerr,vals,fields);  
            });  
        }  
    });  
};  
module.exports=query;
