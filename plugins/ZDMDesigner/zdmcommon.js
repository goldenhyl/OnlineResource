var gBPDIDs=[];
var bpdGroupID="";
var CaseID="";  //控制参数尽量统一放在CaseID层面
var curBPDindex=-1;
var indragmode=false;
var zdmchanged=false;

function OnFollowCheck()
{
   if(this.checked==true) { isFollow=true; alert('True');} else { isFollow=false; alert('false');}	
}

//------------
// StartQuery
function StartQuery() 
{
    try {
       
        
        objectID = GetParamValue("ObjID", "0"); 
        gStep = 50;
        bpdGroupID =GetParamValue("BPDGroupID", "0");  
        CaseID =GetParamValue("CaseID", "0");  	   
        var obj = SGWorld.ProjectTree.GetObject(objectID);               
          
          firstlc=parseFloat(SGWorld.ProjectTree.GetClientData(CaseID,"StartLC"));
          endlc=parseFloat(SGWorld.ProjectTree.GetClientData(CaseID,"EndLC"));
        // DMX_DrawBySetLC(obj);
        	
         DrawDMX(obj);         
	 DrawPDX();
	 DrawTrackLine(obj);
  	 DrawGraph(); 
  	SGWorld.ProjectTree.SetClientData(CaseID,"BPDChanged","FALSE")
  	
  	
	    $("#waitDiv").hide();
	    $("#mainTbl").css('display', 'inline');
	    SGWorld.Window.SetInputMode(0);
	    
	    setTimeout ("SelfRefresh();",500);
    }
    catch (e) { alert(e); }
}

function SelfRefresh()
{
	//alert(SGWorld.ProjectTree.GetClientData(CaseID,"BPDChanged"));
    var flag=false;
    if (SGWorld.ProjectTree.GetClientData(CaseID,"BPDChanged") == "TRUE")
    {
    	// alert("token");
        DrawPDX();  	
        flag=true;
  	SGWorld.ProjectTree.SetClientData(CaseID,"BPDChanged","FALSE")
    }
    
  //  SGWorld.ProjectTree.SetClientData(CaseID, "ProjectStage", "坡度已设计");
    if (SGWorld.ProjectTree.GetClientData(CaseID,"ProjectStage") =="轨面线已生成" && zdmchanged)
    {
    	var obj = SGWorld.ProjectTree.GetObject(objectID);        
        var geometry=obj.Geometry;
        DrawTrackLine();
        flag=true;  	
  	zdmchanged=false;
    }
    if (flag) ReDrawGraph(); 
    setTimeout ("SelfRefresh();",500);
}

function ReDrawGraph(ispan)
{
   var data = [];
  	data.push({ data: gGridArray[0], label: "地面线", lines: { show: true, fill: true,width:1, fillColor: { colors: [{ opacity: 0.7 }, { opacity: 0.1}] } }, color: '#00ff00',threshold: { below: gMinAltitude+50, color: "rgb(200, 20, 30)" }});
	data.push({ data: gGridArray[1], label: "轨面线", lines: { show: true, fill: false }, points: { show: false },color: '#ff0000'});
	data.push({ data: gGridArray[2], label: "坡度线", lines: { show: true, fill: false },points: { symbol: "triangle", fillColor: "#0062FF", show: true },color: '#0000ff',highlightColor:'#ff0000'});
        	
     	if(gPlot!=null) {
     		gPlot.setData(data);
     		//gPlot.getOptions()['pan']['interactive'] = ispan;
     		gPlot.draw();
     	}
}

function PullUP() 
{
    var dh =parseFloat($("#moveHID").val());
    for(var k=0;k<gGridArray[2].length;k++)
     {     	
     	gGridArray[2][k][1] += dh;
     	SetBPDValue(k,gGridArray[2][k][0],gGridArray[2][k][1]);
     }
    ReDrawGraph();    
}

