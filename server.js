var express = require("express");
var app = express();
var dateParts = ['null', 'null','null'];
var str = '';

    
var months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];

app.get('/:datestring',(req,res)=>{
    var data = {
        unix:null,
        natural:null 
    };
    str = req.params.datestring.toLowerCase();
    console.log(str);
    months.forEach(function(month){
       var re = new RegExp('('+month+'\w*)');
       if(re.test(str) && /\d{4}/.test(str) && /\d{2}/.test(str)){
           dateParts[1] = re.exec(str)[0];
           dateParts[0] = str.match(/\d{4}/)[0];
           dateParts[2] = /\b\d{1,2}\b/.exec(str)[0];
           data = {
            unix:new Date(dateParts[0],months.indexOf(dateParts[1]), dateParts[2]).getTime(),
            natural:req.params.datestring
            };
       }
    });
   res.send(data); 
});

app.listen(8080, console.log('listening on 8080'));