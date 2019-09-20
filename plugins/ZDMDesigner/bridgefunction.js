var isAddPier=false;
var isAddPierByDist=false;
var selectedPier=new Array();

//------------
// StartQuery
function StartQuery() 
{
    try {
       
        
        objectID = GetParamValue("ObjID", "0");       
        gStep = parseInt(GetParamValue("Step", "1"));
            
	   
        var obj = SGWorld.ProjectTree.GetObject(objectID);        
         var geometry=obj.Geometry;
        var objectName=obj.TreeItem.Name;
         
          firstlc=parseFloat(obj.ClientData("StartLC"))-50;
          endlc=parseFloat(obj.ClientData("EndLC"))+50;
        
         DMX_DrawByDist(geometry,obj);		
	 GetPierList();
	 DMX_GetGeolayer();
  	 DrawGraph(); 
  	
  	 	  	
  	$("#FlagerID").html(objectName+"  插旗设计");
  	
  	$("#setstartlc").val((firstlc+50).toFixed(2));
  	$("#setendlc").val((endlc-50).toFixed(2));
  	$("#comlength").val((endlc-firstlc-100).toFixed(2));
  	
	    $("#waitDiv").hide();
	    $("#mainTbl").css('display', 'inline');
	    SGWorld.Window.SetInputMode(0);
	  
    }
    catch (e) { alert(e); }
}

function SetStartEndLC()
{
    try
    {
    	var sl=parseFloat($("#setstartlc").val());
    	var el=parseFloat($("#setendlc").val());    	
    	if(el-sl<20) return;
    	gPlot.unhighlight();
    	if(sl<firstlc) sl=firstlc;
    	if(el>endlc) el=endlc;    	
    	
    	    	
    	var len =gGridArray[2].length;
    	gGridArray[2][0][0]=sl;
    	gGridArray[2][0][1]=DMX_getTrackH(sl);
    	
    	gGridArray[2][len-1][0]=el;
    	gGridArray[2][len-1][1]=DMX_getTrackH(el);
    	JustPierList();
    	ReDrawGraph();     
    }catch(err)
    {
    	alert("里程输入有误！");
    }
}

function JustPierList()
{
	var len =gGridArray[2].length;
	var sl= gGridArray[2][0][0];
	var el=gGridArray[2][len-1][0];
	
	if(sl<firstlc) 
	{
		sl=firstlc;
		gGridArray[2][0][0]=sl;
    		gGridArray[2][0][1]=DMX_getTrackH(sl);
	}
    	if(el>endlc) 
    	{
    		el=endlc;    	
    		gGridArray[2][len-1][0]=el;
    		gGridArray[2][len-1][1]=DMX_getTrackH(el);    
	}
	
	for(var k=len-2;k>0;k--)
	{
		if(gGridArray[2][k][0]<el && gGridArray[2][k][0] >sl) continue;
		gGridArray[2].splice(k,1);
	}
	
	//首跨间距调整
	if(gGridArray[2][1][0]-gGridArray[2][0][0]<10) 
	{
		gGridArray[2].splice(1,1)
	}else if(gGridArray[2][1][0]-gGridArray[2][0][0]<20) 
	{
		gGridArray[2][1][0]=(gGridArray[2][1][0]+gGridArray[2][0][0])/2;
		gGridArray[2][1][1]=DMX_getTrackH(gGridArray[2][1][0]);  
	}
	
	
	//尾跨间距调整
	len =gGridArray[2].length;
	if(gGridArray[2][len-1][0]-gGridArray[2][len-2][0]<10) 
	{
		gGridArray[2].splice(len-2,1)
	}else if(gGridArray[2][len-1][0]-gGridArray[2][len-2][0]<20) 
	{
		gGridArray[2][len-2][0]=(gGridArray[2][len-2][0]+gGridArray[2][len-1][0])/2;
		gGridArray[2][len-2][1]=DMX_getTrackH(gGridArray[2][len-2][0]);  
	}	
	
	$("#setstartlc").val(sl.toFixed(2));
  	$("#setendlc").val(el.toFixed(2));
  	$("#comlength").val((el-sl).toFixed(2));
}

