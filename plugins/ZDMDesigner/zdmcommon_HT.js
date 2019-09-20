var curBPDindex=-1;
var curPier=-1;
var indragmode=false;
var gPlot;
var objectID ;

//地面线类，地面线最终得到  gGridArray[0]  轨面线，轨面线最终得到  gGridArray[1]
//var gMinAltitude=0; //确定Y轴原坐标
//var gGridArray = [];   //每条线上点的网格值(lc,h)
//var firstlc,endlc;
var layerindex=-1;


//------------
// StartQuery
function StartQuery() 
{
	
    try {
    	        
        objectID = GetParamValue("ObjID", "0");        
        var isspline =GetParamValue("Spline", "0");      
        var  objectName =  SGWorld.ProjectTree.GetItemName(objectID);
        
        $("#FlagerID").html(objectName+"  纵断面设计");        
        
        firstlc=parseFloat(SGWorld.ProjectTree.GetClientData(objectID,"StartLC"));
        endlc=parseFloat(SGWorld.ProjectTree.GetClientData(objectID,"EndLC"));
        
			  var obj=SGWorld.ProjectTree.GetObject(objectID);
			  
			//  SGWorld.Window.SetInputMode(1, "hourglass.cur", true);  	  
        			
        if(isspline=="true")
        {
        	DMX_DrawByEarthH();
        }else  DMX_DrawBySetLC(obj); 
       
        GetBPDList();            
        GetBridgeFlagers();       
        GetTunnelFlagers();        
        GetPierList();  			
        gGridArray[5]=[];
  			DrawGraph();   
  	
	    $("#waitDiv").hide();
	    $("#mainTbl").css('display', 'inline');
	    SGWorld.Window.SetInputMode(0);
	
    }
    catch (e) { alert(e); }
}

function DMX_DrawByEarthH()
{
	var sEarthHstr = SGWorld.ProjectTree.GetClientData(objectID,"EarthH");
        var strs= new Array(); //定义一数组 
        strs=sEarthHstr.split(","); //字符分割 
        gGridArray[0]=[];
        
        var eh=0;
        var lc=0;
        for (var i=0;i<strs.length ;i++ ) 
	{ 
		if(strs[i]=="") continue;
		eh=parseFloat(strs[i]);
		lc =firstlc+2.5+5*i;
		gGridArray[0].push([lc, eh]); 
	} 
}

function DMX_getTrackH(lc)
{
    var len=gGridArray[1].length;
	
   for(var i=1;i<len;i++)
   {
      if(lc>=gGridArray[1][i-1][0] && lc<=gGridArray[1][i][0])
      {
         return gGridArray[1][i-1][1]+(gGridArray[1][i][1]-gGridArray[1][i-1][1])*(lc-gGridArray[1][i-1][0])/(gGridArray[1][i][0]-gGridArray[1][i-1][0]);
      }
   }
}

function DMX_getElev(lc)
{
    var len=gGridArray[0].length;
	
   for(var i=1;i<len;i++)
   {
      if(lc>=gGridArray[0][i-1][0] && lc<=gGridArray[0][i][0])
      {
         return gGridArray[0][i-1][1]+(gGridArray[0][i][1]-gGridArray[0][i-1][1])*(lc-gGridArray[0][i-1][0])/(gGridArray[0][i][0]-gGridArray[0][i-1][0]);
      }
   }
}

function GetBridgeFlagers()
{
	var strs=SGWorld.ProjectTree.GetClientData(objectID,"BridgeList");
	
	if(strs=="NaN") return;
	var s=strs.split(" ");
	var str;
	
	gGridArray[3]=[];
	var k=0;
	
	for(var i=0;i<s.length;i++)
	    {
	      str = s[i].split(",");
	      
	       lc=parseFloat(str[0]);
	       h=DMX_getTrackH(lc);
	       k=2*i;
	       gGridArray[3][k]=[lc,h];
	      
	       lc=parseFloat(str[1]);
	       h=DMX_getTrackH(lc);
	       k=2*i+1;
	       
	      gGridArray[3][k]=[lc,h];	      
	   }
}