//------------
//  DrawGraph
function DrawGraph() {
   
  
    var data = [];
	data.push({ data: gGridArray[0], label: "地面线", lines: { show: true, fill: true,width:1, fillColor: { colors: [{ opacity: 0.7 }, { opacity: 0.1}] } }, color: '#00ff00',threshold: { below: gMinAltitude+50, color: "rgb(200, 20, 30)" }});
	data.push({ data: gGridArray[1], label: "轨面线", lines: { show: true, fill: false }, points: { show: false },color: '#ff0000'});
	data.push({ data: gGridArray[2], label: "坡度线", lines: { show: true, fill: false },points: { symbol: "triangle", fillColor: "#0062FF", show: true },color: '#0000ff',highlightColor:'#ff0000'});

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
            interactive: true
        }
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
  
    // Tooltip
   $("#chartdiv").bind("plothover", ToolTip);
    

    // Click the graph
    $("#chartdiv").bind("plotclick", function (event, pos, item) 
    {      
     
       if(!pos) return;       
       
       
        if (item && item.seriesIndex==2) {
        	
        	if(indragmode) 
	       {
	      	  indragmode=false;
          	 gPlot.pan({ interactive:true });
	          return;
	       }else
	       	{
	              curBPDindex=item.dataIndex;
	              SGWorld.Navigate.JumpTo(gBPDIDs[curBPDindex]);
	              SGWorld.ProjectTree.SelectItem(gBPDIDs[curBPDindex]);
		      gPlot.unhighlight();
	              gPlot.highlight(2,curBPDindex);	              
	              indragmode=true;
	              gPlot.pan({ interactive:false }); 
	        }
        }else
        {
           if(addBPDFlager)  
           {
                AddToBPD(pos);                
           	addBPDFlager=false;
           	return;
           }            
           gPlot.unhighlight();
           curBPDindex=-1;   
           
           DMX_JumpToLC(pos.x);
           
           var sel=FindBPD(pos);
           if(sel>-1)
           {
           	curBPDindex=sel;
	              SGWorld.Navigate.JumpTo(gBPDIDs[curBPDindex]);
	              SGWorld.ProjectTree.SelectItem(gBPDIDs[curBPDindex]);
		      gPlot.unhighlight();
	              gPlot.highlight(2,curBPDindex);	              
	              indragmode=true;
	              gPlot.pan({ interactive:false }); 
           }
        }
    });
}

function SetBPDValue(BPDindex,lc,h)
{
    	var obj =SGWorld.ProjectTree.GetObject(gBPDIDs[BPDindex]);
          obj.TreeItem.Name="变坡点_"+ToMarkString(lc);
          obj.Position =GetPosByLc(lc);
          
       var strs=SGWorld.ProjectTree.GetClientData(gBPDIDs[BPDindex],"JD");
       
       
        var str;
        str = strs.split(" ");	
	str[0]=lc;
	str[1]=h;
       
       var newvalue=str[0];
       for(var k=1;k<str.length;k++)
          newvalue = newvalue +" "+str[k];
      SGWorld.ProjectTree.SetClientData(gBPDIDs[BPDindex],"JD",newvalue);
           
      SGWorld.ProjectTree.SetClientData(CaseID, "ProjectStage", "坡度已设计");
      zdmchanged=true;         
}

//-------------
// Tool tip
function ToolTip(event, pos, item) 
{
	if(!pos) return;
       
	if(indragmode && curBPDindex>-1)
       {
         //  alert(curBPDindex);
           var lc=Math.round(pos.x/50)*50; // need 50 times
           
           if(curBPDindex==0 || curBPDindex==gGridArray[2].length-1)
           {
           	lc=gGridArray[2][curBPDindex][0];
           }
           
           gGridArray[2][curBPDindex][0]=lc;
           gGridArray[2][curBPDindex][1]=pos.y;
           gPlot.unhighlight();
           ReDrawGraph();
           SetBPDValue(curBPDindex,lc,pos.y);
           gPlot.highlight(2, curBPDindex);           
         // return;
       }
       
 	
  	
	if (item && item.seriesIndex==2) 
	{
		var Line=item.seriesIndex;
		var Point=item.dataIndex;	
		var htmlStr = "";
 		var mTop,mLeft=0;
 		
		mTop =  item.pageY + 5;
		mLeft=  item.pageX + 5;
		htmlStr ="里程："+ gGridArray[Line][Point][0].toFixed(2)+ "<br/>高程: " + gGridArray[Line][Point][1].toFixed(2);
		
		    if(Point>1) {
		       var sp=(gGridArray[Line][Point][1]-gGridArray[Line][Point-1][1]) * 1000 /(gGridArray[Line][Point][0]-gGridArray[Line][Point-1][0]);
		       htmlStr=htmlStr+"<br/>前坡度:"+sp.toFixed(2) +"‰";
		    }
		    if(Point<gGridArray[Line].length) {
		       var sp=(gGridArray[Line][Point+1][1]-gGridArray[Line][Point][1])*1000 /(gGridArray[Line][Point+1][0]-gGridArray[Line][Point][0]);
		       htmlStr=htmlStr+"<br/>后坡度:"+sp.toFixed(2) +"‰";
		    }
	       
	        $("#tooltip").html(htmlStr)
					.css({ top: mTop, left: mLeft })
					.fadeIn(200);
					
	}else
	{
		CommonToolTip(pos);
	}    
    	

}



