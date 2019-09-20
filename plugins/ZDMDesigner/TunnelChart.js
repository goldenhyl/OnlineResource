//------------
// StartQuery
function StartQuery() 
{
    try {
       
        
        objectID = GetParamValue("ObjID", "0");      
        Gcaption = GetParamValue("Caption", "");
        gStep = parseInt(GetParamValue("Step", "5"));
            
	   
        var obj = SGWorld.ProjectTree.GetObject(objectID);        
         var geometry=obj.Geometry;
        var objectName=obj.TreeItem.Name;
         
          firstlc=parseFloat(obj.ClientData("StartLC"))-50;
          endlc=parseFloat(obj.ClientData("EndLC"))+50;
          
     //    SGWorld.Window.SetInputMode(1, abspath()+"/hourglass.cur", true);
         DMX_DrawByDist(geometry,obj);	 
	 
	 DrawTunnel(firstlc+50,endlc-50);
	 DMX_GetGeolayer();
  	 DrawGraph(); 
  	gPlot.setSelection({ xaxis: { from: firstlc+50, to: endlc-50 } });
  	 	  	
  	$("#FlagerID").html(objectName+"  插旗设计");
  	
        
	    $("#waitDiv").hide();
	    $("#mainTbl").css('display', 'inline');
	    SGWorld.Window.SetInputMode(0);
	  
    }
    catch (e) { alert(e); }
}



//------------
//  DrawGraph
function DrawGraph() {
   
  
    var data = [];
        
	data.push({ data: gGridArray[0], label: "地面线", lines: { show: true, fill: true,width:1, fillColor: { colors: [{ opacity: 1 }, { opacity: 0}] } }, color: '#00ff00'});
	data.push({ data: gGridArray[1], label: "轨面线", lines: { show: true, fill: false }, points: { show: false },color: '#ff0000'});
	data.push({ data: gGridArray[2], label: "洞口", bars: { show: true, barWidth: 5, align:'center', horizontal: false, zero:true }, points: { show: false },color: '#0000ff',highlightColor:'#ff0000'});
	data.push({ data: gGridArray[7], label: "隧道", lines: { show: true, width: 5}, points: { show: false },color: '#0000ff'});
	
	 data.push({ data: gGridArray[3], label: "地质层1", lines: { show: true, fill: true }, points: { show: false },color: '#8f8fff'});
	    data.push({ data: gGridArray[4], label: "地质层2", lines: { show: true, fill: true }, points: { show: false },color: '#008fff'});
	    data.push({ data: gGridArray[5], label: "地质层3", lines: { show: true, fill: true }, points: { show: false },color: '#ffff00'});
	    data.push({ data: gGridArray[6], label: "地质层4", lines: { show: true, fill: true }, points: { show: false },color: '#ff8f4f'}); 
	    
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
        selection: { mode: "x" }      
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

	
     $("#chartdiv").bind("plotselected", function (event, ranges) {
        if(addflager)
        {
        	DrawTunnel(ranges.xaxis.from,ranges.xaxis.to);
        	ReDrawGraph();
        	
        	var sl=parseFloat($("#setstartlc").val());
    		var el=parseFloat($("#setendlc").val());
    	
        	SGWorld.ProjectTree.SetClientData(objectID,"StartLC",sl.toFixed(2));
		SGWorld.ProjectTree.SetClientData(objectID,"EndLC",el.toFixed(2));
		
		SGWorld.ProjectTree.SelectItem("");
		SGWorld.ProjectTree.SelectItem(objectID);
        	addflager=false;
        }       
    });
    
    // Tooltip
    $("#chartdiv").bind("plothover", ToolTip);
    

    // Click the graph
    $("#chartdiv").bind("plotclick", function (event, pos, item) 
    {       
        DMX_JumpToLC(pos.x);
    });
}


//-------------
// Tool tip
function ToolTip(event, pos, item) 
{
	if(!pos) return; 
 	CommonToolTip(pos);
}


var addflager=false;
function SetFlager()
{
	addflager=true;
}

function SetStartEndLC()
{
    try
    {
    	var sl=parseFloat($("#setstartlc").val());
    	var el=parseFloat($("#setendlc").val());
    	    	
    	if(el-sl<20) return;
    	
    	DrawTunnel(sl,el);
    	SGWorld.ProjectTree.SetClientData(objectID,"StartLC",sl.toFixed(2));
	SGWorld.ProjectTree.SetClientData(objectID,"EndLC",el.toFixed(2));    
	
	SGWorld.ProjectTree.SelectItem("");
	SGWorld.ProjectTree.SelectItem(objectID);
	   
    	ReDrawGraph(); 
    	alert("里程设定成功！");
    	SGWorld.Window.RemovePopupByCaption("纵断面");
    	
    }catch(err)
    {
    	alert("里程输入有误！");
    }
}

function DrawTunnel(sl,el)
{
	var startH=gGridArray[1][0][1];
	 var len=gGridArray[1].length-1;
	var endH=gGridArray[1][len][1];
	
   gGridArray[2]=[];
   var lc=sl;
   if(lc<firstlc) lc=firstlc;
   var h=8+startH+(endH-startH)*(lc-firstlc)/(endlc-firstlc);
   gGridArray[2].push([lc,h]);
   
   lc=el;
   if(lc>endlc) lc=endlc;
   h=8+startH+(endH-startH)*(lc-firstlc)/(endlc-firstlc);
   gGridArray[2].push([lc,h]);
   getTunnelCeil(sl,el);
   
   $("#setstartlc").val(sl.toFixed(2));
  $("#setendlc").val(el.toFixed(2));
  $("#comlength").val((el-sl).toFixed(2));
  	
}

function getTunnelCeil(sl,el)
{
	gGridArray[7]=[];
	gGridArray[7].push(gGridArray[2][0]);
	
	var len =gGridArray[1].length;
	for(var i=1;i<len;i++)
	{
	  if (gGridArray[1][i][0]<=sl) continue;	
	  if (gGridArray[1][i][0]>=el) continue;	
	  gGridArray[7].push([gGridArray[1][i][0],gGridArray[1][i][1]+8]);
	}
	
	gGridArray[7].push(gGridArray[2][1]);
}




function ReDrawGraph()
{
   var data = [];
       data.push({ data: gGridArray[0], label: "地面线", lines: { show: true, fill: true,width:1, fillColor: { colors: [{ opacity: 1 }, { opacity: 0}] } }, color: '#00ff00'});
				data.push({ data: gGridArray[1], label: "轨面线", lines: { show: true, fill: false }, points: { show: false },color: '#ff0000'});
				data.push({ data: gGridArray[2], label: "洞口", bars: { show: true, barWidth: 5, align:'center', horizontal: false, zero:true }, points: { show: false },color: '#0000ff',highlightColor:'#ff0000'});
				data.push({ data: gGridArray[7], label: "隧道", lines: { show: true, width: 5}, points: { show: false },color: '#0000ff'});

        data.push({ data: gGridArray[3], label: "地质层1", lines: { show: true, fill: true }, points: { show: false },color: '#8f8fff'});
		    data.push({ data: gGridArray[4], label: "地质层2", lines: { show: true, fill: true }, points: { show: false },color: '#008fff'});
		    data.push({ data: gGridArray[5], label: "地质层3", lines: { show: true, fill: true }, points: { show: false },color: '#ffff00'});
		    data.push({ data: gGridArray[6], label: "地质层4", lines: { show: true, fill: true }, points: { show: false },color: '#ff8f4f'}); 
		    
     if(gPlot!=null) {
     		gPlot.setData(data);
     		gPlot.draw();
     	}
}