function AutoFlager()
{  
    gGridArray[3]=[];
    gGridArray[4]=[];
    var bH=parseFloat($("#bridgeH").val());
    var bT=parseFloat($("#tunnelH").val());
    
    var th0,th1,dh0,dh1;
    var lc0,lc1,lc,h;
    
    var flag=0; //0:none,1:bridge;2:tunnel
      
  for(var i=1;i<gGridArray[0].length;i++)
	{			  
		lc1=gGridArray[0][i][0];
	  th1=DMX_getTrackH(lc1);  // gGridArray[0][i][0];  //DMX_getTrackH(lc);
	  
	  dh1=th1- gGridArray[0][i][1];
	  
	  if(flag==0)
	  {
	  	if(dh1>bH) {	  		
	  		flag=1;
	  		lc0=gGridArray[0][i-1][0];
	  		th0=DMX_getTrackH(lc0);  
	  		dh0=th0-gGridArray[0][i-1][1];
	  		
	  		if(dh0>bH) gGridArray[3].push([lc0,0]);
	  		else
	  		{
	  				lc=CalcDividLcByH(lc0,lc1,dh0,dh1,bH);	  		
	  				gGridArray[3].push([lc,0]);
	  		}
	  	};
	  	
	  	if(dh1<bT) {	  		
	  		flag=2;
	  		lc0=gGridArray[0][i-1][0];
	  		th0=DMX_getTrackH(lc0);  
	  		dh0=th0-gGridArray[0][i-1][1];
	  		
	  		if(dh0<bT) gGridArray[4].push([lc0,0]);
	  		else
	  			{
	  				lc=CalcDividLcByH(lc0,lc1,dh0,dh1,bT);	  		
	  				gGridArray[4].push([lc,0]);
	  			}
	  		
	  	};	  	
	  }
	  if(flag==1)
	  {
	  	if(dh1<bH) {	  		
	  		flag=0;
	  		lc0=gGridArray[0][i-1][0];
	  		th0=DMX_getTrackH(lc0);  
	  		dh0=th0-gGridArray[0][i-1][1];
	  		lc=CalcDividLcByH(lc0,lc1,dh0,dh1,bH);
	  		var len=gGridArray[3].length;
	  		var dlc=lc-gGridArray[3][len-1][0];
	  		if(dlc<5)
	  		{
	  			gGridArray[3].pop();
	  		} else gGridArray[3].push([lc,th0]);
	  	};	  	
	  }
	  if(flag==2)
	  {
	  	if(dh1>bT) {	  		
	  		flag=0;
	  		lc0=gGridArray[0][i-1][0];
	  		th0=DMX_getTrackH(lc0);  
	  		dh0=th0-gGridArray[0][i-1][1];
	  		lc=CalcDividLcByH(lc0,lc1,dh0,dh1,bT);	  
	  		
	  		var len=gGridArray[4].length;
	  		var dlc=lc-gGridArray[4][len-1][0];
	  		if(dlc<5)
	  		{
	  			gGridArray[4].pop();
	  		} else gGridArray[4].push([lc,th0]);
	  					
	  		// gGridArray[4].push([lc,th0]);
	  	};
	  }
	}
	
	if(flag==1)
	  {
	  	gGridArray[3].push([lc1,th1]);
	  	flag=0;
	  }
	  
	if(flag==2)
	  {
	  	gGridArray[4].push([lc1,th1]);
	  	flag=0;
	  }
	  
	 //   alert(gGridArray[4].length);
	
	LayoutPiers();
	
  ReDrawGraph(true);
  
}

function CalcDividLcByH(lc0,lc1,dh0,dh1,fh)
{
	var tmp=(fh-dh0)*(lc1-lc0);
	tmp=tmp/(dh1-dh0);
	tmp+=lc0;
	if(tmp<lc0) tmp=lc0;
	if(tmp>lc1) tmp=lc1;
	return tmp;	
}