//------------
//  DrawGraph
function DrawGraph() {
   
  
    var data = [];
        data.push({ data: gGridArray[2], label: "墩台", bars: { show: true, barWidth: 5, align:'center', horizontal: false, zero:true }, points: { show: false },color: '#ff00ff',highlightColor:'#ff0000'});
	data.push({ data: gGridArray[0], label: "地面线", lines: { show: true, fill: true,width:1, fillColor: { colors: [{ opacity: 1 }, { opacity: 0}] } }, color: '#00ff00'});
	data.push({ data: gGridArray[1], label: "轨面线", lines: { show: true, fill: false }, points: { show: false },color: '#ff0000'});
		    
	    data.push({ data: gGridArray[3], label: "地质层1", lines: { show: true,width:0, fill: true }, points: { show: false },color: '#8080ff'});
	    data.push({ data: gGridArray[4], label: "地质层2", lines: { show: true,width:0, fill: true }, points: { show: false },color: '#0080ff'});
	  //  data.push({ data: gGridArray[5], label: "地质层3", lines: { show: true,width:0, fill: true }, points: { show: false },fillcolor: "rgba(255, 255, 0, 1)");
	    data.push({ data: gGridArray[5], label: "地质层3", lines: { show: true, width:0,fill: true }, points: { show: false },color: '#ffff00'});
	    data.push({ data: gGridArray[6], label: "地质层4", lines: { show: true,width:0, fill: true,fillColor: "rgba(255, 255, 255, 0.8)" }, points: { show: false },color: '#ff8040'});
	 
	 	 
    gPlot = $.plot("#chartdiv", data,
    {
        xaxis: { zoomRange: [0.1, ], panRange: [-100, ],min:firstlc },
	yaxis: { zoomRange: [0.1, ], min:gMinAltitude-10},
        grid: {
            hoverable: true,
            clickable: true,
            autoHighlight: false
        },
        zoom: {
            interactive: true
        },
        pan: {
            interactive: false
        },
        selection: { mode: "xy" } 
    });
        

    $("<div id='tooltip'></div>").css({
        position: "absolute",
        display: "none",
        border: "1px solid #fdd",
        padding: "2px",
        "background-color": "#fee",
        opacity: 0.80,
        fontSize: "12px"
    }).appendTo("body");

    $("#chartdiv").bind("plotselected", function (event, ranges) 
    {
       
        	selectrangle(ranges.xaxis.from,ranges.xaxis.to);
        
    });
    // Tooltip
    $("#chartdiv").bind("plothover", ToolTip);
    

    // Click the graph
    $("#chartdiv").bind("plotclick", function (event, pos, item) 
    {      
    	alert("plotclick");
    	
       DMX_JumpToLC(pos.x);
       
        if (item) 
        {       
            //   alert(item.seriesIndex+":"+item.dataIndex);     
               
               if(item.seriesIndex==0)  
               {               	
               	   gPlot.unhighlight();
                   selectedPier=[];
                   selectedPier.push(item.dataIndex);
                   gPlot.highlight(0, item.dataIndex);
               }
               isAddPierByDist=false;
        } else {
         	
         	if(isAddPier)
                  {
                     if(AddToPiers(pos.x)) isAddPier=false;   
                     return;                 
                  }
                  
                  if(isAddPierByDist) {
                     AddPierByPos(pos);
                     return;  
                  }
                  
                  gPlot.unhighlight();
                  selectedPier=[];
                 
               }
        
    });
}

//-------------
// Tool tip
function ToolTip(event, pos, item) 
{
	if(!pos) return;
        	
	if (item && item.seriesIndex==0) 
	{
		var htmlStr = "";
 		var mTop,mLeft=0;
		var Line=item.seriesIndex;
		var Point=item.dataIndex;
		mTop =  item.pageY + 5;
		mLeft=  item.pageX + 5;
		
		
		   var e = DMX_getlcElev(gGridArray[2][Point][0]);
		    htmlStr ="里程："+ gGridArray[2][Point][0].toFixed(2)+ "<br/>高程: " + gGridArray[2][Point][1].toFixed(2)+"<br/>净高:"+(gGridArray[2][Point][1]-e).toFixed(2);
		  
		    if(Point>=1) htmlStr = htmlStr + "<br/>前跨："+(gGridArray[2][Point][0]-gGridArray[2][Point-1][0]).toFixed(1);
		   
		    if(Point<gGridArray[2].length-1) htmlStr += "<br/>后跨："+(gGridArray[2][Point+1][0]-gGridArray[2][Point][0]).toFixed(1);
		
	  
	     $("#tooltip").html(htmlStr)
					.css({ top: mTop, left: mLeft })
					.fadeIn(200);
					
	}else
	{
	   CommonToolTip(pos);
	}    
    	

}