//-----------

function DeleteBPD() {
	
	var len=gGridArray[2].length-1;
	if(curBPDindex == 0 || curBPDindex == len)
	{
		alert("不能删除起终点的变坡点。");
		return;
	}
	
    if(curBPDindex>-1) 
    {
       gPlot.unhighlight();     
       gGridArray[2].splice(curBPDindex,1);     
       var curid=gBPDIDs[curBPDindex];
       SGWorld.ProjectTree.SetClientData(curid,"ComeFromWeb","TRUE"); 
       SGWorld.ProjectTree.DeleteItem(curid);
       gBPDIDs.splice(curBPDindex,1);       
       ReDrawGraph(true);
       SGWorld.ProjectTree.SetClientData(CaseID, "ProjectStage", "坡度已设计");
       curBPDindex=-1;
    };
}



var addBPDFlager=false;
function AddBPD()
{
   addBPDFlager =true;
}

function PrefixInteger(num) 
{ 
	return ("000" +num).substr(-3); 
}

function ToMarkString(num)
{
   var k=Math.floor(num/1000);
   var r=num-k*1000;
   
    return PrefixInteger(k)+"+"+PrefixInteger(r);
		
}

function AddToBPD(pos)
{
	pos.x=Math.round(pos.x/50)*50; // need 50 times
	
     for(var k=1;k<gGridArray[2].length;k++)
     {
     	if( (pos.x>gGridArray[2][k-1][0]) && (pos.x<gGridArray[2][k][0]))
     	{
     	    var labelStyle = SGWorld.Creator.CreateLabelStyle();
            labelStyle.Bold = true;
            labelStyle.LineToGround = true;
            labelStyle.TextColor = SGWorld.Creator.CreateColor(255, 0, 0);
            var tx="变坡点_"+ToMarkString(pos.x);     	   
            
          var posdd =GetPosByLc(pos.x);
          posdd.Altitude=pos.y;
          var newobj =  SGWorld.Creator.CreateTextLabel(posdd,tx,labelStyle,bpdGroupID,tx);
           SGWorld.ProjectTree.SetClientData(newobj.ID,"JD",pos.x.toString() +" "+pos.y.toString() + " 0 0 10000 0 0 0 0 0 0 0 0 0 0 0");                               
           gBPDIDs.splice(k,0,newobj.ID); 
     	   gGridArray[2].splice(k,0,[pos.x, pos.y]);  
     	   gPlot.unhighlight();     	  
     	   ReDrawGraph(true);     	   
     	   gPlot.highlight(2,k);
     	   curBPDindex =k;
     	   SGWorld.ProjectTree.SetClientData(CaseID, "ProjectStage", "坡度已设计");
     	    zdmchanged=true;    
     	   return;
     	}
     }    
}

function FindBPD(pos)
{
	//pos.x=Math.round(pos.x/50)*50; // need 50 times
	
     for(var k=1;k<=gGridArray[2].length;k++)
     {
     	var dis=(pos.x-gGridArray[2][k-1][0])*(pos.x-gGridArray[2][k-1][0])+(pos.y-gGridArray[2][k-1][1])*(pos.y-gGridArray[2][k-1][1]);
     	
     	if(dis<100) return k-1;     	
     }
     
     return -1;
     
    
}


function DrawPDX()
{      
    gGridArray[2] = [];
    gBPDIDs =[];
    
    var curbpdid=SGWorld.ProjectTree.GetNextItem(bpdGroupID,11);
    if (curbpdid=="") return;
    gBPDIDs.push(curbpdid);
    var obj=SGWorld.ProjectTree.GetObject(curbpdid);
        
    var lc,h;
    var strs=obj.ClientData("JD");
    var str;
    str = strs.split(" ");
	lc=parseFloat(str[0]);
	h=parseFloat(str[1]);
	
    gGridArray[2].push([lc, h]);        
    
    curbpdid=SGWorld.ProjectTree.GetNextItem(curbpdid,13);
    while(curbpdid!="")
    {
        obj=SGWorld.ProjectTree.GetObject(curbpdid);
        strs=obj.ClientData("JD");   
        str = strs.split(" ");
	lc=parseFloat(str[0]);
	h=parseFloat(str[1]);
	
	gBPDIDs.push(curbpdid);
	gGridArray[2].push([lc, h]); 
	curbpdid=SGWorld.ProjectTree.GetNextItem(curbpdid,13);
    }
   
}