function LayoutPiers()
{
	var lc0,lc1;
	var stry=$("#holedist").val();
	var s=stry.split("m");
	var dis=parseFloat(s[0]);
		
	var st;
	var n;
	var lc;
	
	gGridArray[2]=[];
	
	for(var i=1;i<gGridArray[3].length;i+=2)
	{
		lc0=	gGridArray[3][i-1][0];
		lc1=	gGridArray[3][i][0];
	  n=Math.round((lc1-lc0)/dis);	
	  // st=(lc1-lc0)/n;
		
		for(var k=1;k<n;k++)
		{
			lc=lc0+dis*k;		
			gGridArray[2].push([lc,0]);
		}
		gGridArray[3][i][0]=lc0+dis*n;
	}
	
	
}


function GetTunnelFlagers()
{
	gGridArray[4]=[];
	var strs=SGWorld.ProjectTree.GetClientData(objectID,"TunnelList");	
	// alert(strs);
	if(strs=="") return;
	if(strs=="NaN") return;
	var s=strs.split(" ");
	var str;
	
	
	var k=0;
	
	for(var i=0;i<s.length;i++)
	    {
	      str = s[i].split(",");	      
	      lc=parseFloat(str[0]);	      
	       k=2*i;
	       
	      gGridArray[4][k]=[lc,0];	      
	      lc=parseFloat(str[1]);	      
	       k=2*i+1;
	      gGridArray[4][k]=[lc,0];	      
	   }
}

function GetBPDList()
{
	var PierConfigString =SGWorld.ProjectTree.GetClientData(objectID,"BPDList");
	var strs =  PierConfigString.split(",");
	var c = strs.length;
	var lc,h;
	var str;
	   gGridArray[1]=[];	  
	   
	   for(var i=0;i<c;i++)
	    {
	      str = strs[i].split(" ");
	      lc=parseFloat(str[0]);
	       h=parseFloat(str[1]);
	      gGridArray[1][i]=[lc,h];	    
	   }	    
	   
	   if(gGridArray[1].length<1)
	   {
	   	  h=DMX_getlcElev(firstlc)+3;
	   	  gGridArray[1].push([firstlc,h]);
	   	  
	   	  h=DMX_getlcElev(endlc)+3;
	   	  gGridArray[1].push([endlc,h]);
	   }
}

function GetPierList()
{
	var PierConfigString =SGWorld.ProjectTree.GetClientData(objectID,"PierList");
	var strs =  PierConfigString.split("|");
	 var c = strs.length;
	   var lc,h;
	   gGridArray[2]=[];	   
	 
	   if(PierConfigString=="NaN") return;	   
	 
	   for(var i=0;i<c;i++)
	    {
	       lc=parseFloat(strs[i]);	      
	      gGridArray[2][i]=[lc,0];	    
	   }
	   
}

function CommitBPD()
{
	var str="";
	str = gGridArray[1][0][0].toFixed(2)+" "+gGridArray[1][0][1].toFixed(2)+" 0 0 1000 0 0 0 0 0 0 0 0 0 0 0";   
	
	for(var k=1;k<gGridArray[1].length;k++)
     {
     	str+="," + gGridArray[1][k][0].toFixed(2)+" "+gGridArray[1][k][1].toFixed(2)+" 0 0 1000 0 0 0 0 0 0 0 0 0 0 0";     	
     }
         
     SGWorld.ProjectTree.SetClientData(objectID,"BPDList",str);
     
     if(gGridArray[2].length>0) str=gGridArray[2][0][0].toFixed(2);
     else str="";
     
     for(var k=1;k<gGridArray[2].length;k++)
     {
     	str+="|"+gGridArray[2][k][0].toFixed(2);
     }
     
     SGWorld.ProjectTree.SetClientData(objectID,"PierList",str);
     
     
     if(gGridArray[3].length<1)
     {
     	  SGWorld.ProjectTree.SetClientData(objectID,"BridgeList","");
     }else
     	{
     		 var stry=$("#holedist").val();
	       var s=stry.split("m");
	       var dis=parseFloat(s[0]);
	
     		 var c=1;
     		  c = (gGridArray[3][1][0]-gGridArray[3][0][0])/dis;
     		
	     	str = gGridArray[3][0][0].toFixed(2)+","+gGridArray[3][1][0].toFixed(2)+",大桥0_"+c.toFixed(0) +"-"+stry;   
		
			   for(var k=2;k<gGridArray[3].length;k+=2)
		     {
		     	 c+=1;
		     	 c = (gGridArray[3][k+1][0]-gGridArray[3][k][0])/dis;
		     	 str+=" " + gGridArray[3][k][0].toFixed(2)+","+gGridArray[3][k+1][0].toFixed(2)+",大桥"+(k/2).toFixed(0)+"_"+c.toFixed(0) +"-"+stry;   	
		     }
     		SGWorld.ProjectTree.SetClientData(objectID,"BridgeList",str);
     	}
     	
   //  alert(gGridArray[4].length);
     
     if(gGridArray[4].length<1)
     {
     	  SGWorld.ProjectTree.SetClientData(objectID,"TunnelList","");
     }else
     	{
     		   var c=1;
	     		str = gGridArray[4][0][0].toFixed(2)+","+gGridArray[4][1][0].toFixed(2)+",隧道"+c;   
		
			   for(var k=2;k<gGridArray[4].length;k+=2)
		     {
		     		c+=1;
		     		str+=" " + gGridArray[4][k][0].toFixed(2)+","+gGridArray[4][k+1][0].toFixed(2)+",隧道"+c;     	
		     }
     		SGWorld.ProjectTree.SetClientData(objectID,"TunnelList",str);
     	}
         
    SGWorld.ProjectTree.SetClientData(objectID,"ZDMChartChanged","true");
     
     
     alert("设计方案已经提交，请刷新模型查看效果！");
     SGWorld.Window.RemovePopupByCaption("纵断面");

}