function AddPier()
{
    var movelc=parseFloat($("#movelcid").val());
  if (AddToPiers(movelc))
  {
    $("#movelcid").val("1");
    return;
  }
   isAddPier=true;
   alert("鼠标设墩位处点击可继续交互添加桥梁。");
}


function AddPierByDist()
{
   if(selectedPier.length<1) { alert("请先选择要参照的墩台!"); return;}
   var movelc=parseFloat($("#movelcid").val());
    if(movelc<10 || movelc>300)
   { 
   	alert("请设置附加孔跨间距，孔跨间距不能小于10m大于300m。");
   	$("#movelcid").val("32");
   	return;
   }
   
   isAddPierByDist=!isAddPierByDist;   
   if(isAddPierByDist)
   {
   	alert("你可以在参照墩前或后连续点击实现等间距布墩。");
   }   
}

function selectrangle(sl,el)
{
   gPlot.unhighlight();
   selectedPier=[];
   var len =gGridArray[2].length;
   for(var k=0;k<len;k++)
   {
      if(gGridArray[2][k][0]<sl) continue;
      if(gGridArray[2][k][0]>el) continue;
      selectedPier.push(k);
      gPlot.highlight(0,k);	
   }
}

function AddPierByPos(pos)
{
	
   var movelc=parseFloat($("#movelcid").val());
   
   if(movelc<10)
   { 
   	alert("设置的附加孔跨间距不能小于10。");
   	return;
   }   
    
    var c=selectedPier[0];
    var flag=false;
    if(pos.x<gGridArray[2][c][0]) flag=AddToPiers(gGridArray[2][c][0]-movelc);
    else flag=AddToPiers(gGridArray[2][c][0]+movelc);
    
    if (!flag) isAddPierByDist=false;
}

function SetLC()
{
   var movelc=parseFloat($("#movelcid").val());
   if(movelc>endlc || movelc<firstlc) { alert("设置里程超出范围!");$("#movelcid").val("1"); return;}
   
 if(selectedPier.length<1) { alert("请先选择要设置的墩台!"); return;}
 
	var c=selectedPier[0];
       
	            gGridArray[2][c][0] = movelc;
	            gGridArray[2][c][1] =DMX_getTrackH(movelc);
        
	gPlot.unhighlight();       
	ReDrawGraph();	
        gPlot.highlight(0,c);
        $("#movelcid").val("1");
        
}

function SelectForward()
{
     if(selectedPier.length<1) { alert("请先选择要参照的墩台!"); return;}
     var c=selectedPier[0];
     selectedPier=[];
     for(var i=0;i<=c;i++)
     {  
         selectedPier.push(i);
         gPlot.highlight(0,i);
     }
}

function SelectBackward()
{
     if(selectedPier.length<1) { alert("请先选择要参照的墩台!"); return;}
     var c=selectedPier[0];
     selectedPier=[];
     for(var i=c;i<gGridArray[2].length;i++)
     {  
         selectedPier.push(i);
         gPlot.highlight(0,i);
     }
}



function moveLC()
{
   var movelc=parseFloat($("#movelcid").val());
   if(movelc>32 || movelc<-32) { alert("偏移里程不能超过32m!"); return;}
   
   selectedPier.sort();
	var c=-1;
        for(var k=selectedPier.length-1;k>=0;k--)
        {
           if(c!=selectedPier[k])
           {
	            c=selectedPier[k];
	            gGridArray[2][c][0] = gGridArray[2][c][0]+movelc;
	            gGridArray[2][c][1] =DMX_getTrackH(gGridArray[2][c][0]);
           }
        }
	 gPlot.unhighlight();	   
        JustPierList();
	ReDrawGraph();
	for(var k=selectedPier.length-1;k>=0;k--)
        {
           gPlot.highlight(0,selectedPier[k]);
        }
}

