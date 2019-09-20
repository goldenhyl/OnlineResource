var dp;
var gid;
var curdate;
var isFollow=false;
var totaldays=0;
var finishdays=0;


//0 已完工
//1 未开工
//2 黄色,待定
//3 正在进行中
function barColor(i) 
{
        var colors = ["#3c78d8", "#6aa84f", "#f1c232", "#cc0000"];
        return colors[i % 4];
    
}

function barBackColor(i) {
        var colors = ["#a4c2f4", "#b6d7a8", "#ffe599", "#ea9999"];
        return colors[i % 4];
}

function Export()
{
      var ss= $("#startdate").val();
      var ee= $("#enddate").val();  
      
      var txt=SGWorld.ProjectTree.GetItemName(gid);

      var area = $("#area").val();    
      var ex=dp.exportAs("png", {area: area, dateFrom: ss, dateTo: ee});
      var sf=txt+"工程实施进度图"+curdate.toString("yyyy-MM-dd")+".png";
      //alert(sf);
      ex.download(sf);
            
    //  alert("导出成功！");
}