function ReDrawGraph(ispan)
{
	   for(var k=0;k<gGridArray[2].length;k++)
     {
     	gGridArray[2][k][1]=DMX_getTrackH(gGridArray[2][k][0]);     	
     }    
     
     for(var k=0;k<gGridArray[3].length;k++)
     {
     	gGridArray[3][k][1]=DMX_getTrackH(gGridArray[3][k][0]);     	
     } 
     
     for(var k=0;k<gGridArray[4].length;k++)
     {
     	gGridArray[4][k][1]=DMX_getlcElev(gGridArray[4][k][0]);     	
     } 
     
     for(var k=0;k<gGridArray[5].length;k++)
     {
     	gGridArray[5][k][1]=DMX_getTrackH(gGridArray[5][k][0])-10;     	
     } 
     
   var data = [];
  	data.push({ data: gGridArray[0], label: "地面线", lines: { show: true, fill: true,width:1, fillColor: { colors: [{ opacity: 0.7 }, { opacity: 0.1}] } }, color: '#00ff00',threshold: { below: gMinAltitude+50, color: "rgb(200, 20, 30)" }});
	//data.push({ data: gGridArray[1], label: "坡度线", lines: { show: true, fill: false }, points: { show: false },color: '#ff0000'});
	 data.push({ data: gGridArray[1], label: "坡度线", lines: { show: true, fill: false },points: { symbol: "triangle", fillColor: "#0062FF", show: true },color: '#0000ff',highlightColor:'#ff0000'});
   data.push({ data: gGridArray[2], label: "墩台", bars: { show: true, barWidth: 5, align:'center', horizontal: false, zero:true }, points: { show: false },color: '#ff00ff',highlightColor:'#ff0000'});
   data.push({ data: gGridArray[3], label: "桥梁插旗", bars: { show: true, barWidth: 2, align:'center', horizontal: false, zero:true }, points: { show: false },color: '#0000ff',highlightColor:'#ff0000'});
   data.push({ data: gGridArray[4], label: "隧道插旗", bars: { show: true, barWidth: 2, align:'center', horizontal: false, zero:true }, points: { show: false },color: '#ffff00',highlightColor:'#ff0000'});
   data.push({ data: gGridArray[5], label: "插旗", lines: { show: true, fill: false,width:10 },points: { symbol: "triangle", fillColor: "#0062FF", show: false },color: '#ff0000',highlightColor:'#ff0000'});
    
     	if(gPlot!=null) {
     		gPlot.setData(data);
     		//gPlot.getOptions()['pan']['interactive'] = ispan;
     		gPlot.draw();     		
     	}
}