function CommitPier()
{
   SGWorld.ProjectTree.SetClientData(objectID,"StartLC",gGridArray[2][0][0]);
   SGWorld.ProjectTree.SetClientData(objectID,"EndLC",gGridArray[2][gGridArray[2].length-1][0]);
   
    var c = gGridArray[2].length;
	   var str;
	   str=gGridArray[2][0][0].toFixed(1);
	   for(var i=1;i<c;i++)
	    {	      
	      str =str+"|"+gGridArray[2][i][0].toFixed(1);
	    }
     SGWorld.ProjectTree.SetClientData(objectID,"PierList",str);     
     SGWorld.ProjectTree.SelectItem(objectID);
     alert("提交成功,请刷新模型。");
}




function GetPierList()
{
	var PierConfigString =SGWorld.ProjectTree.GetClientData(objectID,"PierList");
	var strs =  PierConfigString.split("|");
	 var c = strs.length;
	   var lc,h;
	   gGridArray[2]=[];	  
	   
	   for(var i=0;i<c;i++)
	    {
	       lc=parseFloat(strs[i]);
	       h=DMX_getTrackH(lc);
	      gGridArray[2][i]=[lc,h];	    
	   }
	    
}

function DeletePier()
{
	selectedPier.sort();
	var c=-1;
        for(var k=selectedPier.length-1;k>=0;k--)
        {
           if(c!=selectedPier[k])
           {
	            c=selectedPier[k];
	            if((c!=0) && c!=gGridArray[2].length-1) gGridArray[2].splice(c,1);
           }
        }
	 gPlot.unhighlight();
         selectedPier=[];       
	ReDrawGraph();
}



function ReDrawGraph()
{
   var data = [];
        data.push({ data: gGridArray[2], label: "墩台", bars: { show: true, barWidth: 5, align:'center', horizontal: false, zero:true }, points: { show: false },color: '#ff00ff',highlightColor:'#ff0000'});
	data.push({ data: gGridArray[0], label: "地面线", lines: { show: true, fill: true,width:1, fillColor: { colors: [{ opacity: 1 }, { opacity: 0}] } }, color: '#00ff00'});
	data.push({ data: gGridArray[1], label: "轨面线", lines: { show: true, fill: false }, points: { show: false },color: '#ff0000'});
	 data.push({ data: gGridArray[3], label: "地质层1", lines: { show: true,width:0, fill: true }, points: { show: false },color: '#8080ff'});
	    data.push({ data: gGridArray[4], label: "地质层2", lines: { show: true,width:0, fill: true }, points: { show: false },color: '#0080ff'});
	    data.push({ data: gGridArray[5], label: "地质层3", lines: { show: true, width:0,fill: true }, points: { show: false },color: '#ffff00'});
	    data.push({ data: gGridArray[6], label: "地质层4", lines: { show: true,width:0, fill: true }, points: { show: false },color: '#ff8040'});
	    
     if(gPlot!=null) {
     		gPlot.setData(data);
     		gPlot.draw();
     	}
}

function AddToPiers(lc)
{	
     
     if (lc<firstlc){ alert("加墩里程应该在起点与终点里程之间!");  return false;}
     if (lc>endlc) { alert("加墩里程应该在起点与终点里程之间!");  return false;}
     
     for(var k=1;k<=gGridArray[2].length;k++)
     {
     	if( (lc>gGridArray[2][k-1][0]) && (lc<gGridArray[2][k][0]))
     	{
     	   var h=DMX_getTrackH(lc);
     	   gGridArray[2].splice(k,0,[lc,h]);      	  
     	  
     	   ReDrawGraph();
     	   gPlot.unhighlight();	                 
           selectedPier=[];
           gPlot.highlight(0,k);
           selectedPier.push(k);
     	   return true;
     	}
     }
     return false;
}