//------------
//  DrawGraph
function DrawGraph() {
   
  
  for(var k=0;k<gGridArray[2].length;k++)
     {
     	gGridArray[2][k][1]=DMX_getTrackH(gGridArray[2][k][0]);     	
     }    
     
     for(var k=0;k<gGridArray[3].length;k++)
     {
     	gGridArray[3][k][1]=DMX_getTrackH(gGridArray[3][k][0]);     	
     } 
     
     for(var k=0;k<gGridArray[4].length;k++)
     {
     	gGridArray[4][k][1]=DMX_getlcElev(gGridArray[4][k][0]);     	
     } 
     
     for(var k=0;k<gGridArray[5].length;k++)
     {
     	gGridArray[5][k][1]=DMX_getTrackH(gGridArray[5][k][0])-10;     	
     } 
     
    var data = [];
	data.push({ data: gGridArray[0], label: "地面线", lines: { show: true, fill: true,width:1, fillColor: { colors: [{ opacity: 0.7 }, { opacity: 0.1}] } }, color: '#00ff00',threshold: { below: gMinAltitude+50, color: "rgb(200, 20, 30)" }});
	//data.push({ data: gGridArray[1], label: "轨面线", lines: { show: true, fill: false }, points: { show: false },color: '#ff0000'});
	data.push({ data: gGridArray[1], label: "坡度线", lines: { show: true, fill: false },points: { symbol: "triangle", fillColor: "#0062FF", show: true },color: '#0000ff',highlightColor:'#ff0000'});
  data.push({ data: gGridArray[2], label: "墩台", bars: { show: true, barWidth: 5, align:'center', horizontal: false, zero:true }, points: { show: false },color: '#ff00ff',highlightColor:'#ff0000'});
  data.push({ data: gGridArray[3], label: "桥梁插旗", bars: { show: true, barWidth: 2, align:'center', horizontal: false, zero:true }, points: { show: false },color: '#0000ff',highlightColor:'#ff0000'});
  data.push({ data: gGridArray[4], label: "隧道插旗", bars: { show: true, barWidth: 2, align:'center', horizontal: false, zero:true }, points: { show: false },color: '#ffff00',highlightColor:'#ff0000'});
    data.push({ data: gGridArray[5], label: "插旗", lines: { show: true, fill: false,width:10 },points: { symbol: "triangle", fillColor: "#0062FF", show: false },color: '#ff0000',highlightColor:'#ff0000'});
    
    gPlot = $.plot("#chartdiv", data,
    {
        xaxis: { zoomRange: [0.1, ], panRange: [-100, ],min:firstlc },
				yaxis: { zoomRange: [0.1, ], min:gMinAltitude-50},
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
    	
    	//删除合并桥梁隧道
    		if(layerindex==3 || layerindex==4)
           {
           	   var flag=false;
           		for(var k=gGridArray[layerindex].length-2; k>=0; k--)
		           {
		           	 if(gGridArray[layerindex][k][0]>gGridArray[layerindex][k+1][0])		           	 
		           	 {
		           	 	  flag=true;
		           	 	  gGridArray[layerindex].splice(k,2);	
		           	 }		           	 	  
		           }	
		           if(layerindex==3 && flag) LayoutPiers();
           }
     
       if(!pos) return;       
       
       if(!item)
       {
       		 if(addBPDFlager)  
           {
                AddToBPD(pos);                
           			addBPDFlager=false;
           			return;
           }            
           
           if(addPierflag)
           {
              AddToPierList(pos);
              addPierflag=false;
              return;
           }
           
           gGridArray[5]=[];
                               
           gPlot.unhighlight();
           curBPDindex=-1;   
           curPier=-1;        
                      
           layerindex=-1;
           
           ReDrawGraph(); 
       	  return;
       }
       
        if (item.seriesIndex==1) 
        {        	
        	layerindex=-1;
	        if(indragmode) 
		       {
		      	  		indragmode=false;
	          	 		gPlot.pan({ interactive:true });
		          		return;
		       }else
		       	{
		              curBPDindex=item.dataIndex;	 
		              curPier=-1;            
			      			gPlot.unhighlight();
		              gPlot.highlight(1,curBPDindex);	              
		              indragmode=true;
		              gPlot.pan({ interactive:false }); 
		        }
        }
        
        if (item.seriesIndex==2) 
        {
        	
        	if(curPier>-1)
        	{
        	      curPier=-1;	     
	              curBPDindex=-1;        
	              layerindex=-1;
		      			gPlot.unhighlight();	
        	}else
        	{
        				layerindex=2;
        	      curPier=item.dataIndex;	     
	              curBPDindex=-1;        
		      			gPlot.unhighlight();
	              gPlot.highlight(2,curPier);
        	}
        }
        
        if (item.seriesIndex==3 || item.seriesIndex==4) 
        {        	  	              
	              
        	if(curPier>-1)
        	{        		  
        	      curPier=-1;	     
	              curBPDindex=-1;   
	              layerindex=-1;     
		      			gPlot.unhighlight();	
		      			gGridArray[5]=[];
		      			ReDrawGraph();     
        	}else
        	{
        				layerindex=item.seriesIndex;
        	      curPier=item.dataIndex;	     
        	      var idx=curPier % 2;
	              var st,ed;   
	              if(idx==0){  //curPier,curPier+1
	              	st=curPier;
	              	ed=curPier+1;
	              } 
	              else {  //curPier-1,curPier
	              	st=curPier-1;
	              	ed=curPier;	              	
	              }
	              
	              curBPDindex=-1;        	             
		      			gPlot.unhighlight();
	              gPlot.highlight(item.seriesIndex,st);
	              gPlot.highlight(item.seriesIndex,ed);	              
	              gGridArray[5]=[];
	              gGridArray[5].push([gGridArray[layerindex][st][0],0]);
	              gGridArray[5].push([gGridArray[layerindex][ed][0],0]);	              		              
        	}
        }
        
        
    });
}

//-------------
// Tool tip
function ToolTip(event, pos, item) 
{
	if(!pos) return;
       
	if(indragmode && curBPDindex>-1)
       {         
           var lc=Math.round(pos.x/10)*10; // need 50 times                   
          
          if(curBPDindex==0 && lc<firstlc) lc=firstlc;
          if(curBPDindex==gGridArray[1].length-1 && lc>endlc) lc=endlc;
          
           
           gGridArray[1][curBPDindex][0]=lc;
           gGridArray[1][curBPDindex][1]=pos.y;
           gPlot.unhighlight();
           ReDrawGraph();          
           gPlot.highlight(1, curBPDindex);       
       }
       
 	
 			if(curPier>-1 && layerindex>1)
       {
       	
       	    var lc=pos.x;
       	  	
       	  	gGridArray[layerindex][curPier][0]=Math.min(Math.max(lc,firstlc),endlc);
	          gGridArray[layerindex][curPier][1]=DMX_getTrackH(lc); 
	            
	          gPlot.unhighlight();
	             
	       	  if(layerindex==2)
	       	  {
	       	  	
		           var eh=DMX_getElev(lc);
		           
		           if(eh>gGridArray[2][curPier][1]-3)
		           {	           			
						       	gGridArray[2].splice(curPier,1);           					    
						       	ReDrawGraph(true);      
						       	curPier=-1; 
		           }else
		           	{
					           gPlot.unhighlight();
					           ReDrawGraph();
					           gPlot.highlight(2, curPier);       
		        	  }
	       	  }
	       	  if(layerindex==3 || layerindex==4)
	       	  { 
					      if(layerindex==3)  LayoutPiers();
					      
					      var len=0;
					      var sl,el;
					      gGridArray[5]=[];
					      var idx=curPier % 2;
	              if(idx==0){	              	
	              	gGridArray[5].push([gGridArray[layerindex][curPier][0],0]);
	              	gGridArray[5].push([gGridArray[layerindex][curPier+1][0],0]);
	              	sl=gGridArray[layerindex][curPier][0];
	              	el=gGridArray[layerindex][curPier+1][0];	              	
	              } 
	              else {
	              	gGridArray[5].push([gGridArray[layerindex][curPier-1][0],0]);
	              	gGridArray[5].push([gGridArray[layerindex][curPier][0],0]);	        
	              	sl=gGridArray[layerindex][curPier-1][0];
	              	el=gGridArray[layerindex][curPier][0];	
	              }
	              len=el-sl;
	              
					      ReDrawGraph();          
					      
					      gPlot.highlight(layerindex, curPier); 
					      var idx=curPier % 2;
		              if(idx==0) gPlot.highlight(item.seriesIndex,curPier+1);
		              else gPlot.highlight(item.seriesIndex,curPier-1);
		              	
		              	var mTop,mLeft=0;
 		
										mTop =  item.pageY + 5;
										mLeft=  item.pageX + 5;
		
		            var htmlStr = "";
		            htmlStr="长度："+len.toFixed(2)+"   起点："+sl.toFixed(2) +"  终点："+el.toFixed(2)
		            $("#tooltip").html(htmlStr)
								.css({ top: mTop, left: mLeft })
								.fadeIn(200);
	       	  }
       }
       
  	
	if (item && item.seriesIndex==1) 
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
	   //	CommonToolTip(pos);
	}    
    	

}



//-----------

function DeleteBPD() {
	
	var len=gGridArray[1].length-1;		
	if(curBPDindex == 0 || curBPDindex == len)
	{
		alert("不能删除起终点的变坡点。");
		return;
	}
	
    if(curBPDindex>-1) 
    {
       gPlot.unhighlight();     
       gGridArray[1].splice(curBPDindex,1);           
       ReDrawGraph(true);      
       curBPDindex=-1;
    };
}

var addPierflag=false;
function AddPier()
{
     addPierflag=true;
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

function AddToPierList(pos)
{
	//pos.x=Math.round(pos.x/10)*10; // need 50 times
	//alert(gGridArray[2].length);
	
	  
	  
		if(gGridArray[2].length<1)
		{
		  	gGridArray[2].push([pos.x, pos.y]);  
	     	gPlot.highlight(2,0);	  
	     	ReDrawGraph(true);     	 
	     	return;  
		};
		
		
	
    	if(pos.x<gGridArray[2][0][0])
    	{
    	   gGridArray[2].splice(0,0,[pos.x, pos.y]);  
     	   gPlot.unhighlight();     	  
     	   ReDrawGraph(true);     	   
     	   gPlot.highlight(2,0);
     	   curPier =0;     	    	   
     	   return;
		  }
	
     for(var k=1;k<gGridArray[2].length;k++)
     {
     	if( (pos.x>gGridArray[2][k-1][0]) && (pos.x<gGridArray[2][k][0]))
     	{     	    
     	   gGridArray[2].splice(k,0,[pos.x, pos.y]);  
     	   gPlot.unhighlight();     	  
     	   ReDrawGraph(true);     	   
     	   gPlot.highlight(2,k);
     	   curPier =k;     	    	   
     	   return;
     	}
     }
     
     var m=gGridArray[2].length-1;
     if(pos.x>gGridArray[2][m][0])
    	{
    	     gGridArray[2].push([pos.x, pos.y]);  
     	   gPlot.unhighlight();     	  
     	   ReDrawGraph(true);     	   
     	   gPlot.highlight(2,m+1);
     	   curPier =m+1;     	    	   
     	   return;
			}
			
}

function AddToBPD(pos)
{
	pos.x=Math.round(pos.x/10)*10; // need 50 times
	
     for(var k=1;k<gGridArray[1].length;k++)
     {
     	if( (pos.x>gGridArray[1][k-1][0]) && (pos.x<gGridArray[1][k][0]))
     	{     	    
     	   gGridArray[1].splice(k,0,[pos.x, pos.y]);  
     	   gPlot.unhighlight();     	  
     	   ReDrawGraph(true);     	   
     	   gPlot.highlight(1,k);
     	   curBPDindex =k;
     	 //  SGWorld.ProjectTree.SetClientData(CaseID,"CaseChanged","TRUE");     	   
     	   return;
     	}
     }    
}

function FindBPD(pos)
{
	//pos.x=Math.round(pos.x/50)*50; // need 50 times
	
     for(var k=1;k<=gGridArray[1].length;k++)
     {
     	var dis=(pos.x-gGridArray[1][k-1][0])*(pos.x-gGridArray[1][k-1][0])+(pos.y-gGridArray[1][k-1][1])*(pos.y-gGridArray[1][k-1][1]);
     	
     	if(dis<100) return k-1;     	
     }
     
     return -1;
     
    
}
